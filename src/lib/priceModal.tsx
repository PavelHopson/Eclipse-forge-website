import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

interface PriceModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const PriceModalContext = createContext<PriceModalContextValue>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
});

export function PriceModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((current) => !current), []);
  const value = useMemo<PriceModalContextValue>(() => ({ open, setOpen, toggle }), [open, toggle]);

  return <PriceModalContext.Provider value={value}>{children}</PriceModalContext.Provider>;
}

export const usePriceModal = () => useContext(PriceModalContext);
