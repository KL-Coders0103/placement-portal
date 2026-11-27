import jwt from 'jsonwebtoken';

export interface AccessTokenPayload {
  sub: string; // user id
  typ: 'access';
}

export interface IssuedAccessToken {
  token: string;
  expiresAt: Date;
}

/**
 * Sign a short-lived access token.
 * Access tokens carry the user id only — never roles, tenant ids or other
 * authorization data (those are resolved server-side per request).
 */
export function signAccessToken(
  userId: string,
  secret: string,
  ttl: string,
): IssuedAccessToken {
  const token = jwt.sign({ sub: userId, typ: 'access' } satisfies AccessTokenPayload, secret, {
    algorithm: 'HS256',
    expiresIn: ttl as jwt.SignOptions['expiresIn'],
  });
  const decoded = jwt.decode(token) as { exp: number };
  return { token, expiresAt: new Date(decoded.exp * 1000) };
}

/**
 * Verify an access token. Returns the payload on success, null on failure.
 * Never throws — callers should treat null as "not authenticated".
 */
export function verifyAccessToken(token: string, secret: string): AccessTokenPayload | null {
  try {
    const payload = jwt.verify(token, secret, { algorithms: ['HS256'] }) as AccessTokenPayload;
    if (payload.typ !== 'access' || typeof payload.sub !== 'string') return null;
    return payload;
  } catch {
    return null;
  }
}