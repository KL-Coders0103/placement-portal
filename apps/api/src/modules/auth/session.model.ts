import mongoose, { Schema, type Model } from 'mongoose';

/**
 * Session record — one per device/browser login.
 *
 * This batch (2A) creates the session but does not yet refresh it.
 * Batch 2B adds: refresh token hashing, rotation, token family revocation.
 *
 * DATABASE_SCHEMA.md §3, SECURITY_GUIDELINES.md §4.
 */
export interface SessionDocument {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  tokenFamilyId: string;
  refreshTokenHash: string;
  deviceLabel: string | null;
  userAgentHash: string | null;
  expiresAt: Date;
  revokedAt: Date | null;
  replacedBySessionId: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new Schema<SessionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    tokenFamilyId: { type: String, required: true, index: true },
    refreshTokenHash: { type: String, required: true },
    deviceLabel: { type: String, default: null },
    userAgentHash: { type: String, default: null },
    expiresAt: { type: Date, required: true },
    revokedAt: { type: Date, default: null },
    replacedBySessionId: { type: Schema.Types.ObjectId, default: null },
  },
  {
    timestamps: true,
    collection: 'sessions',
    versionKey: false,
  },
);

// Session lookup per user + revocation status
SessionSchema.index({ userId: 1, revokedAt: 1 });
// TTL cleanup — TTL is for storage hygiene only, not authorization
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const SessionModel: Model<SessionDocument> =
  (mongoose.models.Session as Model<SessionDocument>) ??
  mongoose.model<SessionDocument>('Session', SessionSchema);