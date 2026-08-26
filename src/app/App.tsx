import { lazy, Suspense } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import { SiteHeader } from '../components/layout/SiteHeader';
import { CursorLight } from '../components/ui/CursorLight';
import {
  ConstellationField,
  EclipseSilhouette,
  InteractiveGalaxyLayer,
  ParticleField,
} from '../components/ui/EclipseVisuals';
import { PriceListModal } from '../components/ui/PriceListModal';
import { BroadcastIcon, GitHubIcon, InstagramIcon, TelegramIcon } from '../components/ui/SocialIcons';
import { GlowButton } from '../components/ui/GlowButton';
import { contactDetails } from '../data/content';
import { useLocale, type Locale } from '../lib/locale';
import { MotionPreferenceProvider, useMotionPreference } from '../lib/motionPreference';
import { useHashRoute, useScrollResetOnRoute } from '../lib/routing';
import { LandingPage } from '../pages/LandingPage';

const ConstructionPage = lazy(async () => {
  const module = await import('../pages/ConstructionPage');
  return { default: module.ConstructionPage };
});

function RouteLoading() {
  return <main className="relative z-10 flex min-h-[60vh] items-center justify-center px-5" aria-busy="true" aria-live="polite">
    <p className="type-meta" style={{ color: 'var(--text-3)' }}>Eclipse Forge loading</p>
  </main>;
}

const footerCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    location: string;
    status: string;
    primaryCta: string;
    secondaryCta: string;
    socialLabels: { telegram: string; channel: string; github: string; instagram: string };
    libraryLabel: string;
  }
> = {
  ru: {
    eyebrow: 'Финальная орбита / следующий запуск',
    title: 'Есть процесс, который должен работать сам?',
    description: 'Системы для контроля, автоматизации и AI-исполнения. Для продуктов, которым нужен не только фронтовый слой.',
    location: 'По всему миру',
    status: 'Канал связи открыт',
    primaryCta: 'Обсудить систему',
    secondaryCta: 'Вернуться к проектам',
    socialLabels: {
      telegram: 'Telegram',
      channel: 'Канал',
      github: 'GitHub',
      instagram: 'Instagram',
    },
    libraryLabel: 'Библиотека инструментов',
  },
  en: {
    eyebrow: 'Final orbit / next launch',
    title: 'Have a process that should run itself?',
    description: 'Systems for control, automation and AI execution. Built for products that need more than a front layer.',
    location: 'Worldwide',
    status: 'Signal channel open',
    primaryCta: 'Discuss the system',
    secondaryCta: 'Return to projects',
    socialLabels: {
      telegram: 'Telegram',
      channel: 'Channel',
      github: 'GitHub',
      instagram: 'Instagram',
    },
    libraryLabel: 'Tools library',
  },
};

function AppSurface() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const { locale } = useLocale();
  const route = useHashRoute();
  useScrollResetOnRoute(route);

  const copy = footerCopy[locale];
  const socialLinks = [
    { label: copy.socialLabels.telegram, href: contactDetails.telegramDmUrl, Icon: TelegramIcon },
    { label: copy.socialLabels.channel, href: contactDetails.telegramChannelUrl, Icon: BroadcastIcon },
    { label: copy.socialLabels.github, href: contactDetails.githubUrl, Icon: GitHubIcon },
    { label: copy.socialLabels.instagram, href: contactDetails.instagramUrl, Icon: InstagramIcon },
  ];

  const isConstruction = route === '/construction';
  const { ambientMotionEnabled } = useMotionPreference();

  return (
    <MotionConfig reducedMotion={ambientMotionEnabled ? 'user' : 'always'}>
    <div className="relative min-h-screen" data-visual-profile="cinematic-editorial" style={{ background: 'var(--bg)', color: 'var(--text-1)' }}>
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
      {ambientMotionEnabled ? <ParticleField count={36} className="z-[1] opacity-55" /> : null}
      <InteractiveGalaxyLayer className="z-[1]" />

      <PriceListModal />

      <SiteHeader />

      {isConstruction ? (
        <Suspense fallback={<RouteLoading />}>
          <ConstructionPage />
        </Suspense>
      ) : <LandingPage />}

      <footer className="event-horizon-footer relative z-10 overflow-hidden border-t" style={{ borderColor: 'var(--line)' }} aria-labelledby="footer-title">
        <div aria-hidden className="event-horizon-footer__grid" />
        <motion.div
          aria-hidden
          className="event-horizon-footer__eclipse"
          initial={ambientMotionEnabled ? { opacity: 0, y: 22 } : false}
          whileInView={ambientMotionEnabled ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="event-horizon-footer__orbit event-horizon-footer__orbit--outer" />
          <span className="event-horizon-footer__orbit event-horizon-footer__orbit--inner" />
          <span className="event-horizon-footer__signal"><i /></span>
          <EclipseSilhouette size="clamp(240px, 34vw, 420px)" coronaColor="rgba(212,175,55,0.2)" coronaSpread={54} animate={false} />
        </motion.div>

        <div aria-hidden className="event-horizon-footer__wordmark">ECLIPSE FORGE</div>

        <div className="event-horizon-footer__shell relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <motion.div
            className="relative z-[2] max-w-[760px]"
            initial={ambientMotionEnabled ? { opacity: 0, y: 18 } : false}
            whileInView={ambientMotionEnabled ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="event-horizon-footer__eyebrow">
              <span aria-hidden />
              {copy.eyebrow}
            </div>
            <h2 id="footer-title" className="event-horizon-footer__title font-display">
              {copy.title}
            </h2>
            <p className="event-horizon-footer__description">{copy.description}</p>
            <div className="event-horizon-footer__actions">
              <GlowButton href={contactDetails.telegramDmUrl} target="_blank" rel="noreferrer">
                {copy.primaryCta}
              </GlowButton>
              <a className="event-horizon-footer__secondary" href="#cases">
                {copy.secondaryCta} <span aria-hidden>↑</span>
              </a>
            </div>
          </motion.div>

          <div className="event-horizon-footer__dock relative z-[2]">
            <div className="event-horizon-footer__identity">
              <span className="event-horizon-footer__status-dot" aria-hidden />
              <div>
                <strong>Eclipse Forge</strong>
                <span>{copy.status}</span>
              </div>
            </div>

            <nav className="event-horizon-footer__socials" aria-label={locale === 'ru' ? 'Социальные ссылки' : 'Social links'}>
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="event-horizon-footer__social"
                >
                  <item.Icon size={15} />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            <div className="event-horizon-footer__meta">
              <a href="https://library.eclipse-forge.ru/" target="_blank" rel="noreferrer">
                {copy.libraryLabel} ↗
              </a>
              <span>{copy.location}</span>
              <span>&copy; 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </MotionConfig>
  );
}

export function App() {
  return (
    <MotionPreferenceProvider>
      <AppSurface />
    </MotionPreferenceProvider>
  );
}
