import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname;

  // Define which paths are protected (require authentication)
  const isProtectedRoute = path.startsWith('/cms') && !path.startsWith('/cms-login');

  // Get the CMS session cookie
  const cmsSession = request.cookies.get('cms_session')?.value;

  // If the route is protected and there's no session, redirect to login
  if (isProtectedRoute && !cmsSession) {
    const response = NextResponse.redirect(new URL('/cms-login', request.url));
    return response;
  }

  // If trying to access login page while already logged in, redirect to dashboard
  if (path === '/cms-login' && cmsSession) {
    const response = NextResponse.redirect(new URL('/cms/dashboard', request.url));
    return response;
  }

  return NextResponse.next();
}

// Configure which paths the middleware applies to
export const config = {
  matcher: ['/cms/:path*', '/cms-login'],
};
