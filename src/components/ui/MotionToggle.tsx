import { useLocale } from '../../lib/locale';
import { useMotionPreference } from '../../lib/motionPreference';

export function MotionToggle() {
  const { locale } = useLocale();
  const { ambientMotionEnabled, systemReducedMotion, toggleAmbientMotion } = useMotionPreference();
  const paused = !ambientMotionEnabled;
  const label = systemReducedMotion
    ? (locale === 'ru' ? 'Анимация отключена в настройках системы' : 'Motion is disabled by system settings')
    : paused
      ? (locale === 'ru' ? 'Включить атмосферную анимацию' : 'Enable ambient motion')
      : (locale === 'ru' ? 'Приостановить атмосферную анимацию' : 'Pause ambient motion');

  return (
    <button
      type="button"
      className="motion-toggle"
      aria-label={label}
      aria-pressed={paused}
      title={label}
      disabled={systemReducedMotion}
      onClick={toggleAmbientMotion}
    >
      <span aria-hidden>{paused ? '▶' : 'Ⅱ'}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
