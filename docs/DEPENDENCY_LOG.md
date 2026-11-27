# Placement Portal — Dependency Log

Every runtime and notable dev dependency must be listed here before merge.
See `DEVELOPMENT_GUIDE.md` §6.2 for rules.

| Package | Version | Scope | Purpose | Alternatives considered | Size (gz) | License | Added by | Date |
|---|---|---|---|---|---|---|---|---|
| argon2 | 0.41.1 | api | Password hashing (Argon2id) | bcrypt (rejected: no Argon2id); crypto.scrypt (rejected: no built-in cost tuning) | ~1MB (native) | MIT | Phase 02 | 2025-11-28 |
| cookie-parser | 1.4.7 | api | Parse cookies on requests (for HttpOnly refresh cookie) | Manual cookie parsing | ~5KB | MIT | Phase 02 | 2025-11-28 |
| jsonwebtoken | 9.0.2 | api | JWT signing/verification for access tokens | jose (rejected: keep dependencies minimal; jsonwebtoken is stable) | ~35KB | MIT | Phase 02 | 2025-11-28 |
| mongoose | 8.7.2 | api | MongoDB ODM with schema + indexes | raw mongodb driver (rejected: no schema validation) | ~500KB | MIT | Phase 02 | 2025-11-28 |
| @types/cookie-parser | 1.4.7 | api (dev) | TypeScript types for cookie-parser | — | 0 | MIT | Phase 02 | 2025-11-28 |
| @types/jsonwebtoken | 9.0.7 | api (dev) | TypeScript types for jsonwebtoken | — | 0 | MIT | Phase 02 | 2025-11-28 |