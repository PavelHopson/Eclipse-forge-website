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
    <div className="relative min-h-screen bg-[#050505] text-white">
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Noise */}
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-[0.06]" />

      <SiteHeader />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <CasesSection />
        <ServicesSection />
        <ProcessSection />
        <CtaSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.03] px-5 sm:px-8 py-14">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent/50" />
            <span className="type-meta text-white/25">Eclipse Forge</span>
          </div>
          <div className="flex items-center gap-8 text-[10px] text-white/10 tracking-[0.3em] uppercase">
            <span>Калининград</span>
            <span className="h-3 w-px bg-white/[0.06]" />
            <span>© 2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
