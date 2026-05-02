/**
 * PURVIS v11 LAUNCH — FULL SOVEREIGN AGENT OS
 * PIN: 7271 | 7 Departments | 11 HF Skills | Clone Engine | SOPs
 * Backend: https://purvis-v11-production-8ad7.up.railway.app
 * Supabase: aodehhevnjcumcrlyrhf.supabase.co
 * Case: 2024-DR-012028-O | Mission: $100 -> $1M
 */
import express from "express";
import fetch from "node-fetch";
import "dotenv/config";

const app  = express();
const PORT = process.env.PORT || 3000;
const PIN  = process.env.LOGIN_PIN || "7271";
const BACKEND = "https://purvis-v11-production-8ad7.up.railway.app";

const _cache = new Map();
function cached(key, ms, fn) {
  const now = Date.now(), h = _cache.get(key);
  if (h && now - h.ts < ms) return Promise.resolve(h.val);
  return fn().then(v => { _cache.set(key, {val:v, ts:now}); return v; });
}

const sessions = new Set();
app.use(express.json({ limit:"10mb" }));
app.use(express.static("public"));

function auth(req, res, next) {
  const pin = req.headers["x-pin"] || req.query.pin || req.body?.pin;
  const sid = req.headers["x-session"] || req.body?.session;
  if (String(pin) === String(PIN) || sessions.has(sid)) return next();
  return res.status(401).json({ error:"Unauthorized" });
}

const w = fn => async (req, res) => {
  try { res.json(await fn(req)); }
  catch(e) { res.status(500).json({ success:false, error:e.message }); }
};

async function proxy(path, method="GET", body=null) {
  try {
    const o = { method, headers:{"Content-Type":"application/json"} };
    if (body) o.body = JSON.stringify(body);
    const r = await fetch(BACKEND + path, o);
    return r.json();
  } catch(e) { return { error: e.message, fallback: true }; }
}

