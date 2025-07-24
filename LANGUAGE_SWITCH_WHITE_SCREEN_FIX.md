# 语言切换白屏问题修复进度

## 问题描述

在 ProductManager 页面切换语言时出现白屏问题。

## 问题分析

1. ProductManager 组件没有使用语言上下文（LanguageContext）
2. 组件中包含大量硬编码的中文文本
3. 当切换到中文时，这些文本没有通过语言上下文获取，导致组件无法正确渲染

## 修复方案

1. 在 ProductManager 组件中导入并使用 useLanguage 钩子
2. 将所有硬编码的中文文本替换为语言上下文调用
3. 在中文和英文语言文件中添加缺失的翻译键
4. 修复 LanguageContext 中的 t 函数，支持参数替换

## 修复内容

### 1. ProductManager.jsx 修改

- 导入 useLanguage 钩子
- 将所有硬编码文本替换为 t()函数调用
- 包括：标题、按钮、表单标签、提示信息、表格头部等

### 2. LanguageContext.jsx 修改

- 修改 t 函数，支持参数替换功能
- 添加对{paramName}格式参数的支持

### 3. 中文语言文件 (zh.js) 新增翻译键

- admin.form.validation.required
- admin.form.success.\*
- admin.form.error.\*
- admin.form.confirm.delete
- admin.form.nameZh/nameEn/descriptionZh/descriptionEn
- admin.form.\*Placeholder
- admin.table.title/showing/refresh/loading
- products.filter.\*
- common.retry

### 4. 英文语言文件 (en.js) 新增翻译键

- 添加与中文文件对应的英文翻译

## 修复结果

- ✅ 语言切换不再出现白屏
- ✅ 所有文本正确显示对应语言
- ✅ 支持参数替换功能
- ✅ 保持代码整洁和可维护性

## 测试验证

- 在 ProductManager 页面切换中英文
- 验证所有文本正确显示
- 验证表单验证信息正确显示
- 验证表格内容正确显示

## 注意事项

- 确保所有新添加的翻译键在两种语言文件中都存在
- 保持翻译键的命名一致性
- 定期检查是否有遗漏的硬编码文本
