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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,106,0,0.12),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(118,199,255,0.08),transparent_16%),radial-gradient(circle_at_15%_28%,rgba(255,255,255,0.05),transparent_18%),linear-gradient(180deg,#040404_0%,#090909_34%,#0a0a0a_68%,#070707_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:72px_72px] opacity-[0.05]" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.16]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_58%)]" />

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
