import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function CursorLight() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });

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
    <motion.div
      className="fixed pointer-events-none z-30 hidden lg:block"
      style={{
        x: springX,
        y: springY,
        width: 500,
        height: 500,
        marginLeft: -250,
        marginTop: -250,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(220,230,242,0.04) 0%, transparent 60%)',
        filter: 'blur(40px)',
      }}
    />
  );
}
