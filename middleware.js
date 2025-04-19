import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/', '/login(.*)', '/sign-in(.*)', '/sign-up(.*)'])

const customMiddleware = async (req) => {
  if (req.nextUrl.pathname.startsWith('/sign-in')) {
    return NextResponse.rewrite(new URL('/login', req.url)) // rewrite- Internally shows a different page, but URL stays the same
  }
  return NextResponse.next()
}


const clerkWrapped = clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth()
  if (!isPublicRoute(req)) {
    // Check if the user is authenticated
    if (!userId) {
      // Redirect to the login page if not authenticated
      return NextResponse.redirect(new URL('/login', req.url))
      // await auth.protect()
    }

    return NextResponse.next()
  }

  if (userId) {
    // Optionally, you can add custom logic here for authenticated users
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Apply custom logic after Clerk
  return await customMiddleware(req)
})

export default clerkWrapped;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};