import {createHmac,randomInt,timingSafeEqual} from 'node:crypto';
export const allowed=()=>process.env.OTP_RECIPIENT_EMAIL||'';
const secret=()=>{if(!process.env.AUTH_SECRET)throw Error('Missing AUTH_SECRET');return process.env.AUTH_SECRET};
export function sign(data:string){return createHmac('sha256',secret()).update(data).digest('hex')}
export function check(data:string,sig:string){const a=Buffer.from(sign(data),'hex'),b=Buffer.from(sig||'','hex');return a.length===b.length&&timingSafeEqual(a,b)}
export function code(){return String(randomInt(0,100000000)).padStart(8,'0')}
export function challenge(otp:string){const expires=Date.now()+5*60*1000;const nonce=crypto.randomUUID();const data=[expires,nonce,sign(otp+':'+nonce),0].join('.');return data+'.'+sign(data)}
export function verifyChallenge(token:string,otp:string){const parts=token.split('.');if(parts.length!==5)return false;const [expires,nonce,hash,attempts,sig]=parts;const data=[expires,nonce,hash,attempts].join('.');return check(data,sig)&&Number(expires)>Date.now()&&Number(attempts)<5&&check(otp+':'+nonce,hash)}
export function failedChallenge(token:string){const p=token.split('.');if(p.length!==5)return '';const [expires,nonce,hash,attempts,sig]=p;const data=[expires,nonce,hash,attempts].join('.');if(!check(data,sig))return '';const next=[expires,nonce,hash,Number(attempts)+1].join('.');return next+'.'+sign(next)}
export function session(){const data=String(Date.now()+7*24*60*60*1000);return data+'.'+sign(data)}
export function validSession(token?:string){if(!token)return false;const [exp,sig,...rest]=token.split('.');return !rest.length&&Number(exp)>Date.now()&&check(exp,sig)}
