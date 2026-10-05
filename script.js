const intro=document.getElementById('intro');document.getElementById('enter').onclick=()=>intro.classList.add('hide');
const c=document.getElementById('stars'),x=c.getContext('2d');let stars=[];function resize(){c.width=innerWidth;c.height=innerHeight;stars=Array.from({length:Math.min(220,innerWidth/5)},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.4+.2,a:Math.random(),s:Math.random()*.004+.001}))}function draw(){x.clearRect(0,0,c.width,c.height);stars.forEach(s=>{s.a+=s.s;if(s.a>1||s.a<.1)s.s*=-1;x.globalAlpha=s.a;x.fillStyle='#fff';x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()});requestAnimationFrame(draw)}addEventListener('resize',resize);resize();draw();
const data=[['Open when you are stressed','Pahadan, breathe. You do not have to solve your entire life tonight. Eat something, drink water, sleep. Tomorrow can wait until tomorrow.'],['Open when CAT feels impossible','I will always want to see you achieve what you are working for. But a score cannot make you more Anushka, and it cannot make you less Anushka. I believe in the person doing the work, not only the result.'],['Open when you are angry with me','You are allowed to be angry. Love is not an excuse for my mistakes. I want to listen without defending myself, own what I did, and let better actions speak afterward.'],['Open when you miss me','Imagine me showing up just to annoy you, calling you Pahadan until you say “bhaago yha se.” I probably miss you at exactly the same time.'],['Open when you do not feel good enough','You are not a result, a deadline, or everybody else’s expectations. To me you are the laugh, the stubbornness, the softness, the chaos, the strength — the whole person.'],['Open when you need to remember how I see you','Kind. Responsible. Ridiculously pretty. Funny without trying. Strong even when tired. And somehow still the Pahadan who made this Jaat care far more than he planned to.']];
const box=document.getElementById('letters'),modal=document.getElementById('modal');data.forEach((d,i)=>{let b=document.createElement('button');b.innerHTML=d[0]+'<small style="display:block;margin-top:12px;opacity:.45">FROM JAAT → PAHADAN</small>';b.onclick=()=>{document.getElementById('letterTitle').textContent=d[0];document.getElementById('letterBody').textContent=d[1];modal.classList.add('show')};box.appendChild(b)});document.getElementById('close').onclick=()=>modal.classList.remove('show');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};document.getElementById('yes').onclick=()=>document.getElementById('yesScreen').classList.add('show');document.getElementById('second').onclick=()=>alert('Take all the time you need, Pahadan. ❤️');
document.getElementById('sound').onclick=()=>alert('Our soundtrack is waiting below — Hindi + English, chosen for you. ♫');
const memoryFiles=[
"WhatsApp Image 2026-10-02 at 10.26.57 PM.jpeg",
"WhatsApp Image 2026-10-02 at 10.26.57 PM (1).jpeg",
"WhatsApp Image 2026-10-02 at 10.26.58 PM.jpeg",
"WhatsApp Image 2026-10-02 at 10.26.58 PM (1).jpeg",
"WhatsApp Image 2026-10-02 at 10.26.58 PM (2).jpeg",
"WhatsApp Image 2026-10-02 at 10.26.58 PM (3).jpeg",
"WhatsApp Image 2026-10-02 at 10.27.00 PM.jpeg",
"WhatsApp Image 2026-10-02 at 10.27.00 PM (1).jpeg",
"WhatsApp Image 2026-10-02 at 10.27.00 PM (2).jpeg",
"WhatsApp Image 2026-10-02 at 10.27.01 PM.jpeg",
"WhatsApp Image 2026-10-02 at 10.28.23 PM.jpeg",
"WhatsApp Image 2026-10-02 at 10.28.23 PM (1).jpeg",
"WhatsApp Image 2026-10-02 at 10.28.24 PM.jpeg",
"WhatsApp Image 2026-10-02 at 10.28.24 PM (1).jpeg",
"WhatsApp Image 2026-10-02 at 10.28.24 PM (2).jpeg",
"WhatsApp Image 2026-10-02 at 10.28.25 PM.jpeg",
"WhatsApp Image 2026-10-02 at 10.28.25 PM (1).jpeg",
"WhatsApp Image 2026-10-02 at 10.28.25 PM (2).jpeg",
"WhatsApp Image 2026-10-02 at 10.28.25 PM (3).jpeg",
"WhatsApp Image 2026-10-02 at 10.28.26 PM.jpeg"];
const memoryNotes=["That smile in the car. ❤️ I remember looking at this picture later and thinking: yes, this is exactly the face I keep wanting to see again.","Your hand on my head, both of us smiling. Pahadan clearly in charge; Jaat clearly not complaining. 😂","Birthday flowers for my Pahadan. 🌸 The flowers were the gift. That smile was my favourite part.","You in the car, seatbelt on, smiling at the camera. Nothing dramatic — just you looking like you, which is reason enough for this picture to be here.","05 July. You making that face in the mirror while I sneak a kiss. This is so much more us than a perfectly posed photograph.","Tamtara · last week. ❤️ One of our newest memories — just us standing together after another evening I was very glad I got to spend with you.","11 September · 12:59 AM. “Pahadi girl sounds way better than padhai girl.” Movie night locked. And somehow one typo gave me my favourite name for you.","“Even on the tired or busy days, I still choose this, and I still choose you.” You wrote that to your Jaat boy. I kept it because some sentences deserve to be kept.","10 September · 11:02 PM. Me trying to steal my always-busy Pahadi girl for an online movie date: virtual popcorn, books nearby, and one requested smile. 😂","“Hey Cutie.” / “Bhaago yha se.” 😭 This email needs no romantic rewrite. It is already painfully, perfectly us.","Pahadan ka gulaaaam. Pahadan ko salaaaaam. 😂 Important historical documentation. No further context required.","05 July. You smiling at me while I look at you. I like this one because for once neither of us seems particularly interested in the camera.","Your hand, the ring, and my hand underneath. Just one small detail from the night — kept here exactly as it happened, without giving it a meaning it didn't have.","Last week, after Tamtara, by the white car. Slightly blurry, very happy, and exactly the kind of imperfect photograph I end up liking most.","05 July. You're smiling at the camera; I'm looking at you. Apparently I misunderstood where the photographer was. I don't regret it.","Another one from Tamtara last week — and absolutely no ability to pose normally. You reaching for me makes this one better than the serious version anyway.","Tamtara, last week. Same corner, one little look between us. You pointing at me while I stare back — a whole conversation without either of us saying anything.","Someone tried to take a picture. We decided to dance instead. The blur can stay — it remembers the movement better than a posed photo would.","This one is almost completely blurred, and I still wouldn't delete it. Your hand on my face, both of us close, the camera losing the battle. ❤️","Head on my shoulder. Your hand on my face. No performance, no big occasion — just the kind of closeness I hope never becomes too ordinary to notice."];
const mg=document.getElementById("memoryGrid");
if(mg){memoryFiles.forEach((src,i)=>{const card=document.createElement("figure");card.className="memory-card m"+(i+1);card.innerHTML='<div class="photo-wrap"><img loading="lazy" src="'+encodeURI(src)+'" alt="A memory from our story"></div><figcaption><small>MEMORY '+String(i+1).padStart(2,"0")+'</small><p>'+memoryNotes[i]+'</p><span>tap to hold this moment ✦</span></figcaption>';card.onclick=()=>card.classList.toggle("open");mg.appendChild(card)})}



