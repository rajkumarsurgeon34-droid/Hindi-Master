// Hindi Master — 90-day course engine. Content: /course/level1-6.js · Interface text: /i18n.js
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const COURSE=(window.COURSE||[]).slice().sort((a,b)=>a.d-b.d);
const TOTAL=90;
let lang=(()=>{try{return localStorage.getItem("hm-language")||"en"}catch(e){return "en"}})();
if(!LANGS.includes(lang))lang="en";
const li=()=>LANGS.indexOf(lang);
const tr=k=>{const v=(I18N[lang]||{})[k];return v!==undefined?v:(I18N.en[k]!==undefined?I18N.en[k]:k)};
const pick=a=>Array.isArray(a)?(a[li()]||a[0]):(a||"");
const meaning=w=>w[2+li()]||w[2];
const levelOf=d=>Math.ceil(d/15);
const SKILL_ICON={vocab:"🗂️",grammar:"🧩",read:"📖",write:"✍️",speak:"🗣️"};
const LEVEL_EMOJI=["🌱","🌿","🌳","🚀","🏔️","👑"];

let state;try{state=JSON.parse(localStorage.getItem("hm-progress")||"null")}catch(e){}
if(!state||!Array.isArray(state.done))state={done:[],points:0,streak:0,last:""};
function save(){try{localStorage.setItem("hm-progress",JSON.stringify(state))}catch(e){}render()}
let filter="all";

function speak(t,onend){if(!("speechSynthesis"in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="hi-IN";u.rate=.82;const v=speechSynthesis.getVoices().find(v=>/hi[-_]IN/i.test(v.lang));if(v)u.voice=v;if(onend)u.onend=onend;speechSynthesis.speak(u)}
function playList(list){let n=0;const next=()=>{if(n<list.length)speak(list[n++],next)};next()}
function openModal(){ $("modal").classList.add("show");$("modal").setAttribute("aria-hidden","false");$("modal").querySelector(".modal").scrollTop=0}
function closeModal(){ $("modal").classList.remove("show");$("modal").setAttribute("aria-hidden","true");try{speechSynthesis.cancel()}catch(e){}}
function wireSay(root){root.querySelectorAll("[data-say]").forEach(b=>b.onclick=e=>{e.stopPropagation();speak(b.dataset.say)})}

/* ---------- page text ---------- */
function localizePage(){
 document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=tr(el.dataset.i18n)});
 document.documentElement.lang=lang==="en"?"en":lang;
 const sel=$("teachLanguage");if(sel)sel.value=lang;
}

/* ---------- home ---------- */
function nextDay(){const i=COURSE.findIndex(c=>!state.done.includes(c.d-1));return i<0?COURSE.length-1:i}
function render(){
 const done=state.done.length;
 $("completedCount").textContent=done+"/"+TOTAL;
 $("totalPoints").textContent=state.points;
 $("lessonProgress").textContent=Math.round(done/TOTAL*100)+"%";
 $("progressBar").style.width=(done/TOTAL*100)+"%";
 $("streak").textContent=state.streak;
 // skill filter chips
 $("skillFilter").innerHTML=["all","vocab","grammar","read","write","speak"].map(s=>'<button class="chip'+(filter===s?' on':'')+'" data-f="'+s+'">'+(SKILL_ICON[s]?SKILL_ICON[s]+" ":"")+esc(tr(s))+'</button>').join("");
 $("skillFilter").querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{filter=b.dataset.f;render()});
 // levels
 const wrap=$("days");wrap.innerHTML="";
 for(let lv=1;lv<=6;lv++){
  const days=COURSE.filter(c=>levelOf(c.d)===lv);
  const shown=days.filter(c=>filter==="all"||c.s===filter);
  const doneHere=days.filter(c=>state.done.includes(c.d-1)).length;
  const sec=document.createElement("section");sec.className="level lv"+lv;
  sec.innerHTML='<div class="level-head"><span class="level-badge">'+LEVEL_EMOJI[lv-1]+'</span><div><small>'+esc(tr("level"))+' '+lv+' · '+esc(tr("day"))+' '+((lv-1)*15+1)+'–'+(lv*15)+'</small><h3>'+esc(tr("levels")[lv-1])+'</h3><p>'+esc(tr("lvDesc")[lv-1])+'</p></div><span class="level-count">'+doneHere+'/15</span></div>';
  const grid=document.createElement("div");grid.className="day-grid";
  if(!days.length){grid.innerHTML='<p class="soon">…</p>'}
  shown.forEach(c=>{const i=c.d-1,isDone=state.done.includes(i);const b=document.createElement("button");b.className="day-card"+(isDone?" done":"")+(i===COURSE[nextDay()]?.d-1&&!isDone?" next":"");
   b.innerHTML='<div class="day-top"><span>'+esc(tr("day"))+' '+c.d+'</span><span class="skill-tag s-'+c.s+'">'+SKILL_ICON[c.s]+' '+esc(tr(c.s))+'</span></div><div class="day-emoji">'+c.e+'</div><b>'+esc(pick(c.t))+'</b><small class="dev-tag">'+esc(c.h||"")+'</small>'+(isDone?'<span class="done-badge">✓</span>':'');
   b.onclick=()=>openLesson(COURSE.indexOf(c));grid.appendChild(b)});
  sec.appendChild(grid);
  if(shown.length||filter==="all")wrap.appendChild(sec);
 }
 const n=nextDay(),c=COURSE[n];
 if(c){$("focusEmoji").textContent=c.e;$("focusTitle").textContent=pick(c.t);$("focusDesc").textContent=(c.h?c.h+" · ":"")+tr("levels")[levelOf(c.d)-1];
  $("continueBtn").textContent=(state.done.length?tr("continue")+" "+c.d:tr("start"))+" →";$("continueBtn").onclick=()=>openLesson(n)}
}

