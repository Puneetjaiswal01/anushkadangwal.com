import {NextRequest,NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {verifyChallenge,failedChallenge,session} from '../../../../lib/auth';
export const runtime='nodejs';
export async function POST(req:NextRequest){
 const jar=await cookies();
 const token=jar.get('otp_challenge')?.value||'';
 let entered='';
 try{entered=String((await req.json()).code||'')}catch{}
 if(!/^[0-9]{8}$/.test(entered)||!verifyChallenge(token,entered)){
  const next=failedChallenge(token);
  if(next)jar.set('otp_challenge',next,{httpOnly:true,secure:true,sameSite:'strict',path:'/',maxAge:300});
  return NextResponse.json({error:'Invalid or expired code.'},{status:401});
 }
 jar.delete('otp_challenge');
 jar.set('love_session',session(),{httpOnly:true,secure:true,sameSite:'strict',path:'/',maxAge:604800});
 return NextResponse.json({ok:true});
}