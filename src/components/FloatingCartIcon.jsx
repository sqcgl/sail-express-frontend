import React from "react";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";

const FloatingCartIcon = () => {
  const { selectedProducts } = useCart();
  const { t } = useLanguage();

  // 计算购物车中的商品数量
  const cartItemCount = selectedProducts.length;

  // 跳转到询价页面
  const handleCartClick = () => {
    // 滚动到页面顶部的询价按钮或跳转到Contact页面
    const inquireButton = document.querySelector('[href="/contact"]');
    if (inquireButton) {
      inquireButton.click();
    } else {
      // 如果找不到询价按钮，直接跳转到Contact页面
      window.location.href = "/contact";
    }
  };

  // 如果没有商品，不显示图标
  if (cartItemCount === 0) {
    return null;
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 cursor-pointer group"
      onClick={handleCartClick}
      title={t("products.goToInquiry")}
    >
      {/* 主购物车图标 */}
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-[#002366] to-[#1e40af] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
            />
          </svg>
        </div>

        {/* 商品数量徽章 */}
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
          {cartItemCount}
        </div>

        {/* 脉冲动画效果 */}
        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
      </div>

      {/* 悬停提示 */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {t("products.itemsInCart").replace("{count}", cartItemCount)}
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </div>
  );
};

export default FloatingCartIcon;
