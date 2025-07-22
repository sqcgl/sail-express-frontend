# 🚀 Sail Express 环境变量配置指南

## 📋 概述

本文档说明如何配置 Sail Express 项目的环境变量，确保应用在不同环境中正常运行。

## 🔧 环境变量文件

### 1. `.env.example` - 环境变量模板

包含所有可配置的环境变量及其说明，作为配置参考。

### 2. `.env` - 开发环境配置

本地开发时使用的环境变量配置。

### 3. `.env.production` - 生产环境配置

部署到生产环境时使用的环境变量配置。

## ⚙️ 配置项说明

### 后端 API 配置

```bash
# 后端API地址
VITE_API_BASE_URL=http://localhost:3001
```

**说明：**

- 开发环境：`http://localhost:3001`
- 生产环境：`https://your-backend-domain.com`

### EmailJS 配置

```bash
# EmailJS配置
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

**获取步骤：**

1. 注册 [EmailJS](https://www.emailjs.com/) 账户
2. 创建 Gmail 服务
3. 创建邮件模板
4. 获取配置信息

### API 密钥配置

```bash
# API密钥（用于后端管理操作）
VITE_API_KEY=your_api_key_here
```

**说明：**

- 用于产品管理、图片上传等管理操作
- 必须与后端配置的 API_KEY 一致

## 🛠️ 配置步骤

### 开发环境配置

1. **复制环境变量模板**

```bash
cp .env.example .env
```

2. **编辑 `.env` 文件**

```bash
# 使用您喜欢的编辑器
code .env
# 或
notepad .env
```

3. **配置必要的变量**

```bash
# 后端API地址（开发环境）
VITE_API_BASE_URL=http://localhost:3001

# EmailJS配置（需要从EmailJS获取）
VITE_EMAILJS_SERVICE_ID=service_2pvwjlu
VITE_EMAILJS_TEMPLATE_ID=template_zsvj9hf
VITE_EMAILJS_PUBLIC_KEY=TbjT6n2_nnUAvsSbf

# API密钥（与后端一致）
VITE_API_KEY=your-secret-key-12345
```

### 生产环境配置

1. **复制生产环境配置**

```bash
cp .env.example .env.production
```

2. **编辑 `.env.production` 文件**

```bash
# 生产环境API地址
VITE_API_BASE_URL=https://your-backend-domain.com

# EmailJS配置（生产环境）
VITE_EMAILJS_SERVICE_ID=your_production_service_id
VITE_EMAILJS_TEMPLATE_ID=your_production_template_id
VITE_EMAILJS_PUBLIC_KEY=your_production_public_key

# API密钥（生产环境）
VITE_API_KEY=your_production_api_key
```

## 🔍 验证配置

### 1. 检查环境变量是否正确加载

在浏览器控制台中运行：

```javascript
console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
console.log("EmailJS Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
console.log("API Key:", import.meta.env.VITE_API_KEY);
```

### 2. 测试 API 连接

访问 `/test-api` 页面，检查 API 连接是否正常。

### 3. 测试邮件发送

在联系页面填写询价表单，测试邮件发送功能。

## 🚨 安全注意事项

### 1. 敏感信息保护

- 不要将 `.env` 文件提交到版本控制
- 确保 `.env` 文件在 `.gitignore` 中
- 生产环境的密钥要妥善保管

### 2. 环境变量命名

- 前端环境变量必须以 `VITE_` 开头
- 只有 `VITE_` 开头的变量才会暴露给客户端

### 3. 默认值处理

代码中已为所有环境变量设置了合理的默认值，确保应用在配置缺失时仍能正常运行。

## 🔄 环境切换

### 开发环境

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📝 常见问题

### Q: 环境变量不生效？

A: 确保变量名以 `VITE_` 开头，并重启开发服务器。

### Q: EmailJS 配置错误？

A: 检查 EmailJS 控制台中的配置信息是否正确。

### Q: API 连接失败？

A: 确认后端服务器正在运行，且 API 地址配置正确。

### Q: 生产环境部署问题？

A: 确保 `.env.production` 文件配置正确，且包含所有必要的变量。

## 📞 技术支持

如果遇到配置问题，请检查：

1. 环境变量文件格式是否正确
2. 变量名是否以 `VITE_` 开头
3. 后端服务是否正常运行
4. 网络连接是否正常

---

**最后更新：** 2025 年 7 月 21 日
**版本：** 1.0.0
