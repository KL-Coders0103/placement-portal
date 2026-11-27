import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { pino } from 'pino';
import { getEnv } from './env.js';

const env = getEnv();

const logger = pino({
  name: 'worker',
  level: env.LOG_LEVEL,
});

const QUEUE_NAME = 'default';

/**
 * ioredis exports a named `Redis` class which is ESM-friendly.
 * Do NOT use `new IORedis(...)` (that's the CJS default export).
 */
const connection = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});

connection.on('error', (err: unknown) => {
  logger.error({ err }, 'redis connection error');
});

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    logger.info({ jobId: job.id, name: job.name }, 'processing job');
    return { ok: true };
  },
  {
    connection,
    concurrency: env.WORKER_CONCURRENCY,
  },
);

worker.on('completed', (job) => {
  logger.info({ jobId: job.id, name: job.name }, 'job completed');
});

worker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, name: job?.name, err }, 'job failed');
});

logger.info(
  { queue: QUEUE_NAME, concurrency: env.WORKER_CONCURRENCY, env: env.NODE_ENV },
  'worker listening',
);

let shuttingDown = false;

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, 'shutting down worker');
  try {
    await worker.close();
    await connection.quit();
    logger.info('worker closed');
    process.exit(0);
  } catch (err) {
    logger.error({ err }, 'error during shutdown');
    process.exit(1);
  }
}

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));