/* ==========================================================================
   ANTARA — application logic
   ========================================================================== */
(function(){
"use strict";

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const IS_TOUCH = window.matchMedia('(hover: none), (pointer: coarse)').matches;
const VB = window.PROJECT_BOUNDS;
const STATE_PATHS = window.INDIA_STATE_PATHS;
const [VB_X, VB_Y, VIEW_W, VIEW_H] = window.INDIA_VIEWBOX;

/* ---------------------------------------------------------------------- */
/* projection — mirrors the python build script exactly                   */
/* ---------------------------------------------------------------------- */
function project(lon, lat){
  const x = VB.pad + (lon - VB.minLon) / (VB.maxLon - VB.minLon) * (VB.viewW - 2*VB.pad);
  const y = VB.pad + (VB.maxLat - lat) / (VB.maxLat - VB.minLat) * (VB.viewH - 2*VB.pad);
  return [Math.round(x*100)/100, Math.round(y*100)/100];
}

/* ---------------------------------------------------------------------- */
/* data indexes                                                           */
/* ---------------------------------------------------------------------- */
const DESTS = window.DESTINATIONS;
DESTS.forEach(d => { const p = project(d.lon, d.lat); d._x = p[0]; d._y = p[1]; });
const byId = new Map(DESTS.map(d => [d.id, d]));
const bySlug = new Map(DESTS.map(d => [d.slug, d]));
const byState = new Map();
DESTS.forEach(d => { if(!byState.has(d.state)) byState.set(d.state, []); byState.get(d.state).push(d); });
const STATE_SLUGS = new Map(Object.entries(window.STATES_META).map(([name,m]) => [m.slug, name]));

/* ---------------------------------------------------------------------- */
/* favorites (localStorage)                                               */
/* ---------------------------------------------------------------------- */
const FAV_KEY = 'antara.favorites';
function getFavs(){ try{ return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }catch(e){ return []; } }
function setFavs(arr){ try{ localStorage.setItem(FAV_KEY, JSON.stringify(arr)); }catch(e){} }
function isFav(id){ return getFavs().includes(id); }
function toggleFav(id){
  let favs = getFavs();
  if(favs.includes(id)){ favs = favs.filter(f=>f!==id); }
  else { favs.push(id); }
  setFavs(favs);
  renderFavCount();
  return favs.includes(id);
}
function renderFavCount(){
  const validFavs = getFavs().filter(id => byId.has(id));
  const n = validFavs.length;
  const elc = document.getElementById('fav-count');
  if(n>0){ elc.textContent = n; elc.style.display='flex'; } else { elc.style.display='none'; }
}

/* ---------------------------------------------------------------------- */
/* toast                                                                  */
/* ---------------------------------------------------------------------- */
let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('is-visible'), 2400);
}

