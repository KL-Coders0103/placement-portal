import { createApp } from './app.js';
import { getEnv } from './env.js';
import { pino } from 'pino';

const logger = pino({
  name: 'api',
  level: process.env.LOG_LEVEL ?? 'info',
});

function bootstrap(): void {
  const env = getEnv(); // Fails fast on invalid env
  const app = createApp();

  const server = app.listen(env.PORT, () => {
    logger.info(
      { port: env.PORT, prefix: env.API_PREFIX, env: env.NODE_ENV },
      'API listening',
    );
  });

  const shutdown = (signal: string): void => {
    logger.info({ signal }, 'shutting down');
    server.close(() => {
      logger.info('server closed');
      process.exit(0);
    });
    // Force exit if graceful shutdown takes too long
    setTimeout(() => {
      logger.error('graceful shutdown timed out');
      process.exit(1);
    }, 10_000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

try {
  bootstrap();
} catch (err) {
  logger.fatal({ err }, 'failed to start API');
  process.exit(1);
}