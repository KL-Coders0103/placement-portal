import { Router } from 'express';

/**
 * Health endpoints.
 * - /live  → process is alive (used by orchestrators for restart decisions)
 * - /ready → required dependencies are reachable (used by load balancers)
 *
 * Phase 01: /ready reports only process status.
 * Phase 02+: adds MongoDB and Redis probes.
 */
export function healthRouter(): Router {
  const router = Router();

  router.get('/live', (_req, res) => {
    res.json({
      success: true,
      data: { status: 'live', timestamp: new Date().toISOString() },
      meta: { requestId: _req.requestId ?? 'unknown' },
    });
  });

  router.get('/ready', (_req, res) => {
    res.json({
      success: true,
      data: {
        status: 'ready',
        checks: { process: 'ok' },
        timestamp: new Date().toISOString(),
      },
      meta: { requestId: _req.requestId ?? 'unknown' },
    });
  });

  return router;
}