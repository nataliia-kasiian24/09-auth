import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { axiosInstance } from './lib/api/api';

const PRIVATE_ROUTES = ['/profile', '/notes'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  let isAuthenticated = !!accessToken;
  let setCookieHeader: string[] | null = null;

  if (!accessToken && refreshToken) {
    try {
      const allCookies = cookieStore.toString();

    const response = await axiosInstance.get('/auth/session', {
      headers: { Cookie: allCookies },
      });

      if (response.status === 200) {
        isAuthenticated = true;
        setCookieHeader = response.headers['set-cookie'] || null;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  const isPrivateRoute = PRIVATE_ROUTES.some(route =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  let response: NextResponse;

  if (isPrivateRoute && !isAuthenticated) {
    response = NextResponse.redirect(new URL('/sign-in', request.url));
  } else if (isAuthRoute && isAuthenticated) {
    response = NextResponse.redirect(new URL('/', request.url));
  } else {
    response = NextResponse.next();
  }

  if (setCookieHeader) {
    setCookieHeader.forEach(cookie => {
      response.headers.append('Set-Cookie', cookie);
    });
  }

  return response;
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
