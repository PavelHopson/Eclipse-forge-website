import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useMotionPreference } from '../../lib/motionPreference';

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
      aria-hidden="true"
      className={`ef-eclipse-silhouette${animate ? ' ef-eclipse-silhouette--animated' : ''} pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        '--ef-silhouette-corona': coronaColor,
        '--ef-silhouette-spread': `${coronaSpread}px`,
      } as CSSProperties}
      animate={animate ? { scale: [1, 1.03, 1], opacity: [0.8, 1, 0.8] } : undefined}
      transition={animate ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
    >
      <span className="ef-eclipse-silhouette__rays" />
      <span className="ef-eclipse-silhouette__corona" />
      <span className="ef-eclipse-silhouette__chromosphere" />
      <span className="ef-eclipse-silhouette__disc" />
      <span className="ef-eclipse-silhouette__diamond" />
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
    <div aria-hidden="true" className={`ef-eclipse-divider ${className}`}>
      <span className="ef-eclipse-divider__track" />
      <span className="divider-traveler ef-eclipse-divider__traveler" />
      <span className="ef-eclipse-divider__lens ef-eclipse-divider__lens--outer" />
      <span className="ef-eclipse-divider__lens ef-eclipse-divider__lens--inner" />
      <div className="ef-eclipse-divider__stage">
        <EclipsePhases className="eclipse-divider-phases" />
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
  animate = true,
}: {
  size?: number;
  dotCount?: number;
  duration?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}) {
  const r = size / 2 - 6;
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={animate ? { rotate: 360 } : { rotate: 0 }}
      transition={animate ? { duration, repeat: Infinity, ease: 'linear' } : { duration: 0.15 }}
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
export function ConstellationField({
  className = '',
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
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
            x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
            stroke="var(--accent)" strokeWidth="0.15" opacity="0.15"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={animate ? undefined : { pathLength: 1, opacity: 0.15 }}
            whileInView={animate ? { pathLength: 1, opacity: 0.15 } : undefined}
            viewport={{ once: true }}
            transition={animate ? { duration: 1.5, delay: i * 0.1 } : { duration: 0.15 }}
          />
        ))}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={`${p.x}%`} cy={`${p.y}%`} r={p.size * 0.3}
            fill="var(--accent)"
            initial={animate ? { opacity: 0 } : false}
            animate={animate ? undefined : { opacity: 0.4 }}
            whileInView={animate ? { opacity: 0.4 } : undefined}
            viewport={{ once: true }}
            transition={animate ? { delay: 0.5 + i * 0.08 } : { duration: 0.15 }}
          />
        ))}
      </svg>
    </div>
  );
}

const galaxyStreams = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  angle: `${index * 20}deg`,
  delay: `${index * -220}ms`,
  opacity: 0.16 + (index % 6) * 0.04,
}));

const galaxyNodes = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  angle: `${index * 16.4}deg`,
  distance: `${80 + (index % 8) * 24}px`,
  offset: `${((index % 7) - 3) * 9}px`,
  delay: `${index * -150}ms`,
}));

type InteractiveGalaxyLayerProps = {
  className?: string;
  variant?: 'fixed' | 'hero';
};

export function InteractiveGalaxyLayer({ className = '', variant = 'fixed' }: InteractiveGalaxyLayerProps) {
  const placement = variant === 'fixed' ? 'fixed' : 'absolute';

  return (
    <div
      className={`ef-galaxy-layer ef-galaxy-layer--${variant} pointer-events-none ${placement} ${className}`}
      aria-hidden
    >
      <div className="ef-galaxy-layer__halo" />
      <div className="ef-galaxy-layer__jets" />
      <div className="ef-galaxy-layer__ring ef-galaxy-layer__ring--outer" />
      <div className="ef-galaxy-layer__ring ef-galaxy-layer__ring--inner" />
      <div className="ef-galaxy-layer__accretion ef-galaxy-layer__accretion--far" />
      <div className="ef-galaxy-layer__accretion ef-galaxy-layer__accretion--near" />
      <div className="ef-galaxy-layer__lensing ef-galaxy-layer__lensing--upper" />
      <div className="ef-galaxy-layer__lensing ef-galaxy-layer__lensing--lower" />
      <div className="ef-galaxy-layer__corona" />
      <div className="ef-galaxy-layer__core">
        <span className="ef-galaxy-layer__photon" />
      </div>
      <div className="ef-galaxy-layer__streams">
        {galaxyStreams.map((stream) => (
          <span
            key={stream.id}
            style={
              {
                '--stream-angle': stream.angle,
                '--stream-delay': stream.delay,
                '--stream-opacity': stream.opacity,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="ef-galaxy-layer__nodes">
        {galaxyNodes.map((node) => (
          <span
            key={node.id}
            style={
              {
                '--node-angle': node.angle,
                '--node-distance': node.distance,
                '--node-offset': node.offset,
                '--node-delay': node.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ECLIPSE PHASES — row of eclipse phases for decoration
   ═══════════════════════════════════════════════════════════ */
export function EclipsePhases({ className = '' }: { className?: string }) {
  const { ambientMotionEnabled } = useMotionPreference();
  const phaseOffsets = [-17, -11, -5.5, 0, 5.5, 11, 17];

  return (
    <div aria-hidden="true" className={`ef-eclipse-phases ${className}`}>
      {phaseOffsets.map((moonOffset, index) => {
        const isTotal = index === Math.floor(phaseOffsets.length / 2);
        return (
          <motion.div
            key={moonOffset}
            initial={ambientMotionEnabled ? { opacity: 0, scale: 0.7 } : false}
            animate={ambientMotionEnabled ? undefined : { opacity: 1, scale: 1 }}
            whileInView={ambientMotionEnabled ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: true }}
            transition={ambientMotionEnabled
              ? { delay: index * 0.065, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0.12 }}
            className={`ef-eclipse-phase${isTotal ? ' ef-eclipse-phase--total' : ''}`}
            style={{ '--phase-shift': `${moonOffset}px`, '--phase-index': index } as CSSProperties}
          >
            <span className="ef-eclipse-phase__corona" />
            <span className="ef-eclipse-phase__mask">
              <span className="ef-eclipse-phase__sun" />
              <span className="ef-eclipse-phase__moon" />
            </span>
            <span className="ef-eclipse-phase__orbit" />
            {isTotal ? <span className="ef-eclipse-phase__diamond" /> : null}
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
