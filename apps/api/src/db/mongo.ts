import mongoose from 'mongoose';
import { pino } from 'pino';

const logger = pino({ name: 'api:mongo' });

let connected = false;

/**
 * Connect to MongoDB. Safe to call multiple times.
 * Uses the validated MONGODB_URI from env.
 */
export async function connectMongo(uri: string): Promise<void> {
  if (connected) return;

  mongoose.set('strictQuery', true);
  mongoose.set('sanitizeFilter', true);

  mongoose.connection.on('connected', () => {
    logger.info('mongo connected');
    connected = true;
  });
  mongoose.connection.on('disconnected', () => {
    logger.warn('mongo disconnected');
    connected = false;
  });
  mongoose.connection.on('error', (err) => {
    logger.error({ err }, 'mongo error');
  });

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10_000,
    socketTimeoutMS: 45_000,
    maxPoolSize: 20,
    retryWrites: true,
  });
}

export async function disconnectMongo(): Promise<void> {
  await mongoose.disconnect();
  connected = false;
}

export function isMongoReady(): boolean {
  return mongoose.connection.readyState === 1;
}