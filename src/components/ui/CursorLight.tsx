import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function CursorLight() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Primary glow — larger, dual-color */}
      <motion.div
        className="fixed pointer-events-none z-30 hidden lg:block"
        style={{
          x: springX,
          y: springY,
          width: 600,
          height: 600,
          marginLeft: -300,
          marginTop: -300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,163,255,0.04) 0%, rgba(245,166,35,0.01) 30%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Secondary dot — small, sharp */}
      <motion.div
        className="fixed pointer-events-none z-30 hidden lg:block mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          background: 'rgba(107,163,255,0.3)',
          boxShadow: '0 0 20px rgba(107,163,255,0.15)',
        }}
      />
    </>
  );
}
