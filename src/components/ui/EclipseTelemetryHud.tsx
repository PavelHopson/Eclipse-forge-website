import { motion } from 'framer-motion';

type TelemetryItem = {
  side: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right';
  label: string;
  value: string;
  delay: number;
  duration?: number;
};

const ITEMS: TelemetryItem[] = [
  { side: 'top-left',     label: 'ORBITAL SYNC',  value: '99.74%',         delay: 1.2,  duration: 4 },
  { side: 'top-right',    label: 'SIGNAL',        value: 'STABLE',         delay: 1.4,  duration: 4.4 },
  { side: 'left',         label: 'AZIMUTH',       value: '047.3°',         delay: 1.6,  duration: 5 },
  { side: 'right',        label: 'CORONA · K',    value: '5 760',          delay: 1.8,  duration: 5.2 },
  { side: 'bottom-left',  label: 'X · Y',         value: '−0.284 / +0.679',delay: 2.0,  duration: 5.6 },
  { side: 'bottom-right', label: 'INTEGRITY',     value: '01:24:38',       delay: 2.2,  duration: 6 },
];

const POS: Record<TelemetryItem['side'], string> = {
  'top-left':     'left-[2%] top-[6%]',
  'top-right':    'right-[2%] top-[10%]',
  'left':         'left-[-2%] top-[42%]',
  'right':        'right-[-1%] top-[38%]',
  'bottom-left':  'left-[6%] bottom-[10%]',
  'bottom-right': 'right-[3%] bottom-[14%]',
};

export function EclipseTelemetryHud() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30">
      {ITEMS.map((item) => (
        <motion.div
          key={`${item.side}-${item.label}`}
          className={`absolute ${POS[item.side]} hidden sm:block`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: [0, 0.85, 0.55, 0.85] }}
          transition={{
            duration: item.duration ?? 5,
            delay: item.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <div className="hud-label flex items-center gap-2 rounded-full border px-2.5 py-1 backdrop-blur-md">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: 'rgba(212,175,55,0.85)',
                boxShadow: '0 0 8px rgba(212,175,55,0.6)',
              }}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: 'rgba(245,233,196,0.6)' }}>
              {item.label}
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.04em]"
              style={{ color: 'rgba(245,233,196,0.92)' }}
            >
              {item.value}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
