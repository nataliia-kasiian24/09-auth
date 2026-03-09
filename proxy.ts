import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { axiosInstance } from './lib/api/api'; 

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let isAuthenticated = !!accessToken;
  let newCookies: string[] = [];

  
  if (!accessToken && refreshToken) {
    try {
      
      const response = await axiosInstance.get('/auth/session', {
        headers: { 
          Cookie: `refreshToken=${refreshToken}` 
        },
      });

      if (response.status === 200) {
        isAuthenticated = true;
        
        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader) {
          newCookies = setCookieHeader;
        }
      }
    } catch {
      isAuthenticated = false;
    }
  }

  const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  let response: NextResponse;

  
  if (isPrivateRoute && !isAuthenticated) {
    response = NextResponse.redirect(new URL('/sign-in', request.url));
  } else if (isAuthRoute && isAuthenticated) {
    response = NextResponse.redirect(new URL('/', request.url));
  } else {
    response = NextResponse.next();
  }

  
  if (newCookies.length > 0) {
    newCookies.forEach(cookieString => {
      
     const [parts] = cookieString.split('; ');
      const [name, value] = parts.split('=');
      
      response.cookies.set(name, value, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    });
  }

  return response;
}

const PRIVATE_ROUTES = ['/profile', '/notes'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};