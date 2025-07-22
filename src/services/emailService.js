import emailjs from "@emailjs/browser";

// EmailJS配置
// 注意：这些ID需要在EmailJS控制台中获取
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_2pvwjlu",
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_zsvj9hf",
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "TbjT6n2_nnUAvsSbf",
};

// 发送询价邮件
export const sendInquiryEmail = async (formData, selectedProducts) => {
  try {
    // 准备邮件内容
    const templateParams = {
      to_name: "Sail Express",
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      company_name: formData.company || "未提供",
      message: formData.message,
      selected_products: formatSelectedProducts(selectedProducts),
      total_value: calculateTotalValue(selectedProducts),
      inquiry_date: new Date().toLocaleString("zh-CN"),
    };

    // 发送邮件
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return {
      success: true,
      message: "询价邮件发送成功！",
      data: response,
    };
  } catch (error) {
    console.error("发送邮件失败:", error);
    return {
      success: false,
      message: "发送邮件失败，请稍后重试",
      error: error,
    };
  }
};

// 格式化选中的产品
const formatSelectedProducts = (products) => {
  if (!products || products.length === 0) {
    return "未选择具体产品";
  }

  return products
    .map((product) => `${product.name} - ${product.price}`)
    .join("\n");
};

// 计算总价值（参考价格）
const calculateTotalValue = (products) => {
  if (!products || products.length === 0) {
    return "¥0";
  }

  const total = products.reduce((sum, product) => {
    const price = parseFloat(product.price.replace(/[^\d.]/g, ""));
    return sum + price;
  }, 0);

  return `¥${total.toFixed(2)}`;
};

// 初始化EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
};

// 获取EmailJS配置说明
export const getEmailJSConfigInstructions = () => {
  return {
    steps: [
      "1. 注册EmailJS账户：https://www.emailjs.com/",
      "2. 创建Gmail服务：连接您的Gmail账户",
      "3. 创建邮件模板：设置邮件格式",
      "4. 获取配置信息：SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY",
      "5. 更新配置文件中的ID",
    ],
    config: EMAILJS_CONFIG,
  };
};
