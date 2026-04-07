import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { contactDetails, contactFlow } from '../../data/content';
import { revealUp, viewport } from '../../lib/animation';

type Mode = 'eclipse' | 'signal';
type Step = 0 | 1 | 2 | 3 | 4;

const prompts = [
  'Что нужно сделать?',
  'Какой результат ожидаете?',
  'Сроки и бюджет, если есть?',
];

export function CtaSection() {
  const [mode, setMode] = useState<Mode>('eclipse');
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const [analyzing, setAnalyzing] = useState(false);
  const [signal, setSignal] = useState(0);
  const [eclipseAnim, setEclipseAnim] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEclipse = mode === 'eclipse';

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setEclipseAnim(true);
    setTimeout(() => {
      setMode(m);
      setTimeout(() => setEclipseAnim(false), 600);
    }, 400);
  };

  const handleSubmit = () => {
    if (step < 3) {
      if (!answers[step].trim()) return;
      setStep((step + 1) as Step);
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

  // Analyze after all steps
  useEffect(() => {
    if (step === 3) {
      setAnalyzing(true);
      const total = answers.join('').length;
      const strength = Math.min(98, Math.max(45, Math.round(total * 1.5 + 30)));
      setTimeout(() => {
        setSignal(strength);
        setAnalyzing(false);
        setStep(4);
      }, 2000);
    }
  }, [step, answers]);

  const reset = () => {
    setStep(0);
    setAnswers(['', '', '']);
    setSignal(0);
  };

  // Colors per mode
  const bg = isEclipse ? '#05070A' : '#F2F4F7';
  const cardBg = isEclipse ? '#0B0F14' : '#FFFFFF';
  const text1 = isEclipse ? '#E6EDF3' : '#111111';
  const text2 = isEclipse ? '#9DA7B3' : '#555555';
  const text3 = isEclipse ? '#5C6670' : '#999999';
  const line = isEclipse ? '#1C232B' : 'rgba(0,0,0,0.08)';
  const accent = isEclipse ? '#6BA3FF' : '#111111';
  const inputBg = isEclipse ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';

  return (
    <motion.section
      id="contact"
      className="section-shell relative overflow-hidden"
      style={{ background: bg, transition: 'background 0.6s cubic-bezier(0.4,0,0.2,1)' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {/* Eclipse transition circle */}
      <AnimatePresence>
        {eclipseAnim && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="rounded-full"
              style={{ background: mode === 'eclipse' ? '#F2F4F7' : '#05070A' }}
              initial={{ width: 0, height: 0 }}
              animate={{ width: '300vmax', height: '300vmax' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        {/* Mode switcher */}
        <motion.div variants={revealUp} className="flex items-center justify-center gap-1 mb-16">
          <button
            onClick={() => switchMode('eclipse')}
            className="px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.25em] font-display font-medium transition-all duration-500"
            style={{
              background: isEclipse ? 'rgba(167,180,194,0.1)' : 'transparent',
              color: isEclipse ? text1 : text3,
              border: `1px solid ${isEclipse ? 'rgba(167,180,194,0.15)' : line}`,
            }}
          >
            Eclipse
          </button>
          <button
            onClick={() => switchMode('signal')}
            className="px-6 py-2.5 rounded-full text-[11px] uppercase tracking-[0.25em] font-display font-medium transition-all duration-500"
            style={{
              background: !isEclipse ? 'rgba(0,0,0,0.06)' : 'transparent',
              color: !isEclipse ? text1 : text3,
              border: `1px solid ${!isEclipse ? 'rgba(0,0,0,0.1)' : line}`,
            }}
          >
            Signal
          </button>
        </motion.div>

        {/* Header */}
        <motion.div variants={revealUp} className="text-center mb-12">
          <p className="type-meta mb-4" style={{ color: text3, transition: 'color 0.5s' }}>
            {isEclipse ? 'Система обнаружила запрос' : 'Режим передачи сигнала'}
          </p>
          <h2 className="type-display text-section max-w-2xl mx-auto" style={{ color: text1, transition: 'color 0.5s' }}>
            {isEclipse ? 'Опишите задачу.' : 'Отправить сигнал.'}
          </h2>
        </motion.div>

        {/* Terminal */}
        <motion.div
          variants={revealUp}
          className="max-w-2xl mx-auto rounded-2xl border overflow-hidden"
          style={{ borderColor: line, background: cardBg, transition: 'all 0.5s', boxShadow: isEclipse ? '0 0 80px rgba(220,230,242,0.04)' : '0 1px 30px rgba(0,0,0,0.06)' }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: line }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: isEclipse ? '#5C6670' : '#ccc' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: isEclipse ? '#5C6670' : '#ccc' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: isEclipse ? '#5C6670' : '#ccc' }} />
            <span className="ml-3 text-[10px] tracking-[0.2em] uppercase" style={{ color: text3 }}>
              {isEclipse ? 'eclipse://terminal' : 'signal://input'}
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6 sm:p-8 min-h-[280px] flex flex-col justify-between font-body">
            {/* Previous answers */}
            <div className="space-y-4 mb-6">
              {prompts.map((prompt, i) => (
                i < step && (
                  <div key={i}>
                    <p className="text-[12px] mb-1" style={{ color: text3 }}>{`> ${prompt}`}</p>
                    <p className="text-[14px] pl-4 border-l-2" style={{ color: text2, borderColor: accent }}>{answers[i]}</p>
                  </div>
                )
              ))}
            </div>

            {/* Current step */}
            <AnimatePresence mode="wait">
              {step < 3 && (
                <motion.div
                  key={`step-${step}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-[12px] mb-3" style={{ color: accent }}>
                    {`> ${prompts[step]}`}
                  </p>
                  <div className="flex gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={answers[step]}
                      onChange={(e) => updateAnswer(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Введите ответ..."
                      autoFocus
                      className="flex-1 px-4 py-3 rounded-lg text-[14px] outline-none border transition-colors duration-300"
                      style={{
                        background: inputBg,
                        color: text1,
                        borderColor: line,
                        caretColor: accent,
                      }}
                    />
                    <button
                      onClick={handleSubmit}
                      className="px-5 py-3 rounded-lg text-[12px] uppercase tracking-[0.15em] font-display font-medium transition-all duration-300"
                      style={{
                        background: isEclipse ? 'rgba(167,180,194,0.08)' : 'rgba(0,0,0,0.05)',
                        color: accent,
                        border: `1px solid ${line}`,
                      }}
                    >
                      →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Analyzing */}
              {step === 3 && analyzing && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center gap-3">
                    <motion.div
                      className="w-3 h-3 rounded-full"
                      style={{ background: accent }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <p className="text-[13px] font-display tracking-[0.15em] uppercase" style={{ color: text2 }}>
                      Analyzing request...
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Result */}
              {step === 4 && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-4"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: text3 }}>
                    Signal strength
                  </p>
                  <p className="font-display text-4xl sm:text-5xl font-light mb-2" style={{ color: text1 }}>
                    {signal}%
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.2em] mb-8" style={{ color: signal > 70 ? (isEclipse ? '#6EC8A0' : '#2a8a5a') : text3 }}>
                    {signal > 70 ? 'System readiness: HIGH' : 'System readiness: MODERATE'}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`${contactDetails.telegramDmUrl}?text=${encodeURIComponent(answers.filter(a => a).join('\n'))}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[13px] font-display font-medium btn-sweep transition-all duration-500"
                      style={{
                        background: isEclipse ? 'rgba(167,180,194,0.08)' : '#111',
                        color: isEclipse ? '#E6EDF3' : '#fff',
                        border: `1px solid ${isEclipse ? 'rgba(167,180,194,0.2)' : '#333'}`,
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, opacity: 0.5 }} />
                      {isEclipse ? 'Войти в работу' : 'Отправить сигнал'}
                    </a>
                    <button
                      onClick={reset}
                      className="text-[12px] tracking-[0.15em] uppercase transition-colors duration-300"
                      style={{ color: text3 }}
                    >
                      Сбросить
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Contact cards */}
        <motion.div variants={revealUp} className="mt-14 grid grid-cols-2 sm:grid-cols-5 gap-px" style={{ background: line }}>
          {[
            { label: 'Связь', value: contactDetails.telegramDm, href: contactDetails.telegramDmUrl, highlight: true },
            { label: 'Канал', value: contactDetails.telegramChannel, href: contactDetails.telegramChannelUrl, highlight: false },
            { label: 'Email', value: contactDetails.email, href: `mailto:${contactDetails.email}`, highlight: false },
            { label: 'GitHub', value: contactDetails.githubHandle, href: contactDetails.githubUrl, highlight: false },
            { label: 'Время', value: contactDetails.cityTimezone, href: undefined, highlight: false },
          ].map((c) => (
            <a key={c.label} href={c.href || '#'} target={c.href?.startsWith('http') ? '_blank' : undefined} rel={c.href?.startsWith('http') ? 'noreferrer' : undefined}
              className="p-5 sm:p-6 transition-all duration-400 hover:bg-white/[0.015]"
              style={{ background: bg, color: c.highlight ? accent : text2 }}>
              <p className="type-meta mb-2" style={{ color: text3 }}>{c.label}</p>
              <p className="font-display text-[13px] sm:text-[14px] truncate">{c.value}</p>
            </a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
