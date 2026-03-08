import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  const isPrivatePage = pathname.startsWith('/profile') || pathname === '/';
  const isPublicPage =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  if (isPrivatePage && !session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublicPage && session) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile/:path*', '/sign-in', '/sign-up'],
};
