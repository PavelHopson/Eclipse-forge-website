import { useEffect, useRef } from 'react';

/**
 * Real-time black hole spaghettification simulation on Canvas 2D.
 *
 * Physics model:
 *   - Gravitational attraction toward the black hole: F = G·M / r²
 *   - Per-frame velocity + position integration (Euler, dt ≈ 16ms)
 *   - Particles consumed at event horizon → recycled to outer orbit with
 *     tangential velocity so the system stays in steady-state (seamless loop).
 *
 * Data structures:
 *   - Pre-allocated particle pool (no per-frame allocation)
 *   - Each particle carries a short trail buffer for spaghettification effect
 *     (the trail naturally stretches as velocity grows near the event horizon)
 *
 * Render loop:
 *   1. Motion-blur background (translucent dark rectangle)
 *   2. Additive composite ('lighter') pass for particles + trails
 *   3. Accretion-disk glow ring around EH
 *   4. Event horizon (pure black disk) with chromatic rim
 *
 * Color temperature: cool blue/purple far from BH → hot orange/white near EH.
 */

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  trailX: Float32Array;
  trailY: Float32Array;
  trailLen: number;
  hueBase: number;
  size: number;
}

const PARTICLE_COUNT = 420;
const MAX_TRAIL = 14;
const BH_MASS = 9000;
const EH_RADIUS = 28;
const GLOW_FALLOFF = 0.32;

