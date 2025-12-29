# Getting Started with @hashtagcms/themes

Welcome! This guide will help you get started with using and creating themes for HashtagCMS.

## 📦 Installation

```bash
npm install @hashtagcms/themes
```

## 🎨 Using an Existing Theme

### Option 1: Import Source Files (Recommended for Customization)

**In your SCSS file:**
```scss
// For Basic theme
@import "~@hashtagcms/themes/src/themes/basic/sass/app";

// For Elegant theme
@import "~@hashtagcms/themes/src/themes/elegant/sass/app";
```

**In your JavaScript file:**
```javascript
// For Basic theme
import '@hashtagcms/themes/src/themes/basic/js/app';

// For Elegant theme
import '@hashtagcms/themes/src/themes/elegant/js/app';
```

### Option 2: Use Pre-compiled Assets

**In your HTML:**
```html
<!-- Basic Theme -->
<link rel="stylesheet" href="node_modules/@hashtagcms/themes/dist/themes/basic/app.css">
<script src="node_modules/@hashtagcms/themes/dist/themes/basic/app.js"></script>

<!-- Elegant Theme -->
<link rel="stylesheet" href="node_modules/@hashtagcms/themes/dist/themes/elegant/app.css">
<script src="node_modules/@hashtagcms/themes/dist/themes/elegant/app.js"></script>
```

## 🎯 Available Themes

### Basic Theme
A clean, traditional design perfect for content-focused websites.

**Features:**
- FontAwesome icons
- Bootstrap 5 styling
- Neutral color palette with green accents
- Responsive design
- Subscribe form component

**Best for:** Blogs, documentation sites, traditional web applications

### Elegant Theme
A modern, sophisticated design with smooth animations and gradient effects.

**Features:**
- Glass morphism effects
- Smooth scroll animations
- Parallax scrolling
- Gradient text and buttons
- Modern color palette (deep blues, cyan, purple)
- Card animations on scroll

**Best for:** Tech startups, SaaS products, modern web applications

## 🔧 Customization

### Overriding Variables

You can customize themes by overriding SCSS variables before importing:

```scss
// Override Basic theme colors
$body-bg: #f0f0f0;
$theme-colors: (
  "primary": #your-color,
  "secondary": #your-color
);

@import "~@hashtagcms/themes/src/themes/basic/sass/app";
```

### Extending Styles

Add your custom styles after importing the theme:

```scss
@import "~@hashtagcms/themes/src/themes/elegant/sass/app";

// Your custom styles
.my-custom-class {
  // Your styles here
}
```

## 📚 Next Steps

- [Creating a New Theme](./CREATING_THEMES.md)
- [Theme Structure](./THEME_STRUCTURE.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
- [API Reference](./API_REFERENCE.md)

## 🆘 Need Help?

- Check our [FAQ](./FAQ.md)
- Report issues on [GitHub](https://github.com/marghoobsuleman/hashtagcms-themes/issues)
- Read the [full documentation](./README.md)
