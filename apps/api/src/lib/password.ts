import argon2 from 'argon2';

/**
 * Password hashing policy — Argon2id.
 * Parameters chosen to be memory-hard (64 MB) while remaining fast enough
 * for interactive login on a modest server (~50ms per hash).
 *
 * SECURITY_GUIDELINES.md §4 requires Argon2id or an approved modern hash.
 */
const ARGON_OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 65536, // 64 MB
  timeCost: 3,
  parallelism: 1,
};

export async function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain, ARGON_OPTIONS);
}

export async function verifyPassword(hash: string, plain: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, plain);
  } catch {
    return false;
  }
}