/* ---------- lesson ---------- */
let active=0;
function openLesson(i){
 active=i;const c=COURSE[i];if(!c)return;
 const lv=levelOf(c.d);
 const rows=c.w.map(w=>'<div class="example"><div><div class="dev">'+esc(w[0])+'</div><div class="roman">'+esc(w[1])+'</div><div class="meaning">'+esc(meaning(w))+'</div></div><button class="listen" data-say="'+esc(w[0])+'" aria-label="'+esc(tr("listen"))+'">🔊</button></div>').join("");
 const showEn=lang!=="en";
 $("modalContent").innerHTML=
 '<div class="lesson-tag">'+esc(tr("day"))+' '+c.d+' · '+esc(tr("level"))+' '+lv+' · '+SKILL_ICON[c.s]+' '+esc(tr(c.s))+'</div>'+
 '<h2>'+c.e+' '+esc(pick(c.t))+'</h2>'+(c.h?'<div class="lesson-hindi">'+esc(c.h)+'</div>':'')+
 '<div class="day-module"><div class="module-heading"><span>1</span><div><b>'+esc(tr("explain"))+'</b></div></div><div class="lesson-block"><p class="explain">'+esc(pick(c.x))+'</p>'+(showEn?'<details class="en-note"><summary>'+esc(tr("inEnglish"))+'</summary><p>'+esc(c.x[0])+'</p></details>':'')+'</div></div>'+
 '<div class="day-module"><div class="module-heading"><span>2</span><div><b>'+esc(tr("examples"))+'</b></div><button class="secondary-btn mini" id="playAll">▶ '+esc(tr("playAll"))+'</button></div><div class="lesson-block">'+rows+'</div></div>'+
 '<div class="day-module"><div class="module-heading"><span>3</span><div><b>'+esc(tr("practise"))+'</b></div></div><div class="lesson-block"><p class="explain">'+esc(tr("task_"+c.s))+'</p><div class="practice-controls wrap"><button class="secondary-btn" id="lessonTrace">✍️ '+esc(tr("trace"))+'</button><button class="secondary-btn" id="lessonFlash">🗂️ '+esc(tr("flash"))+'</button></div></div></div>'+
 '<div class="lesson-actions"><button class="primary-btn big" id="startQuiz">'+esc(tr("takeQuiz"))+' →</button></div>';
 wireSay($("modalContent"));
 $("playAll").onclick=()=>playList(c.w.map(w=>w[0]));
 $("lessonTrace").onclick=()=>openWriting(c.w[0][0],c.w.map(w=>w[0]));
 $("lessonFlash").onclick=()=>openWords(c.w);
 $("startQuiz").onclick=()=>startQuiz(i);
 openModal();
}

