import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

export function AboutSection() {
  return (
    <motion.section
      id="about"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <motion.div variants={revealUp}>
          <SectionHeading
            eyebrow="Позиционирование"
            title="Eclipse Forge превращает идею в систему, которая зарабатывает."
          />
        </motion.div>

        <motion.div
          variants={revealUp}
          className="grid gap-6 text-white/68 sm:gap-8 lg:grid-cols-2"
        >
          <p className="text-sm leading-7 sm:text-base sm:leading-8">
            Мы не делаем “ещё один сайт”. Мы собираем цифровые продукты,
            автоматизацию и сервисы, которые сокращают хаос, усиливают продажи
            и создают ощущение серьёзного бренда уже с первого экрана.
          </p>
          <p className="text-sm leading-7 sm:text-base sm:leading-8">
            Для нас код, дизайн и архитектура работают в одной связке. Поэтому
            результат выглядит сильно, запускается быстро и закладывает основу
            для роста, а не для бесконечных переделок.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
