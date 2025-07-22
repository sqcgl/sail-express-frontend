// API服务配置
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// 通用API请求函数
const apiRequest = async (endpoint, options = {}) => {
  // 确保URL格式正确，避免双斜杠
  const baseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;
  const url = `${baseUrl}/api${endpoint}`;

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
    return await apiRequest(`/products?language=${language}`);
  },

  // 根据分类获取产品
  getProductsByCategory: async (category, language = "zh") => {
    return await apiRequest(
      `/products/category/${category}?language=${language}`
    );
  },

  // 根据ID获取产品
  getProductById: async (id, language = "zh") => {
    return await apiRequest(`/products/${id}?language=${language}`);
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

    return await apiRequest("/products", {
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

    return await apiRequest(`/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: apiKey,
      },
      body: formData,
    });
  },

  // 删除产品 (需要API密钥)
  deleteProduct: async (id, apiKey) => {
    return await apiRequest(`/products/${id}`, {
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

  // 获取API信息
  getAPIInfo: async () => {
    return await apiRequest("/");
  },
};

// 错误处理工具
export const handleAPIError = (error) => {
  console.error("API错误:", error);

  if (error.message.includes("Failed to fetch")) {
    return "无法连接到服务器，请检查网络连接";
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

  if (imagePath.startsWith("http")) {
    return imagePath; // 已经是完整URL
  }

  // 拼接后端图片URL
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
  return `${baseUrl}${imagePath}`;
};

export default {
  productAPI,
  systemAPI,
  handleAPIError,
  getImageUrl,
};
