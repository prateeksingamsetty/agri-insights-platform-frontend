import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // List of protected routes
  const protectedRoutes = [
    '/prices/dairy',
    '/prices/mailbox_appalachian',
    '/weather',
    '/relativeHumidity',
    '/diseaseSeverity',
    '/prices/tomato'
  ];

  // Get the requested page path
  const { pathname } = req.nextUrl;

  // Check if the requested page is in the list of protected routes
  const isProtected = protectedRoutes.includes(pathname);

  // Get the authentication token from cookies
  const accessToken = req.cookies.get('accessToken');

  // If the user is NOT logged in and tries to access a protected page, redirect to /login
  if (isProtected && !accessToken) {
    console.log('Unauthorized access to:', pathname, 'Redirecting to /signin');
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

// Apply middleware to all requests
export const config = {
  matcher: ['/((?!_next|api|static|public|favicon.ico).*)'],
};