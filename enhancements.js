const progress=document.createElement('div');
progress.className='story-progress';
document.body.appendChild(progress);
addEventListener('scroll',()=>{const h=document.documentElement;progress.style.width=((h.scrollTop/(h.scrollHeight-h.clientHeight))*100)+'%';});
setInterval(()=>{const s=document.createElement('div');s.className='shooting-star';s.style.top=(Math.random()*40)+'vh';s.style.right='-100px';document.body.appendChild(s);setTimeout(()=>s.remove(),1500);},7000);
console.log('Enhancements loaded');