"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Era = "hero" | "rome" | "viking" | "mughal" | "edo" | "space" | "unknown";

interface ScrollContextType {
  activeEra: Era;
  setActiveEra: (era: Era) => void;
  scrollY: number;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [activeEra, setActiveEra] = useState<Era>("hero");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollContext.Provider value={{ activeEra, setActiveEra, scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollState() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScrollState must be used within a ScrollProvider");
  }
  return context;
}
