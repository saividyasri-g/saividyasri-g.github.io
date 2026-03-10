const LAYERS = 6;
const EASE = 0.12;
const MAX_ROT_Y = 10;
const MAX_ROT_X = 8;
const LAYER_STEP_X = 0.33;
const LAYER_STEP_Y = 0.19;

const uploadScr   = document.getElementById('upload-screen');
const sceneEl     = document.getElementById('scene');
const headStack   = document.getElementById('head-stack');
const emitter     = document.getElementById('emitter');
const fileInput   = document.getElementById('file-input');
const dropZone    = document.getElementById('drop-zone');
const progWrap    = document.getElementById('prog-wrap');
const progBar     = document.getElementById('prog-bar');
const errMsg      = document.getElementById('err-msg');
const resetBtn    = document.getElementById('reset-btn');

let layerVids = [];
let layerEls = [];
let blobUrl = null, running = false;
let rotX = 0, rotY = 0;
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

// ── Load video ────────────────────────────────────────────────────────────
function loadVideo(file) {
  cleanup();
  blobUrl = URL.createObjectURL(file);

  let launched = false, readyCnt = 0;

  for (let i = 0; i < LAYERS; i++) {
    const div = document.createElement('div');
    div.className = 'layer';

    const v = document.createElement('video');
    v.src = blobUrl;
    v.muted = true;
    v.loop = true;
    v.autoplay = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.setAttribute('muted', '');
    v.setAttribute('autoplay', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');

    div.appendChild(v);
    headStack.appendChild(div);
    layerEls.push(div);
    layerVids.push(v);

    v.addEventListener('canplay',    () => {
      readyCnt++;
      if (progBar) progBar.style.width = Math.min(90, 10 + readyCnt * (80 / LAYERS)) + '%';
      if (readyCnt >= LAYERS && !launched) { launched = true; launch(); }
    }, { once:true });
    v.addEventListener('loadeddata', () => { if (!launched && readyCnt >= 1) { launched=true; launch(); } }, { once:true });
    v.addEventListener('error',      () => {
      const c=v.error?v.error.code:'?';
      const m={1:'ABORTED',2:'NETWORK',3:'DECODE ERROR',4:'FORMAT NOT SUPPORTED'};
      showErr('✗ '+(m[c]||'ERROR')+' — code '+c);
    }, { once:true });
    v.load();
  }
  setTimeout(() => { if (!launched) { launched=true; launch(); } }, 5000);
}

function launch() {
  if (progBar) progBar.style.width = '100%';
  layerVids.forEach(v => { v.currentTime=0; v.play().catch(()=>{}); });
  setTimeout(() => {
    if (uploadScr) uploadScr.style.display = 'none';
    sceneEl.style.display   = 'block';
    const faceEl = document.getElementById('face-section');
    const emitterSection = document.getElementById('emitter-section');

    if (faceEl) {
      faceEl.classList.remove('is-revealing', 'is-revealed', 'is-glitching');
      faceEl.style.opacity = '0';
    }
    if (headStack) headStack.style.opacity = '0';

    if (emitterSection) emitterSection.classList.add('is-booting');
    if (!emitterRunning) {
      emitterRunning = true;
      requestAnimationFrame(emitterLoop);
    }

    const revealDuration = 1600;
    const glitchDuration = 500;

    setTimeout(() => {
      if (emitterSection) emitterSection.classList.remove('is-booting');
      if (faceEl) faceEl.classList.add('is-revealing');
      setTimeout(() => {
        if (faceEl) faceEl.classList.add('is-glitching');
        if (headStack) headStack.classList.add('is-loaded');
        if (headStack) headStack.style.opacity = '1';
        running = true;
        requestAnimationFrame(tick);
        setTimeout(() => {
          if (faceEl) {
            faceEl.classList.add('is-revealed');
            faceEl.classList.remove('is-revealing', 'is-glitching');
            faceEl.style.opacity = '1';
          }
          if (headStack) headStack.style.opacity = '1';
          if (window.parent) {
            window.parent.postMessage({ type: 'holo-ready' }, '*');
          }
        }, glitchDuration);
      }, revealDuration);
    }, 750);
  }, 150);
}

// ── Flicker intro — simulates hologram powering on ───────────────────────
function startFlickerIntro(onComplete) {
  const stack = document.getElementById('head-stack');
  const faceEl = document.getElementById('face-section');
  const emitterEl = document.getElementById('emitter');

  // Flicker sequence: [opacity, duration_ms]
  const seq = [
    [0.0,  60],
    [0.9,  40],
    [0.0,  80],
    [0.6,  30],
    [0.0,  60],
    [1.0,  50],
    [0.0,  40],
    [0.8,  60],
    [0.2,  30],
    [1.0,  40],
    [0.0,  50],
    [0.7,  30],
    [0.0,  40],
    [1.0,  60],
    [0.3,  20],
    [1.0,  80],
    [0.0,  30],
    [1.0, 120],  // settle
  ];

  let i = 0;
  if (!emitterRunning) {
    emitterRunning = true;
    requestAnimationFrame(emitterLoop); // emitter flickers on too
  }

  function step() {
    if (i >= seq.length) {
      if (faceEl) faceEl.style.opacity = '1';
      stack.style.opacity    = '1';
      emitterEl.style.opacity = '0.35';
      if (window.parent) {
        window.parent.postMessage({ type: 'holo-ready' }, '*');
      }
      onComplete();
      return;
    }
    const [op, dur] = seq[i++];
    if (faceEl) faceEl.style.opacity = String(op);
    stack.style.opacity     = String(op);
    emitterEl.style.opacity  = String(op * 0.35);
    setTimeout(step, dur);
  }
  step();
}

// ── Emitter always-on loop — independent of mouse movement ───────────────
let emitterRunning = false;
function emitterLoop() {
  if (!emitterRunning) return;
  drawEmitter();
  requestAnimationFrame(emitterLoop);
}

function showErr(msg) {
  if (errMsg) { errMsg.textContent = msg; errMsg.style.display = 'block'; }
  if (progWrap) progWrap.style.display = 'none';
}

// ── Sync ──────────────────────────────────────────────────────────────────
setInterval(() => {
  if (!running || !layerVids[0]) return;
  const t = layerVids[0].currentTime;
  for (let i=1; i<LAYERS; i++) {
    const v=layerVids[i];
    if (v && v.readyState>=2 && Math.abs(v.currentTime-t)>0.12) v.currentTime=t;
  }
}, 400);

// ── Mouse ─────────────────────────────────────────────────────────────────
document.addEventListener('mousemove', e => { mouseX=e.clientX; mouseY=e.clientY; });
document.addEventListener('touchmove', e => { mouseX=e.touches[0].clientX; mouseY=e.touches[0].clientY; }, {passive:true});

window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || data.type !== 'holo-pointer') return;
  if (typeof data.nx !== 'number' || typeof data.ny !== 'number') return;
  mouseX = data.nx * window.innerWidth;
  mouseY = data.ny * window.innerHeight;
});

