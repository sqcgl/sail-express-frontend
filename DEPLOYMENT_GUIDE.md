# Sail Express 部署指南

## 🚀 推荐部署方案：Netlify

### **前端部署到 Netlify**

#### **步骤 1：准备代码**

```bash
# 确保代码已提交到GitHub
git add .
git commit -m "Prepare for Netlify deployment"
git push
```

#### **步骤 2：连接 Netlify**

1. 访问 [netlify.com](https://netlify.com)
2. 点击 "New site from Git"
3. 选择 GitHub
4. 选择 `sail-express-frontend` 仓库
5. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

#### **步骤 3：配置环境变量**

在 Netlify 的 "Site settings" → "Environment variables" 中添加：

```
VITE_API_BASE_URL = https://sail-express-backend.netlify.app
VITE_EMAILJS_SERVICE_ID = service_2pvwjlu
VITE_EMAILJS_TEMPLATE_ID = template_zsvj9hf
VITE_EMAILJS_PUBLIC_KEY = TbjT6n2_nnUAvsSbf
VITE_API_KEY = your-secret-key-12345
```

#### **步骤 4：部署**

1. 点击 "Deploy site"
2. 等待构建完成
3. 获得域名：`https://your-site-name.netlify.app`

### **后端部署到 Netlify Functions**

#### **步骤 1：创建后端项目**

```bash
# 创建新的后端仓库
git clone https://github.com/your-username/sail-express-backend
cd sail-express-backend
```

#### **步骤 2：配置 Netlify Functions**

创建 `netlify.toml`：

```toml
[build]
  functions = "functions"
  publish = "public"

[functions]
  directory = "functions"
```

#### **步骤 3：部署后端**

1. 将后端代码推送到 GitHub
2. 在 Netlify 中创建新站点
3. 配置环境变量
4. 部署

### **域名配置**

#### **自定义域名**

1. 在 Netlify 中点击 "Domain settings"
2. 添加自定义域名
3. 配置 DNS 记录

#### **SSL 证书**

- Netlify 自动提供 SSL 证书
- 无需额外配置

### **环境变量说明**

| 变量名                     | 说明            | 示例值                                     |
| -------------------------- | --------------- | ------------------------------------------ |
| `VITE_API_BASE_URL`        | 后端 API 地址   | `https://sail-express-backend.netlify.app` |
| `VITE_EMAILJS_SERVICE_ID`  | EmailJS 服务 ID | `service_2pvwjlu`                          |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS 模板 ID | `template_zsvj9hf`                         |
| `VITE_EMAILJS_PUBLIC_KEY`  | EmailJS 公钥    | `TbjT6n2_nnUAvsSbf`                        |
| `VITE_API_KEY`             | API 密钥        | `your-secret-key-12345`                    |

### **部署后检查**

#### **前端检查**

- ✅ 网站正常访问
- ✅ 产品列表显示
- ✅ 语言切换功能
- ✅ 联系表单工作

#### **后端检查**

- ✅ API 健康检查
- ✅ 产品 CRUD 操作
- ✅ 图片上传功能
- ✅ 多语言支持

### **故障排除**

#### **常见问题**

1. **构建失败**：检查 Node 版本和依赖
2. **API 连接失败**：确认环境变量配置
3. **图片不显示**：检查图片路径和权限

#### **调试方法**

1. 查看 Netlify 构建日志
2. 检查浏览器控制台错误
3. 验证 API 端点可访问性

### **性能优化**

#### **前端优化**

- 启用 Netlify 的 CDN
- 配置缓存策略
- 压缩静态资源

#### **后端优化**

- 使用 Netlify Functions 缓存
- 优化数据库查询
- 配置适当的超时时间

---

## 📝 部署完成检查清单

- [ ] 前端代码推送到 GitHub
- [ ] Netlify 站点创建并连接
- [ ] 环境变量配置完成
- [ ] 构建成功
- [ ] 网站可正常访问
- [ ] 功能测试通过
- [ ] 自定义域名配置（可选）
- [ ] SSL 证书生效
- [ ] 性能测试通过
