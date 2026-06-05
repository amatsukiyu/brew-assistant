/* ===================== HELPERS ===================== */
const $=id=>document.getElementById(id);
const fmt=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");};
const valveText=v=>v==="open"?"開":v==="close"?"關":"—";
const getMethod=id=>METHODS.find(m=>m.id===id);

/* ===================== HOME RENDER ===================== */
function renderHome(){
  $("goals").innerHTML=GOALS.map(g=>`
    <button class="goal" onclick="openPreview('${g.mid}')">
      <div class="groast ${g.light?'light':''}">${g.roast}</div>
      <div class="gt">${g.t}</div>
      <div class="gd">${g.d}</div>
      <div class="arrow">→</div>
    </button>`).join("");

  $("cards").innerHTML=METHODS.map((m,i)=>`
    <div class="card" onclick="openPreview('${m.id}')">
      <div class="idx">${String(i+1).padStart(2,"0")}</div>
      <h4>${m.name}</h4>
      <div class="sub">${m.sub}</div>
      <div class="meta">
        <span class="tag">🫘 ${m.roast}</span>
        ${m.flavorTags.map(t=>`<span class="tag flav">${t}</span>`).join("")}
      </div>
      <div class="flavor">${m.flavorText}</div>
      <div class="foot">
        <div class="dots">難度
          <span class="dot ${m.difficulty>=1?'on':''}"></span>
          <span class="dot ${m.difficulty>=2?'on':''}"></span>
          <span class="dot ${m.difficulty>=3?'on':''}"></span>
        </div>
        <div class="go">查看步驟 →</div>
      </div>
    </div>`).join("");
}

/* ===================== PREVIEW RENDER ===================== */
let currentId=null;
function openPreview(id){
  currentId=id;const m=getMethod(id);
  $("pv-sub").textContent=m.sub;
  $("pv-name").textContent=m.name;
  $("pv-desc").innerHTML=m.desc;
  $("pv-params").innerHTML=`
    <div class="pcell"><div class="pl">粉量</div><div class="pv">${m.params.coffee}</div></div>
    <div class="pcell"><div class="pl">水量</div><div class="pv">${m.params.water}</div></div>
    <div class="pcell"><div class="pl">粉水比</div><div class="pv">${m.params.ratio}</div></div>
    <div class="pcell"><div class="pl">水溫</div><div class="pv">${m.params.temp}</div></div>
    <div class="pcell full"><div class="pl">研磨粗細</div><div class="pv sm">${m.params.grind}</div></div>
    <div class="pcell full"><div class="pl">適合工具</div><div class="pv sm">${m.tool}</div></div>`;
  $("pv-count").textContent=m.steps.length+" 個步驟";
  $("pv-steps").innerHTML=m.steps.map((s,i)=>`
    <div class="step ${s.valve==='close'?'closed':''}">
      <div class="bullet">${i+1}</div>
      <div class="sbody">
        <div class="stop">
          <span class="slabel">${s.label}</span>
          <span class="stime">${fmt(s.t)}</span>
          ${s.valve?`<span class="pill ${s.valve==='open'?'open':'close'}">閥門 ${valveText(s.valve)}</span>`:""}
          ${s.temp&&s.temp!=='—'?`<span class="pill temp">${s.temp}</span>`:""}
        </div>
        <div class="sact">${s.act}</div>
        ${s.note?`<div class="snote">${s.note}</div>`:""}
      </div>
    </div>`).join("");
  showView("preview");
  $("backBtn").style.display="flex";
}

/* ===================== VIEW SWITCH ===================== */
function showView(v){
  document.querySelectorAll(".view").forEach(el=>el.classList.remove("active"));
  $("view-"+v).classList.add("active");
  window.scrollTo({top:0,behavior:"instant"});
}
function goHome(){stopTimer();showView("home");$("backBtn").style.display="none";}

/* ===================== BREW LOGIC ===================== */
let timer=null,elapsed=0,running=false,lastStepIdx=-1,brewMethod=null,expanded=new Set();

function startBrew(){
  brewMethod=getMethod(currentId);
  elapsed=0;running=false;lastStepIdx=-1;
  if(timer){clearInterval(timer);timer=null;}
  $("bw-name").textContent=brewMethod.name+" · "+brewMethod.sub;
  $("bw-total").textContent=" / 總時間約 "+fmt(brewMethod.total);
  $("bw-togglelabel").textContent="開始計時";
  $("bw-toggle").querySelector("svg").innerHTML='<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>';
  expanded=new Set();
  buildList();
  $("bw-list").removeAttribute("data-done");
  paintBrew();
  showView("brew");
  $("backBtn").style.display="flex";
}

function pourOf(i){const s=brewMethod.steps;return s[i].water-(i>0?s[i-1].water:0);}

function detailHTML(i){
  const s=brewMethod.steps[i];const pour=pourOf(i);
  let parts=[];
  if(pour>0)parts.push('本次 <b>+'+pour+'g</b>');
  else parts.push('不注水');
  parts.push('累計 <b>'+s.water+'g</b>');
  if(s.temp&&s.temp!=='—')parts.push('水溫 <b>'+s.temp+'</b>');
  parts.push('閥門 <span class="vtag '+(s.valve||'')+'">'+valveText(s.valve)+'</span>');
  return parts.join(' · ');
}

