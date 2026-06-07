/* ===================== HELPERS ===================== */
const $=id=>document.getElementById(id);
const fmt=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");};
const valveText=v=>v==="open"?"開":v==="close"?"關":"—";
const getMethod=id=>METHODS.find(m=>m.id===id);
/* 把「15 g」拆成大數字＋小單位，讓數字跳出來、單位退後 */
const numHTML=v=>{const i=v.search(/[^\d.~:-]/);const n=i>0?v.slice(0,i).trim():v;const u=i>0?v.slice(i).trim():"";return `<span class="pn">${n}</span>`+(u?`<span class="pu">${u}</span>`:"");};
/* 咖啡豆圖示（streamline-plump:coffee-bean-solid）— 取代系統 emoji，跨平台一致 */
const BEAN_ICON='<svg class="bean" width="14" height="14" viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M25.305 2.286C30.285 1.236 35.42 2.124 39.662 6l.027.025c-3.617.81-6.872 2.344-9.612 4.698c-3.516 3.021-6.086 7.309-7.53 12.903c-1.317 5.109-3.606 8.823-6.578 11.377c-2.765 2.376-6.207 3.821-10.21 4.392c-3.671-4.19-4.502-9.214-3.473-14.089c1.041-4.93 3.976-9.725 7.781-13.561a283 283 0 0 1 1.677-1.677c3.836-3.805 8.63-6.74 13.561-7.78"/><path fill="currentColor" d="m8.31 41.976l.028.025c4.243 3.875 9.378 4.764 14.357 3.713c4.931-1.04 9.725-3.975 13.561-7.78a295 295 0 0 0 1.677-1.678c3.806-3.836 6.74-8.63 7.781-13.56c1.03-4.876.199-9.9-3.473-14.09c-4.003.571-7.444 2.016-10.21 4.392c-2.972 2.554-5.26 6.268-6.578 11.377c-1.444 5.594-4.013 9.882-7.53 12.903c-2.74 2.354-5.994 3.888-9.612 4.698"/></svg>';
/* 完成圖示（material-symbols:coffee-rounded）— 沖煮完成的主視覺 */
const COFFEE_ICON='<svg class="cup" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11 18q-2.925 0-4.962-2.037T4 11V5q0-.825.588-1.412T6 3h12.5q1.45 0 2.475 1.025T22 6.5t-1.025 2.475T18.5 10H18v1q0 2.925-2.037 4.963T11 18M6 8h10V5H6zm12 0h.5q.625 0 1.063-.437T20 6.5t-.437-1.062T18.5 5H18zM5 21q-.425 0-.712-.288T4 20t.288-.712T5 19h14q.425 0 .713.288T20 20t-.288.713T19 21z"/></svg>';
const STEAM_SVG='<svg class="steamfx" viewBox="0 0 42 16" aria-hidden="true"><path d="M11 14 q-3 -2.5 0 -5 q3 -2.5 0 -4"/><path d="M21 14 q-3 -2.5 0 -5 q3 -2.5 0 -4"/><path d="M31 14 q-3 -2.5 0 -5 q3 -2.5 0 -4"/></svg>';

