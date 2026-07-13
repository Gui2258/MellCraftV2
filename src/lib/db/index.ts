import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Strip Prisma-specific ?schema= param — the postgres driver doesn't support it
const rawUrl = process.env.DATABASE_URL!
const connectionString = rawUrl.replace(/[?&]schema=[^&]*/g, '').replace(/[?&]$/, '')

// Prevent multiple connections in development (hot reload)
const globalForDb = globalThis as unknown as { _pgClient: postgres.Sql }

// `prepare: false` is required when connecting through Supabase's transaction
// pooler (Supavisor); harmless on a direct/session connection. `max: 1` keeps
// each serverless instance from opening a fistful of pooled connections.
const client =
  globalForDb._pgClient ??
  postgres(connectionString, { max: process.env.NODE_ENV === 'production' ? 1 : 10, prepare: false })
if (process.env.NODE_ENV !== 'production') globalForDb._pgClient = client

export const db = drizzle(client, { schema })
export type DB = typeof db
