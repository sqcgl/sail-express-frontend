import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const location = useLocation();
  const { language, switchLanguage, t } = useLanguage();

  // 点击外部关闭语言菜单
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // 检查是否点击了语言切换器或其子元素
      const isLanguageSwitcher =
        event.target.closest(".language-switcher") ||
        event.target.closest("[data-language-switcher]") ||
        event.target.closest("button[onClick*='switchLanguage']") ||
        event.target.closest("button[onClick*='setShowLanguageMenu']");

      if (showLanguageMenu && !isLanguageSwitcher) {
        setShowLanguageMenu(false);
      }
    };

    // 移动端触摸事件处理
    const handleTouchOutside = (event) => {
      // 检查是否触摸了语言切换器或其子元素
      const isLanguageSwitcher =
        event.target.closest(".language-switcher") ||
        event.target.closest("[data-language-switcher]") ||
        event.target.closest("button[onClick*='switchLanguage']") ||
        event.target.closest("button[onClick*='setShowLanguageMenu']");

      if (showLanguageMenu && !isLanguageSwitcher) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleTouchOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, [showLanguageMenu]);

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/products", label: t("nav.products") },
    { path: "/contact", label: t("nav.contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#002366]/20 shadow-lg">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xl">SE</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#002366]/30 to-[#1e40af]/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#002366] to-[#1e40af] bg-clip-text text-transparent">
                Sail Express
              </h1>
              <p className="text-xs text-[#002366]/70 font-medium">
                专业寿司食材批发
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative group font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? "text-[#002366]"
                    : "text-[#002366]/70 hover:text-[#002366]"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <div
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#002366] to-[#1e40af] transition-all duration-300 group-hover:w-full ${
                    location.pathname === item.path ? "w-full" : ""
                  }`}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/10 to-[#1e40af]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative language-switcher">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#002366]/10 to-[#1e40af]/10 hover:from-[#002366]/20 hover:to-[#1e40af]/20 text-[#002366] font-medium py-2 px-4 rounded-lg border border-[#002366]/20 transition-all duration-300 hover:shadow-md hover:scale-105"
              >
                <span>{language === "zh" ? "🇨🇳" : "🇺🇸"}</span>
                <span>{language === "zh" ? "中文" : "English"}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showLanguageMenu ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Language Dropdown */}
              {showLanguageMenu && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-[#002366]/20 py-2 z-50">
                  <button
                    onClick={() => {
                      switchLanguage("zh");
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-[#002366]/10 transition-colors ${
                      language === "zh"
                        ? "bg-[#002366]/20 text-[#002366]"
                        : "text-gray-700"
                    }`}
                  >
                    🇨🇳 中文
                  </button>
                  <button
                    onClick={() => {
                      switchLanguage("en");
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-[#002366]/10 transition-colors ${
                      language === "en"
                        ? "bg-[#002366]/20 text-[#002366]"
                        : "text-gray-700"
                    }`}
                  >
                    🇺🇸 English
                  </button>
                </div>
              )}
            </div>

            {/* Contact Button */}
            <button className="bg-gradient-to-r from-[#002366] to-[#1e40af] hover:from-[#1e40af] hover:to-[#002366] text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 relative overflow-hidden group">
              <span className="relative z-10">{t("nav.inquiry")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af] to-[#002366] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 bg-gradient-to-br from-[#002366] to-[#1e40af] rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-105"
            >
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-0" : "-translate-y-1"
                }`}
              ></div>
              <div
                className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                  isOpen ? "-rotate-45 translate-y-0" : "translate-y-1"
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-[#002366]/20 shadow-lg rounded-b-2xl overflow-hidden max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-[#002366]/10 to-[#1e40af]/10 text-[#002366] border-l-4 border-[#002366]"
                      : "text-[#002366]/70 hover:bg-gradient-to-r hover:from-[#002366]/5 hover:to-[#1e40af]/5 hover:text-[#002366]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div
                className="pt-4 border-t border-[#002366]/20"
                data-language-switcher
              >
                <div className="relative">
                  <button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="w-full flex items-center justify-between bg-gradient-to-r from-[#002366]/10 to-[#1e40af]/10 text-[#002366] font-medium py-4 px-4 rounded-lg border border-[#002366]/20 transition-all duration-300 hover:shadow-md active:shadow-lg min-h-[44px] touch-manipulation"
                  >
                    <span className="flex items-center space-x-2">
                      <span>{language === "zh" ? "🇨🇳" : "🇺🇸"}</span>
                      <span>{language === "zh" ? "中文" : "English"}</span>
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        showLanguageMenu ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Mobile Language Dropdown */}
                  {showLanguageMenu && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-[#002366]/20 py-2 z-50 max-h-[200px] overflow-y-auto">
                      <button
                        onClick={() => {
                          switchLanguage("zh");
                          setShowLanguageMenu(false);
                          setIsOpen(false);
                        }}
                        className={`w-full px-4 py-4 text-left hover:bg-[#002366]/10 active:bg-[#002366]/20 transition-colors flex items-center space-x-3 min-h-[44px] touch-manipulation ${
                          language === "zh"
                            ? "bg-[#002366]/20 text-[#002366]"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="text-lg">🇨🇳</span>
                        <span className="font-medium">中文</span>
                      </button>
                      <button
                        onClick={() => {
                          switchLanguage("en");
                          setShowLanguageMenu(false);
                          setIsOpen(false);
                        }}
                        className={`w-full px-4 py-4 text-left hover:bg-[#002366]/10 active:bg-[#002366]/20 transition-colors flex items-center space-x-3 min-h-[44px] touch-manipulation ${
                          language === "en"
                            ? "bg-[#002366]/20 text-[#002366]"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="text-lg">🇺🇸</span>
                        <span className="font-medium">English</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Contact Button */}
              <button className="w-full bg-gradient-to-r from-[#002366] to-[#1e40af] hover:from-[#1e40af] hover:to-[#002366] text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                {t("nav.inquiry")}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
