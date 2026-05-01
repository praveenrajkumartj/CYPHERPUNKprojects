import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  // Public paths
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/learn',
    '/blog',
    '/tutorials',
    '/sessions',
    '/guides',
  ];

  const isPublicPath = publicPaths.includes(path) || 
                       path.startsWith('/api/auth') || 
                       path.startsWith('/api/articles') || 
                       path.startsWith('/api/tutorials') || 
                       path.startsWith('/api/sessions') || 
                       path.startsWith('/api/guides');

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const payload = await verifyJWT(token);
  if (!payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role based checks
  if (path.startsWith('/admin') && payload.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (path.startsWith('/organizer') && !['ORGANIZER', 'ADMIN'].includes(payload.role as string)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