/* ---------- quiz (built from the day's examples) ---------- */
let quiz=[],qIndex=0,correct=0;
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function distractors(c,w,n){
 let pool=c.w.filter(x=>x!==w);
 if(pool.length<n){const near=COURSE.filter(o=>Math.abs(o.d-c.d)<=2&&o!==c).flatMap(o=>o.w);pool=pool.concat(near.filter(x=>x[0]!==w[0]))}
 const seen=new Set();return shuffle(pool).filter(x=>{if(seen.has(x[0])||meaning(x)===meaning(w))return false;seen.add(x[0]);return true}).slice(0,n);
}
function startQuiz(i){
 active=i;const c=COURSE[i];const types=["meaning","hindi","listen","roman"];
 const picks=shuffle(c.w).slice(0,4);while(picks.length<4)picks.push(c.w[picks.length%c.w.length]);
 quiz=picks.map((w,k)=>{const t=types[k];const ds=distractors(c,w,2);
  const show=t==="meaning"?w[0]:t==="hindi"?meaning(w):t==="roman"?w[1]:"";
  const ans=t==="meaning"?meaning(w):w[0];
  const opts=shuffle([ans].concat(ds.map(d=>t==="meaning"?meaning(d):d[0])));
  return {t,w,show,ans,opts}});
 qIndex=0;correct=0;showQuestion();
}
function showQuestion(){
 const c=COURSE[active],q=quiz[qIndex];
 const prompt={meaning:"qMeaning",hindi:"qHindi",listen:"qListen",roman:"qRoman"}[q.t];
 const big=q.t==="listen"?'<button class="listen-big" id="qPlay">🔊</button>':'<div class="q-show'+(q.t==="meaning"?' dev':'')+'">'+esc(q.show)+'</div>';
 const devOpts=q.t!=="meaning";
 $("modalContent").innerHTML='<div class="lesson-tag">'+esc(tr("day"))+' '+c.d+' · '+esc(tr("quiz"))+'</div><div class="quiz-progress">'+quiz.map((_,k)=>'<i class="'+(k<qIndex?'past':k===qIndex?'now':'')+'"></i>').join("")+'</div><h2>'+esc(tr("question"))+' '+(qIndex+1)+' '+esc(tr("of"))+' '+quiz.length+'</h2><p class="modal-lead">'+esc(tr(prompt))+'</p>'+big+
 '<div id="options">'+q.opts.map(o=>'<button class="quiz-option'+(devOpts?' dev-opt':'')+'">'+esc(o)+'</button>').join("")+'</div><div id="feedback"></div><div class="lesson-actions"><button class="secondary-btn" id="backLesson">← '+esc(tr("backLesson"))+'</button><button class="primary-btn" id="nextQuestion" disabled>'+esc(qIndex===quiz.length-1?tr("results"):tr("next"))+' →</button></div>';
 if(q.t==="listen"){$("qPlay").onclick=()=>speak(q.w[0]);setTimeout(()=>speak(q.w[0]),250)}
 let answered=false;
 $("options").querySelectorAll("button").forEach(b=>b.onclick=()=>{if(answered)return;answered=true;const ok=b.textContent===q.ans;if(ok)correct++;b.classList.add(ok?"correct":"wrong");
  if(!ok)$("options").querySelectorAll("button").forEach(x=>{if(x.textContent===q.ans)x.classList.add("correct")});
  $("feedback").innerHTML='<div class="feedback '+(ok?'good':'bad')+'">'+(ok?"🎉 "+esc(tr("correct")):esc(tr("wrong"))+' <b>'+esc(q.ans)+'</b>')+' <span class="fb-word">'+esc(q.w[0])+' · '+esc(q.w[1])+' · '+esc(meaning(q.w))+'</span></div>';
  speak(q.w[0]);$("nextQuestion").disabled=false});
 $("backLesson").onclick=()=>openLesson(active);
 $("nextQuestion").onclick=()=>{if(qIndex<quiz.length-1){qIndex++;showQuestion()}else showResults()};
}
function showResults(){
 const c=COURSE[active],passed=correct>=3,i=c.d-1;
 $("modalContent").innerHTML='<div class="lesson-tag">'+esc(tr("day"))+' '+c.d+' · '+esc(tr("quiz"))+'</div><div class="result-card '+(passed?'pass':'retry')+'"><div class="result-emoji">'+(passed?"🏆":"💪")+'</div><h2>'+esc(passed?tr("passTitle"):tr("retryTitle"))+'</h2><div class="score">'+correct+' / '+quiz.length+'</div><p>'+esc(passed?tr("passed"):tr("need"))+'</p></div><div class="lesson-actions"><button class="secondary-btn" id="reviewLesson">← '+esc(tr("backLesson"))+'</button><button class="primary-btn" id="finishDay">'+esc(passed?tr("complete"):tr("retry"))+' →</button></div>';
 $("reviewLesson").onclick=()=>openLesson(active);
 $("finishDay").onclick=()=>{if(passed){if(!state.done.includes(i)){state.done.push(i);state.points+=20;const today=new Date().toDateString();if(state.last!==today){const y=new Date(Date.now()-864e5).toDateString();state.streak=state.last===y?state.streak+1:1;state.last=today}}save();const n=COURSE[active+1];if(n){openLesson(active+1)}else closeModal()}else startQuiz(active)};
}

