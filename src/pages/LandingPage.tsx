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
import { MobileCta } from '../components/ui/MobileCta';

// Порядок «оффер → работы → чем отличается → цена → демо заявки → кто делает → как → вопросы → заявка».
// Работы стоят сразу после первого экрана: заказчик сначала смотрит примеры, потом читает цены.
// Сняты со страницы (файлы оставлены): About, BusinessImpact, HowItWorks, ProductionReadiness,
// Metrics, Services, ConstructionCase — повторяли тезис «не сайт — система»;
// EcosystemRail — внутренние продукты Eclipse Forge, клиенту-бизнесу не нужны.
export function LandingPage() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <WorksSection />
      <EclipseDivider />
      <SystemsNotSitesSection />
      <PackagesSection />
      <LeadDemoSection />
      <EclipseDivider />
      <FounderSection />
      <ProcessSection />
      <FaqSection />
      <CtaSection />
      <MobileCta />
    </main>
  );
}
