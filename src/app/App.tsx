import { motion, useScroll, useSpring } from 'framer-motion';
import { SiteHeader } from '../components/layout/SiteHeader';
import { AboutSection } from '../components/sections/AboutSection';
import { BusinessImpactSection } from '../components/sections/BusinessImpactSection';
import { CasesSection } from '../components/sections/CasesSection';
import { CtaSection } from '../components/sections/CtaSection';
import { FounderSection } from '../components/sections/FounderSection';
import { HeroSection } from '../components/sections/HeroSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { MetricsSection } from '../components/sections/MetricsSection';
import { ProcessSection } from '../components/sections/ProcessSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { SystemsEcosystemSection } from '../components/sections/SystemsEcosystemSection';
import { SystemsNotSitesSection } from '../components/sections/SystemsNotSitesSection';
import { CursorLight } from '../components/ui/CursorLight';
import { ConstellationField, EclipseDivider, EclipseSilhouette, ParticleField } from '../components/ui/EclipseVisuals';
import { BroadcastIcon, GitHubIcon, InstagramIcon, TelegramIcon } from '../components/ui/SocialIcons';
import { contactDetails } from '../data/content';
import { useLocale, type Locale } from '../lib/locale';

const footerCopy: Record<
  Locale,
  {
    description: string;
    location: string;
    socialLabels: { telegram: string; channel: string; github: string; instagram: string };
  }
> = {
  ru: {
    description: 'Системы для контроля, автоматизации и AI-исполнения. Для продуктов, которым нужен не только фронтовый слой.',
    location: 'Калининград',
    socialLabels: {
      telegram: 'Telegram',
      channel: 'Канал',
      github: 'GitHub',
      instagram: 'Instagram',
    },
  },
  en: {
    description: 'Systems for control, automation and AI execution. Built for products that need more than a front layer.',
    location: 'Kaliningrad',
    socialLabels: {
      telegram: 'Telegram',
      channel: 'Channel',
      github: 'GitHub',
      instagram: 'Instagram',
    },
  },
};

export function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { locale } = useLocale();
  const copy = footerCopy[locale];
  const socialLinks = [
    { label: copy.socialLabels.telegram, href: contactDetails.telegramDmUrl, Icon: TelegramIcon },
    { label: copy.socialLabels.channel, href: contactDetails.telegramChannelUrl, Icon: BroadcastIcon },
    { label: copy.socialLabels.github, href: contactDetails.githubUrl, Icon: GitHubIcon },
    { label: copy.socialLabels.instagram, href: contactDetails.instagramUrl, Icon: InstagramIcon },
  ];

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text-1)' }}>
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-px origin-left"
        style={{ scaleX, background: 'linear-gradient(90deg, var(--accent), var(--accent-warm))' }}
      />

      <div className="noise-overlay pointer-events-none fixed inset-0 z-20" />
      <div className="fog-layer" />
      <div className="app-grid-overlay pointer-events-none fixed inset-0 z-[1]" />
      <div className="app-vignette pointer-events-none fixed inset-0 z-[2]" />
      <div className="ambient-nebula ambient-nebula--gold pointer-events-none fixed z-[1]" />
      <div className="ambient-nebula ambient-nebula--cyan pointer-events-none fixed z-[1]" />
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-30">
        <ConstellationField className="opacity-35" />
      </div>
      <div className="flare" style={{ top: '20%', right: '15%' }} />
      <div className="flare" style={{ bottom: '30%', left: '10%', animationDelay: '4s' }} />

      <CursorLight />
      <ParticleField count={36} className="z-[1] opacity-55" />

      <SiteHeader />

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
        <MetricsSection />
        <CtaSection />
      </main>

      <footer className="relative z-10 overflow-hidden border-t px-5 py-12 sm:px-8 lg:px-12 lg:py-16" style={{ borderColor: 'var(--line)' }}>
        <div className="absolute -bottom-16 right-[10%] hidden opacity-15 lg:block">
          <EclipseSilhouette size={180} coronaColor="rgba(117,140,255,0.12)" animate={false} />
        </div>
        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid items-start gap-8 sm:grid-cols-[1fr_auto_auto]">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ background: 'var(--accent)', opacity: 0.5 }} />
                <span className="font-display text-sm font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--text-2)' }}>
                  Eclipse Forge
                </span>
              </div>
              <p className="max-w-xs text-[13px] leading-relaxed" style={{ color: 'var(--text-4)' }}>
                {copy.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border text-[10px] font-display font-medium uppercase tracking-[0.1em] transition-all duration-400 hover:border-[var(--accent-dim)] hover:text-[var(--accent)] hover:shadow-[0_0_20px_rgba(107,163,255,0.08)]"
                  style={{ borderColor: 'var(--line)', color: 'var(--text-4)' }}
                >
                  <item.Icon size={16} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-4)' }}>
              <span>{copy.location}</span>
              <span className="h-3 w-px" style={{ background: 'var(--line)' }} />
              <span>&copy; 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
