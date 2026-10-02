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
const memoryNotes=[
"Somewhere between meeting you and knowing you, you became someone I started looking for in every room.",
"This one stays because happiness looks better when it isn't trying too hard.",
"One photograph. A thousand tiny details I never want my brain to misplace.",
"Pahadan, I hope you know how beautiful you look in the moments when you are simply being you.",
"Proof that my favourite plans are usually the ones that somehow end with you beside me.",
"I don't need every memory to be dramatic. I just want more ordinary days that feel like ours.",
"One day we will look older at this photo. I hope we still recognise the two idiots in it.",
"Some pictures make me remember the place. This one makes me remember how I felt.",
"I probably annoyed you five minutes before or after this. Statistically, it is very likely.",
"Dear future us: please never become too grown-up for stupid photographs and unnecessary laughter.",
"05 July — your birthday. The day was supposed to be about you, and somehow you gave me a favourite memory too.",
"Flowers eventually fade. I wanted the feeling behind them to have somewhere permanent to live.",
"Not every favourite memory needs perfect lighting, perfect timing, or even perfect focus.",
"There are photographs you pose for, and photographs that accidentally tell the truth. I like the second kind.",
"If I could put a little star beside certain days in my life, this moment would get one.",
"My Pahadan. Somewhere between all your responsibilities, please remember there is a girl here who deserves softness too.",
"This is one of those tiny pieces of us I would save first if memories had a suitcase.",
"No caption clever enough. I just like us here. That is the whole sentence.",
"We never formally decided what we were, yet somehow we kept collecting evidence that we mattered.",
"And this one? I kept it for the end because after twenty memories, I still have the same problem: I want more."
];
const mg=document.getElementById("memoryGrid");
if(mg){memoryFiles.forEach((src,i)=>{const card=document.createElement("figure");card.className="memory-card m"+(i+1);card.innerHTML='<div class="photo-wrap"><img loading="lazy" src="'+encodeURI(src)+'" alt="A memory of Puneet and Anushka"></div><figcaption><small>MEMORY '+String(i+1).padStart(2,"0")+'</small><p>'+memoryNotes[i]+'</p><span>tap to hold this moment ✦</span></figcaption>';card.onclick=()=>card.classList.toggle("open");mg.appendChild(card)})}
