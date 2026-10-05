const crypto = require('crypto');

function sign(payload,secret){return crypto.createHmac('sha256',secret).update(payload).digest('base64url')}
function safe(a,b){try{const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&crypto.timingSafeEqual(x,y)}catch{return false}}

module.exports=(req,res)=>{
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
 const secret=process.env.AUTH_SECRET;if(!secret)return res.status(500).json({error:'OTP verification is not configured yet.'});
 let body=req.body||{};if(typeof body==='string'){try{body=JSON.parse(body)}catch{return res.status(400).json({error:'Invalid request'})}}
 const code=String(body.code||''),challenge=String(body.challenge||'');
 if(!/^\d{6}$/.test(code)||!challenge.includes('.'))return res.status(400).json({error:'Enter a valid six-digit code.'});
 const dot=challenge.lastIndexOf('.'),payload=challenge.slice(0,dot),sig=challenge.slice(dot+1);
 if(!safe(sig,sign(payload,secret)))return res.status(401).json({error:'That code request is no longer valid.'});
 let data;try{data=JSON.parse(Buffer.from(payload,'base64url').toString('utf8'))}catch{return res.status(401).json({error:'That code request is no longer valid.'})}
 const now=Math.floor(Date.now()/1000);if(!data.exp||now>data.exp)return res.status(401).json({error:'That code expired. Send a new one.'});
 if(!safe(data.h,sign(code,secret)))return res.status(401).json({error:'That constellation code does not match. Try again. 🌙'});
 const token=sign('pahadan-auth-v1',secret);
 res.setHeader('Set-Cookie','ap_session='+token+'; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800');
 return res.status(200).json({ok:true});
};