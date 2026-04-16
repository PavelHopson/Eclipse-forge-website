import { motion, useScroll, useSpring } from 'framer-motion';
import { contactDetails } from '../data/content';
import { SiteHeader } from '../components/layout/SiteHeader';
import { AboutSection } from '../components/sections/AboutSection';
import { CasesSection } from '../components/sections/CasesSection';
import { CtaSection } from '../components/sections/CtaSection';
import { HeroSection } from '../components/sections/HeroSection';
import { MetricsSection } from '../components/sections/MetricsSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { CursorLight } from '../components/ui/CursorLight';

export function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-1)' }}>
      {/* Scroll progress — dual gradient */}
      <motion.div className="fixed top-0 left-0 right-0 h-px z-50 origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))' }} />

      {/* Atmospheric layers */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-20" />
      <div className="fog-layer" />
      <div className="flare" style={{ top: '20%', right: '15%' }} />
      <div className="flare" style={{ bottom: '30%', left: '10%', animationDelay: '4s' }} />

      {/* Cursor-reactive light (desktop only) */}
      <CursorLight />

      <SiteHeader />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <CasesSection />
        <ServicesSection />
        <ProcessSection />
        <MetricsSection />
        <CtaSection />
      </main>

      {/* Premium footer */}
      <footer className="relative z-10 border-t px-5 sm:px-8 lg:px-12 py-12 lg:py-16" style={{ borderColor: 'var(--line)' }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="grid sm:grid-cols-[1fr_auto_auto] gap-8 items-start">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-2 w-2 rounded-full" style={{ background: 'var(--accent)', opacity: 0.5 }} />
                <span className="font-display text-sm font-medium tracking-[0.2em] uppercase" style={{ color: 'var(--text-2)' }}>Eclipse Forge</span>
              </div>
              <p className="text-[13px] max-w-xs leading-relaxed" style={{ color: 'var(--text-4)' }}>
                Кузница IT-решений. Проектируем, строим, масштабируем.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {[
                { label: 'TG', href: contactDetails.telegramDmUrl },
                { label: 'CH', href: contactDetails.telegramChannelUrl },
                { label: 'GH', href: contactDetails.githubUrl },
                { label: 'IG', href: contactDetails.instagramUrl },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-[10px] font-display font-medium tracking-[0.1em] uppercase transition-all duration-400 hover:border-[var(--accent-dim)] hover:text-[var(--accent)] hover:shadow-[0_0_20px_rgba(107,163,255,0.08)]"
                  style={{ borderColor: 'var(--line)', color: 'var(--text-4)' }}>
                  {s.label}
                </a>
              ))}
            </div>

            {/* Info */}
            <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-4)' }}>
              <span>Калининград</span>
              <span className="h-3 w-px" style={{ background: 'var(--line)' }} />
              <span>© 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
