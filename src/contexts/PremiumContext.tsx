import { createContext, useContext, useState, ReactNode } from 'react';

interface PremiumContextType {
  isPremium: boolean;
  setPremium: (value: boolean) => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export function PremiumProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState(() => {
    const saved = localStorage.getItem('eldo-premium');
    return saved !== null ? saved === 'true' : true; // Default to premium for demo
  });

  const setPremium = (value: boolean) => {
    setIsPremium(value);
    localStorage.setItem('eldo-premium', value.toString());
  };

  return (
    <PremiumContext.Provider value={{ isPremium, setPremium }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
}
