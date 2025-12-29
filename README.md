# @hashtagcms/themes

> Beautiful, customizable themes for HashtagCMS with shared core logic

[![npm version](https://img.shields.io/npm/v/@hashtagcms/themes.svg)](https://www.npmjs.com/package/@hashtagcms/themes)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

This package contains frontend themes and core JavaScript logic for the HashtagCMS ecosystem. Switch between themes while sharing the same underlying functionality.

## ✨ Features

- 🎨 **Multiple Themes** - Choose from Basic or Elegant themes
- 🔧 **Customizable** - Override variables and extend styles
- 📦 **Modular** - Use source files or pre-compiled assets
- 🚀 **Framework Agnostic** - Works with any JavaScript framework
- 📱 **Responsive** - Mobile-first design
- ♿ **Accessible** - WCAG compliant

## 📦 Quick Start

### Installation

```bash
npm install @hashtagcms/themes
```

### Basic Usage

**Import in your SCSS:**
```scss
@import "~@hashtagcms/themes/src/themes/basic/sass/app";
```

**Import in your JavaScript:**
```javascript
import '@hashtagcms/themes/src/themes/basic/js/app';
```

### Using Pre-compiled Assets

```html
<link rel="stylesheet" href="node_modules/@hashtagcms/themes/dist/themes/basic/app.css">
<script src="node_modules/@hashtagcms/themes/dist/themes/basic/app.js"></script>
```

## 🎨 Available Themes

### Basic Theme
Clean, traditional design perfect for content-focused websites.
- ✅ FontAwesome icons
- ✅ Bootstrap 5 styling
- ✅ Neutral color palette
- ✅ Subscribe form component

### Elegant Theme
Modern, sophisticated design with smooth animations.
- ✅ Glass morphism effects
- ✅ Parallax scrolling
- ✅ Gradient text and buttons
- ✅ Card animations
- ✅ Dark color scheme

## 📚 Documentation

- **[Getting Started](./docs/GETTING_STARTED.md)** - Installation and basic usage
- **[Creating Themes](./docs/CREATING_THEMES.md)** - Step-by-step guide to create custom themes
- **[Theme Structure](./docs/THEME_STRUCTURE.md)** - Package organization and architecture
- **[API Reference](./docs/API_REFERENCE.md)** - Complete API documentation
- **[FAQ](./docs/FAQ.md)** - Frequently asked questions

## 🚀 Creating a Custom Theme

```bash
# 1. Create theme directory
mkdir -p src/themes/my-theme/{js,sass,img}

# 2. Create entry files
touch src/themes/my-theme/js/app.js
touch src/themes/my-theme/sass/app.scss

# 3. Build
npm run build
```

See the [Creating Themes Guide](./docs/CREATING_THEMES.md) for detailed instructions.

## 🛠️ Development

### Build Commands

```bash
# Development build
npm run dev

# Production build
npm run build

# Watch mode
npm run watch
```

### Project Structure

```
@hashtagcms/themes/
├── src/
│   ├── core/          # Shared JavaScript logic
│   └── themes/        # Individual themes
│       ├── basic/
│       └── elegant/
├── dist/              # Compiled assets
├── docs/              # Documentation
└── package.json
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the repository
2. Create your theme or feature
3. Test thoroughly
4. Submit a pull request

## 📄 License

[MIT](LICENSE) © Marghoob Suleman

## 🆘 Support

- 📖 [Documentation](./docs/GETTING_STARTED.md)
- 💬 [GitHub Discussions](https://github.com/marghoobsuleman/hashtagcms-themes/discussions)
- 🐛 [Report Issues](https://github.com/marghoobsuleman/hashtagcms-themes/issues)

## 🌟 Showcase

Using @hashtagcms/themes in your project? We'd love to feature it! Open an issue to share your work.

---

Made with ❤️ by the HashtagCMS team