/* ---------- writing studio ---------- */
function openWriting(target="अ",list){
 const targets=list&&list.length?list:["अ","आ","क","ख","ग","नमस्ते","धन्यवाद"];let ti=Math.max(0,targets.indexOf(target));
 $("modalContent").innerHTML='<div class="lesson-tag">✍️ '+esc(tr("wStudio"))+'</div><h2>'+esc(tr("wStudio"))+'</h2><p class="modal-lead">'+esc(tr("wStudioSub"))+'</p><div class="trace-wrap"><div class="trace-ghost" id="traceTarget">'+esc(targets[ti])+'</div><canvas class="writing-pad" id="pad"></canvas></div><div class="practice-controls wrap"><button class="secondary-btn" id="prevT">←</button><button class="secondary-btn" id="clearPad">🧽 '+esc(tr("clear"))+'</button><button class="primary-btn" id="hearTarget">🔊 '+esc(tr("hear"))+'</button><button class="secondary-btn" id="nextT">→</button></div>';
 const c=$("pad"),ctx=c.getContext("2d");
 function size(){const r=c.getBoundingClientRect();c.width=r.width*devicePixelRatio;c.height=r.height*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);ctx.strokeStyle="#ff6b35";ctx.lineWidth=5;ctx.lineCap="round";ctx.lineJoin="round"}
 openModal();requestAnimationFrame(size);
 let down=false,last=null;
 c.onpointerdown=e=>{down=true;last=[e.offsetX,e.offsetY];c.setPointerCapture(e.pointerId)};
 c.onpointermove=e=>{if(!down)return;ctx.beginPath();ctx.moveTo(...last);ctx.lineTo(e.offsetX,e.offsetY);ctx.stroke();last=[e.offsetX,e.offsetY]};
 c.onpointerup=c.onpointercancel=()=>{down=false};
 const setT=k=>{ti=(k+targets.length)%targets.length;$("traceTarget").textContent=targets[ti];ctx.clearRect(0,0,c.width,c.height);speak(targets[ti])};
 $("clearPad").onclick=()=>ctx.clearRect(0,0,c.width,c.height);
 $("prevT").onclick=()=>setT(ti-1);$("nextT").onclick=()=>setT(ti+1);
 $("hearTarget").onclick=()=>speak(targets[ti]);
}

/* ---------- flashcards ---------- */
let cards=[],wi=0;
function openWords(list){
 if(list){cards=list;wi=0}
 if(!cards.length){const upto=Math.max(1,state.done.length?Math.max(...state.done)+2:2);cards=shuffle(COURSE.filter(c=>c.d<=upto+1).flatMap(c=>c.w)).slice(0,30);wi=0}
 const w=cards[wi];
 $("modalContent").innerHTML='<div class="lesson-tag">🗂️ '+esc(tr("fCards"))+'</div><h2>'+esc(tr("fCards"))+'</h2><div class="flip-card" id="flipWord"><div class="flip-inner"><div class="flip-front"><div class="dev big">'+esc(w[0])+'</div><small>'+esc(tr("tapReveal"))+'</small></div><div class="flip-back"><div class="dev">'+esc(w[0])+'</div><div class="roman">'+esc(w[1])+'</div><div class="meaning-lg">'+esc(meaning(w))+'</div></div></div></div><div class="flash-controls"><button class="secondary-btn" id="prevWord">←</button><span>'+(wi+1)+' / '+cards.length+'</span><button class="secondary-btn" id="nextWord">→</button></div><div class="lesson-actions"><button class="primary-btn" id="speakWord">🔊 '+esc(tr("listen"))+'</button></div>';
 $("flipWord").onclick=()=>$("flipWord").classList.toggle("flipped");
 $("prevWord").onclick=()=>{wi=(wi+cards.length-1)%cards.length;openWords()};
 $("nextWord").onclick=()=>{wi=(wi+1)%cards.length;openWords()};
 $("speakWord").onclick=()=>speak(w[0]);
 openModal();
}

