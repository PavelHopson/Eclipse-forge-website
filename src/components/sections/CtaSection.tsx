import { motion, useReducedMotion } from 'framer-motion';
import { ChangeEvent, FormEvent, startTransition, useState } from 'react';
import { revealUp, stagger, viewport } from '../../lib/animation';
import { GlowButton } from '../ui/GlowButton';

const FORM_NAME = 'eclipse-forge-lead';

type FormState = {
  name: string;
  email: string;
  contact: string;
  projectType: string;
  brief: string;
  budget: string;
  deadline: string;
  botField: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const initialFormState: FormState = {
  name: '',
  email: '',
  contact: '',
  projectType: '',
  brief: '',
  budget: '',
  deadline: '',
  botField: '',
};

const quickContacts = [
  {
    label: 'Email',
    value: 'hello@eclipseforge.dev',
    href: 'mailto:hello@eclipseforge.dev',
  },
  {
    label: 'Telegram',
    value: '@eclipseforge',
    href: 'https://t.me/eclipseforge',
  },
] as const;

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(form: FormState) {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = 'Укажите имя, чтобы мы понимали, как к вам обращаться.';
  if (!form.email.trim()) {
    errors.email = 'Нужен email для ответа на заявку.';
  } else if (!validateEmail(form.email.trim())) {
    errors.email = 'Проверьте email, он выглядит некорректно.';
  }
  if (!form.contact.trim()) {
    errors.contact = 'Оставьте Telegram или другой быстрый способ связи.';
  }
  if (!form.projectType.trim()) {
    errors.projectType = 'Выберите формат задачи, чтобы мы быстрее сориентировались.';
  }
  if (!form.brief.trim()) {
    errors.brief = 'Коротко опишите задачу или текущую точку боли.';
  }

  return errors;
}

type FieldProps = {
  label: string;
  name: keyof FormState;
  value: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  rows?: number;
  type?: 'text' | 'email';
  onChange: (name: keyof FormState, value: string) => void;
};

function TextField({
  label,
  name,
  value,
  placeholder,
  required,
  error,
  rows,
  type = 'text',
  onChange,
}: FieldProps) {
  const sharedProps = {
    id: name,
    name,
    value,
    placeholder,
    required,
    className: 'field-input mt-3 text-[0.98rem] text-white/92',
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => onChange(name, event.target.value),
  };

  return (
    <label className="block">
      <div className="field-shell px-4 py-3.5 sm:px-4 sm:py-4" data-invalid={Boolean(error)}>
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-[0.62rem] uppercase tracking-[0.28em] text-white/34">
              {label}
            </span>
            {required ? (
              <span className="text-[0.62rem] uppercase tracking-[0.16em] text-accent/72">
                Обязательно
              </span>
            ) : null}
          </div>
          {rows ? (
            <textarea
              {...sharedProps}
              rows={rows}
            />
          ) : (
            <input
              {...sharedProps}
              type={type}
            />
          )}
        </div>
      </div>
      {error ? (
        <p className="mt-2 text-sm leading-6 text-accent/82">
          {error}
        </p>
      ) : null}
    </label>
  );
}

export function CtaSection() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  function updateField(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setStatus('error');
      setStatusMessage('Форма ещё не готова к отправке. Проверьте обязательные поля.');
      return;
    }

    if (form.botField.trim()) {
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodeForm({
          'form-name': FORM_NAME,
          subject: 'Новая заявка с сайта Eclipse Forge',
          name: form.name,
          email: form.email,
          contact: form.contact,
          projectType: form.projectType,
          brief: form.brief,
          budget: form.budget,
          deadline: form.deadline,
          'bot-field': form.botField,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      startTransition(() => {
        setStatus('success');
        setStatusMessage('Заявка отправлена. Мы вернёмся с ответом в течение 24 часов.');
        setForm(initialFormState);
        setErrors({});
      });
    } catch {
      setStatus('error');
      setStatusMessage('Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.');
    }
  }

  return (
    <motion.section
      id="contact"
      className="section-shell px-4 pb-20 pt-20 sm:px-6 lg:px-10 lg:pb-28 lg:pt-28"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <motion.div
        variants={revealUp}
        className="monolith-surface mx-auto max-w-7xl rounded-[1.9rem] px-5 py-8 sm:rounded-[2.25rem] sm:px-8 sm:py-10 lg:px-12 lg:py-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_32%,rgba(255,106,0,0.14),transparent_20%),radial-gradient(circle_at_78%_50%,rgba(118,199,255,0.07),transparent_22%),radial-gradient(circle_at_center,rgba(255,255,255,0.025),transparent_36%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6 bg-[radial-gradient(circle,rgba(255,255,255,0.024),rgba(255,255,255,0.006)_42%,rgba(0,0,0,0)_72%)] blur-xl sm:h-[22rem] sm:w-[22rem]" />

        <div className="relative grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-start lg:gap-12">
          <div className="max-w-[37rem]">
            <p className="type-meta text-white/34">
              Contact Protocol
            </p>
            <h2 className="type-display mt-4 max-w-[13.5ch] text-balance text-[clamp(2.15rem,7vw,4.35rem)] font-medium text-white sm:mt-5">
              Если проект должен выглядеть дорого и работать на рост, начнём с точной заявки.
            </h2>
            <p className="type-body mt-5 text-[0.98rem] text-white/58 sm:mt-6 sm:text-[1.01rem]">
              Опишите задачу в удобном для вас объёме. Мы посмотрим на продукт,
              цель и ограничения, затем вернёмся с понятным следующим шагом без
              лишнего процесса и расплывчатых обещаний.
            </p>

            <div className="mt-8 grid gap-3 sm:mt-9 sm:max-w-[28rem]">
              {quickContacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('https') ? '_blank' : undefined}
                  rel={contact.href.startsWith('https') ? 'noreferrer' : undefined}
                  className="group rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.022),rgba(255,255,255,0.01))] px-4 py-4 transition duration-200 hover:border-white/14 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))]"
                >
                  <p className="text-[0.58rem] uppercase tracking-[0.28em] text-white/30">
                    {contact.label}
                  </p>
                  <p className="mt-2 text-[0.98rem] text-white/82 transition group-hover:text-white">
                    {contact.value}
                  </p>
                </a>
              ))}
              <div className="rounded-[1.1rem] border border-frost/10 bg-[linear-gradient(135deg,rgba(118,199,255,0.06),rgba(255,255,255,0.015))] px-4 py-4">
                <p className="text-[0.58rem] uppercase tracking-[0.28em] text-frost/54">
                  Response window
                </p>
                <p className="mt-2 text-[0.98rem] text-white/82">
                  Обычно отвечаем в течение 24 часов и сразу даём следующий шаг, а не общий “созвон ради созвона”.
                </p>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="monolith-surface rounded-[1.5rem] p-5 sm:rounded-[1.8rem] sm:p-6"
          >
            <div className="absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.075),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(118,199,255,0.055),transparent_24%)] sm:rounded-[1.8rem]" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-4 sm:pb-5">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/30 sm:text-[0.68rem]">
                    Lead form
                  </p>
                  <p className="type-heading mt-2 text-[1.32rem] text-white sm:text-[1.56rem]">
                    Опишите задачу, а мы соберём следующий ход.
                  </p>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_rgba(255,106,0,0.8)]" />
              </div>

              <form
                name={FORM_NAME}
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="mt-6 grid gap-4 sm:mt-7 sm:grid-cols-2"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <input
                  type="hidden"
                  name="subject"
                  value="Новая заявка с сайта Eclipse Forge"
                />
                <p className="hidden">
                  <label>
                    Не заполняйте это поле
                    <input
                      name="bot-field"
                      value={form.botField}
                      onChange={(event) => updateField('botField', event.target.value)}
                    />
                  </label>
                </p>

                <TextField
                  label="Имя"
                  name="name"
                  value={form.name}
                  placeholder="Как к вам обращаться"
                  required
                  error={errors.name}
                  onChange={updateField}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  placeholder="name@company.com"
                  required
                  error={errors.email}
                  onChange={updateField}
                />
                <TextField
                  label="Telegram / связь"
                  name="contact"
                  value={form.contact}
                  placeholder="@username, WhatsApp или другой удобный канал"
                  required
                  error={errors.contact}
                  onChange={updateField}
                />
                <TextField
                  label="Тип проекта"
                  name="projectType"
                  value={form.projectType}
                  placeholder="Например: лендинг, SaaS, автоматизация, редизайн"
                  required
                  error={errors.projectType}
                  onChange={updateField}
                />
                <div className="sm:col-span-2">
                  <TextField
                    label="Краткое описание"
                    name="brief"
                    value={form.brief}
                    placeholder="Что нужно сделать, где сейчас узкое место и какого результата вы ждёте"
                    required
                    error={errors.brief}
                    rows={5}
                    onChange={updateField}
                  />
                </div>
                <TextField
                  label="Бюджет"
                  name="budget"
                  value={form.budget}
                  placeholder="Опционально: ориентир, диапазон или “обсудим”"
                  onChange={updateField}
                />
                <TextField
                  label="Срок / дедлайн"
                  name="deadline"
                  value={form.deadline}
                  placeholder="Опционально: желаемый старт или дата релиза"
                  onChange={updateField}
                />

                <div className="sm:col-span-2">
                  {status !== 'idle' ? (
                    <div
                      className="form-status"
                      data-tone={
                        status === 'success'
                          ? 'success'
                          : status === 'loading'
                            ? 'loading'
                            : 'error'
                      }
                      aria-live="polite"
                    >
                      {status === 'loading'
                        ? 'Отправляем заявку...'
                        : statusMessage}
                    </div>
                  ) : null}
                </div>

                <div className="sm:col-span-2 flex flex-col gap-4 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between sm:pt-5">
                  <p className="type-body max-w-[34rem] text-sm text-white/42">
                    Отправка идёт в Netlify Forms. После деплоя заявки появятся в
                    панели `Forms`, а уведомления можно включить в интерфейсе Netlify.
                  </p>
                  <GlowButton
                    className="w-full justify-center sm:w-auto"
                    type="submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
                  </GlowButton>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
}
