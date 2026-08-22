/**
 * Fixed-window per-IP rate limiting.
 *
 * In-memory by design: Antara runs as a single local process, so a shared store
 * would add a dependency without adding protection. Guards the endpoints that
 * cost money (OpenAI) or write to disk (contact), and throttles login guessing.
 */
function rateLimit({ windowMs, max, message }) {
  const hits = new Map();

  // Keep the map from growing forever on a long-running server.
  const sweep = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }, windowMs);
  sweep.unref();

  return function rateLimiter(req, res, next) {
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    let entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }
    entry.count++;

    if (entry.count > max) {
      res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({
        success: false,
        error: { code: 'RATE_LIMITED', message }
      });
    }

    next();
  };
}

module.exports = { rateLimit };
