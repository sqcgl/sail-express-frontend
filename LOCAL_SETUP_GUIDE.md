# 🚀 Sail Express 本地运行指南

## 📋 项目概述

这是一个基于 **Vite + React** 的前端项目，用于展示和管理产品信息。项目使用 **localStorage** 存储数据，无需后端服务器即可运行。

## ✅ 前置要求

1. **Node.js** (版本 16 或更高)
   - 检查是否已安装：`node --version`
   - 如果未安装，请访问 [Node.js 官网](https://nodejs.org/) 下载安装

2. **npm** (通常随 Node.js 一起安装)
   - 检查是否已安装：`npm --version`

## 🛠️ 安装步骤

### 1. 安装项目依赖

在项目根目录下运行：

```bash
npm install
```

这将安装所有必需的依赖包（包括 React、Vite、Tailwind CSS 等）。

### 2. 配置环境变量（可选）

项目可以无需环境变量直接运行。如果需要使用邮件发送功能（联系表单），可以创建 `.env` 文件：

```bash
# 在项目根目录创建 .env 文件
# Windows PowerShell:
New-Item .env

# 或使用文本编辑器创建
```

在 `.env` 文件中添加以下内容（可选）：

```env
# EmailJS 配置（用于联系表单发送邮件）
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# API 配置（如果将来需要连接后端）
VITE_API_BASE_URL=http://localhost:3001
VITE_API_KEY=your_api_key_here
```

**注意：** 如果不配置 EmailJS，联系表单功能将无法发送邮件，但其他功能（产品展示、购物车等）都可以正常使用。

## 🚀 运行项目

### 开发模式

```bash
npm run dev
```

启动后，开发服务器通常会在以下地址运行：
- 本地访问：`http://localhost:5173`
- 网络访问：终端会显示实际地址（如 `http://192.168.x.x:5173`）

### 构建生产版本

```bash
npm run build
```

构建完成后，生成的文件会在 `dist` 目录中。

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构说明

```
sail-express/
├── src/
│   ├── components/      # React 组件
│   ├── pages/          # 页面组件
│   ├── contexts/       # React Context（购物车、语言切换）
│   ├── services/       # API 服务（使用 localStorage）
│   ├── locales/        # 多语言文件（中文/英文）
│   └── utils/          # 工具函数
├── public/             # 静态资源
├── package.json        # 项目配置和依赖
└── vite.config.js      # Vite 配置
```

## 🎯 主要功能

1. **产品展示** - 浏览和查看产品详情
2. **购物车** - 添加产品到购物车
3. **产品管理** - 管理员可以添加、编辑、删除产品（数据存储在 localStorage）
4. **多语言支持** - 支持中文和英文切换
5. **联系表单** - 发送询价邮件（需要配置 EmailJS）

## 🔧 常见问题

### Q: 端口 5173 已被占用？

A: 可以修改 `vite.config.js` 中的端口配置，或使用环境变量：
```bash
# Windows PowerShell
$env:VITE_DEV_PORT=3000; npm run dev

# 或直接修改 vite.config.js 中的 port 值
```

### Q: 依赖安装失败？

A: 尝试以下方法：
```bash
# 清除缓存后重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Q: 页面显示空白？

A: 检查浏览器控制台是否有错误，确保：
- Node.js 版本 >= 16
- 所有依赖已正确安装
- 没有端口冲突

### Q: 产品数据在哪里？

A: 产品数据存储在浏览器的 **localStorage** 中，键名为 `sail_express_products`。首次运行时会自动创建默认产品数据。

### Q: 如何清除所有数据？

A: 在浏览器控制台运行：
```javascript
localStorage.removeItem('sail_express_products');
location.reload();
```

## 📝 开发提示

1. **热重载**：修改代码后，页面会自动刷新
2. **数据持久化**：产品数据保存在浏览器 localStorage，刷新页面不会丢失
3. **多语言**：语言切换功能已集成，可在 `src/locales/` 中修改翻译文本
4. **样式**：项目使用 Tailwind CSS，可以直接使用 Tailwind 类名

## 🎨 访问管理页面

项目包含管理功能，可以通过以下路由访问：
- 产品管理：`/admin/products`
- 图片管理：`/admin/images`

## 📞 需要帮助？

如果遇到问题，请检查：
1. Node.js 和 npm 版本是否正确
2. 所有依赖是否已安装
3. 浏览器控制台是否有错误信息
4. 端口是否被占用

---

**最后更新：** 2025年1月
**项目版本：** 基于 Vite 7 + React 19

