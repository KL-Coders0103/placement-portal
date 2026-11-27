import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { requestId } from './middleware/requestId.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { healthRouter } from './routes/health.js';
import { authRouter } from './routes/auth.routes.js';
import { getEnv } from './env.js';

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

  // requestId FIRST — so every downstream middleware can access it,
  // including error handlers triggered by body-parsing failures.
  app.use(requestId);

  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());

  const api = express.Router();
  api.use('/health', healthRouter());
  api.use('/auth', authRouter());
  app.use(env.API_PREFIX, api);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}