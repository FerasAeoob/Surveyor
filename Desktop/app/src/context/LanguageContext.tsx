import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import type { Language } from '@/config/siteConfig';
import { rtlLanguages, defaultLanguage } from '@/config/siteConfig';
import type { LanguageContextType } from '@/types';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('geoprecision-language') as Language;
      return saved && ['en', 'he', 'ar'].includes(saved) ? saved : defaultLanguage;
    }
    return defaultLanguage;
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('geoprecision-language', lang);
    }
  }, []);

  const isRTL = useMemo(() => rtlLanguages.includes(language), [language]);
  const dir = useMemo(() => (isRTL ? 'rtl' : 'ltr') as 'ltr' | 'rtl', [isRTL]);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      isRTL,
      dir,
    }),
    [language, setLanguage, isRTL, dir]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
