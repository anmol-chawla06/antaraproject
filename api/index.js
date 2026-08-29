/**
 * Vercel serverless entrypoint.
 *
 * Vercel imports this file and invokes the exported handler once per request.
 * The Express app defined in landing-page/server.js is already a valid
 * (req, res) handler, so it is re-exported unchanged: one server definition
 * serves both `npm run dev` locally and Vercel in production, and no route,
 * guard or middleware is duplicated here where it could drift.
 *
 * All traffic is routed through this function by vercel.json rather than being
 * served straight off the CDN. That is deliberate: the security allow-list, the
 * admin session check and the /data and /landing-page guards all live inside
 * Express, and a CDN that served files directly would bypass every one of them.
 */
module.exports = require('../landing-page/server.js');
