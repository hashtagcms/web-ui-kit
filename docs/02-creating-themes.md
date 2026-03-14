# Creating a New Theme

This guide walks you through creating a custom theme for HashtagCms. 

> [!IMPORTANT]
> **New Standard**: We strongly recommend using **Tailwind CSS** for new themes. All future development and support will focus on the Tailwind-based ecosystem.

## 🎨 Quick Start

### 1. Create Theme Directory Structure

```bash
cd web-ui-kit
mkdir -p src/themes/my-theme/{js,sass,img,fonts}
```

### 2. Standard Structure
Your theme should follow this organization:
```
src/themes/my-theme/
├── js/
│   └── app.js          # Theme JavaScript entry point
├── sass/ (or css/)
│   └── app.scss        # Main style entry point (Tailwind or SCSS)
├── views/              # Blade templates (CRITICAL for Playground)
├── img/                # Theme images
└── fonts/              # Theme fonts (optional)
```

## 🧪 Testing with the Playground

The **HashtagCMS Playground** is the best way to develop and test your theme. It automatically detects any directory in `src/themes` and adds it to the **Theme Switcher**.

### 1. Enable your theme in Playground
Simply ensure your theme directory exists under `src/themes/`. 

### 2. View Mapping
The playground uses `fake-data/*.json` to simulate real CMS data. It maps URLs (like `/home`) to these data files. 

### 3. Theme assets
The playground dynamically rewrites asset paths. Ensure your `views/` use the standard asset helper paths:
```blade
<link rel="stylesheet" href="/assets/hashtagcms/fe/{{ $theme_name }}/css/app.css" />
```

### 4. Running the Test
```bash
npm run playground
# Open browser and use the Theme Switcher to select "my-theme"
```

## ⚡ Using Tailwind CSS (Recommended)

When creating a Tailwind theme:
1.  Initialize Tailwind in your theme directory or use the global project-wide Tailwind setup.
2.  Add your theme's `views` and `js` files to the `content` array in `tailwind.config.js`.
3.  Import Tailwind directives in your `src/themes/my-theme/sass/app.scss`.

## 🏛️ Legacy SCSS Approach

If you prefer using SCSS and Bootstrap (like our legacy themes):

### 1. Create JavaScript Entry Point
**File:** `src/themes/my-theme/js/app.js`
```javascript
import { FormSubmitter } from '@hashtagcms/web-sdk';
// Initialize components...
```

### 2. Create SCSS Entry Point
**File:** `src/themes/my-theme/sass/app.scss`
```scss
@import "variables";
@import "my-theme-styles";
@import '~bootstrap/scss/bootstrap';
```

## 🎯 Best Practices

1.  **Use Shared Core Components**: Leverage `@hashtagcms/web-sdk` for forms, analytics, and config.
2.  **Asset Pathing**: Always use the dynamic asset path pattern to ensure compatibility with both the Playground and production HashtagCMS installations.
3.  **Modular Views**: Keep your Blade templates small and modular. Use `@include` for repeating elements like headers and footers.

## 📤 Contributing Your Theme

1.  **Test thoroughly** in the Playground on different simulated pages.
2.  **Verify Asset Paths** work across different environments.
3.  **Submit a Pull Request** with your theme directory and a brief description.

---

[← Back to Getting Started](./01-getting-started.md)
