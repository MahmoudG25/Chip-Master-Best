import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en'); // Default to EN for now as requested by user context implies english interface mostly
  const [dir, setDir] = useState(lang === 'ar' ? 'rtl' : 'ltr');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    const newDir = lang === 'ar' ? 'rtl' : 'ltr';
    setDir(newDir);
    document.documentElement.lang = lang;
    document.documentElement.dir = newDir;
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, toggleLanguage }}>
      <div dir={dir} className={lang === 'ar' ? 'font-cairo' : 'font-inter'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
