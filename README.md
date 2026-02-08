# @hashtagcms/web-ui-kit (Laravel/Blade)

> Frontend Themes and UI components for the HashtagCms ecosystem

[![npm version](https://img.shields.io/npm/v/@hashtagcms/web-ui-kit.svg)](https://www.npmjs.com/package/@hashtagcms/web-ui-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

This package contains frontend themes specifically designed for the **Blade/PHP (Laravel)** ecosystem of HashtagCms. It uses the core functionality provided by `@hashtagcms/web-sdk` to share underlying logic across different designs.

> **Target Platform**: PHP / Laravel

## Other Platforms
If you are looking for other implementations, please check:
*   **Node.js**: [`@hashtagcms/web-ui-kit-nodejs`](https://github.com/hashtagcms/web-ui-kit-nodejs)
*   **Java**: [`@hashtagcms/web-ui-kit-java`](https://github.com/hashtagcms/web-ui-kit-java) (Coming Soon)
*   **Core SDK**: `@hashtagcms/web-sdk` (Shared JS Logic)

## ✨ Features

- 🎨 **Multiple Themes** - Includes `basic` and `elegant` themes out of the box
- 🛠️ **Customizable** - Built with SCSS variables for easy branding
- 📦 **Modular** - Use source files or pre-compiled assets
- 🚀 **Framework Agnostic** - Works with any JavaScript framework
- 📱 **Responsive** - Mobile-first design
- ♿ **Accessible** - WCAG compliant

## 📦 Installation

### Installation

```bash
npm install @hashtagcms/web-ui-kit
```

### Basic Usage

**Import in your SCSS:**
```scss
@import "~@hashtagcms/web-ui-kit/src/themes/basic/sass/app";
```

**In JavaScript:**
```javascript
import '@hashtagcms/web-ui-kit/src/themes/basic/js/app';
```

**In HTML:**
```html
<link rel="stylesheet" href="node_modules/@hashtagcms/web-ui-kit/dist/themes/basic/app.css">
<script src="node_modules/@hashtagcms/web-ui-kit/dist/themes/basic/app.js"></script>
```

### 💻 CLI Usage

You can interactively copy assets (fonts, images, vendor files) and **templates (views)** from a theme to your project using the CLI.

```bash
# Run the interactive setup
npx web-ui-kit
```

The CLI will ask you:
1. Which theme you want to install
2. Where to copy the assets (default: `./resources/assets/fe`)

The assets will be copied to `<destination>/<theme-name>/`.

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

- **[Getting Started](./docs/01-getting-started.md)** - Installation and basic usage
- **[Creating Themes](./docs/02-creating-themes.md)** - Step-by-step guide to create custom themes
- **[Theme Structure](./docs/03-theme-structure.md)** - Package organization and architecture
- **[API Reference](./docs/07-api-reference.md)** - Complete API documentation
- **[FAQ](./docs/08-faq.md)** - Frequently asked questions

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

See the [Creating Themes Guide](./docs/02-creating-themes.md) for detailed instructions.

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
@hashtagcms/web-ui-kit/
├── src/
│   ├── themes/        # Individual themes
│   │   ├── basic/     # Basic theme using @hashtagcms/web-sdk
│   │   └── elegant/   # Elegant theme using @hashtagcms/web-sdk
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

### 🧪 Testing

This project uses **Jest** for testing.

```bash
# Run tests
npm run test
```

## 📄 License

[MIT](LICENSE) © HashtagCms

## 🆘 Support

- 📖 [Documentation](./docs/01-getting-started.md)
- 💬 [GitHub Discussions](https://github.com/hashtagcms/web-ui-kit/discussions)
- 🐛 [Report Issues](https://github.com/hashtagcms/web-ui-kit/issues)

## 🌟 Showcase

Using @hashtagcms/web-ui-kit in your project? We'd love to feature it! Open an issue to share your work.

---

Made with ❤️ by the HashtagCms team
