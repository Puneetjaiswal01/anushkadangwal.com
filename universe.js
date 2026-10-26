/* Earlier-site questions are preserved from Anushka’s own live site; corrected and integrated below. */
const earlierQuestions = [
  {
    "s": "QA",
    "topic": "Percentages",
    "q": "A price increases by 25% and then decreases by 20%. What is the net change?",
    "o": [
      "5% increase",
      "5% decrease",
      "No change",
      "10% increase"
    ],
    "a": 2,
    "e": "1.25 × 0.80 = 1, so the net change is zero."
  },
  {
    "s": "QA",
    "topic": "Averages",
    "q": "The average of 8 numbers is 15. One number 19 is replaced by 35. Find the new average.",
    "o": [
      "16",
      "17",
      "18",
      "19"
    ],
    "a": 1,
    "e": "Total increases by 16, average increases by 16/8=2 to 17."
  },
  {
    "s": "QA",
    "topic": "Algebra",
    "q": "If x² − 9x + 20 = 0, what is the larger root?",
    "o": [
      "4",
      "5",
      "9",
      "20"
    ],
    "a": 1,
    "e": "(x−4)(x−5)=0, so the larger root is 5."
  },
  {
    "s": "QA",
    "topic": "Time and Work",
    "q": "A finishes a job in 12 days, B in 6 days. Working together, how many days?",
    "o": [
      "3",
      "4",
      "6",
      "9"
    ],
    "a": 1,
    "e": "1/12 + 1/6 = 1/4 job per day, so 4 days."
  },
  {
    "s": "QA",
    "topic": "Ratio",
    "q": "Divide ₹720 in the ratio 2:3:4. What is the largest share?",
    "o": [
      "₹160",
      "₹240",
      "₹320",
      "₹360"
    ],
    "a": 2,
    "e": "Total parts=9. Largest=720×4/9=320."
  },
  {
    "s": "QA",
    "topic": "Probability",
    "q": "Two fair dice are rolled. What is the probability of sum 7?",
    "o": [
      "1/12",
      "1/6",
      "1/9",
      "1/3"
    ],
    "a": 1,
    "e": "There are 6 favorable pairs out of 36 equally likely outcomes."
  },
  {
    "s": "QA",
    "topic": "Number Systems",
    "q": "What is the remainder when 7³ is divided by 5?",
    "o": [
      "1",
      "2",
      "3",
      "4"
    ],
    "a": 2,
    "e": "343 = 5×68 + 3."
  },
  {
    "s": "QA",
    "topic": "Geometry",
    "q": "The area of a right triangle with perpendicular sides 9 and 12 is:",
    "o": [
      "21",
      "54",
      "108",
      "36"
    ],
    "a": 1,
    "e": "Area = 1/2 × 9 × 12 = 54."
  },
  {
    "s": "QA",
    "topic": "Speed",
    "q": "A car travels 180 km in 3 hours. At the same speed, how far in 5 hours?",
    "o": [
      "240 km",
      "270 km",
      "300 km",
      "360 km"
    ],
    "a": 2,
    "e": "Speed=60 km/h, distance in 5 hours=300 km."
  },
  {
    "s": "QA",
    "topic": "Interest",
    "q": "Simple interest on ₹4,000 at 5% annually for 3 years is:",
    "o": [
      "₹400",
      "₹500",
      "₹600",
      "₹650"
    ],
    "a": 2,
    "e": "SI = 4000×5×3/100 = 600."
  },
  {
    "s": "VARC",
    "topic": "Reading Comprehension",
    "q": "Passage: 'Technology can widen access to education, but access alone does not guarantee learning. Guidance and practice remain essential.' Which is the best main idea?",
    "o": [
      "Technology is harmful",
      "Access helps, but learning needs guidance and practice",
      "Practice is unnecessary",
      "Digital education always fails"
    ],
    "a": 1,
    "e": "The passage recognizes access as useful while stressing guidance and practice."
  },
  {
    "s": "VARC",
    "topic": "Inference",
    "q": "All researchers in the group read journals. Some journal readers write articles. Which must be true?",
    "o": [
      "All researchers write articles",
      "Some researchers write articles",
      "Every researcher reads journals",
      "No researchers write articles"
    ],
    "a": 2,
    "e": "Only the universal statement about researchers is guaranteed."
  },
  {
    "s": "VARC",
    "topic": "Para Summary",
    "q": "'Cities are planting trees to reduce heat, but success depends on species selection and maintenance.' Choose the best summary.",
    "o": [
      "Trees always cool cities",
      "Urban tree planting requires thoughtful selection and care to work well",
      "Maintenance is irrelevant",
      "Cities should avoid planting trees"
    ],
    "a": 1,
    "e": "The central idea is conditional success, not a blanket claim."
  },
  {
    "s": "VARC",
    "topic": "Critical Reasoning",
    "q": "A store increased advertising and sales rose. It concludes advertising caused the rise. What weakens this most?",
    "o": [
      "Advertising costs money",
      "A major competitor closed during the same period",
      "Sales can be measured",
      "The store sells several products"
    ],
    "a": 1,
    "e": "Competitor closure is an alternative explanation for increased sales."
  },
  {
    "s": "VARC",
    "topic": "Para Jumbles",
    "q": "Which sentence is the most natural opener?",
    "o": [
      "However, this was not always true.",
      "These changes also mattered.",
      "Urban transport has changed substantially in the last decade.",
      "Therefore, the answer was obvious."
    ],
    "a": 2,
    "e": "It introduces the subject without relying on an earlier referent."
  },
  {
    "s": "VARC",
    "topic": "Tone",
    "q": "'The policy has promise, although its implementation remains uneven.' The tone is best described as:",
    "o": [
      "Unconditionally enthusiastic",
      "Cautiously optimistic",
      "Angry",
      "Dismissive"
    ],
    "a": 1,
    "e": "The author acknowledges promise while noting limitations."
  },
  {
    "s": "DILR",
    "topic": "Arrangements",
    "q": "P sits left of Q. R sits right of Q. Who must be in the middle among P, Q, R?",
    "o": [
      "P",
      "Q",
      "R",
      "Cannot tell"
    ],
    "a": 1,
    "e": "Their relative order is P, Q, R."
  },
  {
    "s": "DILR",
    "topic": "Data Interpretation",
    "q": "Quarterly sales are 20, 30, 40 and 50 units. What percentage of annual sales came in Q4?",
    "o": [
      "25%",
      "30%",
      "35.71%",
      "40%"
    ],
    "a": 2,
    "e": "Total=140. Q4=50/140≈35.71%."
  },
  {
    "s": "DILR",
    "topic": "Sets",
    "q": "In a group of 60, 35 like tea, 30 like coffee and 10 like neither. How many like both?",
    "o": [
      "5",
      "10",
      "15",
      "20"
    ],
    "a": 2,
    "e": "Union=50. Intersection=35+30−50=15."
  },
  {
    "s": "DILR",
    "topic": "Tournament",
    "q": "Five teams play each other once. How many matches are played?",
    "o": [
      "5",
      "10",
      "15",
      "20"
    ],
    "a": 1,
    "e": "Number of matches=5×4/2=10."
  },
  {
    "s": "DILR",
    "topic": "Logic",
    "q": "A > B, C > A, and D < B. Who is greatest?",
    "o": [
      "A",
      "B",
      "C",
      "D"
    ],
    "a": 2,
    "e": "C > A > B > D."
  },
  {
    "s": "DILR",
    "topic": "Tables",
    "q": "A class has 24 girls and 16 boys. What percentage are girls?",
    "o": [
      "40%",
      "50%",
      "60%",
      "65%"
    ],
    "a": 2,
    "e": "24/40 ×100 = 60%."
  },
  {
    "s": "DILR",
    "topic": "Selections",
    "q": "Exactly two of A, B and C must be selected. How many possible groups?",
    "o": [
      "2",
      "3",
      "4",
      "6"
    ],
    "a": 1,
    "e": "AB, AC, BC: three choices."
  },
  {
    "s": "DILR",
    "topic": "Sequences",
    "q": "Find the next number: 3, 6, 12, 24, ?",
    "o": [
      "30",
      "36",
      "42",
      "48"
    ],
    "a": 3,
    "e": "Each number doubles."
  }
];
const earlierTopicMap={'Percentages':'percentages','Averages':'averages','Algebra':'algebra','Time and Work':'work','Ratio':'ratio','Probability':'probability','Number Systems':'remainders','Geometry':'geometry','Speed':'speed','Interest':'profit','Reading Comprehension':'rc','Inference':'inference','Para Summary':'summary','Critical Reasoning':'strengthen','Para Jumbles':'parajumbles','Tone':'tone','Arrangements':'arrangements','Data Interpretation':'tables','Sets':'sets','Tournament':'games','Logic':'ranking','Tables':'tables','Selections':'distribution','Sequences':'selection'};
earlierQuestions.forEach((old,index)=>{
 // The earlier probability option was a rounded decimal, not an exact probability. Use the exact fraction.
 if(old.topic==='Data Interpretation'){old.o=['1/4','3/10','5/14','2/5'];old.e='Annual total=20+30+40+50=140. Q4 share=50/140=5/14, approximately 35.71%.';old.q='Quarterly sales are 20, 30, 40 and 50 units. What fraction of annual sales came in Q4?'}
 // State the ordering assumptions explicitly.
 if(old.topic==='Arrangements')old.q='P, Q and R sit in a row facing north. P is to the left of Q, and R is to the right of Q. Who occupies the middle position?';
 addMC(old.s.toLowerCase(),earlierTopicMap[old.topic],old.q,old.o,old.a,old.e,{difficulty:'Foundation',origin:'Earlier site',earlierIndex:index});
});
const syllabusSections=[
 {id:'qa',name:'Quantitative Aptitude',topics:[['Arithmetic: percentages',['percentages']],['Profit, loss and discount',['profit']],['Ratio and proportion',['ratio']],['Averages and mixtures',['averages','ratio']],['Time and work',['work']],['Time, speed and distance',['speed']],['Simple and compound interest',['profit']],['Number systems',['numbers','remainders']],['Algebra and equations',['algebra','equations','logs','sequences']],['Functions and inequalities',['functions','inequalities']],['Geometry and mensuration',['geometry','triangles','circles','coordinate','mensuration']],['Modern maths and probability',['modern','probability']]]},
 {id:'varc',name:'Verbal Ability & Reading',topics:[['Reading comprehension',['rc']],['Main idea and inference',['inference']],['Author tone and purpose',['tone']],['Para summary',['summary']],['Para jumbles',['parajumbles']],['Odd sentence out',['parajumbles']],['Critical reasoning',['strengthen']],['Reading speed and accuracy',['reading','completion']]]},
 {id:'dilr',name:'Data Interpretation & Logic',topics:[['Arrangements',['arrangements']],['Selections and distributions',['distribution']],['Games and tournaments',['games']],['Tables and charts',['tables','charts']],['Bar and line graphs',['charts']],['Venn diagrams',['sets']],['Routes and networks',['routes']],['Caselets and logic puzzles',['binary','ranking','optimization','selection']]]}
];
const olderReferenceAdditions=[
 {name:'Unacademy',url:'https://unacademy.com/',focus:'Explore structured exam learning and compare current course details directly.',kind:'Earlier-site reference'},
 {name:'Handa Ka Funda',url:'https://www.handakafunda.com/',focus:'Explore MBA entrance concept learning and problem-solving resources.',kind:'Earlier-site reference'},
 {name:'Hitbullseye',url:'https://www.hitbullseye.com/',focus:'Explore MBA entrance preparation and additional practice options.',kind:'Earlier-site reference'}
];referenceSites.push(...olderReferenceAdditions);
function seededRandom(seed){let value=seed>>>0;return ()=>{value=(Math.imul(1664525,value)+1013904223)>>>0;return value/4294967296}}
function seededShuffle(values,rng){const result=[...values];for(let i=result.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result}
function selectPaperQuestions(subject,count,seed){const rng=seededRandom(seed),all=Q.filter(q=>q.subject===subject);if(subject==='qa')return seededShuffle(all,rng).slice(0,count);const selected=[];let slots=count;if(subject==='varc'){
 // Keep two or four complete RC passages, with the remaining slots reserved for verbal questions.
 const passageCount=count>=24?4:count>=8?1:1;
 for(const group of seededShuffle([...new Set(all.filter(q=>q.group).map(q=>q.group))],rng).slice(0,passageCount)){const list=all.filter(q=>q.group===group);if(slots<list.length)break;selected.push(...list);slots-=list.length}
 }else{for(const group of seededShuffle([...new Set(all.filter(q=>q.group).map(q=>q.group))],rng)){if(slots<=0)break;const list=all.filter(q=>q.group===group);selected.push(...list.slice(0,slots));slots-=Math.min(slots,list.length)}}
 if(slots)selected.push(...seededShuffle(all.filter(q=>!q.group),rng).slice(0,slots));if(selected.length!==count)throw Error('Insufficient unique questions for this paper.');return selected}
function paperDefinition(kind,number=1,subject=null){
 if(kind==='full')return {id:'full-'+number,title:`Full Mock ${number}`,kind,number,minutes:120,counts:{varc:24,dilr:22,qa:22},locked:true};
 if(kind==='sample')return {id:'sample-'+number,title:`Sample Paper ${number}`,kind,number,minutes:45,counts:{varc:8,dilr:8,qa:8},locked:false};
 if(kind==='sectional')return {id:subject+'-'+number,title:`${subject.toUpperCase()} Sectional ${number}`,kind,number,minutes:40,counts:{[subject]:subject==='varc'?24:22},locked:false};
 return {id:'diagnostic',title:'Find your starting point',kind:'diagnostic',number:1,minutes:24,counts:{varc:4,dilr:4,qa:4},locked:false};
}
function buildPaper(def){const questions=[],sections=[];const base={full:1109,sample:7919,sectional:104729,diagnostic:499}[def.kind]+def.number*389;for(const [subject,count] of Object.entries(def.counts)){const start=questions.length;questions.push(...selectPaperQuestions(subject,count,base+({varc:17,dilr:131,qa:941}[subject])));sections.push({name:subject.toUpperCase(),start,end:questions.length})}if(new Set(questions.map(q=>q.id)).size!==questions.length)throw Error('A question was repeated within a paper.');return {questions,sections:def.locked?sections:null}}
function beginPaper(def){if(quiz?.mode==='test'){toast('Finish your current test first.');return}const {questions,sections}=buildPaper(def);quiz={mode:'test',kind:def.kind,paperId:def.id,title:def.title,questions,sections,section:0,index:0,answers:{},checked:{},flagged:[],started:Date.now(),ends:Date.now()+(sections?40:def.minutes)*60000};history.replaceState(null,'','#tests');persistTest();clearInterval(quizTimer);quizTimer=setInterval(updateTestTimer,1000);renderQuiz();window.scrollTo(0,0)}
function paperHistory(def){const runs=state.results.filter(r=>r.paperId===def.id);return runs.length?`${runs.length} attempt${runs.length===1?'':'s'} · latest ${runs.at(-1).score}/${Object.values(def.counts).reduce((a,b)=>a+b,0)*3}`:'Ready for your first attempt'}
function catalogCard(def){return `<article class="test-card"><span class="pill">${def.kind==='full'?'FULL-LENGTH':def.kind==='sample'?'MIXED PAPER':'SECTIONAL'} · ${String(def.number).padStart(2,'0')}</span><h3>${def.title}</h3><p>${Object.values(def.counts).reduce((a,b)=>a+b,0)} unique questions · ${def.minutes} minutes<br>${def.locked?'VARC → DILR → QA · 40 minutes each':'Clear answers & complete review'}<br><span class="catalog-history">${paperHistory(def)}</span></p><button class="primary" data-paper="${def.id}">${def.kind==='sample'?'Attempt paper':'Start practice'} →</button></article>`}
function wirePapers(definitions){document.querySelectorAll('[data-paper]').forEach(button=>button.onclick=()=>beginPaper(definitions.find(def=>def.id===button.dataset.paper)))}
function renderSamplePapers(){const defs=Array.from({length:8},(_,i)=>paperDefinition('sample',i+1));app.innerHTML=heading('ANUSHKA’S SAMPLE PAPER SHELF','A smaller sitting. A meaningful step.','Eight repeatable mixed papers, with room to learn from every answer.')+`<div class="test-grid">${defs.map(catalogCard).join('')}</div><div class="notice">Each paper contains 24 distinct questions: 8 VARC, 8 DILR and 8 QA. Paper selections are fixed so you can revisit the same paper. Papers share questions across the library; they are original practice, not official CAT papers or independently calibrated mocks.</div>`;wirePapers(defs)}
function renderSectionalCatalog(){const defs=subjects.flatMap(s=>Array.from({length:4},(_,i)=>paperDefinition('sectional',i+1,s.id)));app.innerHTML=heading('ANUSHKA’S SECTIONAL TESTS','One section. Your full attention.','Four fixed papers per section. Forty minutes to practice selection and pacing.')+`<div class="filters">${[['all','All sections'],...subjects.map(s=>[s.id,s.short])].map(([id,label])=>`<button class="filter ${id==='all'?'active':''}" data-section-filter="${id}">${label}</button>`).join('')}</div><div class="test-grid" id="sectionalGrid"></div><div class="notice">VARC contains 24 questions; DILR and QA contain 22 each. Every paper uses distinct questions within the paper; questions may appear in other papers. These are practice templates, not a verified current-year exam specification.</div>`;function draw(subject){$('#sectionalGrid').innerHTML=defs.filter(d=>subject==='all'||d.counts[subject]).map(catalogCard).join('');wirePapers(defs);document.querySelectorAll('[data-section-filter]').forEach(b=>b.classList.toggle('active',b.dataset.sectionFilter===subject))}document.querySelectorAll('[data-section-filter]').forEach(b=>b.onclick=()=>draw(b.dataset.sectionFilter));draw('all')}
function renderSyllabus(){const done=state.syllabus||[];app.innerHTML=heading('ANUSHKA’S COMPLETE SYLLABUS MAP','The big picture, in little pieces.',`Track ${syllabusSections.reduce((a,s)=>a+s.topics.length,0)} areas and open the guides behind each one.`)+`<div class="syllabus-grid">${syllabusSections.map(s=>`<section class="panel"><div class="section-title"><h2>${s.name}</h2><span class="pill">${s.topics.filter(([name])=>done.includes(name)).length}/${s.topics.length} reviewed</span></div>${s.topics.map(([name,ids])=>`<div class="syllabus-item"><label><input type="checkbox" data-syllabus="${escapeHTML(name)}" ${done.includes(name)?'checked':''}><span>${name}</span></label><div>${ids.map(id=>{const l=lessons.find(l=>l.id===id);return `<button data-topic-guide="${id}" class="text-button">${l.title} →</button>`}).join('')}</div></div>`).join('')}</section>`).join('')}</div><div class="notice">These are broad preparation areas, not an official exhaustive syllabus declaration. The checkboxes are your own review checklist; lesson completion is tracked separately. Read the current official notification for exam rules and structure.</div>`;document.querySelectorAll('[data-syllabus]').forEach(e=>e.onchange=()=>{state.syllabus=e.checked?[...new Set([...state.syllabus,e.dataset.syllabus])]:state.syllabus.filter(x=>x!==e.dataset.syllabus);save();renderSyllabus()});document.querySelectorAll('[data-topic-guide]').forEach(b=>b.onclick=()=>openLesson(b.dataset.topicGuide))}
function migrateEarlierProgress(){state.syllabus??=[];if(ACTIVE_PROFILE.id!=='anushka')return;if(state.earlierSiteMigrated)return;try{const raw=localStorage.getItem('anushka-cat-nov26');if(!raw)return;const old=JSON.parse(raw);if(!old||typeof old!=='object')return;const finished=Array.isArray(old.finished)?old.finished.filter(x=>typeof x==='string'):[],notes=Array.isArray(old.notes)?old.notes.filter(x=>typeof x==='string'):[],results=Array.isArray(old.results)?old.results:[];
 const known=new Set(syllabusSections.flatMap(s=>s.topics.map(([name])=>name)));state.syllabus=[...new Set([...state.syllabus,...finished.filter(x=>x.startsWith('topic:')).map(x=>x.slice(6)).filter(x=>known.has(x))])];notes.forEach((note,i)=>{state.notes['day:Earlier reflection '+(i+1)]=note});const historic=[];for(const result of results){if(!result||typeof result.name!=='string'||![result.correct,result.total,result.score].every(Number.isFinite)||result.total<result.correct)continue;const wrong=Math.max(0,Math.min(result.total-result.correct,result.correct*3-result.score));historic.push({title:result.name+' (earlier site)',sourceDate:String(result.date||'Earlier site'),time:Date.now(),correct:result.correct,wrong,total:result.total,score:result.score,kind:'imported',legacy:true})}state.results.push(...historic.reverse());state.earlierRoutineHistory=finished.filter(x=>x.startsWith('plan:')).map(x=>x.slice(5));state.earlierSiteArchive={finished,notes,results};state.earlierSiteMigrated=Date.now();save();toast('Your earlier syllabus, notes and test history are safely carried over.')}catch{toast('Earlier-site progress could not be read. Its original browser storage has been left untouched.')}}
function initializeUniverse(){
 migrateEarlierProgress();
 const oldDashboard=renderDashboard;renderDashboard=function(){oldDashboard();const p=ensurePlan(),days=Math.max(0,daysBetween(todayLocal(),p.target)+1);$('.hero .eyebrow').textContent='ANUSHKA’S CAT UNIVERSE · YOUR PERSONAL PREP SPACE';const stats=$('.stats');stats.insertAdjacentHTML('beforebegin',`<section class="universe-launch"><div class="target-note"><span>✦</span><div><b>${days} days to your planning target</b><p>${p.generated?'An editable starter plan. Choose your real deadline in Study planner.':'Your chosen deadline: '+formattedDate(p.target)}</p></div><a href="#planner">Edit target →</a></div><div class="quick-launch">${[['tests','◷','Full mocks'],['papers','▤','Sample papers'],['sectionals','◎','Sectionals'],['syllabus','✓','Syllabus'],['calculator','⊞','Calculator'],['schedule','▦','My day']].map(([id,icon,name])=>`<a href="#${id}"><span>${icon}</span>${name}<i>→</i></a>`).join('')}</div></section>`)};
 renderTests=function(){const defs=Array.from({length:5},(_,i)=>paperDefinition('full',i+1));app.innerHTML=heading('ANUSHKA’S MOCK CENTRE','Five practice papers. A clearer test-day rhythm.','A complete sitting, with unique questions within each paper and thoughtful analysis after.')+`<section class="full-mock"><div><span class="eyebrow">BREATHE. SELECT. SOLVE.</span><h2>Your full-length practice space</h2><p>68 questions · 120 minutes · Locked 40-minute sections<br>VARC 24 → DILR 22 → QA 22 · MCQ + numerical entry</p><button class="primary" id="fullMock">Begin Full Mock 1 →</button></div><span class="mock-art">120<small>minutes, one step at a time</small></span></section><div class="test-grid" style="margin-top:22px">${defs.map(catalogCard).join('')}</div><section class="panel" style="margin-top:22px"><div class="section-title"><div><h2>Choose the sitting that fits today</h2><p>You don’t need a full mock every time you practice.</p></div></div><div class="quiz-actions"><button class="primary" id="diagnostic">12-question diagnostic →</button><a class="secondary" href="#papers">8 sample papers →</a><a class="secondary" href="#sectionals">12 sectional tests →</a>${subjects.map(s=>`<button class="secondary" data-sectional="${s.id}">${s.short} quick start</button>`).join('')}</div></section><div class="notice">Fixed paper selections make repeat attempts comparable. Questions can recur across papers, but never repeat within one paper. Material is original, uncalibrated practice; no percentile is predicted. Verify the current CAT structure separately with the official authority.</div>`;wirePapers(defs);$('#fullMock').onclick=()=>beginPaper(defs[0]);$('#diagnostic').onclick=()=>beginPaper(paperDefinition('diagnostic'));document.querySelectorAll('[data-sectional]').forEach(b=>b.onclick=()=>beginPaper(paperDefinition('sectional',1,b.dataset.sectional)))};
 startTimedTest=function(kind){beginPaper(kind==='full'?paperDefinition('full',1):kind==='diagnostic'?paperDefinition('diagnostic'):paperDefinition('sectional',1,kind))};
 const earlierNotebook=renderNotebook;renderNotebook=function(){earlierNotebook();if(state.earlierRoutineHistory?.length)app.insertAdjacentHTML('beforeend',`<div class="notice">Your earlier routine checks (${state.earlierRoutineHistory.map(escapeHTML).join(', ')}) were kept as history. They were not copied onto today because the earlier site did not date those checkboxes.</div>`)};
 // One library, preserving the earlier reference destinations alongside the official authority.
 renderReferences=function(){app.innerHTML=heading('ANUSHKA’S COMBINED REFERENCE SHELF','Keep the useful links. Keep your focus.',`${referenceSites.length} destinations from both versions, including the official CAT authority.`)+`<div class="notice">These are optional external links, not a ranked list, course endorsements, or copied coaching material. Current offerings have not been independently verified. Your lessons and original practice work here without a subscription.</div><div class="lesson-grid">${referenceSites.map((r,i)=>`<article class="lesson-card reference-card"><span class="pill">${String(i+1).padStart(2,'0')} · ${r.kind}</span><h3>${r.name}</h3><p>${r.focus}</p><a href="${r.url}" target="_blank" rel="noopener noreferrer" class="secondary">Visit official site ↗</a></article>`).join('')}</div>`};
 // Preserve standard export/restore, including the combined syllabus and migration archive.
 state.syllabus??=[];
 const nav=$('#nav');nav.insertAdjacentHTML('beforeend',`<div class="nav-divider">YOUR PRACTICE LIBRARY</div><a href="#papers" data-nav="papers"><span class="icon">▤</span>Sample papers <span class="badge">8</span></a><a href="#sectionals" data-nav="sectionals"><span class="icon">◎</span>Sectional tests <span class="badge">12</span></a><a href="#syllabus" data-nav="syllabus"><span class="icon">✓</span>Syllabus tracker</a>`);
 Object.assign(routeTitles,{papers:'Sample papers',sectionals:'Sectional tests',syllabus:'Syllabus tracker'});
 document.title='Anushka’s CAT Universe — Learn, plan, practice';
}
