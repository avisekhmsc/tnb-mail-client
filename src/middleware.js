import { NextResponse } from 'next/server';

export async function middleware(request) {
  const publicPaths = ['/login', '/signup','/',,'/inbox','/sent','/drafts'];
  const path = request.nextUrl.pathname;

  // Allow public paths without restrictions
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // For protected routes, rely on client-side AuthContext to check token
  // Optionally, add server-side checks for API routes if needed
  try {
    // Example: If you have a server-side way to verify authentication (e.g., via headers),
    // you can add it here for API routes or specific cases.
    // Since token is in localStorage, client-side AuthContext handles redirects.
    return NextResponse.next();
  } catch (error) {
    // Redirect to login for protected routes if server-side check fails
    if (!publicPaths.includes(path)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};