import {NextRequest,NextResponse} from 'next/server';
export async function middleware(req:NextRequest){
 const value=req.cookies.get('love_session')?.value||'';
 const [expiry,signature,...extra]=value.split('.');
 if(!expiry||!signature||extra.length||Number(expiry)<=Date.now()||!process.env.AUTH_SECRET)return NextResponse.redirect(new URL('/login',req.url));
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(process.env.AUTH_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const bytes=new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(expiry)));
 const hex=Array.from(bytes).map(x=>x.toString(16).padStart(2,'0')).join('');
 if(hex!==signature)return NextResponse.redirect(new URL('/login',req.url));
 return NextResponse.next();
}
export const config={matcher:['/((?!login|api|_next|favicon.ico|robots.txt).*)']};