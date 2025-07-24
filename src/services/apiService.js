// API服务配置
const API_BASE_URL = "https://web-production-c3853.up.railway.app";

// 通用API请求函数
const apiRequest = async (endpoint, options = {}) => {
  // 对于Railway后端，直接使用endpoint
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  // 如果是FormData，移除Content-Type让浏览器自动设置
  if (options.body instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API请求失败:", error);
    throw error;
  }
};

// 产品相关API
export const productAPI = {
  // 获取所有产品
  getAllProducts: async (language = "zh") => {
    return await apiRequest(`/api/products?language=${language}`);
  },

  // 根据分类获取产品
  getProductsByCategory: async (category, language = "zh") => {
    return await apiRequest(
      `/api/products/category/${category}?language=${language}`
    );
  },

  // 根据ID获取产品
  getProductById: async (id, language = "zh") => {
    return await apiRequest(`/api/products/${id}?language=${language}`);
  },

  // 添加产品 (需要API密钥)
  addProduct: async (productData, apiKey) => {
    const formData = new FormData();

    // 添加多语言文本字段
    formData.append("name_zh", productData.name_zh);
    formData.append("name_en", productData.name_en);
    formData.append("description_zh", productData.description_zh || "");
    formData.append("description_en", productData.description_en || "");
    formData.append("price", productData.price);
    formData.append("category", productData.category);

    // 添加图片文件
    if (productData.image) {
      formData.append("image", productData.image);
    }

    return await apiRequest("/api/products", {
      method: "POST",
      headers: {
        Authorization: apiKey,
      },
      body: formData,
    });
  },

  // 更新产品 (需要API密钥)
  updateProduct: async (id, productData, apiKey) => {
    const formData = new FormData();

    // 添加多语言文本字段
    formData.append("name_zh", productData.name_zh);
    formData.append("name_en", productData.name_en);
    formData.append("description_zh", productData.description_zh || "");
    formData.append("description_en", productData.description_en || "");
    formData.append("price", productData.price);
    formData.append("category", productData.category);

    // 添加图片文件
    if (productData.image) {
      formData.append("image", productData.image);
    }

    return await apiRequest(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: apiKey,
      },
      body: formData,
    });
  },

  // 删除产品 (需要API密钥)
  deleteProduct: async (id, apiKey) => {
    return await apiRequest(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: apiKey,
      },
    });
  },
};

// 系统相关API
export const systemAPI = {
  // 健康检查
  healthCheck: async () => {
    return await apiRequest("/health");
  },
};

// 错误处理函数
export const handleAPIError = (error) => {
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return "网络连接失败，请检查网络连接";
  }

  if (error.message.includes("401")) {
    return "未授权访问，请检查API密钥";
  }

  if (error.message.includes("404")) {
    return "请求的资源不存在";
  }

  if (error.message.includes("500")) {
    return "服务器内部错误，请稍后重试";
  }

  return error.message || "未知错误";
};

// 图片URL处理
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "/placeholder.jpg"; // 默认占位图片
  }

  // 如果是Base64图片数据，直接返回
  if (imagePath.startsWith("data:")) {
    return imagePath;
  }

  if (imagePath.startsWith("http")) {
    return imagePath; // 已经是完整URL
  }

  // 在Railway环境中，图片实际上不存在
  // 返回一个占位图片或默认图片
  if (imagePath.startsWith("/uploads/")) {
    // 使用一个公开的占位图片服务
    return `https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=Product+Image`;
  }

  // 拼接后端图片URL（用于其他类型的图片）
  const baseUrl = "https://web-production-c3853.up.railway.app";

  // 确保URL拼接正确，避免双斜杠
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanImagePath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;

  return `${cleanBaseUrl}${cleanImagePath}`;
};

export default {
  productAPI,
  systemAPI,
  handleAPIError,
  getImageUrl,
};
