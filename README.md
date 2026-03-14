# @hashtagcms/web-ui-kit (Laravel/Blade)

> Frontend Themes and UI components for the HashtagCms ecosystem

[![npm version](https://img.shields.io/npm/v/@hashtagcms/web-ui-kit.svg)](https://www.npmjs.com/package/@hashtagcms/web-ui-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

This package contains frontend themes specifically designed for the **Blade/PHP (Laravel)** ecosystem of HashtagCms. It utilizes the core functionality provided by `@hashtagcms/web-sdk` to share underlying logic across different designs.

> [!IMPORTANT]
> **Modern Standards**: We have transitioned to **Tailwind CSS** for our modern themes. The `Modern` theme is our current flagship, while `Basic` is maintained as a legacy theme.

## ✨ Features
- 🎨 **Tailwind CSS** - Modern themes powered by utility-first CSS.
- 🛠️ **Customizable** - Easy theme creation and extension.
- 🎮 **Interactive Playground** - Preview any theme instantly.
- 🚀 **Framework Agnostic** - Pure JavaScript logic via `@hashtagcms/web-sdk`.
- 📱 **Responsive** - Mobile-first design for all devices.

## 📦 Installation

```bash
npm install @hashtagcms/web-ui-kit
```

### Basic Usage (Modern Theme)

**In JavaScript:**
```javascript
import '@hashtagcms/web-ui-kit/src/themes/modern/js/app';
```

**In HTML:**
```html
<link rel="stylesheet" href="node_modules/@hashtagcms/web-ui-kit/dist/themes/modern/app.css">
<script src="node_modules/@hashtagcms/web-ui-kit/dist/themes/modern/app.js"></script>
```

## 🎮 HashtagCMS Playground

The easiest way to test and preview themes is using our built-in **Playground**.

```bash
npm run playground
```

Once running, visit `http://localhost:3000`. 

**Key Features:**
- **Theme Switcher**: Instantly toggle between `Modern` and `Basic`.
- **Page Navigator**: Switch between simulated pages like `Home`, `Blog`, and `Contact`.
- **Real-time updates**: Automatic re-rendering on template or mock-data changes.

## 🎨 Available Themes

### Modern Theme (Standard)
Our flagship theme built with **Tailwind CSS**. 
- ✅ Premium, modern aesthetic
- ✅ Dark mode support
- ✅ High performance utilities

### Basic (Legacy)
Classic design built with **Bootstrap 5** and custom SCSS. 

## 📚 Documentation
- **[Full Index](./docs/README.md)**
- [Getting Started](./docs/01-getting-started.md)
- [Creating Themes](./docs/02-creating-themes.md)
- [Theme Structure](./docs/03-theme-structure.md)
- [Building CSS](./docs/05-building-css.md)
- [API Reference](./docs/07-api-reference.md)
- [FAQ](./docs/08-faq.md)

## 🛠️ Development

```bash
# Build all themes
npm run build

# Development watch mode
npm run watch

# Run playground
npm run playground
```

## 📄 License
[MIT](LICENSE) © HashtagCms

Made with ❤️ by the HashtagCms team
