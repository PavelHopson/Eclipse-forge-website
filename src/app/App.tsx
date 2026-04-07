import { motion, useScroll, useSpring } from 'framer-motion';
import { SiteHeader } from '../components/layout/SiteHeader';
import { AboutSection } from '../components/sections/AboutSection';
import { CasesSection } from '../components/sections/CasesSection';
import { CtaSection } from '../components/sections/CtaSection';
import { HeroSection } from '../components/sections/HeroSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { ServicesSection } from '../components/sections/ServicesSection';

export function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-1)' }}>
      {/* Scroll progress — cold accent */}
      <motion.div className="fixed top-0 left-0 right-0 h-px z-50 origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, var(--accent), var(--accent-glow))' }} />

      {/* Noise */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-20" />

      <SiteHeader />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <CasesSection />
        <ServicesSection />
        <ProcessSection />
        <CtaSection />
      </main>

      <footer className="relative z-10 border-t px-5 sm:px-8 lg:px-12 py-10" style={{ borderColor: 'var(--line)' }}>
        <div className="mx-auto max-w-[1400px] flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)', opacity: 0.4 }} />
            <span className="type-meta" style={{ color: 'var(--text-3)' }}>Eclipse Forge</span>
          </div>
          <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-4)' }}>
            <span>Калининград</span>
            <span className="h-3 w-px" style={{ background: 'var(--line)' }} />
            <span>© 2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
