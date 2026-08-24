/**
 * Admin session authentication.
 *
 * Replaces the previous no-op `requireAdmin`, which allowed anyone who found
 * the URL to read and modify every contact submission.
 *
 * Sessions are a signed, httpOnly cookie: no database, no dependency, and the
 * password never leaves the server. If ADMIN_PASSWORD is unset the admin area
 * is disabled outright rather than falling back to a default credential.
 */
const crypto = require('crypto');

const COOKIE_NAME = 'antara_admin';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

// A per-process random secret is the default, so restarting the server simply
// signs everyone out. A constant fallback would be a shipped shared secret.
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || crypto.randomBytes(32).toString('hex');

const sha256 = value => crypto.createHash('sha256').update(String(value)).digest();
const sign = payload => crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');

function isConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function passwordMatches(supplied) {
  if (!isConfigured()) return false;
  // Hashing first keeps the comparison constant-length, so neither the value
  // nor the length of the real password leaks through timing.
  return crypto.timingSafeEqual(sha256(supplied ?? ''), sha256(process.env.ADMIN_PASSWORD));
}

function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) {
      return decodeURIComponent(part.slice(eq + 1).trim());
    }
  }
  return null;
}

function hasValidSession(req) {
  const token = readCookie(req, COOKIE_NAME);
  if (!token) return false;

  const dot = token.lastIndexOf('.');
  if (dot === -1) return false;

  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payload);

  if (signature.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

function startSession(res) {
  const payload = String(Date.now() + SESSION_TTL_MS);
  res.cookie(COOKIE_NAME, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_TTL_MS
  });
}

function endSession(res) {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'strict' });
}

function requireAdmin(req, res, next) {
  if (!isConfigured()) {
    return res.status(503).json({
      success: false,
      error: {
        code: 'ADMIN_DISABLED',
        message: 'Admin access is not configured. Set ADMIN_PASSWORD in the server environment to enable it.'
      }
    });
  }

  if (hasValidSession(req)) return next();

  // Browser navigations get the sign-in page; API clients get a clean 401.
  if (req.method === 'GET' && req.accepts(['json', 'html']) === 'html') {
    return res.redirect('/admin-login.html');
  }

  return res.status(401).json({
    success: false,
    error: { code: 'UNAUTHORIZED', message: 'Sign in to view this page.' }
  });
}

module.exports = { requireAdmin, passwordMatches, startSession, endSession, isConfigured };
