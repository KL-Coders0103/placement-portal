import mongoose, { Schema, type Model } from 'mongoose';

/**
 * User account.
 * Distinct from a "role" — roles live on memberships, not users.
 * See DATABASE_SCHEMA.md §3 (Identity and tenancy) and PRODUCT_REQUIREMENTS.md §3.
 */
export interface UserDocument {
  _id: mongoose.Types.ObjectId;
  email: string;
  normalizedEmail: string;
  passwordHash: string;
  displayName: string;
  emailVerifiedAt: Date | null;
  accountStatus: 'active' | 'suspended';
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, trim: true },
    normalizedEmail: { type: String, required: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    displayName: { type: String, required: true, trim: true, maxlength: 120 },
    emailVerifiedAt: { type: Date, default: null },
    accountStatus: {
      type: String,
      required: true,
      enum: ['active', 'suspended'],
      default: 'active',
    },
    lastLoginAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: 'users',
    versionKey: false,
  },
);

// Unique index — one account per normalized email
UserSchema.index({ normalizedEmail: 1 }, { unique: true });

export const UserModel: Model<UserDocument> =
  (mongoose.models.User as Model<UserDocument>) ??
  mongoose.model<UserDocument>('User', UserSchema);

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}