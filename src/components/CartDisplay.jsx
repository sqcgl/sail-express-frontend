import React from "react";
import { useCart } from "../contexts/CartContext";
import { useLanguage } from "../contexts/LanguageContext";

const CartDisplay = () => {
  const { selectedProducts, removeFromCart, getTotalValue } = useCart();
  const { t, language } = useLanguage();

  // 根据语言获取产品名称
  const getProductName = (product) => {
    if (language === "zh") {
      return product.name_zh || product.name_en || product.name || t("products.noData");
    } else {
      return product.name_en || product.name_zh || product.name || t("products.noData");
    }
  };

  // 根据语言获取产品描述
  const getProductDescription = (product) => {
    if (language === "zh") {
      return product.description_zh || product.description_en || product.description || "";
    } else {
      return product.description_en || product.description_zh || product.description || "";
    }
  };

  // 格式化价格和单位显示
  const formatPriceWithUnit = (product) => {
    let price = product.price || "";
    
    // 处理"询价"的翻译
    if (price === "询价" || price === "Inquiry") {
      price = language === "zh" ? "询价" : "Inquiry";
    }
    
    const unit = language === "zh" 
      ? (product.unit_zh || "") 
      : (product.unit_en || "");
    
    if (unit) {
      return `${price} / ${unit}`;
    }
    return price;
  };

  if (selectedProducts.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-2xl p-6 shadow-xl relative overflow-hidden hover:border-2 hover:border-[#002366]/30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/5 to-blue-400/5"></div>
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-ocean-900 mb-4">
            {t("cart.title")}
          </h3>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-ocean-100 to-sea-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-ocean-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-ocean-600 font-medium">{t("cart.empty")}</p>
            <p className="text-ocean-500 text-sm mt-2">
              {t("cart.emptyMessage")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-md rounded-2xl p-6 shadow-xl relative overflow-hidden hover:border-2 hover:border-[#002366]/30">
      <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/5 to-blue-400/5"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-ocean-900">
            {t("cart.title")}
          </h3>
          <span className="text-sm text-ocean-600 bg-ocean-100 px-3 py-1 rounded-full">
            {selectedProducts.length} {t("cart.items")}
          </span>
        </div>

        <div className="space-y-4 max-h-64 overflow-y-auto">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-ocean-200/50 hover:border-[#002366]/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-ocean-900 mb-1">
                    {getProductName(product)}
                  </h4>
                  <p className="text-ocean-600 text-sm mb-2">
                    {getProductDescription(product)}
                  </p>
                  <p className="text-lg font-bold text-[#002366]">
                    {formatPriceWithUnit(product)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="text-ocean-500 hover:text-red-500 transition-colors duration-200 ml-2 p-1"
                  title={t("cart.removeProduct")}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-ocean-200/50 mt-6 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-ocean-900">
              {t("cart.totalValue")}:
            </span>
            <span className="text-2xl font-bold text-[#002366]">
              ¥{getTotalValue().toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-ocean-600 mt-2 text-center">
            {t("cart.priceNote")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;
