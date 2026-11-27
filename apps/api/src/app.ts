import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestId } from './middleware/requestId.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { healthRouter } from './routes/health.js';
import { getEnv } from './env.js';

/**
 * Builds the Express app.
 * Kept separate from server bootstrap so tests can import the app without binding a port.
 */
export function createApp(): Express {
  const env = getEnv();
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(
    cors({
      origin: env.WEB_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(requestId);

  // Versioned API router
  const api = express.Router();
  api.use('/health', healthRouter());
  app.use(env.API_PREFIX, api);

  // 404 + error handler last
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}