/* ===================== HOME RENDER ===================== */
function renderHome(){
  $("goals").innerHTML=GOALS.map(g=>`
    <button class="goal" onclick="openPreview('${g.mid}')">
      <span class="roast">${BEAN_ICON}<span>${g.roast}</span></span>
      <div class="gt">${g.t}</div>
      <div class="gd">${g.d}</div>
      <div class="arrow">→</div>
    </button>`).join("");

  $("cards").innerHTML=METHODS.map((m,i)=>`
    <div class="card" onclick="openPreview('${m.id}')">
      <div class="chead">
        <h4>${m.name}</h4>
        <span class="roast">${BEAN_ICON}<span>${m.roast}</span></span>
      </div>
      <div class="sub">${m.sub}</div>
      <div class="hookrow">
        <div class="flavor">${m.flavorText}</div>
        <span class="go">→</span>
      </div>
      <div class="meta">
        <span class="diffmeter">難度<span class="dot ${m.difficulty>=1?'on':''}"></span><span class="dot ${m.difficulty>=2?'on':''}"></span><span class="dot ${m.difficulty>=3?'on':''}"></span></span>
        ${m.flavorTags.map(t=>`<span class="chip amber">${t}</span>`).join("")}
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
    <div class="pspec">
      <div class="pgrid">
        <div class="pcell"><div class="pl">粉量</div><div class="pv">${numHTML(m.params.coffee)}</div></div>
        <div class="pcell"><div class="pl">水量</div><div class="pv">${numHTML(m.params.water)}</div></div>
        <div class="pcell"><div class="pl">粉水比</div><div class="pv">${m.params.ratio.replace("約","").trim().split(":").map(x=>`<span class="pn">${x}</span>`).join('<span class="psep">:</span>')}</div></div>
      </div>
      <div class="pcond">
        <div class="prow"><span class="pl">水溫</span><span class="ptv">${m.params.temp}</span></div>
        <div class="prow"><span class="pl">研磨</span><span class="pmv">${m.params.grind}</span></div>
        <div class="prow"><span class="pl">工具</span><span class="pmv">${m.tool}</span></div>
      </div>
    </div>`;
  $("pv-count").textContent=m.steps.length+" 個步驟";
  $("pv-steps").innerHTML=m.steps.map((s,i)=>`
    <div class="step ${s.valve==='close'?'closed':''}">
      <div class="bullet">${i+1}</div>
      <div class="sbody">
        <div class="stop">
          <span class="slabel">${s.label}</span>
          <span class="stime">${fmt(s.t)}</span>
          ${s.valve?`<span class="chip status ${s.valve==='open'?'open':'close'}">閥門 ${valveText(s.valve)}</span>`:""}
          ${s.temp&&s.temp!=='—'?`<span class="chip status amber">${s.temp}</span>`:""}
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
let timer=null,elapsed=0,running=false,lastStepIdx=-1,brewMethod=null,expanded=new Set(),brewDone=false;

function startBrew(){
  brewMethod=getMethod(currentId);
  elapsed=0;running=false;lastStepIdx=-1;brewDone=false;
  if(timer){clearInterval(timer);timer=null;}
  $("bw-name").textContent=brewMethod.name+" · "+brewMethod.sub;
  $("bw-total").textContent=fmt(brewMethod.total);
  $("bw-toggle").classList.remove("done");
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
    ll.innerHTML=base+(isNext?' <em class="chip status amber">下一步</em>':'');
  });
}

function currentStepIdx(){
  let idx=0;
  for(let i=0;i<brewMethod.steps.length;i++){if(elapsed>=brewMethod.steps[i].t)idx=i;}
  return idx;
}

function toggleTimer(){
  if(brewDone){goHome();return;}
  if(running){pauseTimer();}else{playTimer();}
}
function finishBrew(){
  brewDone=true;
  stopTimer();
  const btn=$("bw-toggle");
  btn.classList.add("done");
  $("bw-togglelabel").textContent="沖煮完成";
  btn.querySelector("svg").innerHTML='<path d="M20 6L9 17l-5-5"/>';
}
function playTimer(){
  running=true;
  $("bw-togglelabel").textContent="暫停";
  $("bw-toggle").querySelector("svg").innerHTML='<rect x="6" y="5" width="4.5" height="14" rx="1.2" fill="currentColor" stroke="none"/><rect x="13.5" y="5" width="4.5" height="14" rx="1.2" fill="currentColor" stroke="none"/>';
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

  // NOW card — STEP 指示 + 倒數
  const cd=$("bw-cd");
  cd.classList.remove("urgent","done");
  $("bw-steptot").textContent=" / "+steps.length;
  if(finished){
    $("bw-stepnum").textContent=steps.length;
    $("bw-steplabel").textContent="沖煮完成";
    cd.classList.add("done");
    if(!cd.querySelector(".cup"))cd.innerHTML=COFFEE_ICON+STEAM_SVG;
    if(!brewDone)finishBrew();
  }else{
    $("bw-stepnum").textContent=idx+1;
    $("bw-steplabel").textContent=cur.label;
    const remain=isLast?(brewMethod.total-elapsed):(steps[idx+1].t-elapsed);
    cd.textContent=fmt(remain);
    if(remain<=3)cd.classList.add("urgent");
  }

  // NOW card — 指示與註記
  $("bw-act").innerHTML=cur.act;
  if(cur.note){$("bw-note").style.display="block";$("bw-note").innerHTML=cur.note;}
  else{$("bw-note").style.display="none";}

  // NOW card — 資訊塊（閥門 / 水溫 / 累計，附本次增量）
  const vv=$("bw-valveval");
  vv.classList.remove("open","close");
  if(cur.valve)vv.classList.add(cur.valve);
  vv.textContent=valveText(cur.valve);
  $("bw-temp").textContent=cur.temp||"—";
  const pour=pourOf(idx);
  $("bw-water").textContent=cur.water+"g";
  $("bw-watersub").textContent=pour>0?("+"+pour+"g"):"—";

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
