import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSiteContent } from '../../data/content';
import { usePriceModal } from '../../lib/priceModal';

function PrintIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 5V2.5h8V5M3.5 12H2v-5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 14 7v5h-1.5M4 9h8v4.5H4V9Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PriceListModal() {
  const { open, setOpen } = usePriceModal();
  const { priceList } = useSiteContent();

  const handlePrint = () => {
    window.print();
  };

  // ESC closes; lock body scroll while open
  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="price-modal"
          className="fixed inset-0 z-[120] flex items-center justify-center px-4 py-6 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-md"
            style={{ background: 'rgba(5, 7, 9, 0.78)' }}
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="price-modal-title"
            initial={{ scale: 0.96, opacity: 0, y: 14 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 14 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="price-modal-panel relative z-10 flex w-full max-w-3xl flex-col overflow-hidden rounded-[1.6rem] border"
            style={{ maxHeight: 'min(90vh, 880px)' }}
          >
            {/* Header */}
            <div
              className="flex items-start justify-between gap-4 border-b px-6 py-5 sm:px-8 sm:py-6"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="min-w-0">
                <p id="price-modal-title" className="type-meta mb-2" style={{ color: 'var(--gold)' }}>
                  {priceList.title}
                </p>
                <p className="text-[13px] leading-relaxed sm:text-[14px]" style={{ color: 'var(--text-3)' }}>
                  {priceList.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={priceList.closeLabel}
                className="price-modal-close inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M1 1L13 13M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Body — scrollable */}
            <div className="price-modal-body flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
              {priceList.groups.map((group, groupIdx) => (
                <div key={group.label}>
                  <div className="mb-7">
                    <h3
                      className="mb-3 text-[11px] font-display uppercase tracking-[0.28em]"
                      style={{ color: 'var(--text-4)' }}
                    >
                      {group.label}
                    </h3>
                    <div className="grid gap-2.5">
                      {group.items.map((item) => (
                        <div
                          key={item.title}
                          className={`price-item rounded-[1rem] border px-4 py-4 transition-all duration-300 sm:px-5 sm:py-5 ${
                            item.highlight ? 'price-item--highlight' : ''
                          }`}
                        >
                          <div className="flex items-baseline justify-between gap-3">
                            <h4
                              className="font-display text-[15px] font-medium tracking-tight sm:text-[16px]"
                              style={{ color: 'var(--text-1)' }}
                            >
                              {item.title}
                              {item.highlight ? (
                                <span
                                  aria-hidden
                                  className="ml-2 align-middle text-[10px] font-normal uppercase tracking-[0.2em]"
                                  style={{ color: 'var(--gold)' }}
                                >
                                  ★
                                </span>
                              ) : null}
                            </h4>
                            <span
                              className="shrink-0 font-display text-[13px] tracking-tight sm:text-[14px]"
                              style={{ color: 'var(--gold)' }}
                            >
                              {item.price}
                            </span>
                          </div>
                          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--text-3)' }}>
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {groupIdx < priceList.groups.length - 1 ? (
                    <div className="price-group-divider" aria-hidden>
                      <span className="price-group-divider-mark">✦</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="price-modal-footer flex flex-col gap-4 border-t px-6 py-5 sm:flex-row sm:items-center sm:px-8"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <p className="flex-1 text-[12px] leading-relaxed" style={{ color: 'var(--text-4)' }}>
                {priceList.note}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={priceList.contactHref}
                  onClick={() => setOpen(false)}
                  className="case-link-primary inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-display tracking-[0.04em] transition-all duration-400"
                >
                  {priceList.contactLabel}
                  <span aria-hidden>→</span>
                </a>
                <button
                  type="button"
                  onClick={handlePrint}
                  aria-label={priceList.printLabel}
                  className="contact-copy-link inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-all duration-300"
                >
                  <PrintIcon size={13} />
                  {priceList.printLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="case-link-secondary inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[12px] font-display tracking-[0.04em] transition-all duration-400"
                >
                  {priceList.closeLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