/* ---------- speaking studio ---------- */
function openSpeak(){
 const c=COURSE[nextDay()]||COURSE[0];let k=0;
 const draw=()=>{const w=c.w[k];
 $("modalContent").innerHTML='<div class="lesson-tag">🎙️ '+esc(tr("sStudio"))+' · '+esc(tr("day"))+' '+c.d+'</div><h2>'+esc(tr("sStudio"))+'</h2><p class="modal-lead">'+esc(tr("sStudioSub"))+'</p><div class="word-card"><div class="speak-target">'+esc(w[0])+'</div><div class="roman">'+esc(w[1])+'</div><p>'+esc(meaning(w))+'</p><button class="secondary-btn" id="playPhrase">🔊 '+esc(tr("listen"))+'</button></div><button class="primary-btn full big" id="recordPhrase">🎙️ '+esc(tr("speakNow"))+'</button><div class="record-status" id="recordStatus"></div><div class="flash-controls"><button class="secondary-btn" id="prevP">←</button><span>'+(k+1)+' / '+c.w.length+'</span><button class="secondary-btn" id="nextP">→</button></div>';
 $("playPhrase").onclick=()=>speak(w[0]);
 $("prevP").onclick=()=>{k=(k+c.w.length-1)%c.w.length;draw()};$("nextP").onclick=()=>{k=(k+1)%c.w.length;draw()};
 $("recordPhrase").onclick=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){$("recordStatus").textContent=tr("noSR");return}const rec=new SR();rec.lang="hi-IN";rec.interimResults=false;$("recordStatus").textContent="🎧 …";rec.onresult=e=>{const said=e.results[0][0].transcript;const ok=said.replace(/[।?!.,\s]/g,"")===w[0].replace(/[।?!.,\s]/g,"");$("recordStatus").innerHTML=(ok?"🎉 ":"")+esc(tr("heard"))+' <b class="dev">'+esc(said)+'</b>'};rec.onerror=e=>$("recordStatus").textContent=e.error;rec.start()};
 };draw();openModal();
}

