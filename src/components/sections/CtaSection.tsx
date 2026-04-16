import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { contactDetails } from '../../data/content';
import { revealUp, viewport } from '../../lib/animation';
import { EclipseSilhouette, ParticleField, OrbitalRing } from '../ui/EclipseVisuals';

type Step = 0 | 1 | 2 | 3 | 4;

const BOT_TOKEN = '8709666001:AAHU21ibqUxn2w8JSmGxoMruxFdiXq7qi8g';
const CHAT_ID = '7842454447';

const prompts = [
  'Ваше имя?',
  'Telegram или email для связи?',
  'Что нужно сделать?',
  'Какой результат ожидаете?',
  'Сроки и бюджет, если есть?',
];

export function CtaSection() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '', '']);
  const [analyzing, setAnalyzing] = useState(false);
  const [signal, setSignal] = useState(0);
  const [sent, setSent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (step < 5) {
      if (!answers[step].trim()) return;
      setStep(step + 1);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const updateAnswer = (val: string) => {
    const next = [...answers];
    next[step] = val;
    setAnswers(next);
  };

  useEffect(() => {
    if (step === 5 && !sent) {
      setAnalyzing(true);
      const total = answers.join('').length;
      const strength = Math.min(98, Math.max(55, Math.round(total * 1.2 + 35)));

      const message = [
        '🔔 *Новая заявка с сайта*', '',
        `👤 *Имя:* ${answers[0]}`, `📬 *Контакт:* ${answers[1]}`,
        `📋 *Задача:* ${answers[2]}`, `🎯 *Результат:* ${answers[3]}`,
        `⏰ *Сроки/бюджет:* ${answers[4]}`, '', `📊 Signal: ${strength}%`,
      ].join('\n');

      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' }),
      }).catch(() => {});

      setTimeout(() => { setSignal(strength); setAnalyzing(false); setSent(true); }, 2200);
    }
  }, [step, answers, sent]);

  const reset = () => { setStep(0); setAnswers(['', '', '', '', '']); setSignal(0); setSent(false); };

  return (
    <motion.section
      id="contact"
      className="relative overflow-hidden min-h-screen flex items-center"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
      initial="hidden" whileInView="visible" viewport={viewport}
    >
      {/* Full-screen gradient background */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 20%, rgba(107,163,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(245,166,35,0.05) 0%, transparent 50%), var(--bg)',
      }} />

      {/* Eclipse silhouette — large, faded */}
      <div className="absolute top-[10%] right-[-10%] opacity-20 hidden lg:block">
        <EclipseSilhouette size={500} coronaColor="rgba(245,166,35,0.12)" coronaSpread={60} />
      </div>

      {/* Orbital decoration */}
      <div className="absolute bottom-[20%] left-[-5%] opacity-15 hidden lg:block">
        <OrbitalRing size={300} dotCount={3} duration={35} color="var(--accent)" />
      </div>

      {/* Particles */}
      <ParticleField count={15} />

      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[25%] w-px h-full" style={{ background: 'linear-gradient(to bottom, transparent, var(--line-subtle) 30%, var(--line-subtle) 70%, transparent)' }} />
        <div className="absolute top-0 left-[75%] w-px h-full hidden lg:block" style={{ background: 'linear-gradient(to bottom, transparent, var(--line-subtle) 30%, var(--line-subtle) 70%, transparent)' }} />
      </div>

      <div className="relative z-10 w-full mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        {/* Header */}
        <motion.div variants={revealUp} className="text-center mb-14">
          <p className="type-meta mb-5" style={{ color: 'var(--accent)' }}>Контакт</p>
          <h2 className="type-display max-w-3xl mx-auto mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)' }}>
            <span className="text-gradient">Опишите задачу.</span>
          </h2>
          <p className="type-body text-[15px] sm:text-[16px] max-w-lg mx-auto" style={{ color: 'var(--text-3)' }}>
            Или напишите напрямую в Telegram — ответ в течение нескольких часов.
          </p>
        </motion.div>

        {/* Two-column: Telegram CTA + Terminal form */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 max-w-5xl mx-auto">

          {/* LEFT — Direct Telegram CTA */}
          <motion.div variants={revealUp} className="flex flex-col gap-6">
            {/* Primary CTA */}
            <a href={contactDetails.telegramDmUrl} target="_blank" rel="noreferrer"
              className="group relative flex items-center gap-5 border rounded-2xl p-6 sm:p-8 transition-all duration-500 overflow-hidden"
              style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}>
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(107,163,255,0.06) 0%, transparent 70%)' }} />
              <div className="relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center border"
                style={{ borderColor: 'var(--accent-dim)', background: 'var(--accent-soft)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent)">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div className="relative flex-1">
                <span className="font-display text-lg font-medium block mb-1" style={{ color: 'var(--text-1)' }}>
                  Написать в Telegram
                </span>
                <span className="text-[13px]" style={{ color: 'var(--text-3)' }}>
                  {contactDetails.telegramDm}
                </span>
              </div>
              <span className="relative text-[20px] group-hover:translate-x-1 transition-transform duration-300" style={{ color: 'var(--accent)' }}>→</span>
            </a>

            {/* Contact links */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '✉', label: 'Email', value: contactDetails.email, href: `mailto:${contactDetails.email}` },
                { icon: '📢', label: 'Канал', value: contactDetails.telegramChannel, href: contactDetails.telegramChannelUrl },
                { icon: '📸', label: 'Instagram', value: contactDetails.instagramHandle, href: contactDetails.instagramUrl },
                { icon: '🔗', label: 'GitHub', value: contactDetails.githubHandle, href: contactDetails.githubUrl },
              ].map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  className="group border rounded-xl p-4 transition-all duration-400 hover:border-[rgba(107,163,255,0.15)]"
                  style={{ borderColor: 'var(--line)', background: 'rgba(12,17,23,0.4)' }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--text-4)' }}>{c.label}</p>
                  <p className="font-display text-[13px] truncate group-hover:text-[var(--accent)] transition-colors duration-300" style={{ color: 'var(--text-2)' }}>{c.value}</p>
                </a>
              ))}
            </div>

            {/* Timezone */}
            <div className="flex items-center gap-3 px-2">
              <motion.div className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--live)' }}
                animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'var(--text-4)' }}>
                {contactDetails.cityTimezone} · {contactDetails.responseTime}
              </span>
            </div>
          </motion.div>

          {/* RIGHT — Terminal form */}
          <motion.div variants={revealUp}
            className="rounded-2xl border overflow-hidden"
            style={{ borderColor: 'var(--line)', background: 'var(--bg-card)', boxShadow: '0 0 80px rgba(107,163,255,0.03)' }}>

            {/* Terminal header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: 'var(--line)' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#5C6670' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#5C6670' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#5C6670' }} />
              <span className="ml-3 text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-4)' }}>
                eclipse://terminal
              </span>
              <span className="ml-auto text-[10px]" style={{ color: 'var(--text-4)' }}>
                {step}/5
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-6 sm:p-8 min-h-[340px] flex flex-col justify-between font-body">
              {/* Previous answers */}
              <div className="space-y-4 mb-6">
                {prompts.map((prompt, i) => (
                  i < step && (
                    <div key={i}>
                      <p className="text-[12px] mb-1" style={{ color: 'var(--text-4)' }}>{`> ${prompt}`}</p>
                      <p className="text-[14px] pl-4 border-l-2" style={{ color: 'var(--text-2)', borderColor: 'var(--accent)' }}>{answers[i]}</p>
                    </div>
                  )
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step < 5 && !analyzing && (
                  <motion.div key={`step-${step}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <p className="text-[12px] mb-3" style={{ color: 'var(--accent)' }}>{`> ${prompts[step]}`}</p>
                    <div className="flex gap-3">
                      <input ref={inputRef} type="text" value={answers[step]}
                        onChange={(e) => updateAnswer(e.target.value)} onKeyDown={handleKeyDown}
                        placeholder="Введите ответ..." autoFocus
                        className="flex-1 px-4 py-3 rounded-xl text-[14px] outline-none border transition-colors duration-300 focus:border-[var(--accent-dim)]"
                        style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-1)', borderColor: 'var(--line)', caretColor: 'var(--accent)' }} />
                      <button onClick={handleSubmit}
                        className="px-5 py-3 rounded-xl text-[12px] uppercase tracking-[0.15em] font-display font-medium transition-all duration-300 hover:bg-[var(--accent-soft)]"
                        style={{ background: 'rgba(107,163,255,0.06)', color: 'var(--accent)', border: '1px solid var(--line)' }}>
                        →
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 5 && analyzing && (
                  <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                    <div className="inline-flex items-center gap-3">
                      <motion.div className="w-3 h-3 rounded-full" style={{ background: 'var(--accent)' }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity }} />
                      <p className="text-[13px] font-display tracking-[0.15em] uppercase" style={{ color: 'var(--text-3)' }}>
                        Analyzing...
                      </p>
                    </div>
                  </motion.div>
                )}

                {sent && (
                  <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center py-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--text-4)' }}>Signal strength</p>
                    <p className="font-display text-4xl sm:text-5xl font-light mb-2" style={{ color: 'var(--text-1)' }}>{signal}%</p>
                    <p className="text-[11px] uppercase tracking-[0.2em] mb-8"
                      style={{ color: signal > 70 ? 'var(--live)' : 'var(--text-3)' }}>
                      {signal > 70 ? 'Readiness: HIGH' : 'Readiness: MODERATE'}
                    </p>
                    <p className="text-[13px] mb-6" style={{ color: 'var(--live)' }}>
                      Заявка отправлена. Мы свяжемся с вами.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a href={contactDetails.telegramDmUrl} target="_blank" rel="noreferrer"
                        className="inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[13px] font-display font-medium btn-sweep transition-all duration-500"
                        style={{ background: 'var(--accent-soft)', color: 'var(--text-1)', border: '1px solid var(--accent-dim)' }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)', opacity: 0.5 }} />
                        Telegram
                      </a>
                      <button onClick={reset} className="text-[12px] tracking-[0.15em] uppercase transition-colors duration-300" style={{ color: 'var(--text-4)' }}>
                        Новая заявка
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
