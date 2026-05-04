import { motion } from 'framer-motion';
import { useState } from 'react';
import { contactDetails, contactFlow, contactPrompts } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { ConstellationField, EclipseSilhouette, OrbitalRing, ParticleField } from '../ui/EclipseVisuals';

const emptyAnswers = contactPrompts.map(() => '');

export function CtaSection() {
  const [answers, setAnswers] = useState<string[]>(emptyAnswers);
  const [copied, setCopied] = useState(false);

  const signalPacket = [
    'Eclipse Forge / Request Signal',
    '',
    ...contactPrompts.map((item, index) => `${index + 1}. ${item.prompt}\n${answers[index] || '...'}`),
  ].join('\n\n');

  const completion = Math.round((answers.filter((value) => value.trim().length > 0).length / contactPrompts.length) * 100);

  const emailHref = `mailto:${contactDetails.email}?subject=${encodeURIComponent('Eclipse Forge request')}&body=${encodeURIComponent(signalPacket)}`;

  const handleAnswerChange = (index: number, value: string) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(signalPacket);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleTelegramOpen = async () => {
    if (answers.some((item) => item.trim())) {
      await handleCopy();
    }

    window.open(contactDetails.telegramDmUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.section
      id="contact"
      className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-36"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="absolute inset-0 contact-atmosphere-bg" />
      <div className="absolute inset-0 opacity-45">
        <ConstellationField className="opacity-30" />
        <ParticleField count={18} className="opacity-35" />
      </div>
      <div className="absolute left-[-8%] top-[18%] hidden lg:block opacity-20">
        <OrbitalRing size={360} dotCount={3} duration={38} color="var(--accent)" />
      </div>
      <div className="absolute bottom-[-8%] right-[-6%] hidden lg:block opacity-20">
        <EclipseSilhouette size={420} coronaColor="rgba(117, 140, 255, 0.14)" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.div variants={revealUp} className="mb-12 max-w-3xl">
          <p className="type-meta mb-5" style={{ color: 'var(--accent)' }}>
            Contact console
          </p>
          <h2 className="type-display text-[clamp(2.3rem,5vw,4.8rem)]">
            Bring the manual chaos.
            <span className="block text-gradient-hero">Leave with a clearer system path.</span>
          </h2>
          <p className="mt-6 type-body text-[15px] leading-relaxed sm:text-[16px]" style={{ color: 'var(--text-3)' }}>
            Fill the console in your own words. The packet is designed to make the first conversation precise fast: what you do manually, what the system should produce and where control is leaking now.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <motion.div variants={revealUp} className="flex flex-col gap-4">
            <div className="rounded-[2rem] border p-6 sm:p-7 contact-panel">
              <div className="flex items-center justify-between gap-4">
                <p className="type-meta" style={{ color: 'var(--accent)' }}>
                  Request channel
                </p>
                <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 contact-chip">
                  <span className="h-2 w-2 rounded-full hero-signal-dot" />
                  <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-3)' }}>
                    {contactFlow.status[0]}
                  </span>
                </div>
              </div>

              <button type="button" onClick={handleTelegramOpen} className="mt-6 w-full rounded-[1.7rem] border px-5 py-5 text-left transition-all duration-500 contact-primary-link">
                <span className="block font-display text-xl tracking-tight" style={{ color: 'var(--text-1)' }}>
                  Telegram
                </span>
                <span className="mt-1 block text-[13px]" style={{ color: 'var(--text-3)' }}>
                  {contactDetails.telegramDm}
                </span>
              </button>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Email', value: contactDetails.email, href: emailHref },
                  { label: 'Channel', value: contactDetails.telegramChannel, href: contactDetails.telegramChannelUrl },
                  { label: 'GitHub', value: contactDetails.githubHandle, href: contactDetails.githubUrl },
                  { label: 'Instagram', value: contactDetails.instagramHandle, href: contactDetails.instagramUrl },
                ].map((item) => (
                  <a key={item.label} href={item.href} target={item.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" className="rounded-2xl border px-4 py-4 transition-all duration-300 contact-link-card">
                    <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm" style={{ color: 'var(--text-2)' }}>
                      {item.value}
                    </p>
                  </a>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] border px-4 py-4 contact-panel">
                <p className="type-meta mb-3" style={{ color: 'var(--accent)' }}>
                  Response window
                </p>
                <div className="space-y-2 text-sm" style={{ color: 'var(--text-3)' }}>
                  <p>{contactDetails.responseTime}</p>
                  <p>{contactDetails.cityTimezone}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border p-6 contact-panel">
              <p className="type-meta mb-3" style={{ color: 'var(--accent)' }}>
                Intake signal
              </p>
              <div className="grid gap-3">
                {contactFlow.status.map((status) => (
                  <div key={status} className="flex items-center justify-between rounded-full border px-4 py-3 contact-chip">
                    <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-4)' }}>
                      status
                    </span>
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-2)' }}>
                      <span className="h-1.5 w-1.5 rounded-full hero-signal-dot" />
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={revealUp} className="overflow-hidden rounded-[2rem] border contact-console-shell">
            <div className="flex items-center gap-2 border-b px-5 py-3 contact-console-topbar">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 text-[10px] uppercase tracking-[0.24em]" style={{ color: 'var(--text-4)' }}>
                eclipse://operator-console
              </span>
              <span className="ml-auto inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em]" style={{ color: completion === 100 ? 'var(--live)' : 'var(--text-4)' }}>
                <span className="h-1.5 w-1.5 rounded-full hero-signal-dot" />
                {completion}% ready
              </span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b p-5 sm:p-7 lg:border-b-0 lg:border-r contact-console-body" style={{ borderColor: 'var(--line)' }}>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 contact-chip">
                  <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'var(--text-4)' }}>
                    live intake
                  </span>
                  <span className="console-cursor" />
                </div>

                <div className="space-y-5">
                  {contactPrompts.map((item, index) => (
                    <div key={item.label} className="rounded-[1.5rem] border p-4 sm:p-5 contact-console-card">
                      <p className="mb-3 text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--accent)' }}>
                        &gt; {item.prompt}
                      </p>
                      <textarea
                        value={answers[index]}
                        onChange={(event) => handleAnswerChange(index, event.target.value)}
                        rows={4}
                        placeholder={item.placeholder}
                        className="min-h-[120px] w-full resize-none rounded-[1.2rem] border px-4 py-4 text-[14px] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-opacity-30"
                        style={{
                          background: 'var(--input-bg)',
                          color: 'var(--text-1)',
                          borderColor: 'var(--line)',
                          caretColor: 'var(--accent)',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-7 contact-console-body">
                <div className="rounded-[1.6rem] border p-5 contact-signal-preview">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="type-meta" style={{ color: 'var(--accent)' }}>
                      Signal packet
                    </p>
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: completion === 100 ? 'var(--live)' : 'var(--text-4)' }}>
                      <span className="h-1.5 w-1.5 rounded-full hero-signal-dot" />
                      {completion === 100 ? contactFlow.status[1] : 'awaiting input'}
                    </span>
                  </div>

                  <pre className="max-h-[300px] overflow-auto whitespace-pre-wrap text-[12px] leading-6" style={{ color: 'var(--text-2)' }}>
                    {signalPacket}
                  </pre>
                </div>

                <div className="mt-5 grid gap-3">
                  <button type="button" onClick={handleTelegramOpen} className="rounded-full border px-5 py-4 text-[12px] font-display uppercase tracking-[0.16em] transition-all duration-300 contact-console-primary">
                    {contactFlow.primaryCta}
                  </button>
                  <button type="button" onClick={handleCopy} className="rounded-full border px-5 py-4 text-[12px] font-display uppercase tracking-[0.16em] transition-all duration-300 contact-console-secondary">
                    {copied ? 'Signal copied' : contactFlow.secondaryCta}
                  </button>
                </div>

                <div className="mt-5 rounded-[1.6rem] border px-4 py-4 contact-signal-preview">
                  <p className="type-meta mb-2" style={{ color: 'var(--accent)' }}>
                    Why this flow
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                    The first brief is usually where precision is lost. This console makes the initial signal structured before the conversation starts.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
