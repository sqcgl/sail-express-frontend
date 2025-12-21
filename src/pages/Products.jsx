import React, { useState, useEffect } from "react";
import {
  getImageUrl,
  productAPI,
  handleAPIError,
} from "../services/apiService";
import ProductDetailCard from "../components/ProductDetailCard";
import FloatingCartIcon from "../components/FloatingCartIcon";
import { useLanguage } from "../contexts/LanguageContext";
import { useCart } from "../contexts/CartContext";

// 模拟产品数据
const mockProducts = [
  {
    id: 1,
    name_zh: "新鲜三文鱼",
    name_en: "Fresh Salmon",
    description_zh: "挪威进口新鲜三文鱼，肉质鲜美",
    description_en: "Fresh Norwegian salmon with tender meat",
    price: 88.0,
    category: "fresh",
    image: "/images/salmon.jpg",
  },
  {
    id: 2,
    name_zh: "冷冻虾仁",
    name_en: "Frozen Shrimp",
    description_zh: "优质冷冻虾仁，方便烹饪",
    description_en: "Premium frozen shrimp, easy to cook",
    price: 45.0,
    category: "frozen",
    image: "/images/shrimp.jpg",
  },
  {
    id: 3,
    name_zh: "干贝",
    name_en: "Dried Scallops",
    description_zh: "精选干贝，营养丰富",
    description_en: "Selected dried scallops, rich in nutrition",
    price: 120.0,
    category: "dry",
    image: "/images/scallops.jpg",
  },
  {
    id: 4,
    name_zh: "不锈钢锅具",
    name_en: "Stainless Steel Cookware",
    description_zh: "高品质不锈钢锅具套装",
    description_en: "High-quality stainless steel cookware set",
    price: 299.0,
    category: "supply",
    image: "/images/cookware.jpg",
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { t, language } = useLanguage();
  const { addToCart } = useCart();

  const categories = [
    { id: "fresh", name: t("products.categories.fresh") },
    { id: "frozen", name: t("products.categories.frozen") },
    { id: "dry", name: t("products.categories.dry") },
    { id: "supply", name: t("products.categories.supply") },
  ];

  // 当语言变化时重新计算分类统计
  useEffect(() => {
    // 这个useEffect会在language变化时触发，确保分类名称也更新
  }, [language]);

  // 获取产品数据
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = productAPI.getAllProducts(language);
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(response.message || "获取产品失败");
      }
    } catch (error) {
      setError(handleAPIError(error));
      console.error("获取产品失败:", error);
    } finally {
      setLoading(false);
    }
  };

  // 根据语言获取产品名称
  const getProductName = (product) => {
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
  const getProductDescription = (product) => {
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
      price = language === "zh" ? "询价" : "MP";
    }

    const unit =
      language === "zh" ? product.unit_zh || "" : product.unit_en || "";

    if (unit) {
      return `${price} / ${unit}`;
    }
    return price;
  };

  // 筛选产品
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    // 安全地获取产品名称和描述，避免 undefined 错误
    const productName = getProductName(product);
    const productDescription = getProductDescription(product);

    const matchesSearch =
      productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productDescription.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // 获取分类统计
  const getCategoryStats = () => {
    const stats = {};
    categories.forEach((cat) => {
      stats[cat.id] = products.filter((p) => p.category === cat.id).length;
    });
    stats.all = products.length;
    return stats;
  };

  const categoryStats = getCategoryStats();

  // 打开产品详情
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  // 关闭产品详情
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedProduct(null);
  };

  // 添加到购物车
  const handleAddToCart = (product) => {
    addToCart(product);
    // 显示成功提示
    const productName = getProductName(product);
    alert(`${productName} ${t("products.addedToCart")}`);
  };

  // 清空筛选
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  useEffect(() => {
    fetchProducts();
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-ocean-900 mb-4">
            {t("products.title")}
          </h1>
          <p className="text-lg text-ocean-600">{t("products.subtitle")}</p>
        </div>

        {/* 搜索和筛选区域 */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="space-y-4">
            {/* 搜索框 */}
            <div>
              <label className="block text-sm font-medium text-ocean-700 mb-2">
                {t("products.search")}
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                placeholder={t("products.search")}
              />
            </div>

            {/* 分类筛选按钮 */}
            <div>
              <label className="block text-sm font-medium text-ocean-700 mb-3">
                {t("products.categories.all")}
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === "all"
                      ? "bg-ocean-600 text-white"
                      : "bg-ocean-100 text-ocean-800 hover:bg-ocean-200"
                  }`}
                >
                  {t("products.categories.all")} ({categoryStats.all})
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-ocean-600 text-white"
                        : "bg-ocean-200 text-ocean-800 hover:bg-ocean-300"
                    }`}
                  >
                    {category.name} ({categoryStats[category.id] || 0})
                  </button>
                ))}
              </div>
            </div>

            {/* 清空筛选 */}
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                {t("products.clearFilters")}
              </button>
            </div>
          </div>
        </div>

        {/* 产品统计 */}
        <div className="mb-6">
          <p className="text-ocean-600">
            {t("products.showing")} {filteredProducts.length} /{" "}
            {products.length} {t("products.items")}
          </p>
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002366] mx-auto mb-4"></div>
            <p className="text-ocean-700">{t("products.loading")}</p>
          </div>
        )}

        {/* 错误状态 */}
        {error && !loading && (
          <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
            <p className="text-red-700 mb-4">{t("products.error")}</p>
            <button
              onClick={fetchProducts}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              {t("products.retry")}
            </button>
          </div>
        )}

        {/* 产品网格 */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-ocean-600 text-lg mb-2">
                  {products.length === 0
                    ? t("products.noData")
                    : t("products.noResults")}
                </p>
                {products.length > 0 && (
                  <p className="text-ocean-500">{t("products.tryAdjust")}</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden flex flex-col h-full"
                    onClick={() => handleProductClick(product)}
                  >
                    {/* 产品图片 */}
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      {product.image && getImageUrl(product.image) ? (
                        <img
                          src={getImageUrl(product.image)}
                          alt={getProductName(product)}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <div className="text-2xl md:text-4xl mb-1 md:mb-2">
                              📷
                            </div>
                            <p className="text-xs md:text-sm">暂无图片</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 产品信息 */}
                    <div className="p-3 md:p-4 flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-ocean-900 text-sm md:text-lg line-clamp-2">
                            {getProductName(product)}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between mb-2 md:mb-3">
                          <span className="inline-block bg-ocean-100 text-ocean-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium">
                            {categories.find((c) => c.id === product.category)
                              ?.name || product.category}
                          </span>
                          <span className="text-[#002366] font-bold text-base md:text-lg">
                            {formatPriceWithUnit(product)}
                          </span>
                        </div>

                        <p className="text-gray-600 text-xs md:text-sm line-clamp-2">
                          {getProductDescription(product)}
                        </p>
                      </div>

                      <div className="mt-auto pt-2 md:pt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="w-full bg-[#002366] text-white py-1.5 md:py-2 px-3 md:px-4 rounded-lg hover:bg-[#001a4d] transition-colors font-medium text-xs md:text-sm"
                        >
                          🛒 {t("products.addToInquiry")}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* 产品详情卡片 */}
        <ProductDetailCard
          product={selectedProduct}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
          onAddToCart={handleAddToCart}
        />

        {/* 浮动购物车图标 */}
        <FloatingCartIcon />
      </div>
    </div>
  );
};

export default Products;
