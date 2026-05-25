import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { getRole } from '@/lib/auth'

export async function GET() {
  const role = await getRole()
  if (role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const rows = await db
    .select({
      id: users.id,
      clerkId: users.clerkId,
      email: users.email,
      name: users.name,
      imageUrl: users.imageUrl,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt))

  return Response.json({ data: rows })
}
