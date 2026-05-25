import { auth, currentUser } from '@clerk/nextjs/server'

export async function GET() {
  const { userId, sessionClaims } = await auth()
  const user = await currentUser()

  const info = {
    userId,
    sessionClaims,
    publicMetadata: user?.publicMetadata ?? null,
    roleFromClaims: (sessionClaims?.metadata as { role?: string } | undefined)?.role ?? null,
    roleFromMetadata: (user?.publicMetadata as { role?: string } | undefined)?.role ?? null,
  }

  console.log('\n===== DEBUG /api/debug/me =====')
  console.log(JSON.stringify(info, null, 2))
  console.log('================================\n')

  return Response.json(info)
}
