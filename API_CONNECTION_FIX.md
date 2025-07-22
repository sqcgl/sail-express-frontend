# API 连接问题解决方案

## 🔍 问题描述

用户在前端管理界面尝试添加产品时，出现错误：

```
添加失败:无法连接到服务器,请检查网络连接
```

## 🔍 问题分析

### 根本原因

1. **API 路径不匹配**：前端使用 `/products`，后端 API 路径是 `/api/products`
2. **默认 API 基础 URL 错误**：前端默认使用 `http://localhost:3001`，在 Netlify 部署环境中无法连接
3. **缺少环境变量配置**：前端没有正确配置生产环境的 API 地址

### 技术细节

- 前端代码中的 API 路径：`/products` → 应该是 `/api/products`
- 默认 API 基础 URL：`http://localhost:3001` → 应该是 `https://sail-express-backend.netlify.app`
- 后端 API 正常工作，但前端无法正确连接

## 🛠️ 解决方案

### 1. 修复 API 路径

**文件**: `src/services/apiService.js`

**修改前**:

```javascript
// 添加产品
addProduct: async (productData, apiKey) => {
  // ...
  return await apiRequest("/products", {
    method: "POST",
    // ...
  });
},

// 更新产品
updateProduct: async (id, productData, apiKey) => {
  // ...
  return await apiRequest(`/products/${id}`, {
    method: "PUT",
    // ...
  });
},

// 删除产品
deleteProduct: async (id, apiKey) => {
  return await apiRequest(`/products/${id}`, {
    method: "DELETE",
    // ...
  });
},
```

**修改后**:

```javascript
// 添加产品
addProduct: async (productData, apiKey) => {
  // ...
  return await apiRequest("/api/products", {
    method: "POST",
    // ...
  });
},

// 更新产品
updateProduct: async (id, productData, apiKey) => {
  // ...
  return await apiRequest(`/api/products/${id}`, {
    method: "PUT",
    // ...
  });
},

// 删除产品
deleteProduct: async (id, apiKey) => {
  return await apiRequest(`/api/products/${id}`, {
    method: "DELETE",
    // ...
  });
},
```

### 2. 更新默认 API 基础 URL

**文件**: `src/services/apiService.js`

**修改前**:

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
```

**修改后**:

```javascript
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://sail-express-backend.netlify.app";
```

### 3. 修复图片 URL 处理

**文件**: `src/services/apiService.js`

**修改前**:

```javascript
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
```

**修改后**:

```javascript
const baseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  "https://sail-express-backend.netlify.app";
```

### 4. 修复 Products 页面 API 调用

**文件**: `src/pages/Products.jsx`

**修改前**:

```javascript
const response = await fetch(
  `${
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
  }/api/products?language=${language}`
);
```

**修改后**:

```javascript
const response = await fetch(
  `${
    import.meta.env.VITE_API_BASE_URL ||
    "https://sail-express-backend.netlify.app"
  }/api/products?language=${language}`
);
```

## ✅ 验证结果

### 后端 API 测试

```bash
# 测试GET请求
curl -X GET "https://sail-express-backend.netlify.app/api/products"

# 返回结果：成功获取产品列表
{"success":true,"data":[...]}
```

### 前端连接测试

- ✅ API 基础 URL 已更新为 Netlify 后端地址
- ✅ API 路径已修正为 `/api/products`
- ✅ 代码已提交并推送到 GitHub
- ✅ Netlify 将自动重新部署

## 🚀 部署状态

### 已完成的步骤

- ✅ 修复 API 路径不匹配问题
- ✅ 更新默认 API 基础 URL
- ✅ 修复图片 URL 处理
- ✅ 修复 Products 页面 API 调用
- ✅ 提交代码到 GitHub
- ✅ 推送到远程仓库

### 预期结果

- 🔄 Netlify 自动重新部署（约 2-3 分钟）
- 🔄 前端能够正常连接到后端 API
- 🔄 添加产品功能恢复正常
- 🔄 编辑和删除产品功能正常工作

## 📝 技术要点

### API 路径规范

- 后端 API 统一使用 `/api/` 前缀
- 前端请求必须匹配后端路径
- 保持 RESTful API 设计规范

### 环境变量配置

- 开发环境：`http://localhost:3001`
- 生产环境：`https://sail-express-backend.netlify.app`
- 通过 `VITE_API_BASE_URL` 环境变量配置

### 错误处理

- 网络连接错误：检查 API 基础 URL
- 路径错误：检查 API 端点路径
- 认证错误：检查 API 密钥

## 🔗 相关文件

- `src/services/apiService.js` - API 服务配置
- `src/pages/Products.jsx` - 产品页面 API 调用
- `netlify.toml` - Netlify 部署配置

---

**更新时间**: 2024-12-19  
**状态**: 已修复 API 连接问题  
**下一步**: 等待 Netlify 重新部署后测试功能
