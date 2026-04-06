import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';

export function AboutSection() {
  return (
    <motion.section id="about" className="section-shell py-20 sm:py-24 lg:py-28" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--accent-text)', opacity: 0.6 }}>О компании</motion.p>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.h2 variants={revealUp} className="type-display text-[clamp(2rem,4vw,3.8rem)] text-gradient max-w-lg">
            Идея → система, которая работает как актив.
          </motion.h2>
          <motion.div variants={revealUp} className="space-y-5">
            <p className="type-body text-base sm:text-[17px] text-secondary">
              Мы не делаем «ещё один сайт». Мы проектируем цифровые продукты,
              автоматизацию и сервисы, которые сокращают хаос и усиливают продажи.
            </p>
            <p className="type-body text-base sm:text-[17px] text-secondary">
              Код, дизайн и архитектура работают в одной связке. Результат
              запускается быстро и закладывает основу для масштабирования.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
