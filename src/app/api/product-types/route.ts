import { db } from '@/lib/db'
import { productTypes } from '@/lib/db/schema'
import { asc } from 'drizzle-orm'

export async function GET() {
  const types = await db.select().from(productTypes).orderBy(asc(productTypes.name))
  return Response.json({ data: types })
}
