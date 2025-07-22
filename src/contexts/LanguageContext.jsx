import React, { createContext, useContext, useState, useEffect } from "react";
import zh from "../locales/zh";
import en from "../locales/en";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // 从localStorage获取保存的语言设置，默认为英文
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage || "en";
  });

  const [translations, setTranslations] = useState(() => {
    return language === "zh" ? zh : en;
  });

  // 切换语言
  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  // 获取翻译文本
  const t = (key) => {
    const keys = key.split(".");
    let value = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return value;
  };

  // 当语言改变时更新翻译
  useEffect(() => {
    setTranslations(language === "zh" ? zh : en);
  }, [language]);

  const value = {
    language,
    switchLanguage,
    t,
    isChinese: language === "zh",
    isEnglish: language === "en",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
