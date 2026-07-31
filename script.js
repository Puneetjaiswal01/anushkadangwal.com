window.addEventListener('load',()=>{const l=document.getElementById('loader');if(l){setTimeout(()=>{l.style.opacity='0';l.style.pointerEvents='none';},1200);}});
const canvas=document.getElementById('stars');
if(canvas){
const ctx=canvas.getContext('2d');let w,h,stars=[];
function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;stars=Array.from({length:180},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8+.2,s:Math.random()*.35+.05}));}
addEventListener('resize',resize);resize();
(function draw(){ctx.clearRect(0,0,w,h);ctx.fillStyle='#fff';stars.forEach(s=>{ctx.globalAlpha=.5+Math.sin(Date.now()*0.001+s.x)*.5;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();s.y+=s.s;if(s.y>h){s.y=0;s.x=Math.random()*w;}});requestAnimationFrame(draw);})();}

const musicBtn=document.getElementById('musicBtn');
if(musicBtn){musicBtn.onclick=()=>window.open('https://www.youtube.com/results?search_query=Gaadi+Piche+Naa+Khan+Bhaini','_blank');}
document.querySelectorAll('.answer').forEach(btn=>btn.onclick=()=>{const end=document.getElementById('finalMessage');if(end){end.hidden=false;end.scrollIntoView({behavior:'smooth'});}});