/* ---------------------------------------------------------------------- */
/* ART PLATES — original line-art "etchings", no photography dependency   */
/* ---------------------------------------------------------------------- */
function artSVG(motif, accent, caption){
  accent = accent || '#C9A86A';
  const id = 'g'+Math.random().toString(36).slice(2,8);
  const bg = `<defs>
      <radialGradient id="${id}bg" cx="50%" cy="30%" r="85%">
        <stop offset="0%" stop-color="#1c1c1c"/>
        <stop offset="100%" stop-color="#0c0c0c"/>
      </radialGradient>
      <pattern id="${id}dots" width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.6" fill="rgba(247,243,236,0.05)"/>
      </pattern>
    </defs>
    <rect width="400" height="300" fill="url(#${id}bg)"/>
    <rect width="400" height="300" fill="url(#${id}dots)"/>`;
  const ground = `<line x1="0" y1="248" x2="400" y2="248" stroke="${accent}" stroke-width="1" opacity=".35"/>`;
  let art = '';

  switch(motif){
    case 'dome-minarets': {
      art = `
        <g fill="none" stroke="${accent}" stroke-width="1.5" stroke-linejoin="round">
          <rect x="120" y="205" width="160" height="14" opacity=".8"/>
          <rect x="140" y="150" width="120" height="55" opacity=".8"/>
          <path d="M140 150 Q140 95 200 95 Q260 95 260 150" />
          <ellipse cx="200" cy="90" rx="34" ry="30"/>
          <path d="M200 60 Q182 40 200 20 Q218 40 200 60" fill="${accent}" opacity=".9" stroke="none"/>
          <line x1="200" y1="20" x2="200" y2="8"/>
          <g opacity=".85">
            <rect x="75" y="120" width="12" height="128" />
            <rect x="313" y="120" width="12" height="128" />
            <circle cx="81" cy="112" r="9"/>
            <circle cx="319" cy="112" r="9"/>
          </g>
          <g opacity=".55">
            <rect x="30" y="150" width="10" height="98"/>
            <rect x="360" y="150" width="10" height="98"/>
          </g>
        </g>
        <g opacity=".18" stroke="${accent}" stroke-width="1">
          <path d="M140 250 Q200 262 260 250" fill="none"/>
        </g>`;
      break;
    }
    case 'minar-tower': {
      art = `
        <g fill="none" stroke="${accent}" stroke-width="1.5">
          <path d="M172 248 L182 70 Q200 55 218 70 L228 248 Z"/>
          <line x1="176" y1="205" x2="224" y2="205"/>
          <line x1="180" y1="162" x2="220" y2="162"/>
          <line x1="184" y1="119" x2="216" y2="119"/>
          <g opacity=".7">
            <line x1="188" y1="248" x2="192" y2="70" stroke-width="1"/>
            <line x1="200" y1="248" x2="200" y2="66" stroke-width="1"/>
            <line x1="212" y1="248" x2="208" y2="70" stroke-width="1"/>
          </g>
          <ellipse cx="200" cy="62" rx="14" ry="8"/>
          <line x1="200" y1="54" x2="200" y2="34"/>
          <circle cx="200" cy="30" r="3" fill="${accent}" stroke="none"/>
        </g>
        <g opacity=".4" stroke="${accent}" stroke-width="1">
          <path d="M60 248 L96 248 L96 200 L60 200 Z"/>
          <path d="M304 248 L340 248 L340 210 L304 210 Z"/>
        </g>`;
      break;
    }
    case 'garden-tomb': {
      art = `
        <g fill="none" stroke="${accent}" stroke-width="1.5">
          <rect x="110" y="170" width="180" height="12"/>
          <path d="M128 170 L142 140 L258 140 L272 170 Z"/>
          <rect x="150" y="110" width="100" height="30"/>
          <path d="M150 110 Q150 66 200 66 Q250 66 250 110"/>
          <ellipse cx="200" cy="62" rx="26" ry="22"/>
          <line x1="200" y1="40" x2="200" y2="26"/>
          <g opacity=".7">
            <rect x="118" y="126" width="10" height="44"/>
            <rect x="272" y="126" width="10" height="44"/>
          </g>
        </g>
        <g opacity=".45" stroke="${accent}" stroke-width="1">
          <line x1="60" y1="248" x2="340" y2="248"/>
          <line x1="60" y1="230" x2="340" y2="230"/>
          <line x1="130" y1="182" x2="130" y2="248"/>
          <line x1="270" y1="182" x2="270" y2="248"/>
          <line x1="200" y1="182" x2="200" y2="248"/>
        </g>`;
      break;
    }
    case 'fort-ramparts': {
      art = `
        <g fill="none" stroke="${accent}" stroke-width="1.6" stroke-linejoin="round">
          <rect x="40" y="200" width="320" height="48"/>
          <g>
            ${[40,70,100,130,300,330].map(x=>`<rect x="${x}" y="182" width="18" height="18"/>`).join('')}
          </g>
          <path d="M170 248 L170 195 Q200 175 230 195 L230 248"/>
          <circle cx="90" cy="150" r="26"/>
          <rect x="76" y="150" width="28" height="60"/>
          <circle cx="310" cy="158" r="22"/>
          <rect x="298" y="158" width="24" height="52"/>
          <g opacity=".6">
            ${[64,120,280,336].map(x=>`<rect x="${x}" y="188" width="10" height="12"/>`).join('')}
          </g>
        </g>`;
      break;
    }
    case 'gateway-arch': {
      art = `
        <g fill="none" stroke="${accent}" stroke-width="1.6">
          <rect x="60" y="220" width="280" height="28"/>
          <path d="M100 220 L100 140 Q100 90 160 90 L240 90 Q300 90 300 140 L300 220"/>
          <path d="M150 220 L150 150 Q150 118 200 118 Q250 118 250 150 L250 220"/>
          <g opacity=".65">
            <rect x="70" y="150" width="16" height="70"/>
            <rect x="314" y="150" width="16" height="70"/>
          </g>
        </g>
        <g opacity=".4" stroke="${accent}" stroke-width="1">
          <path d="M40 248 Q200 236 360 248"/>
        </g>`;
      break;
    }
    case 'jharokha-facade': {
      let wins = '';
      for(let row=0; row<5; row++){
        const y = 80 + row*32;
        const count = 7 - Math.abs(2-row);
        const startX = 200 - (count*26)/2;
        for(let c=0;c<count;c++){
          const x = startX + c*26;
          wins += `<path d="M${x} ${y+22} L${x} ${y+8} Q${x+6.5} ${y} ${x+13} ${y} Q${x+19.5} ${y} ${x+19.5} ${y+8} L${x+19.5} ${y+22} Z"/>`;
        }
      }
      art = `<g fill="none" stroke="${accent}" stroke-width="1.1">${wins}</g>
        <rect x="70" y="235" width="260" height="13" fill="none" stroke="${accent}" stroke-width="1.5"/>`;
      break;
    }
    case 'gopuram': {
      let tiers = '';
      const levels = 9; const baseW = 190; const baseY = 246; const topY = 40;
      for(let i=0;i<levels;i++){
        const t = i/(levels-1);
        const w = baseW * (1 - t*0.72);
        const y = baseY - t*(baseY-topY);
        const h = (baseY-topY)/levels + 4;
        tiers += `<path d="M${200-w/2} ${y} L${200-w/2+8} ${y-h} L${200+w/2-8} ${y-h} L${200+w/2} ${y} Z" opacity="${0.55+ t*0.4}"/>`;
      }
      art = `<g fill="none" stroke="${accent}" stroke-width="1.3">${tiers}
        <rect x="60" y="246" width="280" height="10"/>
        <path d="M170 246 L170 210 Q200 194 230 210 L230 246"/>
      </g>`;
      break;
    }
    case 'palace-dome': {
      art = `
        <g fill="none" stroke="${accent}" stroke-width="1.5">
          <rect x="70" y="190" width="260" height="30"/>
          <g opacity=".8">
            ${[90,130,170,210,250,290].map(x=>`<path d="M${x} 190 L${x} 155 Q${x+10} 140 ${x+20} 155 L${x+20} 190"/>`).join('')}
          </g>
          <rect x="150" y="120" width="100" height="70"/>
          <path d="M150 120 Q150 78 200 78 Q250 78 250 120"/>
          <ellipse cx="200" cy="74" rx="24" ry="20"/>
          <line x1="200" y1="54" x2="200" y2="38"/>
          <circle cx="120" cy="150" r="14"/>
          <path d="M106 150 Q106 128 120 128 Q134 128 134 150"/>
          <circle cx="280" cy="150" r="14"/>
          <path d="M266 150 Q266 128 280 128 Q294 128 294 150"/>
        </g>`;
      break;
    }
    default: art = `<circle cx="200" cy="150" r="60" fill="none" stroke="${accent}" stroke-width="2"/>`;
  }

  return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    ${bg}${ground}${art}
    ${caption ? `<text x="16" y="284" font-family="Inter, sans-serif" font-size="9" letter-spacing="1.5" fill="rgba(247,243,236,.5)" font-weight="600">${caption.toUpperCase()}</text>` : ''}
  </svg>`;
}
function photoOrArt(dest, captionOverride, extraClass){
  if(!dest) return '';
  const cap = captionOverride !== undefined ? captionOverride : (dest.city || dest.state);
  if(dest.image){
    const cls = extraClass ? ` ${extraClass}` : '';
    if(dest.imageFit === 'contain'){
      return `<div class="photo-art-wrap contain-mode${cls}">
        <div class="photo-blur-bg" style="background-image: url('${dest.image}');"></div>
        <img src="${dest.image}" class="photo-img contain" alt="${dest.name}" loading="lazy">
      </div>`;
    }
    return `<div class="photo-art-wrap${cls}">
      <img src="${dest.image}" class="photo-img" alt="${dest.name}" loading="lazy">
    </div>`;
  }
  return artSVG(dest.motif, dest.accent, cap);
}
function artFor(dest, captionOverride){
  return photoOrArt(dest, captionOverride);
}

/* ---------------------------------------------------------------------- */
/* BUILD MAP                                                              */
/* ---------------------------------------------------------------------- */
const svg = document.getElementById('map-svg');
const statesLayer = document.getElementById('states-layer');
const labelsLayer = document.getElementById('labels-layer');
const markersLayer = document.getElementById('markers-layer');

svg.setAttribute('viewBox', `${VB_X} ${VB_Y} ${VIEW_W} ${VIEW_H}`);
svg.style.aspectRatio = `${VIEW_W} / ${VIEW_H}`;

const stateNames = Object.keys(STATE_PATHS);
let delay = 0;
stateNames.forEach(name => {
  const info = STATE_PATHS[name];
  const hasData = !!window.STATES_META[name];
  const path = document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('d', info.d);
  path.setAttribute('class', 'state-path' + (hasData ? '' : ' is-empty'));
  path.dataset.state = name;
  path.setAttribute('tabindex','0');
  path.setAttribute('role','button');
  path.setAttribute('aria-label', hasData ? `${name} — explore destinations` : `${name} — guide coming soon`);
  path.style.animationDelay = (delay*14)+'ms'; delay++;
  statesLayer.appendChild(path);

  const label = document.createElementNS('http://www.w3.org/2000/svg','text');
  label.setAttribute('x', info.centroid[0]);
  label.setAttribute('y', info.centroid[1]);
  label.setAttribute('class', 'state-label' + (hasData ? ' is-visible' : ''));
  label.textContent = name;
  labelsLayer.appendChild(label);
});

DESTS.forEach(d => {
  const g = document.createElementNS('http://www.w3.org/2000/svg','g');
  g.setAttribute('class','marker');
  g.setAttribute('transform', `translate(${d._x},${d._y})`);
  g.dataset.id = d.id;
  g.setAttribute('tabindex','-1');
  g.setAttribute('role','button');
  g.setAttribute('aria-label', `${d.name} — view guide`);
  g.innerHTML = `<circle class="marker-ring" cx="0" cy="0" r="5"/><circle class="marker-dot" cx="0" cy="0" r="4.2"/>`;
  markersLayer.appendChild(g);
});

/* ---------------------------------------------------------------------- */
/* VIEWBOX ZOOM (camera)                                                  */
/* ---------------------------------------------------------------------- */
const FULL_BOX = {x:VB_X, y:VB_Y, w:VIEW_W, h:VIEW_H};
let currentBox = {x:VB_X, y:VB_Y, w:VIEW_W, h:VIEW_H};
let zoomRAF = null;

function computeZoomBox(bbox, pad){
  pad = pad === undefined ? 0.4 : pad;
  let [minx,miny,maxx,maxy] = bbox;
  const bw0 = maxx-minx, bh0 = maxy-miny;
  minx -= bw0*pad; maxx += bw0*pad; miny -= bh0*pad; maxy += bh0*pad;
  let bw = maxx-minx, bh = maxy-miny;
  const targetAR = VIEW_W/VIEW_H;
  const curAR = bw/bh;
  if(curAR < targetAR){
    const newBw = bh*targetAR; const cx=(minx+maxx)/2;
    minx = cx-newBw/2; maxx = cx+newBw/2; bw = newBw;
  } else {
    const newBh = bw/targetAR; const cy=(miny+maxy)/2;
    miny = cy-newBh/2; maxy = cy+newBh/2; bh = newBh;
  }
  return {x:minx, y:miny, w:bw, h:bh};
}

/* lightweight native rAF tween — no external animation library needed */
function animateBox(target, durMs){
  if(zoomRAF) cancelAnimationFrame(zoomRAF);
  const start = {x:currentBox.x, y:currentBox.y, w:currentBox.w, h:currentBox.h};
  const duration = REDUCED_MOTION ? 1 : (durMs || 900);
  const t0 = performance.now();
  function tick(now){
    const t = Math.min(1, (now - t0) / duration);
    const e = 1 - Math.pow(1 - t, 3); /* cubic ease-out — matches the site's motion language */
    currentBox.x = start.x + (target.x - start.x) * e;
    currentBox.y = start.y + (target.y - start.y) * e;
    currentBox.w = start.w + (target.w - start.w) * e;
    currentBox.h = start.h + (target.h - start.h) * e;
    svg.setAttribute('viewBox', `${currentBox.x} ${currentBox.y} ${currentBox.w} ${currentBox.h}`);
    if(t < 1) zoomRAF = requestAnimationFrame(tick);
  }
  zoomRAF = requestAnimationFrame(tick);
}

/* ---------------------------------------------------------------------- */
/* APP STATE / VIEW MACHINE                                               */
/* ---------------------------------------------------------------------- */
const AppState = { view:'india', state:null, destId:null };

const el = {
  stageIntro: document.getElementById('stage-intro'),
  breadcrumb: document.getElementById('stage-breadcrumb'),
  backBtn: document.getElementById('back-to-india'),
  statePanel: document.getElementById('state-panel'),
  filterBar: document.getElementById('filter-bar'),
  previewCard: document.getElementById('preview-card'),
  destPage: document.getElementById('dest-page'),
  sheetScrim: document.getElementById('sheet-scrim'),
  bottomSheet: document.getElementById('bottom-sheet'),
};

function setBreadcrumb(stateName){
  if(!stateName){ el.breadcrumb.classList.remove('is-visible'); return; }
  el.breadcrumb.innerHTML = `<button data-nav="india">India</button><span class="sep">/</span><span class="current">${stateName}</span>`;
  el.breadcrumb.classList.add('is-visible');
  el.breadcrumb.querySelector('[data-nav="india"]').addEventListener('click', () => goIndia());
}

function showStatePanel(stateName){
  const meta = window.STATES_META[stateName];
  if(!meta || IS_TOUCH){ el.statePanel.classList.remove('is-visible'); return; }
  const list = byState.get(stateName) || [];
  el.statePanel.innerHTML = `<div class="state-panel-card">
    <h2>${stateName}</h2>
    <div class="count">${list.length} destination${list.length===1?'':'s'} · ${meta.tags.join(' · ')}</div>
    <div class="desc">${meta.tagline}</div>
    <div class="chip-row">${list.slice(0,5).map(d=>`<span class="chip">${d.name.split(' — ')[0]}</span>`).join('')}</div>
  </div>`;
  el.statePanel.classList.add('is-visible');
}
function hideStatePanel(){ el.statePanel.classList.remove('is-visible'); }

function markersForState(stateName){
  markersLayer.querySelectorAll('.marker').forEach(m => {
    const d = byId.get(m.dataset.id);
    const inState = d.state === stateName;
    const matchCat = !activeFilter || d.category.includes(activeFilter);
    const show = inState && matchCat;
    m.classList.toggle('is-visible', show);
    m.setAttribute('tabindex', show ? '0' : '-1');
  });
}
function clearMarkers(){
  markersLayer.querySelectorAll('.marker').forEach(m => { m.classList.remove('is-visible'); m.setAttribute('tabindex','-1'); });
}

function focusState(stateName, opts){
  opts = opts || {};
  AppState.view = 'state'; AppState.state = stateName;
  const info = STATE_PATHS[stateName];
  animateBox(computeZoomBox(info.bbox));
  statesLayer.querySelectorAll('.state-path').forEach(p => {
    p.classList.toggle('is-active', p.dataset.state===stateName);
    p.classList.toggle('is-dim', p.dataset.state!==stateName);
  });
  labelsLayer.querySelectorAll('.state-label').forEach(l=>l.classList.toggle('is-visible', !!window.STATES_META[l.textContent]));
  markersForState(stateName);
  setBreadcrumb(stateName);
  el.backBtn.classList.add('is-visible');
  el.stageIntro.style.opacity = '0';
  showStatePanel(stateName);
  if(!opts.silent) updateHash(stateName, null);
}

function goIndia(opts){
  opts = opts || {};
  AppState.view = 'india'; AppState.state = null;
  animateBox(FULL_BOX);
  statesLayer.querySelectorAll('.state-path').forEach(p => { p.classList.remove('is-active'); p.classList.remove('is-dim'); });
  labelsLayer.querySelectorAll('.state-label').forEach(l=> l.classList.toggle('is-visible', !!window.STATES_META[l.textContent]));
  clearMarkers();
  setBreadcrumb(null);
  el.backBtn.classList.remove('is-visible');
  el.stageIntro.style.opacity = '1';
  hideStatePanel();
  if(!opts.silent) updateHash(null, null);
}

/* ---------------------------------------------------------------------- */
/* HASH ROUTING                                                           */
/* ---------------------------------------------------------------------- */
function updateHash(stateName, destId){
  const meta = stateName ? window.STATES_META[stateName] : null;
  const d = destId ? byId.get(destId) : null;
  let hash = '';
  if(meta && d) hash = `#/india/${meta.slug}/${d.slug}`;
  else if(meta) hash = `#/india/${meta.slug}`;
  history.pushState(null,'', hash || '#/');
}
function parseHash(){
  const h = location.hash.replace(/^#\/?/, '');
  const parts = h.split('/').filter(Boolean);
  if(parts[0] !== 'india' || !parts[1]) return { state:null, dest:null };
  const stateName = STATE_SLUGS.get(parts[1]);
  const dest = parts[2] ? bySlug.get(parts[2]) : null;
  return { state: stateName || null, dest: dest || null };
}
function applyRoute(){
  const { state, dest } = parseHash();
  if(dest){
    if(AppState.view !== 'state' || AppState.state !== dest.state) focusState(dest.state, {silent:true});
    openDestination(dest.id, {silent:true});
  } else if(state){
    closeDestination({silent:true});
    focusState(state, {silent:true});
  } else {
    closeDestination({silent:true});
    goIndia({silent:true});
  }
}
window.addEventListener('popstate', applyRoute);

/* ---------------------------------------------------------------------- */
/* STATE HOVER & SWITCHING (desktop & touch)                              */
/* ---------------------------------------------------------------------- */
if(!IS_TOUCH){
  statesLayer.addEventListener('mouseover', e => {
    const p = e.target.closest('.state-path');
    if(!p) return;
    statesLayer.querySelectorAll('.state-path').forEach(o => {
      if(o !== p && o.dataset.state !== AppState.state){
        o.classList.add('is-dim');
      } else {
        o.classList.remove('is-dim');
      }
    });
    p.classList.add('is-hover');
  });
  statesLayer.addEventListener('mouseout', e => {
    const p = e.target.closest('.state-path');
    if(!p) return;
    statesLayer.querySelectorAll('.state-path').forEach(o => {
      if(AppState.view === 'state'){
        o.classList.toggle('is-dim', o.dataset.state !== AppState.state);
      } else {
        o.classList.remove('is-dim');
      }
    });
    p.classList.remove('is-hover');
  });
}

/* click / keyboard activation for states */
function activateState(name){
  if(AppState.state === name) return;
  if(window.STATES_META[name]){
    focusState(name);
  } else {
    toast(`Full guide for ${name} coming soon`);
  }
}
statesLayer.addEventListener('click', e => {
  const p = e.target.closest('.state-path'); if(!p) return;
  activateState(p.dataset.state);
});
statesLayer.addEventListener('keydown', e => {
  if(e.key!=='Enter' && e.key!==' ') return;
  const p = e.target.closest('.state-path'); if(!p) return;
  e.preventDefault(); activateState(p.dataset.state);
});

el.backBtn.addEventListener('click', () => goIndia());

/* ---------------------------------------------------------------------- */
/* PREVIEW CARD (desktop hover on markers)                                */
/* ---------------------------------------------------------------------- */
function renderPreview(dest){
  el.previewCard.innerHTML = `
    <div class="art">${artFor(dest)}</div>
    <div class="body">
      <div class="kicker">${dest.unesco && dest.unesco.status ? '<span class="badge">UNESCO</span>' : ''}<span class="badge" style="background:rgba(200,107,60,.1);color:var(--terracotta)">${dest.category[0]}</span></div>
      <h3>${dest.name}</h3>
      <div class="loc">${dest.city}, ${dest.state}</div>
      <p>${dest.shortDescription}</p>
      <span class="explore-link">Explore <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
    </div>`;
}
function positionPreview(x,y){
  const w=280, pad=18;
  let left = x + 22, top = y - 40;
  if(left + w + pad > window.innerWidth) left = x - w - 22;
  if(top < pad) top = pad;
  if(top + 360 > window.innerHeight) top = window.innerHeight - 380;
  el.previewCard.style.left = left+'px';
  el.previewCard.style.top = top+'px';
}
let hoveredMarker = null;
if(!IS_TOUCH){
  markersLayer.addEventListener('mousemove', e => {
    const m = e.target.closest('.marker');
    if(!m || !m.classList.contains('is-visible')){
      el.previewCard.classList.remove('is-visible');
      hoveredMarker = null;
      return;
    }
    if(m !== hoveredMarker){ hoveredMarker = m; renderPreview(byId.get(m.dataset.id)); }
    positionPreview(e.clientX, e.clientY);
    el.previewCard.classList.add('is-visible');
  });
  markersLayer.addEventListener('mouseleave', () => { el.previewCard.classList.remove('is-visible'); hoveredMarker=null; });
}

/* click / keyboard activation for markers */
markersLayer.addEventListener('click', e => {
  const m = e.target.closest('.marker'); if(!m || !m.classList.contains('is-visible')) return;
  handleMarkerActivate(m.dataset.id);
});
markersLayer.addEventListener('keydown', e => {
  if(e.key!=='Enter' && e.key!==' ') return;
  const m = e.target.closest('.marker'); if(!m) return;
  e.preventDefault(); handleMarkerActivate(m.dataset.id);
});
function handleMarkerActivate(id){
  if(IS_TOUCH) openSheet(byId.get(id));
  else openDestination(id);
}

/* ---------------------------------------------------------------------- */
/* MOBILE BOTTOM SHEET                                                    */
/* ---------------------------------------------------------------------- */
function openSheet(dest){
  el.bottomSheet.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-art art">${artFor(dest)}</div>
    <div class="sheet-body">
      <div class="kicker">${dest.unesco && dest.unesco.status ? '<span class="badge">UNESCO</span>' : ''}</div>
      <h3 class="display-s">${dest.name}</h3>
      <div class="loc" style="font-size:12px;color:var(--ink-45);margin:4px 0 10px;">${dest.city}, ${dest.state}</div>
      <p style="font-size:13.5px;color:var(--ink-70);margin-bottom:16px;">${dest.shortDescription}</p>
      <button class="btn-primary" id="sheet-explore">Explore <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
    </div>`;
  el.bottomSheet.classList.add('is-open');
  el.sheetScrim.classList.add('is-open');
  document.getElementById('sheet-explore').addEventListener('click', () => { closeSheet(); openDestination(dest.id); });
}
function closeSheet(){ el.bottomSheet.classList.remove('is-open'); el.sheetScrim.classList.remove('is-open'); }
el.sheetScrim.addEventListener('click', closeSheet);

/* touch tap on state also works via activateState -> focusState (zoom), then marker tap opens sheet */

/* ---------------------------------------------------------------------- */
/* DESTINATION PAGE                                                       */
/* ---------------------------------------------------------------------- */
function factRow(k,v){ return v ? `<div class="fact"><span class="k">${k}</span><span class="v">${v}</span></div>` : ''; }

function buildMiniMap(dest){
  const info = STATE_PATHS[dest.state];
  const box = computeZoomBox(info.bbox, 0.15);
  const nearbyIds = dest.nearby || [];
  const pts = [dest, ...nearbyIds.map(id=>byId.get(id)).filter(Boolean)];
  const markers = pts.map((p,i)=>`<circle cx="${p._x}" cy="${p._y}" r="${i===0?5:3.5}" fill="${i===0?'#8D3028':'#C9A86A'}" stroke="#F7F3EC" stroke-width="1"/>`).join('');
  return `<svg viewBox="${box.x} ${box.y} ${box.w} ${box.h}" xmlns="http://www.w3.org/2000/svg">
    <path d="${info.d}" fill="#EFE7D8" stroke="rgba(17,17,17,.25)" stroke-width="1.4" vector-effect="non-scaling-stroke"/>
    ${markers}
  </svg>`;
}

function renderDestination(dest){
  let nearby = (dest.nearby||[]).map(id=>byId.get(id)).filter(Boolean);
  if(!nearby.length){
    nearby = (byState.get(dest.state)||[]).filter(d=>d.id!==dest.id).slice(0,3);
  }
  const fav = isFav(dest.id);

  el.destPage.innerHTML = `
    <button class="dest-close" id="dest-close-btn" aria-label="Close destination guide">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <button class="view-toggle-btn" id="art-mode-toggle" title="Toggle Photo / Line Art Etching">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
      <span id="art-mode-label">Switch to Line Art</span>
    </button>

    <header class="dest-hero">
      <div class="art">${artFor(dest, '')}</div>
      <div class="dest-hero-scrim"></div>
      <div class="dest-hero-content">
        <div class="eyebrow reveal is-in">${dest.category.join(' · ')}${dest.unesco&&dest.unesco.status?` · UNESCO ${dest.unesco.year}`:''}</div>
        <h1>${dest.name}</h1>
        <div class="loc-line">${dest.city}<span class="sep">·</span>${dest.state}<span class="sep">·</span>${dest.country}</div>
        <button class="fav-toggle ${fav?'is-fav':''}" id="hero-fav">
          <svg viewBox="0 0 24 24" fill="${fav?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.35-9.5-8.5C.5 8 2.5 4.5 6.2 4.5c2 0 3.4 1 5.8 3.5 2.4-2.5 3.8-3.5 5.8-3.5 3.7 0 5.7 3.5 3.7 8C19 16.65 12 21 12 21z"/></svg>
          ${fav?'Saved':'Save to Journey'}
        </button>
      </div>
      <div class="scroll-cue">Scroll to explore <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M6 13l6 6 6-6"/></svg></div>
    </header>

    <div class="dest-body">
      <section class="dest-section" id="sec-overview">
        <div class="section-head"><span class="section-num">01</span><h2>Overview</h2></div>
        <div class="overview-grid">
          <p class="reveal">${dest.overview}</p>
          <div class="fact-list reveal">
            ${factRow('City', dest.city)}
            ${factRow('State', dest.state)}
            ${factRow('Heritage status', dest.unesco&&dest.unesco.status ? `UNESCO · ${dest.unesco.year}` : 'Not UNESCO-listed')}
            ${factRow('Category', dest.category.join(', '))}
          </div>
        </div>
      </section>

      <section class="dest-section" id="sec-why">
        <div class="section-head"><span class="section-num">02</span><h2>Why Visit</h2></div>
        <div class="reason-grid">
          ${dest.whyVisit.map((r,i)=>`<div class="reason reveal"><span class="n">0${i+1}</span><h3>${r.title}</h3><p>${r.text}</p></div>`).join('')}
        </div>
      </section>

      <section class="dest-section" id="sec-history">
        <div class="section-head"><span class="section-num">03</span><h2>History</h2></div>
        <p class="section-lede reveal">Documented dates from Archaeological Survey of India and UNESCO records — traditions and legends are marked separately from verified history.</p>
        <div class="timeline" id="timeline">
          ${dest.history.map(h=>`<div class="t-item reveal"><div class="yr">${h.year}</div><p>${h.text}</p>${h.legend?'<span class="legend-tag">Tradition, not verified history</span>':''}</div>`).join('')}
        </div>
      </section>

      <section class="dest-section" id="sec-explore">
        <div class="section-head"><span class="section-num">04</span><h2>Explore</h2></div>
        <div class="explore-grid">
          ${dest.explore.map(x=>`<div class="explore-card reveal"><div class="art">${x.image ? `<div class="photo-art-wrap"><img src="${x.image}" class="photo-img" alt="${x.name}" loading="lazy"></div>` : artSVG(dest.motif, dest.accent, '')}</div><h3>${x.name}</h3><p>${x.text}</p><div class="notice">${x.notice}</div></div>`).join('')}
        </div>
      </section>

      <section class="dest-section" id="sec-miss">
        <div class="section-head"><span class="section-num">05</span><h2>Don't Miss</h2></div>
        <div class="miss-list">
          ${dest.dontMiss.map((m,i)=>`<div class="miss-item reveal"><span class="n">0${i+1}</span><div class="art">${m.image ? `<div class="photo-art-wrap"><img src="${m.image}" class="photo-img" alt="${m.title}" loading="lazy"></div>` : artSVG(dest.motif, dest.accent,'')}</div><div><h3>${m.title}</h3><p>${m.text}</p></div></div>`).join('')}
        </div>
      </section>

      <section class="dest-section" id="sec-closer">
        <div class="section-head"><span class="section-num">06</span><h2>Look Closer</h2></div>
        <p class="section-lede reveal">${dest.lookCloser.intro}</p>
        <div class="closer-wrap reveal">
          <div class="art">${dest.lookCloser.image ? `<div class="photo-art-wrap"><img src="${dest.lookCloser.image}" class="photo-img" alt="${dest.name}"></div>` : artSVG(dest.motif, dest.accent, dest.name)}</div>
          ${dest.lookCloser.hotspots.map((h,i)=>`<button class="hotspot" data-i="${i}" style="left:${h.x}%;top:${h.y}%" aria-label="${h.title}"></button>`).join('')}
          ${dest.lookCloser.hotspots.map((h,i)=>`<div class="hotspot-card" data-i="${i}" style="left:${Math.min(h.x+4,68)}%;top:${Math.max(h.y-6,4)}%"><div class="k">${h.title}</div><p>${h.text}</p></div>`).join('')}
        </div>
      </section>

      <section class="dest-section" id="sec-best">
        <div class="section-head"><span class="section-num">07</span><h2>Best Experience</h2></div>
        <div class="route-wrap">
          <div class="route-steps reveal">
            ${dest.bestExperience.route.map(s=>`<div class="route-step"><b>${s.title}</b><span>${s.note}</span></div>`).join('')}
          </div>
          <div class="exp-tips reveal">
            ${dest.bestExperience.tips.map(t=>`<div class="exp-tip"><div class="k">${t.k}</div><p>${t.text}</p></div>`).join('')}
          </div>
        </div>
      </section>

      <section class="dest-section" id="sec-plan">
        <div class="section-head"><span class="section-num">08</span><h2>Plan Your Visit</h2></div>
        <div class="plan-grid reveal">
          <div class="plan-card"><div class="k">Opening hours</div><div class="v">${dest.plan.hours}</div><div class="sub">${dest.plan.closedDay||''}</div></div>
          <div class="plan-card"><div class="k">Best time</div><div class="v">${dest.plan.bestTime}</div></div>
          <div class="plan-card"><div class="k">Time needed</div><div class="v">${dest.plan.duration}</div></div>
          <div class="plan-card"><div class="k">Entry — Indian</div><div class="v">${dest.plan.entryIndian}</div>${dest.plan.childFree?`<div class="sub">Children ${dest.plan.childFree} free</div>`:''}</div>
          <div class="plan-card"><div class="k">Entry — Foreign</div><div class="v">${dest.plan.entryForeign}</div>${dest.plan.entrySaarc?`<div class="sub">SAARC/BIMSTEC: ${dest.plan.entrySaarc}</div>`:''}</div>
          <div class="plan-card"><div class="k">Location</div><div class="v" style="font-size:15px">${dest.city}</div><div class="sub">${dest.state}</div></div>
        </div>
        <div class="verify-note reveal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
          <span>${dest.plan.note || 'Fees and hours change without notice.'} Last checked ${window.LAST_VERIFIED} — confirm on the <a href="${dest.plan.bookingUrl}" target="_blank" rel="noopener">official booking portal</a> before you travel.</span>
        </div>
      </section>

      <section class="dest-section" id="sec-nearby">
        <div class="section-head"><span class="section-num">09</span><h2>Nearby</h2></div>
        <div class="nearby-grid">
          <div class="nearby-list reveal">
            ${nearby.length ? nearby.map(n=>`<div class="nearby-item" data-id="${n.id}"><div class="thumb">${artSVG(n.motif,n.accent,'')}</div><div class="meta"><h4>${n.name}</h4><div class="dist">${n.city}, ${n.state}</div></div></div>`).join('') : `<div style="padding:20px;color:var(--ink-45);font-size:13px;">More ${dest.state} destinations are on their way.</div>`}
          </div>
          <div class="mini-map reveal">${buildMiniMap(dest)}</div>
        </div>
      </section>

      <div class="dest-cta reveal">
        <h2 class="display-m">Where to next?</h2>
        <button class="btn-primary" id="explore-more-btn">Back to ${dest.state} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
      </div>
      <div class="dest-foot">Sources: ${(dest.sources||[]).map(s=>`<a href="${s.url}" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;text-underline-offset:2px;">${s.label}</a>`).join(' · ')}<br>Content last verified ${window.LAST_VERIFIED}.</div>
    </div>
  `;

  document.getElementById('dest-close-btn').addEventListener('click', () => closeDestination());
  const toggleBtn = document.getElementById('art-mode-toggle');
  if(toggleBtn){
    let showingEtching = false;
    toggleBtn.addEventListener('click', () => {
      showingEtching = !showingEtching;
      const heroArt = el.destPage.querySelector('.dest-hero .art');
      if(heroArt){
        heroArt.innerHTML = showingEtching ? artSVG(dest.motif, dest.accent, dest.name) : photoOrArt(dest, '');
        document.getElementById('art-mode-label').textContent = showingEtching ? 'Show Real Photo' : 'Switch to Line Art';
      }
    });
  }
  document.getElementById('hero-fav').addEventListener('click', (e) => {
    const nowFav = toggleFav(dest.id);
    e.currentTarget.classList.toggle('is-fav', nowFav);
    e.currentTarget.innerHTML = `<svg viewBox="0 0 24 24" fill="${nowFav?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.35-9.5-8.5C.5 8 2.5 4.5 6.2 4.5c2 0 3.4 1 5.8 3.5 2.4-2.5 3.8-3.5 5.8-3.5 3.7 0 5.7 3.5 3.7 8C19 16.65 12 21 12 21z"/></svg>${nowFav?'Saved':'Save to Journey'}`;
    toast(nowFav ? `Added ${dest.name} to My Journey` : `Removed ${dest.name} from My Journey`);
  });
  document.getElementById('explore-more-btn').addEventListener('click', () => closeDestination());
  el.destPage.querySelectorAll('.nearby-item').forEach(it => {
    it.addEventListener('click', () => openDestination(it.dataset.id));
  });
  el.destPage.querySelectorAll('.hotspot').forEach(h => {
    h.addEventListener('click', () => {
      const i = h.dataset.i;
      const wasOpen = h.classList.contains('is-open');
      el.destPage.querySelectorAll('.hotspot').forEach(x=>x.classList.remove('is-open'));
      el.destPage.querySelectorAll('.hotspot-card').forEach(x=>x.classList.remove('is-open'));
      if(!wasOpen){ h.classList.add('is-open'); el.destPage.querySelector(`.hotspot-card[data-i="${i}"]`).classList.add('is-open'); }
    });
  });

  const revealEls = el.destPage.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en => { if(en.isIntersecting) en.target.classList.add('is-in'); });
  }, {root: el.destPage, threshold:0.12});
  revealEls.forEach(r=>io.observe(r));

  const timeline = document.getElementById('timeline');
  if(timeline){
    const items = timeline.querySelectorAll('.t-item');
    const tio = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('is-in'); });
    }, {root: el.destPage, threshold:0.4});
    items.forEach(i=>tio.observe(i));
  }
}

function openDestination(id, opts){
  opts = opts || {};
  const dest = byId.get(id); if(!dest) return;
  renderDestination(dest);
  AppState.destId = id;
  el.destPage.style.display = 'block';
  requestAnimationFrame(()=> el.destPage.classList.add('is-open'));
  el.destPage.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  if(!opts.silent) updateHash(dest.state, id);
}
function closeDestination(opts){
  opts = opts || {};
  if(!AppState.destId){ return; }
  el.destPage.classList.remove('is-open');
  document.body.style.overflow = '';
  AppState.destId = null;
  setTimeout(()=>{ if(!AppState.destId) el.destPage.style.display='none'; }, REDUCED_MOTION?10:640);
  if(!opts.silent) updateHash(AppState.state, null);
}
document.addEventListener('keydown', e => {
  if(e.key==='Escape' && AppState.destId) closeDestination();
});

/* ---------------------------------------------------------------------- */
/* SEARCH                                                                 */
/* ---------------------------------------------------------------------- */
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

function openSearch(){ searchOverlay.classList.add('is-open'); searchInput.value=''; renderSearchResults(''); setTimeout(()=>searchInput.focus(), 50); }
function closeSearch(){ searchOverlay.classList.remove('is-open'); }

let selectedSearchIdx = -1;
function renderSearchResults(q){
  selectedSearchIdx = -1;
  q = q.trim().toLowerCase();
  if(!q){ searchResults.innerHTML = `<div class="search-hint">Try "Taj Mahal", "Delhi", "forts", or "UNESCO"</div>`; return; }
  const results = DESTS.filter(d => {
    const hay = [d.name, d.city, d.state, d.category.join(' '), d.unesco&&d.unesco.status?'unesco':''].join(' ').toLowerCase();
    return hay.includes(q);
  }).slice(0,10);
  if(!results.length){ searchResults.innerHTML = `<div class="search-hint">No matches for "${q}" yet — more destinations are on their way.</div>`; return; }
  searchResults.innerHTML = results.map(d => `
    <div class="search-result" data-id="${d.id}">
      <div class="thumb">${artSVG(d.motif,d.accent,'')}</div>
      <div class="meta"><h4>${d.name}</h4><span>${d.city}, ${d.state}${d.unesco&&d.unesco.status?' · UNESCO':''}</span></div>
    </div>`).join('');
  searchResults.querySelectorAll('.search-result').forEach(r => {
    r.addEventListener('click', () => {
      const d = byId.get(r.dataset.id);
      closeSearch();
      focusState(d.state);
      setTimeout(()=> openDestination(d.id), REDUCED_MOTION?0:500);
    });
  });
}
searchInput.addEventListener('input', e => renderSearchResults(e.target.value));
searchInput.addEventListener('keydown', e => {
  const items = searchResults.querySelectorAll('.search-result');
  if(!items.length) return;
  if(e.key === 'ArrowDown'){
    e.preventDefault();
    selectedSearchIdx = Math.min(selectedSearchIdx + 1, items.length - 1);
    items.forEach((it, i) => it.classList.toggle('is-selected', i === selectedSearchIdx));
    if(items[selectedSearchIdx]) items[selectedSearchIdx].scrollIntoView({block:'nearest'});
  } else if(e.key === 'ArrowUp'){
    e.preventDefault();
    selectedSearchIdx = Math.max(selectedSearchIdx - 1, 0);
    items.forEach((it, i) => it.classList.toggle('is-selected', i === selectedSearchIdx));
    if(items[selectedSearchIdx]) items[selectedSearchIdx].scrollIntoView({block:'nearest'});
  } else if(e.key === 'Enter'){
    e.preventDefault();
    const targetItem = selectedSearchIdx >= 0 ? items[selectedSearchIdx] : items[0];
    if(targetItem) targetItem.click();
  }
});
searchOverlay.addEventListener('click', e => { if(e.target===searchOverlay) closeSearch(); });
document.getElementById('search-btn').addEventListener('click', openSearch);
document.addEventListener('keydown', e => {
  if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openSearch(); }
  if(e.key==='Escape' && searchOverlay.classList.contains('is-open')) closeSearch();
});

/* ---------------------------------------------------------------------- */
/* FAVORITES DRAWER                                                       */
/* ---------------------------------------------------------------------- */
const drawer = document.getElementById('drawer');
const drawerScrim = document.getElementById('drawer-scrim');
function renderDrawer(){
  const favs = getFavs().map(id=>byId.get(id)).filter(Boolean);
  const body = document.getElementById('drawer-body');
  if(!favs.length){ body.innerHTML = `<div class="drawer-empty">Tap the heart on any destination to start planning your India journey.</div>`; return; }
  body.innerHTML = favs.map(d => `
    <div class="fav-item">
      <div class="thumb" data-id="${d.id}">${artSVG(d.motif,d.accent,'')}</div>
      <div class="meta" data-id="${d.id}"><h4>${d.name}</h4><span>${d.city}, ${d.state}</span></div>
      <button class="remove" data-remove="${d.id}" aria-label="Remove"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>`).join('');
  body.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => { toggleFav(b.dataset.remove); renderDrawer(); }));
  body.querySelectorAll('.thumb, .meta').forEach(b => b.addEventListener('click', () => {
    const d = byId.get(b.dataset.id); closeDrawer(); focusState(d.state); setTimeout(()=>openDestination(d.id), REDUCED_MOTION?0:500);
  }));
}
function openDrawer(){ renderDrawer(); drawer.classList.add('is-open'); drawerScrim.classList.add('is-open'); }
function closeDrawer(){ drawer.classList.remove('is-open'); drawerScrim.classList.remove('is-open'); }
document.getElementById('fav-btn').addEventListener('click', openDrawer);
document.getElementById('drawer-close').addEventListener('click', closeDrawer);
drawerScrim.addEventListener('click', closeDrawer);
renderFavCount();

/* ---------------------------------------------------------------------- */
/* FILTER BAR                                                             */
/* ---------------------------------------------------------------------- */
let activeFilter = null;
function buildFilterBar(){
  const chips = ['All', ...window.CATEGORIES];
  el.filterBar.innerHTML = chips.map(c=>`<button class="filter-chip ${c==='All'?'is-active':''}" data-cat="${c}">${c}</button>`).join('');
  el.filterBar.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      el.filterBar.querySelectorAll('.filter-chip').forEach(b=>b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeFilter = btn.dataset.cat === 'All' ? null : btn.dataset.cat;
      applyFilter();
    });
  });
}
function applyFilter(){
  statesLayer.querySelectorAll('.state-path').forEach(p => {
    const name = p.dataset.state;
    const list = byState.get(name) || [];
    const match = !activeFilter || list.some(d => d.category.includes(activeFilter));
    p.style.opacity = (!activeFilter || match) ? '' : '.35';
  });
  if(AppState.view === 'state'){
    markersForState(AppState.state);
  } else {
    markersLayer.querySelectorAll('.marker').forEach(m => {
      const d = byId.get(m.dataset.id);
      const match = !activeFilter || d.category.includes(activeFilter);
      m.style.display = match ? '' : 'none';
    });
  }
}
buildFilterBar();

/* ---------------------------------------------------------------------- */
/* NAV SCROLL STATE                                                       */
/* ---------------------------------------------------------------------- */
const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => { navEl.classList.toggle('is-solid', window.scrollY>10); });
el.destPage.addEventListener('scroll', () => { navEl.classList.toggle('is-solid', el.destPage.scrollTop>10 && el.destPage.classList.contains('is-open')); });

/* ---------------------------------------------------------------------- */
/* THEME TOGGLE (dark / light, persisted like the other Antara apps)      */
/* ---------------------------------------------------------------------- */
function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('antara_theme', theme);
  const icon = document.getElementById('theme-toggle-icon');
  const btn = document.getElementById('theme-toggle-btn');
  if(icon) icon.textContent = theme === 'dark' ? '☀' : '☾';
  if(btn){
    btn.setAttribute('title', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
}
applyTheme(localStorage.getItem('antara_theme') || 'dark');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
if(themeToggleBtn){
  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

document.getElementById('nav-brand').addEventListener('click', () => { closeDestination(); goIndia(); });
document.querySelectorAll('[data-scrollto]').forEach(b=>{
  b.addEventListener('click', ()=>{
    closeDestination(); goIndia();
    const t = b.dataset.scrollto && document.getElementById(b.dataset.scrollto);
    if(t) t.scrollIntoView({behavior: REDUCED_MOTION?'auto':'smooth'});
  });
});
document.getElementById('nav-heritage').addEventListener('click', () => {
  closeDestination(); goIndia();
  const chip = el.filterBar.querySelector('[data-cat="UNESCO"]');
  if(chip) chip.click();
  toast('Showing UNESCO World Heritage Sites');
});
document.getElementById('nav-states').addEventListener('click', () => {
  closeDestination(); goIndia();
  const chip = el.filterBar.querySelector('[data-cat="All"]');
  if(chip) chip.click();
  toast('Hover or tap any state to begin exploring');
});
document.getElementById('nav-about').addEventListener('click', () => {
  toast('Antara — a cartographic guide to India\u2019s heritage, built for exploration.');
});

/* ---------------------------------------------------------------------- */
/* CUSTOM CURSOR (desktop only)                                           */
/* ---------------------------------------------------------------------- */
if(!IS_TOUCH){
  const cursor = document.getElementById('cursor-dot');
  window.addEventListener('mousemove', e => { cursor.style.left = e.clientX+'px'; cursor.style.top = e.clientY+'px'; });
  document.addEventListener('mouseover', e => {
    if(e.target.closest('button, a, .state-path, .marker, input')) cursor.classList.add('is-hover');
  });
  document.addEventListener('mouseout', e => {
    if(e.target.closest('button, a, .state-path, .marker, input')) cursor.classList.remove('is-hover');
  });
}

/* ---------------------------------------------------------------------- */
/* INIT                                                                    */
/* ---------------------------------------------------------------------- */
function init(){
  applyRoute();
  setTimeout(()=>{ document.getElementById('loader').classList.add('is-hidden'); }, REDUCED_MOTION?50:900);
}
init();

})();
