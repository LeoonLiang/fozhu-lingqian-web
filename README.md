<div align="center">
  <h1>玄武山佛祖灵签</h1>
  <a href="https://leoonliang.github.io/fozhu-lingqian-web/" target="_blank">
    <img src="./public/preview.png" alt="玄武山佛祖灵签" width="600">
  </a>
  <br>
  <p><strong>玄武山佛祖灵签 (Xuanwu Lingqian Web)</strong></p>
  <p>基于 Nuxt 3 开发的在线求签应用，心诚则灵</p>
  <p>
    <a href="https://leoonliang.github.io/fozhu-lingqian-web/"><strong>📱 在线预览</strong></a>
  </p>
</div>

<p align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/github/license/LeoonLiang/fozhu-lingqian-web?style=flat-square" alt="License"></a>
  <a href="https://github.com/LeoonLiang/fozhu-lingqian-web/stargazers"><img src="https://img.shields.io/github/stars/LeoonLiang/fozhu-lingqian-web?style=flat-square" alt="Stars"></a>
  <a href="https://github.com/LeoonLiang/fozhu-lingqian-web/network/members"><img src="https://img.shields.io/github/forks/LeoonLiang/fozhu-lingqian-web?style=flat-square" alt="Forks"></a>
  <img src="https://img.shields.io/badge/开源-MIT-blue?style=flat-square" alt="Open Source">
</p>

## ✨ 特性

- 🔮 **在线求签**：提供便捷的在线抽签体验。
- ⚡️ **高性能**：基于 [Nuxt 3](https://nuxt.com) 构建，支持静态站点生成 (SSG)。
- 🎨 **现代化设计**：使用 [Tailwind CSS](https://tailwindcss.com/) 进行样式设计，界面简洁美观。
- 📱 **响应式布局**：完美适配移动端和桌面端设备。
- 🚀 **自动部署**：集成 GitHub Actions，自动构建并部署至 GitHub Pages。

## 🛠️ 技术栈

- **框架**: [Nuxt 3](https://nuxt.com)
- **UI 库**: [Vue 3](https://vuejs.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **包管理**: [pnpm](https://pnpm.io/)
- **图标**: [Iconify](https://iconify.design/)
- **部署**: GitHub Pages (via GitHub Actions)
- **数据来源**: [xuanwu-fozu-lingqian](https://github.com/LeoonLiang/xuanwu-fozu-lingqian) (玄武山佛祖灵签数据集)

## 📦 本地开发

确保你的环境中已安装 [Node.js](https://nodejs.org/) (推荐 v18+)。

### 1. 克隆项目

```bash
git clone https://github.com/LeoonLiang/fozhu-lingqian-web.git
cd fozhu-lingqian-web
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:3000` 查看效果。

## 🚀 构建与部署

### 构建生产版本

```bash
pnpm run generate
```

构建产物将生成在 `.output/public` 目录下。

### 本地预览生产版本

```bash
pnpm run preview
```

### 自动部署

本项目配置了 GitHub Actions 自动部署流程。
每次推送到 `main` 分支时，会自动触发构建流程并将生成的静态文件部署到 `gh-pages` 分支。

详细配置请参考 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)。

## 📝 目录结构

```
.
├── .github/            # GitHub Actions 配置文件
├── assets/             # 静态资源 (CSS, 图片等)
├── components/         # Vue 组件
├── pages/              # 页面路由
├── public/             # 公共静态文件
├── nuxt.config.ts      # Nuxt 配置文件
├── package.json        # 项目依赖配置
└── tailwind.config.js  # Tailwind CSS 配置
```
