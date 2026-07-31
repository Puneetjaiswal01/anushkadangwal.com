
/*
 story.js
 Dynamic story content and chapter navigation
*/

const chapters = [
{
title:"Chapter I • Hello Pahadan",
text:`Hello Anushka,

Happy Girlfriend Day.

I hope you're doing well.
This website isn't here to ask for anything.
It's simply a place where a few unsaid words can exist.`
},
{
title:"Chapter II • I'm Sorry",
text:`I'm sorry for the moments where I hurt you.
I'm sorry for the misunderstandings.
You deserved kindness, patience and peace.
If I failed to give that, I truly regret it.`
},
{
title:"Chapter III • You Were Never My Second Option",
text:`You were never a backup.
Never someone I settled for.
You were the person my heart chose.`
},
{
title:"Chapter IV • Thank You",
text:`Thank you for every conversation.
Thank you for every smile.
Thank you for every memory.
No matter where life takes us, those moments mattered to me.`
},
{
title:"Final Chapter",
text:`I don't know what tomorrow looks like.

I only wanted to wish you happiness.

Happy Girlfriend Day, Pahadan ❤️

— Your Jaat Boy Puneet`
}
];

function buildStory(){
  const host=document.getElementById("story");
  if(!host) return;

  const wrapper=document.createElement("div");
  wrapper.className="memory-grid";

  chapters.forEach((c,i)=>{
    const card=document.createElement("article");
    card.className="memory-card fade-in";
    card.style.animationDelay=(i*0.2)+"s";

    card.innerHTML=`
      <h3 class="glow-text">${c.title}</h3>
      <p style="margin-top:16px;white-space:pre-line;">${c.text}</p>
    `;

    wrapper.appendChild(card);
  });

  host.appendChild(document.createElement("hr")).style.margin="30px 0";
  host.appendChild(wrapper);
}

document.addEventListener("DOMContentLoaded",buildStory);
