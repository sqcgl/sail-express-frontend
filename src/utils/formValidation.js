// 表单验证工具函数

// 验证邮箱格式
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 验证电话号码（10位数字）
export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

// 验证文本长度
export const validateTextLength = (text, maxLength) => {
  return text.length <= maxLength;
};

// 验证必填字段
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

// 完整的表单验证
export const validateForm = (formData) => {
  const errors = {};

  // 验证姓名（必填）
  if (!validateRequired(formData.name)) {
    errors.name = "姓名是必填项";
  }

  // 验证邮箱（必填 + 格式）
  if (!validateRequired(formData.email)) {
    errors.email = "邮箱是必填项";
  } else if (!validateEmail(formData.email)) {
    errors.email = "请输入有效的邮箱地址";
  }

  // 验证电话（必填 + 格式）
  if (!validateRequired(formData.phone)) {
    errors.phone = "电话是必填项";
  } else if (!validatePhone(formData.phone)) {
    errors.phone = "请输入10位数字的电话号码";
  }

  // 验证公司名称（可选，但有长度限制）
  if (formData.company && !validateTextLength(formData.company, 100)) {
    errors.company = "公司名称不能超过100个字符";
  }

  // 验证询价内容（必填 + 长度限制）
  if (!validateRequired(formData.message)) {
    errors.message = "询价内容是必填项";
  } else if (!validateTextLength(formData.message, 10000)) {
    errors.message = "询价内容不能超过10000个字符";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// 实时验证单个字段
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "name":
      return validateRequired(value) ? "" : "姓名是必填项";

    case "email":
      if (!validateRequired(value)) return "邮箱是必填项";
      if (!validateEmail(value)) return "请输入有效的邮箱地址";
      return "";

    case "phone":
      if (!validateRequired(value)) return "电话是必填项";
      if (!validatePhone(value)) return "请输入10位数字的电话号码";
      return "";

    case "company":
      if (value && !validateTextLength(value, 100)) {
        return "公司名称不能超过100个字符";
      }
      return "";

    case "message":
      if (!validateRequired(value)) return "询价内容是必填项";
      if (!validateTextLength(value, 10000))
        return "询价内容不能超过10000个字符";
      return "";

    default:
      return "";
  }
};