/* ---------- reference library (alphabet, weekdays, months, barakhadi) ---------- */
function openReference(){
const vowels=[["अ","a","अदरक","ginger"],["आ","aa","आम","mango"],["इ","i","इमली","tamarind"],["ई","ee","ईख","sugarcane"],["उ","u","उल्लू","owl"],["ऊ","oo","ऊन","wool"],["ऋ","ri","ऋषि","sage"],["ए","e","एक","one"],["ऐ","ai","ऐनक","spectacles"],["ओ","o","ओस","dew"],["औ","au","औरत","woman"],["अं","am","अंगूर","grapes"],["अः","ah","दुःख","sorrow"]];
const groups=[["क-वर्ग","क ख ग घ ङ"],["च-वर्ग","च छ ज झ ञ"],["ट-वर्ग","ट ठ ड ढ ण"],["त-वर्ग","त थ द ध न"],["प-वर्ग","प फ ब भ म"],["अंतःस्थ","य र ल व"],["ऊष्म","श ष स ह"]];
const weekdays=[["सोमवार","Somvaar","Monday"],["मंगलवार","Mangalvaar","Tuesday"],["बुधवार","Budhvaar","Wednesday"],["गुरुवार","Guruvaar","Thursday"],["शुक्रवार","Shukravaar","Friday"],["शनिवार","Shanivaar","Saturday"],["रविवार","Ravivaar","Sunday"]];
const months=[["चैत्र","Chaitra","March–April"],["वैशाख","Vaishaakh","April–May"],["ज्येष्ठ","Jyeshtha","May–June"],["आषाढ़","Aashaadh","June–July"],["श्रावण","Shraavan","July–August"],["भाद्रपद","Bhaadrapad","August–September"],["आश्विन","Aashvin","September–October"],["कार्तिक","Kaartik","October–November"],["मार्गशीर्ष","Maargasheersh","November–December"],["पौष","Paush","December–January"],["माघ","Maagh","January–February"],["फाल्गुन","Phaalgun","February–March"]];
const marks=[["","a","अ"],["ा","aa","आ"],["ि","i","इ"],["ी","ee","ई"],["ु","u","उ"],["ू","oo","ऊ"],["ृ","ri","ऋ"],["े","e","ए"],["ै","ai","ऐ"],["ो","o","ओ"],["ौ","au","औ"],["ं","am","अं"],["ः","ah","अः"]];
const bases="क ख ग घ च छ ज झ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ श्र".split(" ");
const bara=ch=>'<div class="barakhadi-grid">'+marks.map(m=>'<button class="barakhadi-cell" data-say="'+ch+m[0]+'"><b>'+ch+m[0]+'</b><small>'+ch+' + '+m[2]+'</small><em>'+m[1]+'</em></button>').join("")+'</div>';
const R={letters:()=>'<div class="lesson-block"><h4>स्वर · Vowels</h4><div class="reference-grid">'+vowels.map(x=>'<button class="reference-tile" data-say="'+x[0]+'"><b>'+x[0]+'</b><small>'+x[1]+'</small><span>'+x[2]+'</span><small>'+x[3]+'</small></button>').join("")+'</div></div><div class="lesson-block"><h4>व्यंजन · Consonants</h4>'+groups.map(g=>'<p><b>'+g[0]+'</b><br><span class="dev">'+g[1].split(" ").map(l=>'<button class="letter-btn" data-say="'+l+'">'+l+'</button>').join("")+'</span></p>').join("")+'</div>',
 days:()=>'<div class="lesson-block"><h4>सप्ताह के दिन · Days of the week</h4>'+weekdays.map(x=>'<div class="example"><div><div class="dev">'+x[0]+'</div><div class="meaning">'+x[1]+' · '+x[2]+'</div></div><button class="listen" data-say="'+x[0]+'">🔊</button></div>').join("")+'</div>',
 months:()=>'<div class="lesson-block"><h4>हिंदू महीने · Lunar months</h4><p class="tip">Month ranges are approximate — lunar dates shift every year.</p>'+months.map(x=>'<div class="example"><div><div class="dev">'+x[0]+'</div><div class="meaning">'+x[1]+' · '+x[2]+'</div></div><button class="listen" data-say="'+x[0]+'">🔊</button></div>').join("")+'</div>',
 barakhadi:()=>'<div class="lesson-block"><h4>बारहखड़ी · Barakhadi</h4><select id="barakhadiLetter" class="barakhadi-select">'+bases.map(x=>'<option>'+x+'</option>').join("")+'</select><div id="barakhadiResult">'+bara("क")+'</div></div>'};
$("modalContent").innerHTML='<div class="lesson-tag">📚 REFERENCE</div><h2>अक्षर · दिन · महीने</h2><div class="reference-tabs">'+[["letters","अक्षर · Alphabet"],["days","दिन · Weekdays"],["months","महीने · Months"],["barakhadi","बारहखड़ी"]].map((t,k)=>'<button class="chip'+(k?'':' on')+'" data-ref="'+t[0]+'">'+t[1]+'</button>').join("")+'</div><div id="referenceContent">'+R.letters()+'</div>';
const wire=()=>{wireSay($("referenceContent"));const sel=$("barakhadiLetter");if(sel)sel.onchange=()=>{$("barakhadiResult").innerHTML=bara(sel.value);wireSay($("barakhadiResult"))}};
$("modalContent").querySelectorAll("[data-ref]").forEach(b=>b.onclick=()=>{$("modalContent").querySelectorAll("[data-ref]").forEach(x=>x.classList.toggle("on",x===b));$("referenceContent").innerHTML=R[b.dataset.ref]();wire()});
wire();openModal();
}

/* ---------- wiring ---------- */
document.querySelectorAll("[data-tool]").forEach(b=>b.onclick=()=>{const t=b.dataset.tool;if(t==="write")openWriting();if(t==="speak")openSpeak();if(t==="words"){cards=[];openWords()}if(t==="reference")openReference()});
$("closeModal").onclick=closeModal;
$("modal").onclick=e=>{if(e.target===$("modal"))closeModal()};
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
const sel=$("teachLanguage");
sel.innerHTML=LANGS.map(l=>'<option value="'+l+'">'+LANG_NAMES[l]+'</option>').join("");
sel.addEventListener("change",()=>{lang=sel.value;try{localStorage.setItem("hm-language",lang)}catch(e){}localizePage();render();if($("modal").classList.contains("show")&&$("modalContent").querySelector(".day-module"))openLesson(active)});
document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{const t=b.dataset.nav;document.querySelectorAll("[data-nav]").forEach(x=>x.classList.toggle("on",x===b));if(t==="home")scrollTo({top:0,behavior:"smooth"});if(t==="course")$("coursePanel").scrollIntoView({behavior:"smooth"});if(t==="practice")$("practicePanel").scrollIntoView({behavior:"smooth"});if(t==="today")openLesson(nextDay())});
if("speechSynthesis"in window)speechSynthesis.onvoiceschanged=()=>{};
localizePage();render();