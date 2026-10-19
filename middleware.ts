import { NextResponse } from 'next/server';
// The farewell note is intentionally accessible without the previous OTP gate.
export function middleware() { return NextResponse.next(); }
export const config = { matcher: ['/((?!api|_next|favicon.ico|robots.txt).*)'] };
