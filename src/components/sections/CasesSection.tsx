import { motion } from 'framer-motion';
import { cases } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

export function CasesSection() {
  return (
    <motion.section
      id="cases"
      className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={revealUp}
          className="mb-8 flex items-end justify-between gap-6"
        >
          <div>
            <SectionHeading
              eyebrow="Selected cases"
              title="Системы, которые влияют на бизнес."
            />
          </div>
          <p className="hidden max-w-md text-sm leading-6 text-white/56 md:block">
            Каждый кейс оформлен как рабочая история: проблема, решение и измеримый результат.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {cases.map((item, index) => (
            <motion.article
              key={item.title}
              variants={revealUp}
              className="group rounded-[1.9rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-6 transition hover:border-orange-400/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)]"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-white/35">
                Case {index + 1}
              </p>
              <h3 className="type-heading mt-4 text-[1.65rem] font-medium text-white sm:text-[2rem]">
                {item.title}
              </h3>

              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-white/35">Проблема</dt>
                  <dd className="type-body mt-2 text-sm leading-6 text-white/68">{item.problem}</dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-[0.28em] text-white/35">Решение</dt>
                  <dd className="type-body mt-2 text-sm leading-6 text-white/68">{item.solution}</dd>
                </div>
              </dl>

              <div className="mt-8 rounded-2xl border border-orange-400/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-100">
                {item.result}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
