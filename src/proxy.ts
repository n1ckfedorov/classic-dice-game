import { NextResponse } from 'next/server';

export default function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/((?!_next|_vercel|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
