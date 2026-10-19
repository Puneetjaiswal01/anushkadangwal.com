import { NextResponse } from 'next/server';

// Temporarily allow website access without an OTP.
// Keep the OTP routes and login page intact for easy re-enablement.
export function middleware() {
  return NextResponse.next();
}

export const config = { matcher: ['/((?!api|_next|favicon.ico|robots.txt).*)'] };