// ── Tick ──────────────────────────────────────────────────────────────────
function tick(ts) {
  if (!running) return;
  requestAnimationFrame(tick);

  // Get face center
  const facePivotEl = document.getElementById('face-pivot');
  const r  = facePivotEl.getBoundingClientRect();
  const cx = r.left + r.width  * 0.5;
  const cy = r.top  + r.height * 0.42;

  const nx = Math.max(-1, Math.min(1, (mouseX - cx) / (r.width * 0.5)));
  const ny = Math.max(-1, Math.min(1, (mouseY - cy) / (r.height * 0.5)));

  const tY =  nx * MAX_ROT_Y;
  const tX = -ny * MAX_ROT_X;

  rotX += (tX - rotX) * EASE;
  rotY += (tY - rotY) * EASE;

  // Rotate the 3D face stack
  headStack.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;

  const nxSmooth = MAX_ROT_Y === 0 ? 0 : rotY / MAX_ROT_Y;
  const nySmooth = MAX_ROT_X === 0 ? 0 : -rotX / MAX_ROT_X;

  // Per-layer offsets create the depth slice illusion
  layerEls.forEach((layer, i) => {
    const depth = (LAYERS - 1 - i);
    const x = nxSmooth * LAYER_STEP_X * depth;
    const y = nySmooth * LAYER_STEP_Y * depth;
    layer.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0px)`;
  });

  // Emitter: reference uses scaleY(0.65) base + slight rotate from mouse
  // transform-origin is 50% 100% (bottom) so it tilts from base
  // We add a small rotate() matching horizontal mouse offset
  const emitRotate = rotY * 0.1; // stronger tilt to match head rotation
  emitter.style.transform = `rotate(${emitRotate}deg)`;
}

// ── Emitter canvas renderer ───────────────────────────────────────────────
// Canvas overlays animated scanlines + glitch on top of the solid CSS bg
const emitterCanvas = document.getElementById('emitter-canvas');
const eCtx = emitterCanvas.getContext('2d');
const EW = 150, EH = 220;
emitterCanvas.width  = EW;
emitterCanvas.height = EH;

// Scanline state — each line independent speed, opacity, glitch
const NUM_LINES = 40;
const elines = Array.from({length: NUM_LINES}, (_, i) => ({
  y:           (i / NUM_LINES) * EH,
  speed:       0.5 + Math.random() * 1.0,
  opacity:     0.3 + Math.random() * 0.5,
  glitchX:     0,
  glitchTimer: 0,
  tone:        (i % 5 === 0) ? 'yellow' : 'pink',
}));

let emitterTime = 0;

function drawEmitter() {
  emitterTime += 0.016;
  eCtx.clearRect(0, 0, EW, EH);

  // ── Scanlines: scroll upward (emitting upward toward face) ──
  elines.forEach(ln => {
    ln.y -= ln.speed; // move UP — projecting toward the face
    if (ln.y < -2) {
      ln.y       = EH + 2;
      ln.speed   = 0.5 + Math.random() * 1.0;
      ln.opacity = 0.25 + Math.random() * 0.5;
      ln.glitchX = 0;
      ln.tone    = (Math.random() < 0.25) ? 'yellow' : 'pink';
    }

    // Glitch: random horizontal snap
    if (ln.glitchTimer > 0) {
      ln.glitchTimer--;
    } else if (Math.random() < 0.005) {
      ln.glitchX     = (Math.random() - 0.5) * 22;
      ln.glitchTimer = 2 + Math.floor(Math.random() * 6);
    } else {
      ln.glitchX *= 0.85; // smooth return
    }

    // Fade: lines near top (close to face) = more visible
    // lines near bottom = fade out (matches mask: transparent top → solid bottom
    // but we want scanlines visible more at top where they project from)
    const t         = ln.y / EH; // 0=top, 1=bottom
    const lineFade  = Math.max(0, 1 - t * 1.1); // brighter at top
    if (lineFade <= 0.01) return;

    const alpha = ln.opacity * lineFade;

    // Full width of canvas (clip-path on parent handles trapezoid shape)
    const x1 = ln.glitchX;
    const x2 = EW + ln.glitchX;

    // Horizontal glow — bright center, fade edges
    const grad = eCtx.createLinearGradient(x1, 0, x2, 0);
    if (ln.tone === 'yellow') {
      grad.addColorStop(0,    `rgba(245,195,118,0)`);
      grad.addColorStop(0.18, `rgba(245,195,118,${alpha * 0.7})`);
      grad.addColorStop(0.5,  `rgba(255,214,138,${alpha})`);
      grad.addColorStop(0.82, `rgba(245,195,118,${alpha * 0.7})`);
      grad.addColorStop(1,    `rgba(245,195,118,0)`);
    } else {
      grad.addColorStop(0,    `rgba(211,12,174,0)`);
      grad.addColorStop(0.18, `rgba(211,12,174,${alpha * 0.7})`);
      grad.addColorStop(0.5,  `rgba(236,86,184,${alpha})`);
      grad.addColorStop(0.82, `rgba(211,12,174,${alpha * 0.7})`);
      grad.addColorStop(1,    `rgba(211,12,174,0)`);
    }

    eCtx.strokeStyle = grad;
    eCtx.lineWidth   = 1;
    eCtx.beginPath();
    eCtx.moveTo(x1, ln.y);
    eCtx.lineTo(x2, ln.y);
    eCtx.stroke();
  });

  // ── Pulse wave scrolling upward — bright energy band ──
  const pulseY = EH - ((emitterTime * 55) % (EH + 30));
  const pAlpha = Math.max(0, (pulseY / EH)); // brighter when higher up
  const pulseGrad = eCtx.createLinearGradient(0, pulseY - 10, 0, pulseY + 10);
  pulseGrad.addColorStop(0,   'rgba(211,12,174,0)');
  pulseGrad.addColorStop(0.5, `rgba(236,86,184,${0.22 * pAlpha})`);
  pulseGrad.addColorStop(1,   'rgba(211,12,174,0)');
  eCtx.fillStyle = pulseGrad;
  eCtx.fillRect(0, pulseY - 10, EW, 20);
}

if (!emitterRunning) {
  emitterRunning = true;
  requestAnimationFrame(emitterLoop);
}

// ── Reset ─────────────────────────────────────────────────────────────────────
function cleanup() {
  running = false;
  layerVids.forEach(v => { try { v.pause(); v.src=''; v.parentNode&&v.parentNode.remove(); } catch(e){} });
  layerVids = [];
  layerEls = [];
  if (headStack) headStack.classList.remove('is-loaded');
  while (headStack.firstChild) headStack.removeChild(headStack.firstChild);
  if (blobUrl) { URL.revokeObjectURL(blobUrl); blobUrl=null; }
  rotX=rotY=0;
  headStack.style.transform='';
  emitter.style.transform='';
  emitterRunning = false;
  eCtx.clearRect(0,0,EW,EH);
}

function doReset() {
  cleanup();
  sceneEl.style.display = 'none';
  if (resetBtn) resetBtn.style.display = 'none';
  if (uploadScr) uploadScr.style.display = 'flex';
  if (progWrap) progWrap.style.display = 'none';
  if (progBar) progBar.style.width = '0%';
  if (errMsg) errMsg.style.display = 'none';
  if (fileInput) fileInput.value = '';
}

// Auto-load video
fetch('hologram.webm')
  .then(r => {
    if (!r.ok) throw new Error('Could not load hologram.webm');
    return r.blob();
  })
  .then(blob => loadVideo(blob))
  .catch(err => {
    console.error('Hologram load error:', err);
    sceneEl.style.display = 'block';
    emitterRunning = true;
    requestAnimationFrame(emitterLoop);
  });