export function BlackHoleCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let w = 0, h = 0;
    let cx = 0, cy = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h / 2;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Pre-allocate particle pool ────────────────────────────────
    const pool: Particle[] = new Array(PARTICLE_COUNT);

    const respawn = (p: Particle, scatterInitial = false) => {
      const angle = Math.random() * Math.PI * 2;
      const minDim = Math.min(w, h);
      const distBase = minDim * (scatterInitial ? 0.18 + Math.random() * 0.32 : 0.44 + Math.random() * 0.1);
      p.x = cx + Math.cos(angle) * distBase;
      p.y = cy + Math.sin(angle) * distBase;

      // Tangential velocity — perpendicular to radial direction
      const tanX = -Math.sin(angle);
      const tanY = Math.cos(angle);
      // Balance orbital speed so particles don't immediately escape or plunge
      const orbitalSpeed = Math.sqrt(BH_MASS / distBase) * (0.72 + Math.random() * 0.28);
      const spin = Math.random() > 0.02 ? 1 : -1; // rare retrograde for variety
      p.vx = tanX * orbitalSpeed * spin;
      p.vy = tanY * orbitalSpeed * spin;

      p.trailLen = 0;
      p.hueBase = 230 + Math.random() * 60; // start cool (blue 230 → violet 290)
      p.size = 0.7 + Math.random() * 1.8;
    };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p: Particle = {
        x: 0, y: 0, vx: 0, vy: 0,
        trailX: new Float32Array(MAX_TRAIL),
        trailY: new Float32Array(MAX_TRAIL),
        trailLen: 0,
        hueBase: 0,
        size: 0,
      };
      respawn(p, true);
      pool[i] = p;
    }

    // ── Render loop ────────────────────────────────────────────────
    let frameId = 0;
    let paused = false;

    const visibilityHandler = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', visibilityHandler);

    const step = () => {
      if (!paused) {
        // Motion blur — slight translucent bg preserves trails
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(5, 7, 10, 0.22)';
        ctx.fillRect(0, 0, w, h);

        // Particles rendered additively so overlaps get hot
        ctx.globalCompositeOperation = 'lighter';

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const p = pool[i];
          const dx = cx - p.x;
          const dy = cy - p.y;
          const distSq = dx * dx + dy * dy;

          // Consumption + off-screen recycling
          if (distSq < EH_RADIUS * EH_RADIUS) {
            respawn(p);
            continue;
          }
          if (p.x < -80 || p.x > w + 80 || p.y < -80 || p.y > h + 80) {
            respawn(p);
            continue;
          }

          const dist = Math.sqrt(distSq);
          const invDist = 1 / dist;

          // Gravitational acceleration — capped near EH for stability
          const cappedDistSq = Math.max(distSq, EH_RADIUS * EH_RADIUS * 0.25);
          const force = BH_MASS / cappedDistSq;
          const ax = dx * invDist * force;
          const ay = dy * invDist * force;

          // Semi-implicit Euler
          p.vx += ax * 0.016;
          p.vy += ay * 0.016;
          p.x += p.vx;
          p.y += p.vy;

          // Push to trail buffer (ring-buffer-ish, just slide when full)
          if (p.trailLen < MAX_TRAIL) {
            p.trailX[p.trailLen] = p.x;
            p.trailY[p.trailLen] = p.y;
            p.trailLen++;
          } else {
            for (let j = 0; j < MAX_TRAIL - 1; j++) {
              p.trailX[j] = p.trailX[j + 1];
              p.trailY[j] = p.trailY[j + 1];
            }
            p.trailX[MAX_TRAIL - 1] = p.x;
            p.trailY[MAX_TRAIL - 1] = p.y;
          }

          // Heat: 0 (far) → 1 (near EH)
          const heat = 1 - Math.min(1, dist / (Math.min(w, h) * GLOW_FALLOFF));
          // Hue shifts from cool base toward hot orange (30) / white
          const hue = p.hueBase - heat * (p.hueBase - 25);
          const sat = 85 + heat * 15;
          const light = 48 + heat * 40;

          // Draw trail — spaghettification is naturally emphasized
          // because trail length × per-step speed both grow near EH
          if (p.trailLen > 1) {
            ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${0.35 + heat * 0.55})`;
            ctx.lineWidth = p.size * (0.8 + heat * 1.8);
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(p.trailX[0], p.trailY[0]);
            for (let j = 1; j < p.trailLen; j++) {
              ctx.lineTo(p.trailX[j], p.trailY[j]);
            }
            ctx.stroke();
          }

          // Head glow — radial gradient
          const glowR = p.size * (2.2 + heat * 4);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
          grad.addColorStop(0, `hsla(${hue}, ${sat}%, ${Math.min(100, light + 25)}%, 0.95)`);
          grad.addColorStop(0.4, `hsla(${hue}, ${sat}%, ${light}%, 0.5)`);
          grad.addColorStop(1, `hsla(${hue}, ${sat}%, ${light}%, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fill();
        }

        // ── Accretion disk aura — glowing ring around EH ───────────
        ctx.globalCompositeOperation = 'lighter';
        const diskR = EH_RADIUS * 3;
        const diskGrad = ctx.createRadialGradient(cx, cy, EH_RADIUS * 0.9, cx, cy, diskR);
        diskGrad.addColorStop(0, 'rgba(255, 200, 80, 0)');
        diskGrad.addColorStop(0.3, 'rgba(255, 140, 30, 0.25)');
        diskGrad.addColorStop(0.6, 'rgba(255, 90, 10, 0.12)');
        diskGrad.addColorStop(1, 'rgba(120, 40, 140, 0)');
        ctx.fillStyle = diskGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, diskR, 0, Math.PI * 2);
        ctx.fill();

        // ── Event horizon — pure black void with chromatic rim ─────
        ctx.globalCompositeOperation = 'source-over';

        // Outer rim glow (orange/white)
        const rimGrad = ctx.createRadialGradient(cx, cy, EH_RADIUS * 0.95, cx, cy, EH_RADIUS * 1.6);
        rimGrad.addColorStop(0, 'rgba(255, 230, 180, 0.9)');
        rimGrad.addColorStop(0.3, 'rgba(255, 140, 30, 0.5)');
        rimGrad.addColorStop(1, 'rgba(255, 140, 30, 0)');
        ctx.fillStyle = rimGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, EH_RADIUS * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // Inner void
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(cx, cy, EH_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // Sharp inner edge
        ctx.strokeStyle = 'rgba(255, 180, 60, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, EH_RADIUS + 0.5, 0, Math.PI * 2);
        ctx.stroke();
      }

      frameId = requestAnimationFrame(step);
    };

    step();

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', visibilityHandler);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', background: '#05070A' }}
    />
  );
}
