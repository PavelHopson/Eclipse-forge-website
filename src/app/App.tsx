import { SiteHeader } from '../components/layout/SiteHeader';
import { AboutSection } from '../components/sections/AboutSection';
import { CasesSection } from '../components/sections/CasesSection';
import { CtaSection } from '../components/sections/CtaSection';
import { HeroSection } from '../components/sections/HeroSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { ServicesSection } from '../components/sections/ServicesSection';

export function App() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      {/* Subtle noise */}
      <div className="noise-overlay pointer-events-none fixed inset-0 opacity-[0.08]" />

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
      <footer className="relative z-10 border-t border-white/[0.04] px-5 sm:px-8 py-12">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent/60" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/30">Eclipse Forge</span>
          </div>
          <p className="text-[11px] text-white/15 tracking-wide">© 2024 Eclipse Forge. Калининград.</p>
        </div>
      </footer>
    </div>
  );
}
