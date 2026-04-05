import { motion } from 'framer-motion';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

export function AboutSection() {
  return (
    <motion.section
      id="about"
      className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-md sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <motion.div variants={revealUp}>
          <SectionHeading
            eyebrow="Позиционирование"
            title="Eclipse Forge превращает идею в систему, которая работает как актив бизнеса."
          />
        </motion.div>

        <motion.div
          variants={revealUp}
          className="grid gap-6 text-white/68 sm:gap-8 lg:grid-cols-2"
        >
          <p className="type-body text-sm leading-7 sm:text-base sm:leading-8">
            Мы не делаем “ещё один сайт”. Мы проектируем цифровые продукты,
            автоматизацию и сервисы, которые сокращают хаос, усиливают продажи
            и создают ощущение серьёзного бренда с первого экрана.
          </p>
          <p className="type-body text-sm leading-7 sm:text-base sm:leading-8">
            Для нас код, дизайн и архитектура работают в одной связке. Поэтому
            результат выглядит сильно, запускается быстро и закладывает основу
            для роста, а не для бесконечных переделок.
          </p>
        </motion.div>
      </div>
      </div>
    </motion.section>
  );
}
