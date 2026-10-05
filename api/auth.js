const crypto = require('crypto');
function token(secret){return crypto.createHmac('sha256', secret).update('pahadan-auth-v1').digest('hex');}
module.exports=(req,res)=>{
 const secret=process.env.AUTH_SECRET;if(!secret)return res.status(503).json({ok:false});
 const raw=req.headers.cookie||'';const m=raw.match(/(?:^|;\\s*)ap_session=([^;]+)/);
 if(!m)return res.status(401).json({ok:false});
 const a=Buffer.from(m[1]),b=Buffer.from(token(secret));
 if(a.length!==b.length||!crypto.timingSafeEqual(a,b))return res.status(401).json({ok:false});
 res.setHeader('Cache-Control','no-store');return res.status(200).json({ok:true});
};