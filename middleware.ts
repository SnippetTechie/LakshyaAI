import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define route matchers
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
])

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/simulations(.*)',
  '/mentor(.*)',
  '/admin(.*)',
  '/onboarding',
  '/api/user(.*)',
  '/api/auth(.*)',
])



export default clerkMiddleware(async (auth, request) => {
  // Create response
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Add CSP header for additional security (updated for Clerk)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://clerk.com https://*.clerk.accounts.dev https://well-collie-13.clerk.accounts.dev; style-src 'self' 'unsafe-inline' https://*.clerk.accounts.dev; img-src 'self' data: https: https://img.clerk.com https://*.clerk.accounts.dev; font-src 'self' data: https://*.clerk.accounts.dev; connect-src 'self' https://clerk.com https://*.clerk.accounts.dev https://well-collie-13.clerk.accounts.dev; frame-src https://*.clerk.accounts.dev;"
  )

  // Prevent access to sensitive files
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/.env') ||
      pathname.startsWith('/config') ||
      pathname.includes('.log') ||
      pathname.includes('node_modules')) {
    return new NextResponse('Access Denied', { status: 403 })
  }

  // Handle authentication and routing
  if (isPublicRoute(request)) {
    return response
  }

  // Protect routes that require authentication
  if (isProtectedRoute(request)) {
    await auth.protect()
  }

  return response
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
