import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) {
    return new Response('Webhook secret not configured', { status: 500 })
  }

  let event
  try {
    event = await verifyWebhook(req, { signingSecret: secret })
  } catch {
    return new Response('Invalid signature', { status: 400 })
  }

  const data = event.data as {
    id: string
    email_addresses?: { email_address: string }[]
    first_name?: string | null
    last_name?: string | null
    image_url?: string | null
    public_metadata?: { role?: string }
  }

  const clerkId = data.id
  const email = data.email_addresses?.[0]?.email_address ?? ''
  const name = [data.first_name, data.last_name].filter(Boolean).join(' ') || null
  const imageUrl = data.image_url ?? null
  const role = (data.public_metadata?.role as 'user' | 'seller' | 'admin') ?? 'user'

  if (event.type === 'user.created') {
    await db.insert(users).values({ clerkId, email, name, imageUrl, role }).onConflictDoNothing()
  }

  if (event.type === 'user.updated') {
    await db
      .update(users)
      .set({ email, name, imageUrl, role, updatedAt: new Date() })
      .where(eq(users.clerkId, clerkId))
  }

  if (event.type === 'user.deleted') {
    await db.delete(users).where(eq(users.clerkId, clerkId))
  }

  return Response.json({ ok: true })
}
