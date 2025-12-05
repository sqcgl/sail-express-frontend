import React from "react";
import { getImageUrl } from "../services/apiService";
import { useLanguage } from "../contexts/LanguageContext";

const ProductDetailCard = ({ product, isOpen, onClose, onAddToCart }) => {
  const { t, language } = useLanguage();

  if (!isOpen || !product) {
    return null;
  }

  // 根据语言获取产品名称
  const getProductName = () => {
    if (language === "zh") {
      return (
        product.name_zh ||
        product.name_en ||
        product.name ||
        t("products.noData")
      );
    } else {
      return (
        product.name_en ||
        product.name_zh ||
        product.name ||
        t("products.noData")
      );
    }
  };

  // 根据语言获取产品描述
  const getProductDescription = () => {
    if (language === "zh") {
      return (
        product.description_zh ||
        product.description_en ||
        product.description ||
        t("products.noDescription")
      );
    } else {
      return (
        product.description_en ||
        product.description_zh ||
        product.description ||
        t("products.noDescription")
      );
    }
  };

  // 格式化价格和单位显示
  const formatPriceWithUnit = (product) => {
    let price = product.price || "";

    // 处理"询价"的翻译
    if (price === "询价" || price === "Inquiry") {
      price = language === "zh" ? "询价" : "Inquiry";
    }

    const unit =
      language === "zh" ? product.unit_zh || "" : product.unit_en || "";

    if (unit) {
      return `${price} / ${unit}`;
    }
    return price;
  };

  const productName = getProductName();
  const productDescription = getProductDescription();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-ocean-900">{productName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 产品图片 */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {product.image && getImageUrl(product.image) ? (
                <img
                  src={getImageUrl(product.image)}
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-sm">暂无图片</p>
                  </div>
                </div>
              )}
            </div>

            {/* 产品信息 */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-ocean-900 mb-2">
                  {t("products.details.name")}
                </h3>
                <p className="text-ocean-700">{productName}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-ocean-900 mb-2">
                  {t("products.details.description")}
                </h3>
                <p className="text-ocean-700">{productDescription}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-ocean-900 mb-2">
                  {t("products.details.category")}
                </h3>
                <span className="inline-block bg-ocean-100 text-ocean-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-ocean-900 mb-2">
                  {t("products.details.price")}
                </h3>
                <p className="text-2xl font-bold text-[#002366]">
                  {formatPriceWithUnit(product)}
                </p>
              </div>

              {/* 添加到购物车按钮 */}
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full bg-[#002366] text-white py-3 px-6 rounded-lg hover:bg-[#001a4d] transition-colors font-medium text-lg"
              >
                🛒 {t("products.addToInquiry")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
