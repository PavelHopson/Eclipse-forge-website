import { AboutSection } from '../components/sections/AboutSection';
import { BusinessImpactSection } from '../components/sections/BusinessImpactSection';
import { CasesSection } from '../components/sections/CasesSection';
import { ConstructionCaseSection } from '../components/sections/ConstructionCaseSection';
import { CtaSection } from '../components/sections/CtaSection';
import { FounderSection } from '../components/sections/FounderSection';
import { HeroSection } from '../components/sections/HeroSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { MetricsSection } from '../components/sections/MetricsSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { SystemsEcosystemSection } from '../components/sections/SystemsEcosystemSection';
import { SystemsNotSitesSection } from '../components/sections/SystemsNotSitesSection';
import { EclipseDivider } from '../components/ui/EclipseVisuals';

export function LandingPage() {
  return (
    <main className="relative z-10">
      <HeroSection />
      <SystemsNotSitesSection />
      <EclipseDivider />
      <FounderSection />
      <EclipseDivider />
      <AboutSection />
      <BusinessImpactSection />
      <CasesSection />
      <SystemsEcosystemSection />
      <EclipseDivider />
      <HowItWorksSection />
      <ServicesSection />
      <ProcessSection />
      <EclipseDivider />
      <ConstructionCaseSection />
      <EclipseDivider />
      <MetricsSection />
      <CtaSection />
    </main>
  );
}
