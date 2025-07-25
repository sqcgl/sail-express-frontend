import React, { useState, useEffect } from "react";
import {
  productAPI,
  handleAPIError,
  getImageUrl,
} from "../services/apiService";
import ImageUpload from "../components/ImageUpload";
import { useLanguage } from "../contexts/LanguageContext";

const ProductManager = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name_zh: "",
    name_en: "",
    description_zh: "",
    description_en: "",
    price: "",
    category: "fresh",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "fresh", name: t("products.categories.fresh") },
    { id: "frozen", name: t("products.categories.frozen") },
    { id: "dry", name: t("products.categories.dry") },
    { id: "supply", name: t("products.categories.supply") },
  ];

  const API_KEY = import.meta.env.VITE_API_KEY || "your-secret-key-12345"; // 后端配置的API密钥

  // 获取产品显示名称 - 优先显示中文名称，如果没有则显示英文名称，最后显示旧格式名称
  const getProductDisplayName = (product) => {
    if (product.name_zh && product.name_zh.trim()) {
      return product.name_zh;
    }
    if (product.name_en && product.name_en.trim()) {
      return product.name_en;
    }
    return product.name || t("products.noData");
  };

  // 获取所有产品
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAllProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(t("products.error"));
      }
    } catch (error) {
      const errorMessage = handleAPIError(error);
      setError(errorMessage);
      console.error("获取产品数据失败:", error);
    } finally {
      setLoading(false);
    }
  };

  // 添加产品
  const handleAddProduct = async (e) => {
    e.preventDefault();

    // 修改验证逻辑：中文名称不再是必填项，但英文名称仍然是必填的
    if (!newProduct.name_en || !newProduct.price || !newProduct.category) {
      alert(t("admin.form.validation.required"));
      return;
    }

    try {
      const productData = {
        ...newProduct,
        image: selectedImage,
      };

      const response = await productAPI.addProduct(productData, API_KEY);
      if (response.success) {
        alert(t("admin.form.success.add"));
        setNewProduct({
          name_zh: "",
          name_en: "",
          description_zh: "",
          description_en: "",
          price: "",
          category: "fresh",
        });
        setSelectedImage(null);
        setShowAddForm(false);
        fetchProducts(); // 重新获取产品列表
      } else {
        alert(t("admin.form.error.add"));
      }
    } catch (error) {
      const errorMessage = handleAPIError(error);
      alert(`${t("admin.form.error.add")}: ${errorMessage}`);
      console.error("添加产品失败:", error);
    }
  };

  // 删除产品
  const handleDeleteProduct = async (productId, product) => {
    const productName = getProductDisplayName(product);
    if (!confirm(t("admin.form.confirm.delete", { name: productName }))) {
      return;
    }

    try {
      const response = await productAPI.deleteProduct(productId, API_KEY);
      if (response.success) {
        alert(t("admin.form.success.delete"));
        fetchProducts(); // 重新获取产品列表
      } else {
        alert(t("admin.form.error.delete"));
      }
    } catch (error) {
      const errorMessage = handleAPIError(error);
      alert(`${t("admin.form.error.delete")}: ${errorMessage}`);
      console.error("删除产品失败:", error);
    }
  };

  // 处理图片选择
  const handleImageChange = (file) => {
    setSelectedImage(file);
  };

  // 处理图片删除
  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  // 处理编辑图片选择
  const handleEditImageChange = (file) => {
    setEditImage(file);
  };

  // 处理编辑图片删除
  const handleEditImageRemove = () => {
    setEditImage(null);
  };

  // 开始编辑产品
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setEditImage(null);
    setShowEditForm(true);
    setShowAddForm(false);
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditImage(null);
    setShowEditForm(false);
  };

  // 筛选产品
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    // 获取产品显示名称用于搜索
    const displayName = getProductDisplayName(product);

    // 获取描述用于搜索（优先中文，其次英文，最后旧格式）
    const description =
      product.description_zh ||
      product.description_en ||
      product.description ||
      "";

    const matchesSearch =
      displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

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

  // 更新产品
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (
      !editingProduct.name_en ||
      !editingProduct.price ||
      !editingProduct.category
    ) {
      alert(t("admin.form.validation.required"));
      return;
    }

    try {
      const productData = {
        ...editingProduct,
        image: editImage,
      };

      const response = await productAPI.updateProduct(
        editingProduct.id,
        productData,
        API_KEY
      );
      if (response.success) {
        alert(t("admin.form.success.update"));
        setEditingProduct(null);
        setEditImage(null);
        setShowEditForm(false);
        fetchProducts(); // 重新获取产品列表
      } else {
        alert(t("admin.form.error.update"));
      }
    } catch (error) {
      const errorMessage = handleAPIError(error);
      alert(`${t("admin.form.error.update")}: ${errorMessage}`);
      console.error("更新产品失败:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full pt-20 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-ocean-900">
              {t("admin.title")}
            </h1>
            <div className="flex gap-3">
              {showEditForm && (
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {t("common.cancel")}
                </button>
              )}
              <button
                onClick={() => {
                  setShowAddForm(!showAddForm);
                  if (showAddForm) {
                    setShowEditForm(false);
                    setEditingProduct(null);
                  }
                }}
                className="bg-[#002366] text-white px-6 py-3 rounded-lg hover:bg-[#001a4d] transition-colors"
              >
                {showAddForm ? t("common.cancel") : t("admin.addProduct")}
              </button>
            </div>
          </div>

          {/* 搜索和筛选区域 */}
          <div className="bg-white p-4 rounded-lg mb-6 border border-ocean-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              {/* 分类筛选 */}
              <div>
                <label className="block text-sm font-medium text-ocean-700 mb-2">
                  {t("products.filter.title")}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                >
                  <option value="all">
                    {t("products.filter.all")} ({categoryStats.all})
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({categoryStats[category.id] || 0})
                    </option>
                  ))}
                </select>
              </div>

              {/* 清空筛选 */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {t("products.clearFilters")}
                </button>
              </div>
            </div>
          </div>

          {/* 添加产品表单 */}
          {showAddForm && (
            <div className="bg-blue-50 p-6 rounded-lg mb-6 border border-blue-200">
              <h2 className="text-xl font-bold text-ocean-900 mb-4">
                {t("admin.addProduct")}
              </h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ocean-700 mb-2">
                      {t("admin.form.nameZh")}
                    </label>
                    <input
                      type="text"
                      value={newProduct.name_zh}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          name_zh: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                      placeholder={t("admin.form.nameZhPlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ocean-700 mb-2">
                      {t("admin.form.nameEn")} *
                    </label>
                    <input
                      type="text"
                      value={newProduct.name_en}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          name_en: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                      placeholder={t("admin.form.nameEnPlaceholder")}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ocean-700 mb-2">
                      {t("admin.form.price")} *
                    </label>
                    <input
                      type="text"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                      placeholder={t("admin.form.pricePlaceholder")}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ocean-700 mb-2">
                    {t("admin.form.category")} *
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ocean-700 mb-2">
                      {t("admin.form.descriptionZh")}
                    </label>
                    <textarea
                      value={newProduct.description_zh}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description_zh: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                      rows="3"
                      placeholder={t("admin.form.descriptionZhPlaceholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ocean-700 mb-2">
                      {t("admin.form.descriptionEn")}
                    </label>
                    <textarea
                      value={newProduct.description_en}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description_en: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                      rows="3"
                      placeholder={t("admin.form.descriptionEnPlaceholder")}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ocean-700 mb-2">
                    {t("admin.form.image")}
                  </label>
                  <ImageUpload
                    currentImage={null}
                    onImageChange={handleImageChange}
                    onImageRemove={handleImageRemove}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {t("admin.addProduct")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    {t("common.cancel")}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 编辑产品表单 */}
          {showEditForm && editingProduct && (
            <div className="bg-green-50 p-6 rounded-lg mb-6 border border-green-200">
              <h2 className="text-xl font-bold text-ocean-900 mb-4">
                {t("admin.editProduct")}
              </h2>
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ocean-700 mb-2">
                      中文名称
                    </label>
                    <input
                      type="text"
                      value={editingProduct.name_zh || editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name_zh: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                      placeholder="输入中文名称（可选）"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ocean-700 mb-2">
                      英文名称 *
                    </label>
                    <input
                      type="text"
                      value={
                        editingProduct.name_en || editingProduct.name || ""
                      }
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name_en: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                      placeholder="输入英文名称"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ocean-700 mb-2">
                      价格 *
                    </label>
                    <input
                      type="text"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                      placeholder="例如: ¥180/kg"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ocean-700 mb-2">
                    分类 *
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ocean-700 mb-2">
                      中文描述
                    </label>
                    <textarea
                      value={
                        editingProduct.description_zh ||
                        editingProduct.description
                      }
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description_zh: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                      rows="3"
                      placeholder="输入中文描述"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ocean-700 mb-2">
                      英文描述
                    </label>
                    <textarea
                      value={
                        editingProduct.description_en ||
                        editingProduct.description ||
                        ""
                      }
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description_en: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-ocean-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002366]"
                      rows="3"
                      placeholder="输入英文描述"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ocean-700 mb-2">
                    产品图片
                  </label>
                  <ImageUpload
                    currentImage={editingProduct.image}
                    onImageChange={handleEditImageChange}
                    onImageRemove={handleEditImageRemove}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    更新产品
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    取消
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 产品列表 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-ocean-900">
                  {t("admin.table.title")}
                </h2>
                <p className="text-sm text-ocean-600 mt-1">
                  {t("admin.table.showing", {
                    filtered: filteredProducts.length,
                    total: products.length,
                  })}
                </p>
              </div>
              <button
                onClick={fetchProducts}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? t("common.loading") : t("admin.table.refresh")}
              </button>
            </div>

            {/* 加载状态 */}
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002366] mx-auto mb-4"></div>
                <p className="text-ocean-700">{t("admin.table.loading")}</p>
              </div>
            )}

            {/* 错误状态 */}
            {error && !loading && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <p className="text-red-700">{error}</p>
                <button
                  onClick={fetchProducts}
                  className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t("common.retry")}
                </button>
              </div>
            )}

            {/* 产品表格 */}
            {!loading && !error && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-ocean-200">
                  <thead>
                    <tr className="bg-ocean-50">
                      <th className="border border-ocean-200 px-4 py-2 text-left">
                        {t("admin.table.id")}
                      </th>
                      <th className="border border-ocean-200 px-4 py-2 text-left">
                        {t("admin.table.image")}
                      </th>
                      <th className="border border-ocean-200 px-4 py-2 text-left">
                        {t("admin.table.name")}
                      </th>
                      <th className="border border-ocean-200 px-4 py-2 text-left">
                        {t("admin.table.category")}
                      </th>
                      <th className="border border-ocean-200 px-4 py-2 text-left">
                        {t("admin.table.price")}
                      </th>
                      <th className="border border-ocean-200 px-4 py-2 text-left">
                        {t("admin.table.description")}
                      </th>
                      <th className="border border-ocean-200 px-4 py-2 text-left">
                        {t("admin.table.createdAt")}
                      </th>
                      <th className="border border-ocean-200 px-4 py-2 text-left">
                        {t("admin.table.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="border border-ocean-200 px-4 py-2">
                          {product.id}
                        </td>
                        <td className="border border-ocean-200 px-4 py-2">
                          {product.image ? (
                            <img
                              src={getImageUrl(product.image)}
                              alt={getProductDisplayName(product)}
                              className="w-16 h-16 object-cover rounded border"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded border flex items-center justify-center text-gray-500 text-xs">
                              {t("products.noImage")}
                            </div>
                          )}
                        </td>
                        <td className="border border-ocean-200 px-4 py-2 font-medium">
                          {getProductDisplayName(product)}
                        </td>
                        <td className="border border-ocean-200 px-4 py-2">
                          <span className="inline-block bg-ocean-100 text-ocean-800 px-2 py-1 rounded-full text-xs font-medium">
                            {categories.find((c) => c.id === product.category)
                              ?.name || product.category}
                          </span>
                        </td>
                        <td className="border border-ocean-200 px-4 py-2 text-[#002366] font-bold">
                          {product.price}
                        </td>
                        <td className="border border-ocean-200 px-4 py-2 text-sm text-gray-600 max-w-xs truncate">
                          {product.description_zh ||
                            product.description_en ||
                            product.description ||
                            t("products.noDescription")}
                        </td>
                        <td className="border border-ocean-200 px-4 py-2 text-sm text-gray-500">
                          {new Date(product.created_at).toLocaleString()}
                        </td>
                        <td className="border border-ocean-200 px-4 py-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                            >
                              {t("common.edit")}
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteProduct(product.id, product)
                              }
                              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                            >
                              {t("common.delete")}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 空状态 */}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-ocean-600 text-lg">
                  {products.length === 0
                    ? t("products.noData")
                    : t("products.noResults")}
                </p>
                {products.length > 0 && (
                  <p className="text-ocean-500 text-sm mt-2">
                    {t("products.tryAdjust")}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
