import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function CursorLight() {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  // Three followers at different latencies → trail illusion
  const fastX = useSpring(mouseX, { damping: 20, stiffness: 220 });
  const fastY = useSpring(mouseY, { damping: 20, stiffness: 220 });
  const midX = useSpring(mouseX, { damping: 28, stiffness: 95 });
  const midY = useSpring(mouseY, { damping: 28, stiffness: 95 });
  const slowX = useSpring(mouseX, { damping: 36, stiffness: 50 });
  const slowY = useSpring(mouseY, { damping: 36, stiffness: 50 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Primary glow — large warm gold halo */}
      <motion.div
        className="fixed pointer-events-none z-30 hidden lg:block"
        style={{
          x: slowX,
          y: slowY,
          width: 720,
          height: 720,
          marginLeft: -360,
          marginTop: -360,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.10) 0%, rgba(212,175,55,0.04) 28%, transparent 62%)',
          filter: 'blur(50px)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Secondary glow — tighter cyan companion */}
      <motion.div
        className="fixed pointer-events-none z-30 hidden lg:block"
        style={{
          x: midX,
          y: midY,
          width: 320,
          height: 320,
          marginLeft: -160,
          marginTop: -160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,163,255,0.10) 0%, rgba(107,163,255,0.03) 38%, transparent 62%)',
          filter: 'blur(28px)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Sharp dot at cursor — gold core */}
      <motion.div
        className="fixed pointer-events-none z-30 hidden lg:block"
        style={{
          x: fastX,
          y: fastY,
          width: 10,
          height: 10,
          marginLeft: -5,
          marginTop: -5,
          borderRadius: '50%',
          background: 'rgba(245,233,196,0.9)',
          boxShadow: '0 0 18px rgba(212,175,55,0.85), 0 0 38px rgba(212,175,55,0.45)',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}
