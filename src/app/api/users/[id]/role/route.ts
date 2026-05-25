import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'
import { getRole } from '@/lib/auth'

const schema = z.object({
  role: z.enum(['user', 'seller', 'admin']),
})

export async function PUT(req: Request, ctx: RouteContext<'/api/users/[id]/role'>) {
  const callerRole = await getRole()
  if (callerRole !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await ctx.params
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 })

  const [dbUser] = await db.select().from(users).where(eq(users.id, id)).limit(1)
  if (!dbUser) return Response.json({ error: 'User not found' }, { status: 404 })

  const client = await clerkClient()
  await client.users.updateUserMetadata(dbUser.clerkId, {
    publicMetadata: { role: parsed.data.role },
  })

  const [updated] = await db
    .update(users)
    .set({ role: parsed.data.role, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning()

  return Response.json({ data: updated })
}
