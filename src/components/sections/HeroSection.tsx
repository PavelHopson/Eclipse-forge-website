import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { useEffect, useRef, type RefObject } from 'react';
import { contactDetails, useSiteContent } from '../../data/content';
import { useLocale, type Locale } from '../../lib/locale';
import { useMotionPreference } from '../../lib/motionPreference';
import { ConstellationField, OrbitalRing, ParticleField } from '../ui/EclipseVisuals';
import { MagneticButton } from '../ui/MagneticButton';

function useEditorialParallax(ref: RefObject<HTMLElement | null>) {
  const { ambientMotionEnabled } = useMotionPreference();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!ambientMotionEnabled || typeof window === 'undefined') {
      x.set(0);
      y.set(0);
      return;
    }

    if (window.matchMedia('(hover: none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    let frameId: number | null = null;
    let nextX = 0;
    let nextY = 0;

    const commit = () => {
      x.set(nextX);
      y.set(nextY);
      frameId = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      nextX = (event.clientX - rect.left) / rect.width - 0.5;
      nextY = (event.clientY - rect.top) / rect.height - 0.5;
      if (frameId === null) frameId = requestAnimationFrame(commit);
    };

    const handlePointerLeave = () => {
      nextX = 0;
      nextY = 0;
      if (frameId === null) frameId = requestAnimationFrame(commit);
    };

    element.addEventListener('pointermove', handlePointerMove, { passive: true });
    element.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [ambientMotionEnabled, ref, x, y]);

  return {
    x: useSpring(x, { stiffness: 72, damping: 24, mass: 0.7 }),
    y: useSpring(y, { stiffness: 72, damping: 24, mass: 0.7 }),
  };
}

const heroCopy: Record<
  Locale,
  {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    titleEnd: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    availability: string;
    location: string;
    edition: string;
    systemLabel: string;
    scrollLabel: string;
  }
> = {
  ru: {
    eyebrow: 'AI systems engineering / Eclipse Forge',
    titleLead: 'Системы, которые',
    titleAccent: 'работают',
    titleEnd: 'сами.',
    description:
      'Проектирую AI-операторов, SaaS и автоматизацию для процессов, где ручной контроль уже стал узким местом.',
    primaryCta: 'Обсудить задачу',
    secondaryCta: 'Смотреть системы',
    availability: 'Принимаю новые проекты',
    location: 'Работаю по всему миру',
    edition: 'Избранные проекты / 2026',
    systemLabel: 'Системы работают и измеряются',
    scrollLabel: 'Листайте, чтобы посмотреть проекты',
  },
  en: {
    eyebrow: 'AI systems engineering / Eclipse Forge',
    titleLead: 'Systems that',
    titleAccent: 'run',
    titleEnd: 'themselves.',
    description:
      'I design AI operators, SaaS and automation for processes where manual control has already become the bottleneck.',
    primaryCta: 'Discuss your task',
    secondaryCta: 'Explore systems',
    availability: 'Accepting new projects',
    location: 'Available worldwide',
    edition: 'Selected projects / 2026',
    systemLabel: 'Systems are monitored',
    scrollLabel: 'Scroll to explore projects',
  },
};

