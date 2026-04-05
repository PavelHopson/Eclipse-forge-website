import { SiteHeader } from '../components/layout/SiteHeader';
import { AboutSection } from '../components/sections/AboutSection';
import { CasesSection } from '../components/sections/CasesSection';
import { CtaSection } from '../components/sections/CtaSection';
import { HeroSection } from '../components/sections/HeroSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { ServicesSection } from '../components/sections/ServicesSection';

export function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-surface text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(255,111,0,0.2),transparent_18%),radial-gradient(circle_at_78%_22%,rgba(255,94,0,0.12),transparent_16%),radial-gradient(circle_at_52%_82%,rgba(255,120,0,0.08),transparent_22%),linear-gradient(180deg,#030303_0%,#060606_32%,#090909_100%)]" />
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-[0.06]" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%)]" />

      <SiteHeader />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <CasesSection />
        <ServicesSection />
        <ProcessSection />
        <CtaSection />
      </main>
    </div>
  );
}
