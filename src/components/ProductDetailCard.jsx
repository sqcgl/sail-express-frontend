import React from "react";
import { getImageUrl } from "../services/apiService";
import { useLanguage } from "../contexts/LanguageContext";

const ProductDetailCard = ({ product, isOpen, onClose, onAddToCart }) => {
  const { t, language } = useLanguage();
  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
    // 可以在这里添加成功提示
    const productName = product.name || product.name_zh || product.name_en || t("products.noData");
    alert(`${productName} ${t("products.addedToCart")}`);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* 卡片头部 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-ocean-900">
            {t("products.details")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>

        {/* 卡片内容 */}
        <div className="flex flex-col lg:flex-row">
          {/* 左侧：产品图片 */}
          <div className="lg:w-1/2 p-6">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {product.image ? (
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name || product.name_zh || product.name_en || t("products.noData")}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-6xl mb-2">📷</div>
                    <p>{t("products.noImage")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 右侧：产品信息 */}
          <div className="lg:w-1/2 p-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* 产品名称 */}
              <div>
                <h1 className="text-2xl font-bold text-ocean-900 mb-2">
                  {product.name || product.name_zh || product.name_en || t("products.noData")}
                </h1>
                <span className="inline-block bg-ocean-100 text-ocean-800 px-3 py-1 rounded-full text-sm font-medium">
                  {getCategoryName(product.category, language)}
                </span>
              </div>

              {/* 产品价格 */}
              <div className="text-3xl font-bold text-[#002366]">
                {product.price}
              </div>

              {/* 产品描述 */}
              <div>
                <h3 className="text-lg font-semibold text-ocean-900 mb-2">
                  {t("products.description")}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || product.description_zh || product.description_en || t("products.noDescription")}
                </p>
              </div>

              {/* 产品ID */}
              <div className="text-sm text-gray-500">
                {t("products.productId")}: {product.id}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#002366] text-white py-3 px-6 rounded-lg hover:bg-[#001a4d] transition-colors font-semibold text-lg flex items-center justify-center"
              >
                <span className="mr-2">🛒</span>
                {t("products.addToCart")}
              </button>

              <button
                onClick={onClose}
                className="w-full bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                {t("products.continueBrowsing")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 获取分类名称
const getCategoryName = (categoryId, language = "zh") => {
  const categories = {
    zh: {
      fresh: "新鲜",
      frozen: "冷冻",
      dry: "干货",
      supply: "器具",
    },
    en: {
      fresh: "Fresh",
      frozen: "Frozen",
      dry: "Dry",
      supply: "Supply",
    },
  };
  return categories[language]?.[categoryId] || categoryId;
};

export default ProductDetailCard; 