function createReveal(motionEnabled: boolean): Variants {
  return {
    hidden: { opacity: 0, y: motionEnabled ? 24 : 0 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: motionEnabled ? 0.78 : 0.15,
        delay: motionEnabled ? delay : Math.min(delay, 0.05),
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { locale } = useLocale();
  const { ambientMotionEnabled } = useMotionPreference();
  const { metrics } = useSiteContent();
  const copy = heroCopy[locale];
  const reveal = createReveal(ambientMotionEnabled);
  const pointer = useEditorialParallax(sectionRef);
  const eclipseX = useTransform(pointer.x, [-0.5, 0.5], [-20, 20]);
  const eclipseY = useTransform(pointer.y, [-0.5, 0.5], [-14, 14]);
  const starsX = useTransform(pointer.x, [-0.5, 0.5], [-5, 5]);
  const starsY = useTransform(pointer.y, [-0.5, 0.5], [-4, 4]);

  return (
    <section ref={sectionRef} id="hero" className="eclipse-editorial-hero relative isolate overflow-hidden">
      <div className="hero-editorial-bg absolute inset-0" />
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={ambientMotionEnabled ? { x: starsX, y: starsY } : undefined}
      >
        <ConstellationField animate={ambientMotionEnabled} />
      </motion.div>
      {ambientMotionEnabled ? <ParticleField count={14} className="opacity-30" /> : null}

      <div className="hero-editorial-frame relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1500px] flex-col px-5 pb-7 pt-24 sm:px-8 sm:pb-9 sm:pt-28 lg:px-12 lg:pb-10 lg:pt-32">
        <motion.div
          custom={0.08}
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="hero-editorial-kicker flex items-center justify-between gap-5 border-b pb-4"
        >
          <p className="type-meta flex items-center gap-3" style={{ color: 'var(--text-3)' }}>
            <span className="hero-editorial-kicker-line" aria-hidden />
            {copy.eyebrow}
          </p>
          <p className="type-meta hidden sm:block" style={{ color: 'var(--gold)' }}>
            {copy.edition}
          </p>
        </motion.div>

        <div className="hero-editorial-stage relative flex flex-1 items-center py-8 sm:py-10 lg:py-12">
          <div className="hero-editorial-wordmark" aria-hidden>
            <span>Eclipse</span>
            <span>Forge</span>
          </div>

          <motion.div
            aria-hidden
            className="hero-editorial-visual pointer-events-none absolute"
            style={ambientMotionEnabled ? { x: eclipseX, y: eclipseY } : undefined}
          >
            <div className="hero-editorial-orbit hero-editorial-orbit--outer" />
            <div className="hero-editorial-orbit hero-editorial-orbit--inner" />
            <div className="hero-editorial-eclipse">
              <span className="hero-editorial-sun" />
              <span className="hero-editorial-rays hero-editorial-rays--far" />
              <span className="hero-editorial-rays hero-editorial-rays--near" />
              <span className="hero-editorial-corona hero-editorial-corona--outer" />
              <span className="hero-editorial-corona hero-editorial-corona--inner" />
              <span className="hero-editorial-chromosphere" />
              <span className="hero-editorial-baileys" />
              <span className="hero-editorial-prominence hero-editorial-prominence--one" />
              <span className="hero-editorial-prominence hero-editorial-prominence--two" />
              <span className="hero-editorial-prominence hero-editorial-prominence--three" />
              <span className="hero-editorial-disc">
                <span className="hero-editorial-lunar-surface" />
              </span>
              <span className="hero-editorial-diamond">
                <span className="hero-editorial-flare hero-editorial-flare--horizontal" />
                <span className="hero-editorial-flare hero-editorial-flare--vertical" />
              </span>
            </div>
            <div className="hero-editorial-ring hero-editorial-ring--outer">
              <OrbitalRing
                size={640}
                dotCount={3}
                duration={72}
                color="rgba(212,175,55,0.46)"
                animate={ambientMotionEnabled}
              />
            </div>
            <div className="hero-editorial-ring hero-editorial-ring--inner">
              <OrbitalRing
                size={500}
                dotCount={2}
                duration={54}
                color="rgba(107,163,255,0.34)"
                animate={ambientMotionEnabled}
              />
            </div>
            <span className="hero-editorial-reflection" />
            <span className="hero-editorial-telemetry hero-editorial-telemetry--top">{copy.systemLabel}</span>
          </motion.div>

          <div className="hero-editorial-copy relative z-10 w-full">
            <motion.h1
              custom={0.16}
              variants={reveal}
              initial="hidden"
              animate="visible"
              className="hero-editorial-title"
            >
              <span className="hero-editorial-title-line">{copy.titleLead}</span>
              <span className="hero-editorial-title-line hero-editorial-title-line--accent">{copy.titleAccent}</span>
              <span className="hero-editorial-title-line hero-editorial-title-line--end">{copy.titleEnd}</span>
            </motion.h1>

            <div className="hero-editorial-action-grid mt-8 sm:mt-10 lg:mt-12">
              <motion.div custom={0.3} variants={reveal} initial="hidden" animate="visible">
                <p className="hero-editorial-description type-body">{copy.description}</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <MagneticButton strength={0.18}>
                    <a href="#contact" className="hero-editorial-cta hero-editorial-cta--primary">
                      <span>{copy.primaryCta}</span>
                      <span aria-hidden>↗</span>
                    </a>
                  </MagneticButton>
                  <a href="#cases" className="hero-editorial-cta hero-editorial-cta--secondary">
                    <span>{copy.secondaryCta}</span>
                    <span aria-hidden>↓</span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                custom={0.42}
                variants={reveal}
                initial="hidden"
                animate="visible"
                className="hero-editorial-status"
              >
                <p className="type-meta flex items-center gap-3" style={{ color: 'var(--text-3)' }}>
                  <span className="hero-signal-dot h-2 w-2 rounded-full" aria-hidden />
                  {copy.availability}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-4)' }}>
                  {copy.location}
                </p>
                <a
                  href={contactDetails.telegramDmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center border-b text-[12px] uppercase tracking-[0.16em] transition-colors hover:text-[var(--gold)]"
                  style={{ borderColor: 'var(--line)', color: 'var(--text-2)' }}
                >
                  Telegram {contactDetails.telegramDm}
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          custom={0.52}
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="hero-editorial-proof border-t pt-5"
        >
          <p className="type-meta hidden lg:block" style={{ color: 'var(--text-4)' }}>
            {copy.scrollLabel} ↓
          </p>
          <dl className="hero-editorial-metrics">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="hero-editorial-metric">
                <dt className="text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--text-4)' }}>
                  0{index + 1} / {metric.label}
                </dt>
                <dd className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-display text-xl font-medium tracking-tight sm:text-2xl" style={{ color: 'var(--text-1)' }}>
                    {metric.value}
                  </span>
                  <a
                    href={metric.sourceHref}
                    className="inline-flex min-h-11 items-center border-b text-[9px] uppercase tracking-[0.14em] transition-colors hover:text-[var(--gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ color: 'var(--text-4)', borderColor: 'var(--line)', outlineColor: 'var(--gold)' }}
                  >
                    {metric.sourceLabel} ↗
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
