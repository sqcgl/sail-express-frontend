import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import {
  productAPI,
  handleAPIError,
  getImageUrl,
} from "../services/apiService";

const ImageManager = () => {
  const { t, language } = useLanguage();

  // 根据语言获取产品名称
  const getProductName = (product) => {
    if (language === "zh") {
      return product.name_zh || product.name_en || product.name || "未命名产品";
    } else {
      return product.name_en || product.name_zh || product.name || "Unnamed Product";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const categories = [
    { id: "all", name: t("imageManager.categories.all") },
    { id: "fresh", name: t("imageManager.categories.fresh") },
    { id: "frozen", name: t("imageManager.categories.frozen") },
    { id: "dry", name: t("imageManager.categories.dry") },
    { id: "supply", name: t("imageManager.categories.supply") },
  ];

  // 获取产品数据
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (selectedCategory === "all") {
        response = productAPI.getAllProducts();
      } else {
        response = productAPI.getProductsByCategory(selectedCategory);
      }

      if (response.success) {
        // 只显示有图片的产品
        const productsWithImages = response.data.filter(
          (product) => product.image
        );
        setProducts(productsWithImages);
      } else {
        setError(response.message || t("imageManager.errors.fetchFailed"));
      }
    } catch (error) {
      const errorMessage = handleAPIError(error);
      setError(errorMessage);
      console.error(t("imageManager.errors.fetchFailed"), error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  // 处理分类切换
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // 获取图片统计信息
  const getImageStats = () => {
    const totalImages = products.length;
    const categoryStats = categories.slice(1).map((cat) => ({
      ...cat,
      count: products.filter((p) => p.category === cat.id).length,
    }));

    return { totalImages, categoryStats };
  };

  const stats = getImageStats();

  return (
    <div className="w-full pt-20 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* 页面标题 */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-ocean-900">
                {t("imageManager.title")}
              </h1>
              <p className="text-ocean-600 mt-2">
                {t("imageManager.subtitle")}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#002366] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {t("imageManager.viewMode.grid")}
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-[#002366] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {t("imageManager.viewMode.list")}
              </button>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalImages}
              </div>
              <div className="text-sm text-blue-700">
                {t("imageManager.stats.totalImages")}
              </div>
            </div>
            {stats.categoryStats.map((cat) => (
              <div
                key={cat.id}
                className="bg-green-50 p-4 rounded-lg border border-green-200"
              >
                <div className="text-2xl font-bold text-green-600">
                  {cat.count}
                </div>
                <div className="text-sm text-green-700">{cat.name}</div>
              </div>
            ))}
          </div>

          {/* 分类筛选 */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-ocean-900 mb-4">
              {t("imageManager.filter.title")}
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-[#002366] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* 加载状态 */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002366] mx-auto mb-4"></div>
              <p className="text-ocean-700">{t("imageManager.loading")}</p>
            </div>
          )}

          {/* 错误状态 */}
          {error && !loading && (
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                {t("imageManager.retry")}
              </button>
            </div>
          )}

          {/* 图片列表 */}
          {!loading && !error && (
            <>
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl text-gray-400 mb-4">📷</div>
                  <p className="text-gray-600 text-lg">
                    {t("imageManager.noData.title")}
                  </p>
                  <p className="text-gray-500 mt-2">
                    {t("imageManager.noData.description")}
                  </p>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                      : "space-y-4"
                  }
                >
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className={`bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow ${
                        viewMode === "list" ? "flex items-center p-4" : ""
                      }`}
                    >
                      {viewMode === "grid" ? (
                        // 网格视图
                        <div>
                          <div className="aspect-square overflow-hidden">
                            {getImageUrl(product.image) ? (
                              <img
                                src={getImageUrl(product.image)}
                                alt={product.name || product.name_zh || product.name_en || "Product"}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">暂无图片</span>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-ocean-900 mb-1 truncate">
                              {getProductName(product)}
                            </h3>
                            <p className="text-sm text-ocean-600 mb-2">
                              {
                                categories.find(
                                  (c) => c.id === product.category
                                )?.name
                              }
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(
                                product.created_at
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ) : (
                        // 列表视图
                        <>
                          <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                            {getImageUrl(product.image) ? (
                              <img
                                src={getImageUrl(product.image)}
                                alt={getProductName(product)}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-xs">无图</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="font-medium text-ocean-900">
                              {getProductName(product)}
                            </h3>
                            <p className="text-sm text-ocean-600">
                              {
                                categories.find(
                                  (c) => c.id === product.category
                                )?.name
                              }
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(
                                product.created_at
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-[#002366]">
                              {formatPriceWithUnit(product)}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* 刷新按钮 */}
          <div className="mt-8 text-center">
            <button
              onClick={fetchProducts}
              disabled={loading}
              className="bg-[#002366] text-white px-6 py-3 rounded-lg hover:bg-[#001a4d] disabled:opacity-50 transition-colors"
            >
              {loading
                ? t("imageManager.refreshing")
                : t("imageManager.refresh")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageManager;
