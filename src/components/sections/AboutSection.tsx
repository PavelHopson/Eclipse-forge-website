import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

export function AboutSection() {
  return (
    <motion.section
      id="about"
      className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <motion.div variants={revealUp}>
            <SectionHeading
              eyebrow="О компании"
              title="Превращаем идею в систему, которая работает как актив бизнеса."
            />
          </motion.div>

          <motion.div variants={revealUp} className="space-y-6">
            <p className="text-[0.95rem] leading-[1.85] text-white/45">
              Мы не делаем «ещё один сайт». Мы проектируем цифровые продукты,
              автоматизацию и сервисы, которые сокращают хаос, усиливают продажи
              и создают ощущение серьёзного бренда с первого экрана.
            </p>
            <p className="text-[0.95rem] leading-[1.85] text-white/45">
              Код, дизайн и архитектура работают в одной связке. Результат
              выглядит сильно, запускается быстро и закладывает основу
              для роста, а не для бесконечных переделок.
            </p>
          </motion.div>
        </div>

        {/* Divider line */}
        <motion.div variants={revealUp} className="mt-20">
          <div className="h-px w-full bg-gradient-to-r from-accent/20 via-white/[0.06] to-transparent" />
        </motion.div>
      </div>
    </motion.section>
  );
}
