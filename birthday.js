/* A one-day celebration, using Ojasvi's local birthday in India. */
(()=>{
 const birthday='2026-10-28';
 const isBirthday=()=>ACTIVE_PROFILE.id==='ojasvi'&&new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())===birthday;
 const dialog=document.createElement('dialog');dialog.className='birthday-dialog';dialog.setAttribute('aria-labelledby','birthday-title');
 dialog.innerHTML='<form method="dialog"><button class="close" aria-label="Close birthday wish">×</button><div class="birthday-stars" aria-hidden="true">✦ · ✧ · ✦</div><span class="eyebrow">TODAY IS ALL ABOUT YOU</span><div class="birthday-cake" aria-hidden="true">🎂</div><h2 id="birthday-title">Happy Birthday, Ojasvi!</h2><p>Here’s to a year of big dreams, little victories, and people who make every step brighter.</p><p class="birthday-signoff">Your study circle is cheering for you.<br>Have the happiest day! 💚</p><button class="primary">Thank you! Let’s make it a good day ✨</button></form>';
 document.body.append(dialog);
 function celebrate(){if(isBirthday()&&!dialog.open)dialog.showModal()}
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 function decorate(){
  document.querySelector('.birthday-banner')?.remove();
  if(!isBirthday())return;
  const hero=document.querySelector('.hero');if(!hero)return;
  hero.insertAdjacentHTML('beforebegin','<section class="birthday-banner"><span aria-hidden="true">🎉</span><div><b>Happy Birthday, Ojasvi!</b><p>A little studying, a lot of celebrating. Today is yours.</p></div><button class="secondary" id="birthday-again">Your birthday wish ✨</button></section>');
  document.querySelector('#birthday-again').onclick=celebrate;
 }
 const previous=renderDashboard;
 renderDashboard=function(){previous();decorate();celebrate()};
 decorate();celebrate();
 window.addEventListener('pageshow',e=>{if(e.persisted){decorate();celebrate()}});
 // Expire an already-open greeting when the birthday ends in India.
 setInterval(()=>{if(!isBirthday()){dialog.close();document.querySelector('.birthday-banner')?.remove()}},60000);
})();
