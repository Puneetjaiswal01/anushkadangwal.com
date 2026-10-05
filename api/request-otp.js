const crypto = require('crypto');

const RECIPIENT = 'anushka1dangwal@gmail.com';
const MAX_AGE = 10 * 60;

function b64url(input){return Buffer.from(input).toString('base64url')}
function sign(payload, secret){return crypto.createHmac('sha256',secret).update(payload).digest('base64url')}

module.exports = async (req,res)=>{
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const secret=process.env.AUTH_SECRET, apiKey=process.env.RESEND_API_KEY;
 if(!secret||!apiKey) return res.status(500).json({error:'Email OTP is not configured yet.'});
 const code=String(crypto.randomInt(0,1000000)).padStart(6,'0');
 const now=Math.floor(Date.now()/1000);
 const payload=b64url(JSON.stringify({h:sign(code,secret),iat:now,exp:now+MAX_AGE,n:crypto.randomBytes(12).toString('hex')}));
 const challenge=payload+'.'+sign(payload,secret);
 const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+apiKey,'Content-Type':'application/json'},body:JSON.stringify({
   from:process.env.OTP_FROM_EMAIL||'Pahadan & Jaat <onboarding@resend.dev>',
   to:[RECIPIENT],
   subject:'Your constellation code ✦',
   html:'<div style="background:#0b0a13;color:#f8edf1;padding:36px;font-family:Arial,sans-serif;border-radius:18px"><div style="color:#d99cb0;font-size:12px;letter-spacing:2px">PAHADAN & JAAT · PRIVATE CONSTELLATION</div><h1 style="font-size:28px">Hi, Pahadan 🌙</h1><p>One tiny verification before you enter our universe.</p><div style="font-size:38px;letter-spacing:12px;font-weight:700;margin:30px 0;color:#efc7d3">'+code+'</div><p>This code expires in 10 minutes.</p><p style="opacity:.6">— Jaat ❤️</p></div>'
 })});
 if(!response.ok){const detail=await response.text();console.error('Resend error',response.status,detail);return res.status(502).json({error:'The email could not be sent yet.'})}
 return res.status(200).json({ok:true,challenge});
};