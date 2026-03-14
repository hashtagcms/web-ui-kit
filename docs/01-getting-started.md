# Getting Started with @hashtagcms/web-ui-kit

Welcome! This guide will help you get started with using and creating themes for the **Blade/PHP (Laravel)** ecosystem of HashtagCms.

> [!TIP]
> **Modern Standards**: We have transitioned to **Tailwind CSS** for our modern themes. The `Modern` theme is our current standard, while `Basic` is maintained as a legacy theme.

## 📦 Installation

```bash
npm install @hashtagcms/web-ui-kit
```

## 🚀 HashtagCMS Playground

The easiest way to test and preview themes is using our built-in **Playground**. 

```bash
npm run playground
```

Once running, visit `http://localhost:3000`.

### 🎨 Theme Switcher
The playground includes a **Theme Switcher** (bottom-right corner) that allows you to:
1.  **Switch Themes**: Instantly toggle between `Modern` and `Basic`.
2.  **Preview Pages**: Navigate through different page types (Home, Blog, Contact, etc.) while keeping your selected theme active.
3.  **Real-time injection**: The playground dynamically swaps templates and asset paths so you can see your changes immediately.

## 🎯 Available Themes

### Modern Theme (Recommended)
Our flagship theme built with **Tailwind CSS 4.x**. It offers a premium, modern aesthetic with high performance and easy utility-based customization.

**Features:**
- Tailwind CSS utility classes
- Premium typography and spacing
- Dark mode support
- Highly responsive components

### Basic (Legacy)
Classic theme built with **Bootstrap 5** and custom SCSS. 

- **Basic**: Clean, content-focused design with green accents.

## 🚀 Quick Setup (CLI Installer)

You can use our CLI tool to copy theme assets and views directly into your Laravel project:

```bash
npx web-ui-kit
```

This will guide you through:
1.  **Selecting a theme** (Modern or Basic)
2.  **Asset destination** (Default: `./resources/assets/fe`)
3.  **View destination** (Default: `./resources/views/fe`)

## 🎨 Using an Existing Theme manually

### Option 1: Import Source Files

**For Modern (Tailwind):**
Include the theme path in your `tailwind.config.js` or import the CSS.

**For Legacy Themes (SCSS):**
```scss
// For Basic theme
@import "~@hashtagcms/web-ui-kit/src/themes/basic/sass/app";
```

### Option 2: Use Pre-compiled Assets

**In your HTML:**
```html
<!-- Modern Theme -->
<link rel="stylesheet" href="node_modules/@hashtagcms/web-ui-kit/dist/themes/modern/app.css">
<script src="node_modules/@hashtagcms/web-ui-kit/dist/themes/modern/app.js"></script>
```

## 📚 Next Steps

- [Creating a New Theme](./02-creating-themes.md)
- [Theme Structure](./03-theme-structure.md)
- [Building CSS (Tailwind & SCSS)](./05-building-css.md)
- [API Reference](./07-api-reference.md)

## 🆘 Need Help?

- Check our [FAQ](./08-faq.md)
- Report issues on [GitHub](https://github.com/hashtagcms/web-ui-kit/issues)
- Read the [full documentation](./README.md)
