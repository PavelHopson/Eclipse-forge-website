import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { useLocale, type Locale } from '../../lib/locale';
import { ReadinessPulse } from '../ui/ReadinessPulse';

const copy: Record<Locale, { eyebrow: string; title: string; accent: string; lead: string; button: string; note: string; checks: Array<{ title: string; text: string }> }> = {
  ru: {
    eyebrow: 'Практический материал · бесплатно',
    title: 'Проверьте AI-проект',
    accent: 'до production.',
    lead: 'Короткий чек-лист без регистрации: данные, AI-качество, безопасность, наблюдаемость и безопасный rollback. Подойдёт для внутренней проверки или разговора с подрядчиком.',
    button: 'Скачать чек-лист',
    note: 'Markdown · 5 минут · без email и подписки',
    checks: [
      { title: 'Ценность', text: 'Понятна проблема, пользователь и измеримый результат.' },
      { title: 'Данные', text: 'Есть provenance, consent, retention и путь удаления.' },
      { title: 'AI-качество', text: 'Есть eval-набор, ограничения и human fallback.' },
      { title: 'Безопасность', text: 'Секреты, permissions, prompt injection и supply chain проверены.' },
      { title: 'Эксплуатация', text: 'Есть логи без PII, лимиты, алерты, rollback и ответственный.' },
    ],
  },
  en: {
    eyebrow: 'Practical resource · free',
    title: 'Check your AI product',
    accent: 'before production.',
    lead: 'A short no-signup checklist covering data, AI quality, security, observability and safe rollback. Use it for an internal review or a vendor conversation.',
    button: 'Download checklist',
    note: 'Markdown · 5 minutes · no email or subscription',
    checks: [
      { title: 'Value', text: 'The problem, user and measurable outcome are explicit.' },
      { title: 'Data', text: 'Provenance, consent, retention and deletion are defined.' },
      { title: 'AI quality', text: 'An eval set, limits and a human fallback exist.' },
      { title: 'Security', text: 'Secrets, permissions, prompt injection and supply chain are reviewed.' },
      { title: 'Operations', text: 'PII-safe logs, limits, alerts, rollback and ownership exist.' },
    ],
  },
};

export function ProductionReadinessSection() {
  const { locale } = useLocale();
  const text = copy[locale];

  return (
    <motion.section id="production-readiness" className="section-shell relative overflow-hidden py-16 sm:py-24 lg:py-32" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
        <div className="grid overflow-hidden rounded-[1.8rem] border lg:grid-cols-[0.82fr_1.18fr]" style={{ borderColor: 'var(--line)', background: 'var(--bg-card)' }}>
          <motion.div variants={revealUp} className="relative flex flex-col justify-between p-7 sm:p-10 lg:p-12">
            <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(circle at 15% 10%, rgba(212,175,55,.12), transparent 45%)' }} />
            <div className="relative">
              <p className="type-meta" style={{ color: 'var(--gold)' }}>{text.eyebrow}</p>
              <h2 className="type-display mt-6 text-[clamp(2rem,4vw,3.6rem)]"><span style={{ color: 'var(--text-1)' }}>{text.title}</span><span className="block text-gradient-hero">{text.accent}</span></h2>
              <p className="mt-6 max-w-lg type-body text-[14px] leading-7 sm:text-[16px]" style={{ color: 'var(--text-3)' }}>{text.lead}</p>
            </div>
            <div className="relative mt-8">
              <a href="/guides/ai-project-production-readiness.md" download className="case-link-primary inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-[13px] font-display tracking-[.04em]">{text.button}<span className="ml-3" aria-hidden>↓</span></a>
              <p className="mt-3 text-[10px] uppercase tracking-[.16em]" style={{ color: 'var(--text-4)' }}>{text.note}</p>
            </div>
          </motion.div>

          <motion.div variants={revealUp} className="border-t lg:border-l lg:border-t-0" style={{ borderColor: 'var(--line)' }}>
            <ReadinessPulse items={text.checks} locale={locale} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
