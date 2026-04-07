import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';

export function AboutSection() {
  return (
    <motion.section id="about" className="section-shell py-20 sm:py-24 lg:py-28" variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <motion.p variants={revealUp} className="type-meta mb-6" style={{ color: 'var(--text-3)' }}>Позиционирование</motion.p>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">
          <motion.h2 variants={revealUp} className="type-display text-section text-gradient max-w-lg">
            Идея → система, которая работает как актив.
          </motion.h2>
          <motion.div variants={revealUp} className="space-y-5">
            <p className="type-body text-[15px] sm:text-base" style={{ color: 'var(--text-2)' }}>
              Мы проектируем цифровые продукты, автоматизацию и сервисы,
              которые сокращают хаос и усиливают продажи.
            </p>
            <p className="type-body text-[15px] sm:text-base" style={{ color: 'var(--text-3)' }}>
              Код, дизайн и архитектура работают в одной связке.
              Результат запускается быстро и масштабируется.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
