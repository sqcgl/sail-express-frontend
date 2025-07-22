# 🚀 Sail Express 部署指南

## 📋 部署前准备

### ✅ 已完成

- [x] 前端构建测试通过
- [x] 后端服务器正常运行
- [x] 环境变量配置完成
- [x] 代码清理完成
- [x] 部署配置文件创建

### 🔧 需要配置

- [ ] 选择部署平台
- [ ] 配置生产环境变量
- [ ] 设置域名（可选）
- [ ] 配置 SSL 证书
- [ ] 设置后端 API 地址

---

## 🎯 部署平台选择

### 1. **Vercel（推荐）**

**优点**：

- 免费计划
- 自动 CI/CD
- 全球 CDN
- 简单易用
- 支持环境变量

**部署步骤**：

1. 注册 [Vercel](https://vercel.com) 账户
2. 连接 GitHub 仓库
3. 配置环境变量
4. 自动部署

### 2. **Netlify**

**优点**：

- 免费计划
- 自动部署
- 表单处理
- 函数支持

**部署步骤**：

1. 注册 [Netlify](https://netlify.com) 账户
2. 连接 GitHub 仓库
3. 配置构建设置
4. 设置环境变量

### 3. **Railway**

**优点**：

- 全栈部署
- 前后端一体化
- 数据库支持
- 简单配置

**部署步骤**：

1. 注册 [Railway](https://railway.app) 账户
2. 创建新项目
3. 连接 GitHub 仓库
4. 配置环境变量

### 4. **Docker + 云服务器**

**优点**：

- 完全控制
- 自定义配置
- 成本可控

**部署步骤**：

1. 构建 Docker 镜像
2. 上传到云服务器
3. 配置 Nginx
4. 设置域名和 SSL

---

## 🔧 环境变量配置

### 生产环境变量

```bash
# 后端API地址（生产环境）
VITE_API_BASE_URL=https://your-backend-domain.com

# EmailJS配置（生产环境）
VITE_EMAILJS_SERVICE_ID=your_production_service_id
VITE_EMAILJS_TEMPLATE_ID=your_production_template_id
VITE_EMAILJS_PUBLIC_KEY=your_production_public_key

# API密钥（生产环境）
VITE_API_KEY=your_production_api_key
```

### 获取 EmailJS 生产环境配置

1. 登录 [EmailJS](https://www.emailjs.com/)
2. 创建生产环境服务
3. 创建生产环境模板
4. 获取配置信息

---

## 🚀 部署步骤

### Vercel 部署

1. **安装 Vercel CLI**

```bash
npm install -g vercel
```

2. **登录 Vercel**

```bash
vercel login
```

3. **部署项目**

```bash
vercel
```

4. **配置环境变量**

```bash
vercel env add VITE_API_BASE_URL
vercel env add VITE_EMAILJS_SERVICE_ID
vercel env add VITE_EMAILJS_TEMPLATE_ID
vercel env add VITE_EMAILJS_PUBLIC_KEY
vercel env add VITE_API_KEY
```

5. **重新部署**

```bash
vercel --prod
```

### Netlify 部署

1. **连接 GitHub 仓库**
2. **配置构建设置**：
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **设置环境变量**
4. **部署**

### Railway 部署

1. **创建新项目**
2. **连接 GitHub 仓库**
3. **配置环境变量**
4. **自动部署**

---

## 🔗 后端部署

### 选项 1：Railway（推荐）

1. 创建新 Railway 项目
2. 连接后端 GitHub 仓库
3. 配置环境变量
4. 自动部署

### 选项 2：Heroku

1. 创建 Heroku 应用
2. 连接 GitHub 仓库
3. 配置环境变量
4. 部署

### 选项 3：云服务器

1. 购买云服务器
2. 安装 Node.js
3. 上传代码
4. 配置 PM2
5. 设置 Nginx

---

## 🌐 域名和 SSL 配置

### 域名购买

推荐域名注册商：

- [Namecheap](https://www.namecheap.com/)
- [GoDaddy](https://www.godaddy.com/)
- [阿里云](https://wanwang.aliyun.com/)

### SSL 证书

- **Vercel/Netlify**：自动 SSL
- **Railway**：自动 SSL
- **云服务器**：Let's Encrypt

---

## 📊 部署后检查

### 1. **功能测试**

- [ ] 首页加载正常
- [ ] 产品展示正常
- [ ] 多语言切换正常
- [ ] 产品管理功能正常
- [ ] 图片上传正常
- [ ] 邮件发送正常

### 2. **性能测试**

- [ ] 页面加载速度
- [ ] 图片加载速度
- [ ] API 响应速度
- [ ] 移动端体验

### 3. **安全测试**

- [ ] HTTPS 正常工作
- [ ] API 密钥保护
- [ ] 文件上传安全
- [ ] 跨域配置正确

---

## 🔧 故障排除

### 常见问题

**Q: 构建失败？**
A: 检查 Node.js 版本、依赖安装、环境变量配置

**Q: API 连接失败？**
A: 确认后端服务器运行、CORS 配置、API 地址正确

**Q: 图片无法显示？**
A: 检查图片路径、上传目录权限、CDN 配置

**Q: 邮件发送失败？**
A: 验证 EmailJS 配置、模板设置、API 密钥

---

## 📞 技术支持

### 部署平台支持

- **Vercel**: [文档](https://vercel.com/docs)
- **Netlify**: [文档](https://docs.netlify.com/)
- **Railway**: [文档](https://docs.railway.app/)

### 项目支持

- 查看项目文档
- 检查 GitHub Issues
- 联系开发团队

---

**最后更新**：2025 年 7 月 21 日  
**版本**：1.0.0
