(() => {
  const $ = (s, p=document) => p.querySelector(s);
  const $$ = (s, p=document) => [...p.querySelectorAll(s)];
  const progress = $('#progressBar');
  const scrollTo = id => document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
  $$('[data-scroll]').forEach(b=>b.addEventListener('click',()=>scrollTo(b.dataset.scroll)));

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${Math.min(100, scrollY / max * 100)}%`;
  }, {passive:true});

  const stars = $('.stars');
  window.addEventListener('pointermove', e => {
    const x = (e.clientX/innerWidth-.5)*14, y=(e.clientY/innerHeight-.5)*14;
    if(stars) stars.style.transform=`translate(${x}px,${y}px)`;
  });

  if(window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el,{opacity:0,y:38},{opacity:1,y:0,duration:1.05,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}});
    });
    gsap.from('.hero-photo',{opacity:0,y:70,rotate:8,duration:1.5,delay:.4,ease:'power3.out'});
    gsap.to('.hero-glow',{scale:1.15,opacity:.7,duration:6,yoyo:true,repeat:-1,ease:'sine.inOut'});
    gsap.to('.orbit span',{y:'random(-25,25)',x:'random(-20,20)',duration:'random(2,4)',repeat:-1,yoyo:true,stagger:.2,ease:'sine.inOut'});
    gsap.to('.world',{scale:1.03,duration:2,repeat:-1,yoyo:true,ease:'sine.inOut'});
  }

  const comfortBtn=$('#comfortBtn'), badDay=$('.bad-day');
  comfortBtn?.addEventListener('click',()=>{badDay.classList.toggle('open'); comfortBtn.textContent=badDay.classList.contains('open')?'stay here a little':'I’m having one of those days';});

  const envelope=$('#envelope'), finalLetter=$('#finalLetter');
  envelope?.addEventListener('click',()=>{
    envelope.classList.add('open');
    setTimeout(()=>{finalLetter.classList.add('show'); finalLetter.scrollIntoView({behavior:'smooth',block:'center'});},800);
  });

  // Optional soundtrack: drop a file named soundtrack.mp3 into assets/ to activate it.
  const audio=$('#audio'), audioControl=$('#audioControl');
  const source='assets/soundtrack.mp3';
  audio.src=source;
  audio.addEventListener('error',()=>audioControl?.remove(),{once:true});
  audioControl?.addEventListener('click', async()=>{
    if(audio.paused){try{await audio.play(); audioControl.classList.remove('paused'); $('#musicText').textContent='playing soundtrack'}catch(e){}} else {audio.pause();audioControl.classList.add('paused');$('#musicText').textContent='soundtrack paused'}
  });
})();
