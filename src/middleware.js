import { NextResponse } from 'next/server';

export async function middleware(request) {
  const publicPaths = ['/login', '/signup', '/', '/inbox', '/sent', '/drafts'];
  const path = request.nextUrl.pathname;

  // Allow public paths without restrictions
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // For protected routes, let client-side AuthContext handle redirects
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};