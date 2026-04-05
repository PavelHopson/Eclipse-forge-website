import { motion } from 'framer-motion';
import { services } from '../../data/content';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { SectionHeading } from '../ui/SectionHeading';

const serviceCopy = [
  'Убираем ручные узкие места и превращаем процессы в управляемые сценарии.',
  'Собираем AI-слой под реальную задачу: ответы, маршрутизация, ассистенты, аналитика.',
  'Проектируем панели, кабинеты, CRM-слои и внутренние системы управления.',
];

export function ServicesSection() {
  return (
    <motion.section
      id="services"
      className="px-4 py-20 sm:px-6 lg:px-10 lg:py-24"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.025] p-8 backdrop-blur-md sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div variants={revealUp}>
            <SectionHeading
              eyebrow="Services"
              title="Технология как инструмент роста, а не витрина."
            />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                variants={revealUp}
                className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6"
              >
                <div className="mb-5 h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_16px_rgba(251,146,60,0.9)]" />
                <h3 className="type-heading text-[1.35rem] font-medium text-white sm:text-[1.6rem]">
                  {service.title}
                </h3>
                <p className="type-body mt-3 text-sm leading-6 text-white/68 sm:text-[0.98rem]">
                  {serviceCopy[index] ?? service.text}
                </p>
              </motion.article>
            ))}

            <motion.article
              variants={revealUp}
              className="rounded-[1.75rem] border border-orange-400/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))] p-6 sm:col-span-2"
            >
              <p className="type-body max-w-2xl text-sm leading-7 text-white/66 sm:text-base">
                Мы строим не набор экранов, а рабочую инфраструктуру роста: продукт,
                процессы, автоматизацию и интерфейсы, которые выглядят сильно и
                выдерживают реальную нагрузку бизнеса.
              </p>
            </motion.article>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
