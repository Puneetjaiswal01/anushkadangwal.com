const crypto = require('crypto');

function safeEqual(a,b){
  const x=Buffer.from(String(a||'')), y=Buffer.from(String(b||''));
  return x.length===y.length && crypto.timingSafeEqual(x,y);
}
function token(secret){
  return crypto.createHmac('sha256', secret).update('pahadan-auth-v1').digest('hex');
}
module.exports=(req,res)=>{
  if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({ok:false});}
  const username=process.env.LOVE_USERNAME, password=process.env.LOVE_PASSWORD, secret=process.env.AUTH_SECRET;
  if(!username||!password||!secret)return res.status(503).json({ok:false,error:'auth_not_configured'});
  const body=typeof req.body==='string'?JSON.parse(req.body||'{}'):(req.body||{});
  if(!safeEqual(body.username,username)||!safeEqual(body.password,password))return res.status(401).json({ok:false});
  res.setHeader('Set-Cookie',`ap_session=${token(secret)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`);
  return res.status(200).json({ok:true});
};