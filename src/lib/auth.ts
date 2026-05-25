import { auth, clerkClient } from '@clerk/nextjs/server'
import { db } from './db'
import { users } from './db/schema'
import { eq } from 'drizzle-orm'

type Role = 'user' | 'seller' | 'admin'

export async function getRole(): Promise<Role> {
  const { userId, sessionClaims } = await auth()
  if (!userId) return 'user'

  // Fast path: role already in JWT claims
  const roleFromClaims = (sessionClaims?.metadata as { role?: Role } | undefined)?.role
  if (roleFromClaims) return roleFromClaims

  // Fallback: JWT predates the template or hasn't refreshed — read from DB (already synced)
  const [dbUser] = await db.select({ role: users.role }).from(users).where(eq(users.clerkId, userId)).limit(1)
  return (dbUser?.role as Role) ?? 'user'
}

export async function requireRole(required: Role | Role[]): Promise<void> {
  const role = await getRole()
  const allowed = Array.isArray(required) ? required : [required]
  if (!allowed.includes(role)) {
    throw new Error('Forbidden')
  }
}

export async function getCurrentUser() {
  const { userId } = await auth()
  if (!userId) return null
  const [user] = await db.select().from(users).where(eq(users.clerkId, userId)).limit(1)
  return user ?? null
}

export async function getDbUserFromClerkId(clerkId: string) {
  const [user] = await db.select().from(users).where(eq(users.clerkId, clerkId)).limit(1)
  return user ?? null
}
