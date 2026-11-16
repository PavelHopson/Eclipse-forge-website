import { EcosystemRail } from '../components/sections/EcosystemRail';
import { CtaSection } from '../components/sections/CtaSection';
import { FaqSection } from '../components/sections/FaqSection';
import { FounderSection } from '../components/sections/FounderSection';
import { HeroSection } from '../components/sections/HeroSection';
import { LeadDemoSection } from '../components/sections/LeadDemoSection';
import { PackagesSection } from '../components/sections/PackagesSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { SystemsNotSitesSection } from '../components/sections/SystemsNotSitesSection';
import { WorksSection } from '../components/sections/WorksSection';
import { EclipseDivider } from '../components/ui/EclipseVisuals';

// Порядок «оффер → цена → доказательство → кто делает → как → вопросы → заявка».
// Секции About / BusinessImpact / HowItWorks / ProductionReadiness / Metrics / Services /
// ConstructionCase сняты со страницы (повторяли тезис «не сайт — система»), файлы оставлены.
export function LandingPage() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <SystemsNotSitesSection />
      <PackagesSection />
      <EclipseDivider />
      <LeadDemoSection />
      <WorksSection />
      <EclipseDivider />
      <FounderSection />
      <ProcessSection />
      <EcosystemRail />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
