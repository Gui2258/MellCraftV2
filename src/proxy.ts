import { clerkMiddleware, clerkClient, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isSellerRoute = createRouteMatcher(['/dashboard(.*)', '/api/upload(.*)'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isAuthRequired = createRouteMatcher(['/favoritos(.*)', '/perfil(.*)'])

export function proxy(request: NextRequest) {
  return clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth()

    // Role from JWT claims (fast path — available once JWT template is active)
    let role = (sessionClaims?.metadata as { role?: string } | undefined)?.role

    // Fallback: JWT doesn't have metadata yet (token predates the template, or wasn't
    // refreshed after role assignment) → fetch directly from Clerk API
    if (userId && !role) {
      const client = await clerkClient()
      const user = await client.users.getUser(userId)
      role = (user.publicMetadata as { role?: string })?.role
    }

    if (isSellerRoute(req) || isAdminRoute(req)) {
      console.log(`[proxy] ${req.nextUrl.pathname} | userId=${userId} | role=${role ?? 'none'}`)
    }

    if (isSellerRoute(req)) {
      if (!userId || !['seller', 'admin'].includes(role ?? '')) {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    if (isAdminRoute(req)) {
      if (!userId || role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    if (isAuthRequired(req) && !userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  })(request, {} as never)
}

export const config = {
  matcher: [
    '/dashboard(.*)',
    '/admin(.*)',
    '/favoritos(.*)',
    '/perfil(.*)',
    '/api/upload(.*)',
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