// Secure email OTP gate — OTP delivery and verification happen server-side on Vercel.
(()=>{
 const gate=document.getElementById('loveLock'),form=document.getElementById('loveLogin');
 if(!gate||!form)return;
 const err=document.getElementById('lockError'),send=document.getElementById('sendOtp'),stage=document.getElementById('otpStage'),otp=document.getElementById('lockOtp'),resend=document.getElementById('resendOtp'),verify=document.getElementById('verifyOtp');
 let challenge='';
 const unlock=()=>{gate.classList.add('unlocking');document.body.classList.remove('locked');setTimeout(()=>gate.remove(),1050)};
 const check=async()=>{try{const r=await fetch('/api/auth',{credentials:'same-origin'});if(r.ok){unlock();return true}}catch{}return false};check();
 const requestOtp=async()=>{
   send.disabled=true; resend.disabled=true; err.textContent='sending a little piece of the sky… ✦';
   try{const r=await fetch('/api/request-otp',{method:'POST',headers:{'content-type':'application/json'},credentials:'same-origin',body:'{}'});const d=await r.json().catch(()=>({}));
     if(!r.ok)throw new Error(d.error||'Could not send the code.');
     challenge=d.challenge; stage.hidden=false; send.hidden=true; err.textContent='Code sent to your email. It expires in 10 minutes. 🌙';otp.focus();
   }catch(e){err.textContent=e.message||'The stars lost signal. Try again. 🌙';}
   finally{send.disabled=false;resend.disabled=false;}
 };
 send.addEventListener('click',requestOtp);resend.addEventListener('click',requestOtp);
 form.addEventListener('submit',async e=>{
   e.preventDefault(); const code=otp.value.replace(/\D/g,''); if(code.length!==6){err.textContent='Enter the six-digit code, Pahadan. 🌙';return}
   verify.disabled=true;verify.textContent='checking the stars… ✦';err.textContent='';
   try{const r=await fetch('/api/verify-otp',{method:'POST',headers:{'content-type':'application/json'},credentials:'same-origin',body:JSON.stringify({code,challenge})});const d=await r.json().catch(()=>({}));
     if(r.ok){err.textContent='Welcome home, Pahadan. ❤️';setTimeout(unlock,420)}
     else{err.textContent=d.error||'That constellation code does not match. Try again. 🌙';otp.value='';otp.focus()}
   }catch{err.textContent='The stars lost signal for a second. Try again. 🌙'}
   finally{verify.disabled=false;verify.textContent='verify & enter our universe ✦'}
 });
 const c=document.getElementById('lockStars'),x=c?.getContext('2d');if(!c||!x)return;let stars=[];
 const resize=()=>{c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);stars=Array.from({length:Math.min(150,Math.floor(innerWidth/7))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight*.82,r:Math.random()*1.2+.2,a:Math.random()*.65+.2,p:Math.random()*6.28}))};resize();addEventListener('resize',resize);
 const draw=t=>{if(!document.body.contains(c))return;x.clearRect(0,0,innerWidth,innerHeight);stars.forEach(s=>{x.globalAlpha=s.a*(.65+.35*Math.sin(t/1100+s.p));x.fillStyle='#fff4f5';x.beginPath();x.arc(s.x,s.y,s.r,0,Math.PI*2);x.fill()});x.globalAlpha=1;requestAnimationFrame(draw)};requestAnimationFrame(draw);
})();
