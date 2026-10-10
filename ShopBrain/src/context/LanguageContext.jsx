import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../data/initialData';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('sb_lang');
    return saved || 'en';
  });

  const [shopMode, setShopMode] = useState(() => {
    const saved = localStorage.getItem('sb_shop_mode');
    return saved || 'small-shop';
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('sb_user_profile');
    return saved ? JSON.parse(saved) : { name: "Ramesh Kumar", shopName: "Ramesh Store", onboarded: true };
  });

  useEffect(() => {
    localStorage.setItem('sb_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('sb_shop_mode', shopMode);
  }, [shopMode]);

  useEffect(() => {
    localStorage.setItem('sb_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const t = (key) => {
    const dict = translations[lang] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, shopMode, setShopMode, userProfile, setUserProfile, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
