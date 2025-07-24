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
  const t = (key, params = {}) => {
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

    // 如果value是字符串且包含参数占位符，则进行替换
    if (typeof value === "string" && Object.keys(params).length > 0) {
      return Object.keys(params).reduce((str, paramKey) => {
        return str.replace(new RegExp(`{${paramKey}}`, "g"), params[paramKey]);
      }, value);
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
