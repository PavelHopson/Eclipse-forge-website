import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';

export function AboutSection() {
  return (
    <motion.section
      id="about"
      className="section-shell py-32 sm:py-40"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <motion.p variants={revealUp} className="type-meta text-accent/40 mb-8">
          О компании
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.h2 variants={revealUp} className="type-display text-section text-gradient max-w-lg">
            Идея → система, которая работает как актив.
          </motion.h2>

          <motion.div variants={revealUp} className="space-y-6 lg:pt-4">
            <p className="type-body text-[15px] text-white/30">
              Мы не делаем «ещё один сайт». Мы проектируем цифровые продукты,
              автоматизацию и сервисы, которые сокращают хаос, усиливают продажи
              и создают ощущение серьёзного бренда с первого экрана.
            </p>
            <p className="type-body text-[15px] text-white/30">
              Код, дизайн и архитектура работают в одной связке. Результат
              запускается быстро и закладывает основу для масштабирования.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