function buildList(){
  $("bw-list").innerHTML=brewMethod.steps.map((s,i)=>`
    <div class="lrow" data-i="${i}">
      <div class="lhead" onclick="toggleRow(${i})">
        <span class="lt">${fmt(s.t)}</span>
        <span class="ll" id="ll-${i}">${s.label}</span>
        <span class="vdot ${s.valve||''}"></span>
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 6l6 6-6 6"/></svg>
        <svg class="check2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
      </div>
      <div class="ldetail">${detailHTML(i)}</div>
    </div>`).join("");
}

function toggleRow(i){
  if(expanded.has(i))expanded.delete(i);else expanded.add(i);
  const row=document.querySelector('.lrow[data-i="'+i+'"]');
  if(row)row.classList.toggle("open",expanded.has(i));
}

function updateListStates(idx,finished){
  // each new step: auto-expand the upcoming step, clear previous manual opens
  expanded=new Set();
  if(!finished&&idx+1<brewMethod.steps.length)expanded.add(idx+1);
  document.querySelectorAll(".lrow").forEach(row=>{
    const i=+row.dataset.i;
    const passed=finished||i<idx;
    const active=!finished&&i===idx;
    const isNext=!finished&&i===idx+1;
    row.classList.toggle("passed",passed);
    row.classList.toggle("active",active);
    row.classList.toggle("next",isNext);
    row.classList.toggle("open",expanded.has(i));
    const ll=$("ll-"+i);
    const base=brewMethod.steps[i].label;
    ll.innerHTML=base+(isNext?' <em class="badge nxt">下一步</em>':'');
  });
}

function currentStepIdx(){
  let idx=0;
  for(let i=0;i<brewMethod.steps.length;i++){if(elapsed>=brewMethod.steps[i].t)idx=i;}
  return idx;
}

function toggleTimer(){
  if(running){pauseTimer();}else{playTimer();}
}
function playTimer(){
  running=true;
  $("bw-togglelabel").textContent="暫停";
  $("bw-toggle").querySelector("svg").innerHTML='<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>';
  const t0=Date.now()-elapsed*1000;
  timer=setInterval(()=>{elapsed=(Date.now()-t0)/1000;paintBrew();},100);
}
function pauseTimer(){
  running=false;
  if(timer){clearInterval(timer);timer=null;}
  $("bw-togglelabel").textContent="繼續";
  $("bw-toggle").querySelector("svg").innerHTML='<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>';
}
function stopTimer(){running=false;if(timer){clearInterval(timer);timer=null;}}
function resetBrew(){stopTimer();startBrew();}

function paintBrew(){
  const steps=brewMethod.steps;
  $("bw-clock").innerHTML=fmt(elapsed);
  const idx=currentStepIdx();
  const cur=steps[idx];
  const isLast=idx===steps.length-1;
  const finished=elapsed>=brewMethod.total;

  // progress
  $("bw-prog").style.width=Math.min(100,(elapsed/brewMethod.total)*100)+"%";

  // NOW card — header + countdown
  const cdwrap=$("bw-cdwrap");
  cdwrap.classList.remove("urgent","done");
  if(finished){
    $("bw-stepno").textContent="沖煮完成";
    cdwrap.classList.add("done");
    cdwrap.innerHTML='<b>✓</b>';
  }else{
    $("bw-stepno").textContent="現在 · STEP "+(idx+1)+" / "+steps.length;
    const remain=isLast?(brewMethod.total-elapsed):(steps[idx+1].t-elapsed);
    cdwrap.innerHTML='<b>'+fmt(remain)+'</b>';
    if(remain<=3)cdwrap.classList.add("urgent");
  }

  // NOW card — body
  $("bw-steplabel").textContent=cur.label;
  $("bw-act").innerHTML=cur.act;
  if(cur.note){$("bw-note").style.display="block";$("bw-note").innerHTML=cur.note;}
  else{$("bw-note").style.display="none";}

  // NOW card — chips (閥門 / 水溫 / 本次注水量)
  const valveEl=$("bw-valve");
  valveEl.classList.remove("open","close");
  if(cur.valve)valveEl.classList.add(cur.valve);
  $("bw-valveval").textContent=valveText(cur.valve);
  $("bw-temp").textContent=cur.temp||"—";
  const pour=pourOf(idx);
  $("bw-water").innerHTML=pour>0?('+'+pour+'<small>g</small>'):"—";
  $("bw-watersub").textContent="累計 "+cur.water+"g";

  // smart list + cue only on step change
  if(idx!==lastStepIdx){
    const first=lastStepIdx;
    lastStepIdx=idx;
    updateListStates(idx,finished);
    if(running&&(idx>0||elapsed>0.3)&&first!==-1){flashCue();beep();}
  }else if(finished&&!$("bw-list").dataset.done){
    $("bw-list").dataset.done="1";
    updateListStates(idx,true);
  }
}

function flashCue(){
  const n=$("bw-now");
  n.classList.remove("flash");void n.offsetWidth;n.classList.add("flash");
}
let actx=null;
function beep(){
  try{
    actx=actx||new (window.AudioContext||window.webkitAudioContext)();
    const o=actx.createOscillator(),g=actx.createGain();
    o.connect(g);g.connect(actx.destination);
    o.type="sine";o.frequency.value=740;
    g.gain.setValueAtTime(.0001,actx.currentTime);
    g.gain.exponentialRampToValueAtTime(.25,actx.currentTime+.02);
    g.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+.4);
    o.start();o.stop(actx.currentTime+.42);
  }catch(e){}
}

/* ===================== INIT ===================== */
renderHome();
