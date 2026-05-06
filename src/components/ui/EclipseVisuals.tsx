import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════
   ECLIPSE SILHOUETTE — dark disc with glowing corona
   ═══════════════════════════════════════════════════════════ */
export function EclipseSilhouette({
  size = 120,
  coronaColor = 'rgba(107,163,255,0.15)',
  coronaSpread = 30,
  className = '',
  animate = true,
}: {
  size?: number;
  coronaColor?: string;
  coronaSpread?: number;
  className?: string;
  animate?: boolean;
}) {
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={animate ? { scale: [1, 1.03, 1], opacity: [0.8, 1, 0.8] } : undefined}
      transition={animate ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <svg width={size} height={size} viewBox="0 0 120 120">
        <defs>
          {/* Corona glow */}
          <radialGradient id={`corona-${size}`} cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="75%" stopColor={coronaColor} />
            <stop offset="90%" stopColor={coronaColor.replace(/[\d.]+\)$/, '0.05)')} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {/* Inner shadow for depth */}
          <radialGradient id={`depth-${size}`} cx="45%" cy="40%" r="50%">
            <stop offset="0%" stopColor="rgba(20,28,40,1)" />
            <stop offset="100%" stopColor="rgba(5,7,10,1)" />
          </radialGradient>
          <filter id={`blur-${size}`}>
            <feGaussianBlur stdDeviation={coronaSpread / 8} />
          </filter>
        </defs>
        {/* Corona outer glow */}
        <circle cx="60" cy="60" r="58" fill={`url(#corona-${size})`} filter={`url(#blur-${size})`} />
        {/* Corona ring */}
        <circle cx="60" cy="60" r="46" fill="none" stroke={coronaColor} strokeWidth="0.5" opacity="0.6" />
        {/* Eclipse disc (moon) */}
        <circle cx="60" cy="60" r="38" fill={`url(#depth-${size})`} />
        {/* Diamond ring effect — bright point at edge */}
        <circle cx="92" cy="42" r="2.5" fill="white" opacity="0.7">
          {animate && (
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="4s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="92" cy="42" r="6" fill="white" opacity="0.08" filter={`url(#blur-${size})`} />
      </svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MINI ECLIPSE — smaller, used as decorative dots
   ═══════════════════════════════════════════════════════════ */
export function MiniEclipse({
  size = 24,
  color = 'var(--accent)',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
        <circle cx="12" cy="12" r="7" fill="var(--bg)" />
        <circle cx="12" cy="12" r="8" fill="none" stroke={color} strokeWidth="0.3" opacity="0.5" />
        <circle cx="18" cy="8" r="1" fill={color} opacity="0.6" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ECLIPSE DIVIDER — horizontal line with eclipse in center
   ═══════════════════════════════════════════════════════════ */
export function EclipseDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center py-8 ${className}`}>
      <div
        className="absolute inset-x-0 top-1/2 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--line) 18%, rgba(212,175,55,0.22) 32%, var(--line) 46%, transparent 50%, var(--line) 54%, rgba(212,175,55,0.22) 68%, var(--line) 82%, transparent)',
        }}
      />
      <div
        aria-hidden
        className="divider-traveler absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full"
        style={{
          background: 'rgba(212,175,55,0.95)',
          boxShadow: '0 0 12px rgba(212,175,55,0.85), 0 0 24px rgba(212,175,55,0.45)',
        }}
      />
      <div className="relative z-10" style={{ background: 'var(--bg)', padding: '0 1rem' }}>
        <MiniEclipse size={32} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ORBITAL RING — animated ring with orbiting dots
   ═══════════════════════════════════════════════════════════ */
export function OrbitalRing({
  size = 200,
  dotCount = 3,
  duration = 20,
  color = 'var(--accent)',
  className = '',
}: {
  size?: number;
  dotCount?: number;
  duration?: number;
  color?: string;
  className?: string;
}) {
  const r = size / 2 - 6;
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Orbit path */}
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="0.5" opacity="0.15"
          strokeDasharray="4 8" />
        {/* Orbiting dots */}
        {Array.from({ length: dotCount }).map((_, i) => {
          const angle = (i / dotCount) * Math.PI * 2;
          const cx = size / 2 + Math.cos(angle) * r;
          const cy = size / 2 + Math.sin(angle) * r;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r="2.5" fill={color} opacity={0.4 + (i * 0.2)} />
              <circle cx={cx} cy={cy} r="6" fill={color} opacity="0.06" />
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FLOATING PARTICLES — star-like particles
   ═══════════════════════════════════════════════════════════ */
function Particle({ delay, x, y, size: s }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y,
        width: s, height: s,
        background: 'var(--accent)',
      }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.5],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function ParticleField({ count = 20, className = '' }: { count?: number; className?: string }) {
  const [particles] = useState(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((p) => (
        <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONSTELLATION LINES — connecting dots with lines
   ═══════════════════════════════════════════════════════════ */
export function ConstellationField({ className = '' }: { className?: string }) {
  const [points] = useState(() =>
    Array.from({ length: 12 }).map(() => ({
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      size: 1 + Math.random() * 2,
    }))
  );

  // Connect nearby points
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
      if (dist < 35) {
        lines.push({ x1: points[i].x, y1: points[i].y, x2: points[j].x, y2: points[j].y });
      }
    }
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map((l, i) => (
          <motion.line
            key={i}
            x1={`${l.x}%`} y1={`${l.y}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
            stroke="var(--accent)" strokeWidth="0.15" opacity="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.15 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={`${p.x}%`} cy={`${p.y}%`} r={p.size * 0.3}
            fill="var(--accent)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.08 }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ECLIPSE PHASES — row of eclipse phases for decoration
   ═══════════════════════════════════════════════════════════ */
export function EclipsePhases({ className = '' }: { className?: string }) {
  const phases = [
    { clip: 'circle(50% at 50% 50%)', moon: '25%' },   // partial start
    { clip: 'circle(50% at 50% 50%)', moon: '38%' },   // more covered
    { clip: 'circle(50% at 50% 50%)', moon: '50%' },   // half
    { clip: 'circle(50% at 50% 50%)', moon: '65%' },   // mostly covered
    { clip: 'circle(50% at 50% 50%)', moon: '50%' },   // total — moon centered
    { clip: 'circle(50% at 50% 50%)', moon: '35%' },   // coming out
    { clip: 'circle(50% at 50% 50%)', moon: '22%' },   // partial end
  ];

  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-6 ${className}`}>
      {phases.map((_, i) => {
        const sz = 28;
        const moonOffset = -14 + i * (28 / (phases.length - 1));
        const isTotal = i === 3;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="relative"
            style={{ width: sz, height: sz }}
          >
            <svg width={sz} height={sz} viewBox="0 0 28 28">
              {/* Sun glow */}
              <circle cx="14" cy="14" r="13" fill="none"
                stroke={isTotal ? 'rgba(245,166,35,0.4)' : 'rgba(107,163,255,0.15)'}
                strokeWidth="0.5" />
              {/* Sun disc */}
              <circle cx="14" cy="14" r="10" fill="rgba(107,163,255,0.08)" />
              {/* Moon disc covering the sun */}
              <circle cx={14 + moonOffset} cy="14" r="10" fill="var(--bg)" />
              {/* Corona on total eclipse */}
              {isTotal && (
                <>
                  <circle cx="14" cy="14" r="12" fill="none"
                    stroke="rgba(245,166,35,0.3)" strokeWidth="1" />
                  <circle cx="14" cy="14" r="13.5" fill="none"
                    stroke="rgba(245,166,35,0.1)" strokeWidth="0.5" />
                </>
              )}
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SOLAR CORONA — radial rays emanating from a point
   ═══════════════════════════════════════════════════════════ */
export function SolarCorona({
  size = 300,
  rays = 24,
  color = 'rgba(107,163,255,0.06)',
  className = '',
}: {
  size?: number;
  rays?: number;
  color?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size} height={size} viewBox="0 0 300 300">
        {Array.from({ length: rays }).map((_, i) => {
          const angle = (i / rays) * 360;
          const len = 80 + (i % 3) * 30;
          return (
            <line
              key={i}
              x1="150" y1="150"
              x2={150 + Math.cos((angle * Math.PI) / 180) * len}
              y2={150 + Math.sin((angle * Math.PI) / 180) * len}
              stroke={color}
              strokeWidth={i % 2 === 0 ? '1' : '0.5'}
              opacity={0.3 + (i % 3) * 0.15}
            />
          );
        })}
        {/* Center void */}
        <circle cx="150" cy="150" r="40" fill="var(--bg)" />
        <circle cx="150" cy="150" r="41" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
      </svg>
    </motion.div>
  );
}
