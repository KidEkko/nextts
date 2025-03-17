import { NextResponse } from 'next/server';
import { IncomingMessage } from 'http';
export default async function middleware(req: IncomingMessage & { nextUrl: URL }) {
  return NextResponse.next();
}
// Matcher configuration allows control over what paths the middleware executes on.
//  This ensures it does not run on static assets, internal Next.js files etc.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