// ── LOGIN ──
app.post("/api/login", (req, res) => {
  const { pin } = req.body || {};
  if (String(pin) === String(PIN)) {
    const session = `purvis_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
    sessions.add(session);
    setTimeout(() => sessions.delete(session), 86400000);
    return res.json({ success:true, session, msg:"PURVIS v11 ACCESS GRANTED" });
  }
  res.status(401).json({ success:false, error:"Wrong PIN" });
});

app.get("/api/ping", (_, res) => res.json({
  name:"PURVIS v11 LAUNCH", version:"11.0.0", sovereign:true,
  pin_protected:true, departments:7, hf_skills:11, clones:8, sops:5,
  backend: BACKEND
}));

// ── LOGIN PAGE ──
app.get("/", (_, res) => res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PURVIS v11</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#07070f;color:#fff;font-family:'Segoe UI',system-ui,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center}.wrap{text-align:center;padding:48px 32px;max-width:380px;width:100%}.logo{font-size:5rem;margin-bottom:8px;animation:f 3s ease-in-out infinite}@keyframes f{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}h1{font-size:2.6rem;font-weight:900;background:linear-gradient(135deg,#818cf8,#c084fc,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}.sub{color:#555;margin:6px 0 32px}.dots{display:flex;gap:12px;justify-content:center;margin-bottom:20px}.dot{width:56px;height:64px;background:#111;border:2px solid #222;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:800;color:#333;transition:.15s}.dot.on{border-color:#818cf8;color:#818cf8}.dot.err{border-color:#ef4444;animation:sh .3s}@keyframes sh{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}.kp{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:220px;margin:0 auto 16px}.k{padding:16px;background:#111;border:1px solid #222;border-radius:10px;font-size:1.3rem;font-weight:700;cursor:pointer;color:#ccc;transition:.12s;user-select:none}.k:hover{background:#1a1a2e;border-color:#818cf8;color:#fff}.k:active{transform:scale(.93)}.msg{font-size:.85rem;min-height:20px;margin-top:6px}.err{color:#ef4444}.ok{color:#22c55e}</style></head><body><div class="wrap"><div class="logo">🤖</div><h1>PURVIS v11</h1><p class="sub">Sovereign Agent OS</p><div class="dots" id="dots"><div class="dot" id="d0">·</div><div class="dot" id="d1">·</div><div class="dot" id="d2">·</div><div class="dot" id="d3">·</div></div><div class="kp">${[1,2,3,4,5,6,7,8,9,'','0','⌫'].map(k=>k===''?'<div></div>':\`<div class="k" onclick="tap('\${k}')">\${k}</div>\`).join('')}</div><div class="msg" id="msg"></div></div><script>let p='';function tap(k){if(k==='⌫'){p=p.slice(0,-1);}else if(p.length<4){p+=k;}render();if(p.length===4)setTimeout(go,100);}function render(){for(let i=0;i<4;i++){const d=document.getElementById('d'+i);d.textContent=i<p.length?'●':'·';d.className='dot'+(i<p.length?' on':'');}}async function go(){const m=document.getElementById('msg');m.className='msg ok';m.textContent='Verifying...';const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pin:p})});const d=await r.json();if(d.success){localStorage.setItem('ps',d.session);localStorage.setItem('pp',p);m.textContent='✓ Access granted...';setTimeout(()=>location.href='/app',800);}else{m.className='msg err';m.textContent='Wrong PIN';document.querySelectorAll('.dot').forEach(d=>d.classList.add('err'));setTimeout(()=>{p='';render();document.querySelectorAll('.dot').forEach(d=>d.classList.remove('err'));m.textContent='';},800);}}document.addEventListener('keydown',e=>{if(e.key>='0'&&e.key<='9')tap(e.key);if(e.key==='Backspace')tap('⌫');if(e.key==='Enter'&&p.length===4)go();});</script></body></html>`));

// ── APP (protected) ──
app.get("/app", auth, (_, res) => {
  const NAV = [
    ['home','🏠','Dashboard'],['brain','🧠','Brain'],['money','💰','Money'],
    ['legal','⚖️','Legal'],['content','🎬','Content'],['sports','🏆','Sports'],
    ['trade','🔧','Trade'],['ashley','📋','Ashley'],['hf','🤗','HuggingFace'],
    ['builder','🏗️','Builder'],['clones','🤖','Clones'],['sops','📋','SOPs'],['search','🔍','Search']
  ];
  res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PURVIS v11 — Command Center</title><style>*{margin:0;padding:0;box-sizing:border-box}:root{--bg:#07070f;--c:#0e0e1a;--b:#1e1e2e;--p:#818cf8;--pk:#c084fc;--g:#22c55e;--y:#eab308;--r:#ef4444;--m:#4a4a6a;--t:#e2e8f0}body{background:var(--bg);color:var(--t);font-family:'Segoe UI',system-ui,sans-serif;display:flex;height:100vh;overflow:hidden}.sb{width:210px;background:var(--c);border-right:1px solid var(--b);display:flex;flex-direction:column;flex-shrink:0;overflow-y:auto}.sb-logo{padding:18px 16px;font-size:1.05rem;font-weight:900;background:linear-gradient(135deg,var(--p),var(--pk));-webkit-background-clip:text;-webkit-text-fill-color:transparent;border-bottom:1px solid var(--b)}.sb-sec{padding:6px 0}.sb-lbl{padding:5px 14px;font-size:.62rem;text-transform:uppercase;letter-spacing:.1em;color:var(--m);font-weight:700}.nav{display:flex;align-items:center;gap:9px;padding:8px 14px;cursor:pointer;font-size:.83rem;color:var(--m);border:none;background:transparent;width:100%;text-align:left;transition:.1s}.nav:hover{background:#13132a;color:var(--t)}.nav.active{background:#1a1a35;color:var(--p);border-right:2px solid var(--p)}.ic{font-size:.95rem;width:18px}.sb-bot{margin-top:auto;padding:12px 14px;border-top:1px solid var(--b)}.pulse{width:6px;height:6px;background:var(--g);border-radius:50%;display:inline-block;animation:pu 2s infinite;margin-right:4px}@keyframes pu{0%,100%{opacity:1}50%{opacity:.3}}.main{flex:1;display:flex;flex-direction:column;overflow:hidden}.top{padding:12px 22px;border-bottom:1px solid var(--b);display:flex;align-items:center;justify-content:space-between;background:var(--c);font-size:.9rem;font-weight:700}.pg{display:none;flex:1;overflow-y:auto;padding:20px;flex-direction:column;gap:14px}.pg.active{display:flex}.sg{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px}.card{background:var(--c);border:1px solid var(--b);border-radius:10px;padding:16px}.ct{font-size:.7rem;text-transform:uppercase;letter-spacing:.07em;color:var(--m);margin-bottom:8px;font-weight:700}.cv{font-size:2rem;font-weight:900}.sec{background:var(--c);border:1px solid var(--b);border-radius:10px;padding:18px}.stit{font-size:.85rem;font-weight:700;color:var(--p);margin-bottom:12px}textarea,input,select{background:#0a0a18;border:1px solid var(--b);border-radius:7px;color:var(--t);padding:9px 12px;width:100%;font-size:.83rem;font-family:inherit;outline:none;resize:vertical;margin-bottom:9px}textarea:focus,input:focus,select:focus{border-color:var(--p)}.row{display:flex;gap:8px}.row input,.row select{margin-bottom:0}.btn{padding:9px 18px;border-radius:7px;border:none;cursor:pointer;font-weight:700;font-size:.82rem;transition:.12s;display:inline-flex;align-items:center;gap:5px}.bp{background:linear-gradient(135deg,var(--p),var(--pk));color:#fff}.bp:hover{opacity:.88}.resp{background:#050510;border:1px solid var(--b);border-radius:7px;padding:12px;margin-top:10px;font-size:.8rem;line-height:1.7;white-space:pre-wrap;word-wrap:break-word;max-height:420px;overflow-y:auto;display:none;font-family:monospace}.tag{display:inline-block;padding:2px 7px;border-radius:4px;font-size:.7rem;font-weight:700;margin:2px}.tg{background:#052e16;color:var(--g)}.ty{background:#1c1800;color:var(--y)}.tr{background:#1f0707;color:var(--r)}.tp{background:#1a1a35;color:var(--p)}.hfg{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}.hfc{background:#0a0a18;border:1px solid var(--b);border-radius:9px;padding:14px}.hfc h4{font-size:.83rem;font-weight:700;margin-bottom:5px}.hfc p{font-size:.75rem;color:var(--m);line-height:1.5}table{width:100%;border-collapse:collapse;font-size:.8rem}th{padding:7px 10px;color:var(--m);border-bottom:1px solid var(--b);font-weight:700;text-align:left}td{padding:7px 10px;border-bottom:1px solid #0e0e18}.sp{display:inline-block;width:12px;height:12px;border:2px solid #333;border-top-color:var(--p);border-radius:50%;animation:sp .6s linear infinite;margin-right:5px}@keyframes sp{to{transform:rotate(360deg)}}.ld{color:var(--m);font-style:italic;font-size:.82rem}</style></head><body>
<div class="sb"><div class="sb-logo">🤖 PURVIS v11</div>
${NAV.map(([id,ic,lbl],i)=>`<button class="nav${i===0?' active':''}" onclick="show('${id}',this)"><span class="ic">${ic}</span>${lbl}</button>`).join('')}
<div class="sb-bot"><div style="font-size:.7rem;margin-bottom:5px"><span class="pulse"></span>SOVEREIGN LIVE</div><div style="font-size:.65rem;color:var(--m)">Railway · No Base44</div><button class="nav" style="color:var(--r);margin-top:8px;width:100%" onclick="logout()">🚪 Logout</button></div></div>
<div class="main"><div class="top"><span id="ptit">Dashboard</span><span style="font-size:.75rem;color:var(--m)"><span class="pulse"></span>All Systems Live</span></div>

<!-- HOME -->
<div class="pg active" id="pg-home">
<div class="sg"><div class="card"><div class="ct">System</div><div class="cv" id="ss">—</div></div><div class="card"><div class="ct">Departments</div><div class="cv">7</div></div><div class="card"><div class="ct">API Routes</div><div class="cv">67</div></div><div class="card"><div class="ct">HF Skills</div><div class="cv">11</div></div><div class="card"><div class="ct">Clones</div><div class="cv">8</div></div><div class="card"><div class="ct">SOPs</div><div class="cv">5</div></div></div>
<div class="sec"><div class="stit">⚡ Quick Command</div><textarea id="qc" rows="3" placeholder="Tell PURVIS anything..."></textarea><button class="btn bp" onclick="q()">⚡ Execute</button><div class="resp" id="qr"></div></div>
<div class="sec"><div class="stit">📡 System Status</div><div id="sb" class="ld"><span class="sp"></span>Loading...</div></div>
</div>

<!-- BRAIN -->
<div class="pg" id="pg-brain">
<div class="sec"><div class="stit">🧠 Brain — Ask Anything</div><textarea id="bi" rows="4" placeholder="Ask PURVIS..."></textarea><button class="btn bp" onclick="r('brain')">🧠 Ask</button><div class="resp" id="br"></div></div>
</div>

<!-- MONEY -->
<div class="pg" id="pg-money">
<div class="sec"><div class="stit">💰 Income Sprint</div><button class="btn bp" onclick="r('sprint')">💰 Run Sprint</button><div class="resp" id="spr"></div></div>
<div class="sec"><div class="stit">🎯 Lead Generator</div><div class="row"><input id="ls" value="plumbing, handyman" placeholder="Skills"><input id="ll" value="Orlando, FL" placeholder="Location"></div><button class="btn bp" onclick="r('leads')">🎯 Find Leads</button><div class="resp" id="lr"></div></div>
</div>

<!-- LEGAL -->
<div class="pg" id="pg-legal">
<div class="sec"><div class="stit">⚖️ Case 2024-DR-012028-O — 8 Kill Shots</div><button class="btn bp" onclick="r('ks')">⚔️ Load Kill Shots</button><div class="resp" id="ksr"></div></div>
<div class="sec"><div class="stit">📄 Draft Motion</div><select id="mt"><option>Motion to Dismiss Injunction</option><option>Motion for Reconsideration</option><option>Emergency Motion</option><option>Motion to Vacate</option><option>Motion for New Trial</option></select><button class="btn bp" onclick="r('motion')">📄 Draft</button><div class="resp" id="mr"></div></div>
<div class="sec"><div class="stit">🎯 Legal Strategy</div><button class="btn bp" onclick="r('strategy')">🎯 Full Strategy</button><div class="resp" id="str"></div></div>
</div>

<!-- CONTENT -->
<div class="pg" id="pg-content">
<div class="sec"><div class="stit">🎬 Script Generator</div><input id="ct" value="Government lies exposed" placeholder="Topic"><select id="ck"><option value="POLITICAL">POLITICAL</option><option value="SCRIPTURE">SCRIPTURE</option></select><button class="btn bp" onclick="r('script')">🎬 Generate</button><div class="resp" id="scr"></div></div>
<div class="sec"><div class="stit">🌾 Daily Content Farm</div><button class="btn bp" onclick="r('farm')">🌾 Run Farm</button><div class="resp" id="fr"></div></div>
<div class="sec"><div class="stit">📊 Viral Score</div><input id="vh" value="They buried this truth..." placeholder="Your hook"><button class="btn bp" onclick="r('vscore')">📊 Score</button><div class="resp" id="vsr"></div></div>
</div>

<!-- SPORTS -->
<div class="pg" id="pg-sports">
<div class="sec"><div class="stit">🏆 Today's Picks — EV + Kelly Sized</div><button class="btn bp" onclick="r('picks')">🏆 Get Picks</button><div class="resp" id="pr"></div></div>
<div class="sec"><div class="stit">📊 Game Analysis</div><input id="gi" value="NBA Playoffs tonight"><button class="btn bp" onclick="r('ga')">📊 Analyze</button><div class="resp" id="gar"></div></div>
<div class="sec"><div class="stit">📐 EV Calculator</div><div class="row"><input id="ep" value="0.55" placeholder="True prob"><input id="eo" value="-110" placeholder="Odds"><input id="es" value="20" placeholder="Stake $"></div><button class="btn bp" onclick="r('ev')">📐 Calc EV</button><div class="resp" id="evr"></div></div>
</div>

<!-- TRADE -->
<div class="pg" id="pg-trade">
<div class="sec"><div class="stit">🔧 Plumbing Brain</div><textarea id="ti" rows="3" placeholder="Ask anything — offsets, DFU, pipe sizes, code..."></textarea><button class="btn bp" onclick="r('trade')">🔧 Ask</button><div class="resp" id="tr2"></div></div>
<div class="sec"><div class="stit">💵 Job Estimator</div><input id="et" value="bathroom remodel"><input id="es2" value="replace toilet, vanity, shower"><div class="row"><input id="eh" value="16" placeholder="Hours"><input id="er" value="75" placeholder="$/hr"></div><button class="btn bp" onclick="r('est')">💵 Estimate</button><div class="resp" id="estr"></div></div>
<div class="sec"><div class="stit">📐 Offset Calculator</div><div class="row"><input id="or2" value="12" placeholder="Run (in)"><input id="ori" value="9" placeholder="Rise (in)"></div><button class="btn bp" onclick="r('offset')">📐 Calc</button><div class="resp" id="offr"></div></div>
</div>

<!-- ASHLEY -->
<div class="pg" id="pg-ashley">
<div class="sec"><div class="stit">📋 Ashley Mobile Notary — Leads</div><div class="row"><input id="al" value="Orlando, FL"><input id="ac" value="10" placeholder="Count"></div><button class="btn bp" onclick="r('ashleads')">📋 Find Leads</button><div class="resp" id="alr"></div></div>
<div class="sec"><div class="stit">📢 Social Media Ads</div><button class="btn bp" onclick="r('ashads')">📢 Generate Ads</button><div class="resp" id="aar"></div></div>
</div>

<!-- HF -->
<div class="pg" id="pg-hf">
<div class="sec"><div class="stit">🤗 11 HuggingFace Skills</div>
<div class="hfg">
<div class="hfc"><h4>🖥️ hf-cli</h4><p>Download/upload models. Run GPU jobs on HF infrastructure.</p><span class="tag tg">ACTIVE</span></div>
<div class="hfc"><h4>🏆 huggingface-best</h4><p>Best model for any task by benchmark. Auto-selects optimal.</p><span class="tag tg">ACTIVE</span></div>
<div class="hfc"><h4>📊 huggingface-datasets</h4><p>Search/filter any HF dataset free — sports, legal, scripture.</p><span class="tag tg">ACTIVE</span></div>
<div class="hfc"><h4>🎨 huggingface-gradio</h4><p>Build Python ML web UIs. Wrap any model in a live app.</p><span class="tag tg">ACTIVE</span></div>
<div class="hfc"><h4>🧪 llm-trainer</h4><p>Fine-tune LLMs on YOUR data. TRL/Unsloth on cloud GPUs.</p><span class="tag ty">HF_TOKEN NEEDED</span></div>
<div class="hfc"><h4>💻 local-models</h4><p>Run GGUF models locally — zero API cost forever.</p><span class="tag ty">SETUP NEEDED</span></div>
<div class="hfc"><h4>🛠️ tool-builder</h4><p>Chain HF API calls into automated pipelines.</p><span class="tag tg">ACTIVE</span></div>
<div class="hfc"><h4>👁️ vision-trainer</h4><p>Train object detection. Reads blueprints and receipts.</p><span class="tag ty">HF_TOKEN NEEDED</span></div>
<div class="hfc"><h4>⚡ transformers-js</h4><p>Run AI in Node.js — no API. Text, vision, audio. Free.</p><span class="tag tg">ACTIVE</span></div>
<div class="hfc"><h4>📄 huggingface-papers</h4><p>Read AI papers. PURVIS self-educates and adapts.</p><span class="tag tg">ACTIVE</span></div>
<div class="hfc"><h4>📈 trackio</h4><p>Track ML training with live dashboards and alerts.</p><span class="tag tg">ACTIVE</span></div>
</div></div>
<div class="sec"><div class="stit">🔍 Model Search</div><div class="row"><input id="ht" value="text-to-video"><input id="hq" value="video generation"></div><button class="btn bp" onclick="r('hfsearch')">🔍 Search</button><div class="resp" id="hfsr"></div></div>
<div class="sec"><div class="stit">⚡ Run Inference</div><input id="hm" value="facebook/bart-large-cnn"><textarea id="hin" rows="2" placeholder="Input text..."></textarea><button class="btn bp" onclick="r('hfinfer')">⚡ Run</button><div class="resp" id="hfir"></div></div>
<div class="sec"><div class="stit">🏆 Best Model Recommender</div><input id="hr" value="faceless video generation"><button class="btn bp" onclick="r('hfrec')">🏆 Recommend</button><div class="resp" id="hfrr"></div></div>
</div>

<!-- BUILDER -->
<div class="pg" id="pg-builder">
<div class="sec"><div class="stit">🏗️ App Builder</div><textarea id="bld" rows="5" placeholder="Describe what to build..."></textarea><button class="btn bp" onclick="r('build')">🏗️ Build</button><div class="resp" id="bldr"></div></div>
</div>

<!-- CLONES -->
<div class="pg" id="pg-clones">
<div class="sec"><div class="stit">🤖 8 Clone Roles</div><div id="cl" class="ld"><span class="sp"></span>Loading...</div></div>
<div class="sec"><div class="stit">🤖 Spawn Clone</div>
<select id="cr"><option value="lead_hunter">Lead Hunter</option><option value="content_writer">Content Writer</option><option value="legal_scout">Legal Scout</option><option value="sports_analyst">Sports Analyst</option><option value="money_tracker">Money Tracker</option><option value="video_producer">Video Producer</option><option value="seo_agent">SEO Agent</option><option value="ashley_closer">Ashley Closer</option></select>
<input id="ctsk" placeholder="Task for this clone..."><button class="btn bp" onclick="r('clone')">🤖 Spawn</button><div class="resp" id="clr"></div></div>
<div class="sec"><div class="stit">🚀 Deploy Full Team</div><input id="ttsk" value="Make $1000 this week"><button class="btn bp" onclick="r('team')">🚀 Deploy</button><div class="resp" id="tmr"></div></div>
</div>

<!-- SOPs -->
<div class="pg" id="pg-sops">
<div class="sec"><div class="stit">📋 SOPs</div><div id="sl" class="ld"><span class="sp"></span>Loading...</div></div>
<div class="sec"><div class="stit">▶️ Execute SOP</div>
<select id="sid"><option value="daily_money">💰 Daily Money Check</option><option value="sports_morning">🏆 Morning Sports Brief</option><option value="content_publish">🎬 Content Publish Flow</option><option value="legal_weekly">⚖️ Weekly Legal Review</option><option value="ashley_outreach">📋 Ashley Daily Outreach</option></select>
<button class="btn bp" onclick="r('sop')">▶️ Execute</button><div class="resp" id="sopr"></div></div>
</div>

<!-- SEARCH -->
<div class="pg" id="pg-search">
<div class="sec"><div class="stit">🔍 Live Search</div><input id="sq" placeholder="Search anything..."><button class="btn bp" onclick="r('search')">🔍 Search</button><div class="resp" id="shr"></div></div>
</div>

</div>
<script>
const SS=localStorage.getItem('ps')||'',PP=localStorage.getItem('pp')||'';
const H={'Content-Type':'application/json','x-pin':PP,'x-session':SS};
const T={home:'Dashboard',brain:'Brain',money:'Money Engine',legal:'Legal — Case 2024-DR-012028-O',content:'Content Farm',sports:'Sports Quant',trade:'Trade / Plumbing',ashley:'Ashley Notary',hf:'HuggingFace — 11 Skills',builder:'App Builder',clones:'Clone Engine',sops:'SOPs',search:'Search'};
function show(p,el){document.querySelectorAll('.pg').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.nav').forEach(x=>x.classList.remove('active'));document.getElementById('pg-'+p).classList.add('active');if(el)el.classList.add('active');document.getElementById('ptit').textContent=T[p]||p;if(p==='home')loadStat();if(p==='clones')loadClones();if(p==='sops')loadSOPs();}
function logout(){localStorage.clear();location.href='/';}
async function api(path,method='GET',body=null){const o={method,headers:H};if(body)o.body=JSON.stringify(body);const res=await fetch(path,o);return res.json();}
function show_r(id,data){const el=document.getElementById(id);el.style.display='block';el.textContent=typeof data==='string'?data:JSON.stringify(data,null,2);}
function ld(id){show_r(id,'⏳ Working...');}
async function loadStat(){const d=await api('/api/ping');document.getElementById('ss').textContent='🟢 LIVE';document.getElementById('sb').innerHTML=Object.entries(d).map(([k,v])=>'<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #0e0e18"><span style="color:var(--m)">'+k+'</span><span class="tag '+(v===true||v==='connected'?'tg':'tp')+'">'+String(v)+'</span></div>').join('');}
async function q(){ld('qr');const d=await api('/api/brain','POST',{command:document.getElementById('qc').value});show_r('qr',d.result||d.error||JSON.stringify(d));}
async function r(t){
  const M={
    brain:async()=>{ld('br');const d=await api('/api/brain','POST',{command:document.getElementById('bi').value});show_r('br',d.result||JSON.stringify(d));},
    sprint:async()=>{ld('spr');const d=await api('/api/income/sprint','POST',{});show_r('spr',d.plan?d.plan.map(s=>'['+s.time+'] '+s.action+' — '+s.expected_income).join('\n')+'\n\nTOTAL: '+(d.total_projected||''):JSON.stringify(d,null,2));},
    leads:async()=>{ld('lr');const d=await api('/api/income/leads','POST',{skills:document.getElementById('ls').value.split(',').map(s=>s.trim()),location:document.getElementById('ll').value,count:8});show_r('lr',d.leads?d.leads.map(l=>'['+l.platform+'] '+l.title+' — '+l.expected_pay).join('\n'):JSON.stringify(d,null,2));},
    ks:async()=>{ld('ksr');const d=await api('/api/legal/killshots');show_r('ksr',d.result||JSON.stringify(d,null,2));},
    motion:async()=>{ld('mr');const d=await api('/api/legal/motion','POST',{type:document.getElementById('mt').value});show_r('mr',d.result||JSON.stringify(d,null,2));},
    strategy:async()=>{ld('str');const d=await api('/api/legal/strategy');show_r('str',d.result||JSON.stringify(d,null,2));},
    script:async()=>{ld('scr');const d=await api('/api/content/script','POST',{topic:document.getElementById('ct').value,track:document.getElementById('ck').value});show_r('scr',d.hook?'HOOK: '+d.hook+'\n\nSCRIPT:\n'+d.script+'\n\nHASHTAGS: '+d.hashtags+'\n\nVIRAL SCORE: '+d.viral_score+'/100':JSON.stringify(d,null,2));},
    farm:async()=>{ld('fr');const d=await api('/api/content/daily');show_r('fr',JSON.stringify(d,null,2));},
    vscore:async()=>{ld('vsr');const d=await api('/api/video/score','POST',{hook:document.getElementById('vh').value,track:'POLITICAL'});show_r('vsr','OVERALL: '+d.overall_score+'/100\nHOOK: '+d.hook_score+'\nSCRIPT: '+d.script_score+'\n\nIMPROVE:\n'+(d.top_improvements||[]).join('\n'));},
    picks:async()=>{ld('pr');const d=await api('/api/sports/picks');show_r('pr',d.plays?d.plays.map(p=>'✅ '+p.sport+' | '+p.pick+'\n   Edge: '+p.edge_pct+'% | Conf: '+p.confidence+'\n   '+p.reasoning).join('\n\n'):(d.no_bet_reason||JSON.stringify(d,null,2)));},
    ga:async()=>{ld('gar');const d=await api('/api/sports/analyze','POST',{game:document.getElementById('gi').value});show_r('gar',d.result||JSON.stringify(d,null,2));},
    ev:async()=>{const d=await api('/api/sports/ev','POST',{trueProb:parseFloat(document.getElementById('ep').value),odds:parseInt(document.getElementById('eo').value),stake:parseFloat(document.getElementById('es').value)});show_r('evr',JSON.stringify(d,null,2));},
    trade:async()=>{ld('tr2');const d=await api('/api/trade/ask','POST',{task:document.getElementById('ti').value});show_r('tr2',d.result||JSON.stringify(d,null,2));},
    est:async()=>{ld('estr');const d=await api('/api/trade/estimate','POST',{jobType:document.getElementById('et').value,scope:document.getElementById('es2').value,hours:parseInt(document.getElementById('eh').value),rate:parseInt(document.getElementById('er').value)});show_r('estr',d.result||JSON.stringify(d,null,2));},
    offset:async()=>{const d=await api('/api/trade/offset/'+document.getElementById('or2').value+'/'+document.getElementById('ori').value);show_r('offr','Travel: '+d.travel+'" | Offset: '+d.offset+'" | Angle: '+d.angle+'°');},
    ashleads:async()=>{ld('alr');const d=await api('/api/ashley/leads','POST',{location:document.getElementById('al').value,count:parseInt(document.getElementById('ac').value)});show_r('alr',d.leads?d.leads.map(l=>'['+l.type+'] '+l.business+' — '+l.action).join('\n'):JSON.stringify(d,null,2));},
    ashads:async()=>{ld('aar');const d=await api('/api/ashley/ads','POST',{});show_r('aar',d.result||JSON.stringify(d,null,2));},
    hfsearch:async()=>{ld('hfsr');const d=await api('/api/hf/search','POST',{task:document.getElementById('ht').value,query:document.getElementById('hq').value,limit:5});show_r('hfsr',d.models?d.models.map(m=>'📦 '+m.id+'\n   ⬇ '+(m.downloads||0).toLocaleString()+' | ❤ '+m.likes+'\n   '+m.url).join('\n\n'):JSON.stringify(d,null,2));},
    hfinfer:async()=>{ld('hfir');const d=await api('/api/hf/infer','POST',{model:document.getElementById('hm').value,inputs:document.getElementById('hin').value});show_r('hfir',JSON.stringify(d,null,2));},
    hfrec:async()=>{ld('hfrr');const d=await api('/api/hf/recommend','POST',{task:document.getElementById('hr').value});show_r('hfrr',d.recommendation||JSON.stringify(d,null,2));},
    build:async()=>{ld('bldr');const d=await api('/api/builder/build','POST',{description:document.getElementById('bld').value});show_r('bldr',d.result||JSON.stringify(d,null,2));},
    clone:async()=>{ld('clr');const d=await api('/api/clone/spawn','POST',{role:document.getElementById('cr').value,task:document.getElementById('ctsk').value});show_r('clr',d.result||JSON.stringify(d,null,2));},
    team:async()=>{ld('tmr');const d=await api('/api/clone/team','POST',{task:document.getElementById('ttsk').value});show_r('tmr',JSON.stringify(d,null,2));},
    sop:async()=>{ld('sopr');const d=await api('/api/sop/run','POST',{sop_id:document.getElementById('sid').value});show_r('sopr',d.output||JSON.stringify(d,null,2));},
    search:async()=>{ld('shr');const d=await api('/api/search','POST',{query:document.getElementById('sq').value,context:'general'});show_r('shr',d.synthesized||JSON.stringify(d,null,2));}
  };
  if(M[t]) M[t]();
}
async function loadClones(){const d=await api('/api/clone/list');document.getElementById('cl').innerHTML=(d.available_roles||[]).map(r=>'<div style="padding:8px 0;border-bottom:1px solid #0e0e18"><b style="color:var(--p)">'+r.id+'</b> — <span style="color:var(--m)">'+r.description+'</span></div>').join('');}
async function loadSOPs(){const d=await api('/api/sop/list');document.getElementById('sl').innerHTML='<table><tr><th>ID</th><th>Title</th><th>Steps</th><th>Freq</th></tr>'+(d.sops||[]).map(s=>'<tr><td><span class="tag tp">'+s.id+'</span></td><td>'+s.title+'</td><td>'+s.steps+'</td><td>'+s.frequency+'</td></tr>').join('')+'</table>';}
loadStat();
</script></body></html>`);
});

// ── PROTECTED API ──
app.use("/api", (req, res, next) => {
  if (["/api/login","/api/ping"].includes(req.path)) return next();
  auth(req, res, next);
});

// Brain unified
app.post("/api/brain", w(async req => proxy("/api/agent/command","POST",req.body)));

// All proxied routes
const ROUTES = [
  ["GET","/api/status"],["GET","/api/workflows"],["GET","/api/departments"],
  ["GET","/api/loop/status"],["GET","/api/legal/strategy"],["GET","/api/legal/killshots"],
  ["POST","/api/legal/motion"],["POST","/api/legal/draft"],["POST","/api/content/script"],
  ["GET","/api/content/daily"],["GET","/api/sports/picks"],["POST","/api/sports/analyze"],
  ["POST","/api/sports/ev"],["POST","/api/ashley/leads"],["POST","/api/ashley/ads"],
  ["POST","/api/trade/ask"],["POST","/api/trade/offset"],["GET","/api/trade/offset/:run/:rise"],
  ["POST","/api/trade/estimate"],["GET","/api/trade/pipe/:size"],["POST","/api/income/sprint"],
  ["POST","/api/income/leads"],["POST","/api/builder/build"],["GET","/api/clone/list"],
  ["POST","/api/clone/spawn"],["POST","/api/clone/team"],["POST","/api/search"],
  ["POST","/api/video/score"],["POST","/api/video/capcut"],["POST","/api/hf/search"],
  ["POST","/api/hf/infer"],["POST","/api/hf/recommend"],["GET","/api/hf/spaces"],
  ["GET","/api/sop/list"],["POST","/api/sop/run"],["GET","/api/system/audit"]
];

for (const [m, p] of ROUTES) {
  const h = w(async req => proxy(req.url.split("?")[0], m, m!=="GET"?req.body:null));
  if (m==="GET") app.get(p,h); else app.post(p,h);
}

app.listen(PORT, () => console.log(`PURVIS v11 LAUNCH live — Port ${PORT} — PIN ${PIN}`));
