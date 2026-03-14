# Building CSS for Themes

Complete guide to setting up and building CSS/SCSS for your theme. 

> [!IMPORTANT]
> **Tailwind CSS Choice**: We have adopted **Tailwind CSS** as our primary styling engine. While SCSS is still supported for legacy themes, all new modern themes should prioritize Tailwind.

## 📁 CSS File Structure

### Tailwind (Recommended)
```
src/themes/my-theme/
└── sass/ 
    └── app.scss            # Standard entry point (imports Tailwind)
```

### SCSS (Legacy)
```
src/themes/my-theme/
└── sass/
    ├── app.scss            # Main SCSS entry point
    ├── _variables.scss     # Theme variables
    ├── _my-theme.scss      # Theme styles
    └── _mixins.scss        # Optional mixins
```

## ⚡ Using Tailwind CSS

Our **Modern** theme uses Tailwind CSS 4.x. To use it in your new theme:

1.  **Directives**: Your `app.scss` should start with Tailwind directives:
    ```scss
    @import "tailwindcss";
    ```
2.  **Configuration**: Ensure your theme's files are tracked in the global project configuration if applicable, or define a local theme configuration.
3.  **Modern Theme Example**: Follow the pattern in `src/themes/modern/sass/app.scss` which leverages Tailwind's utility-first approach.

---

## 🏛️ Using SCSS (Legacy Themes)

If you are maintaining or building a legacy-style theme with Bootstrap and SCSS, follow these steps:

### 🎯 Step 1: Create SCSS Variables
**File:** `src/themes/my-theme/sass/_variables.scss`
```scss
$primary-color: #3498db;
$theme-colors: ("primary": $primary-color);
$body-bg: #ffffff;
```

### 🎨 Step 2: Create Theme Styles
**File:** `src/themes/my-theme/sass/_my-theme.scss`
```scss
body { font-family: 'Roboto', sans-serif; }
.hero { background: $primary-color; }
```

### 📝 Step 3: Create Main SCSS Entry Point
**File:** `src/themes/my-theme/sass/app.scss`
```scss
@import "variables";   // Overrides Bootstrap variables
@import "my-theme";    // Your custom theme styles
@import '~bootstrap/scss/bootstrap'; // Bootstrap framework
```

## 🏗️ Building CSS

We use Webpack with `sass-loader`, `postcss-loader`, and `css-loader` to build your styles.

```bash
# Development build
npm run dev

# Production build (minified)
npm run build

# Watch mode
npm run watch
```

### Build Output:
The build process automatically generates:
`dist/themes/my-theme/app.css`

## 📝 Best Practices

1.  **Utility-First**: If using Tailwind, avoid writing custom CSS; use utility classes directly in your Blade views.
2.  **Variable-Driven**: If using SCSS, always use variables for colors and spacing to ensure consistency.
3.  **Mobile-First**: Design for small screens first and scale up using Tailwind responsive modifiers or SCSS media queries.
4.  **Asset Pathing**: Remember that the HashtagCMS Playground dynamically rewrites asset paths, so keep your reference paths standard.

---

[← Back to Creating Themes](./02-creating-themes.md) | [Building JavaScript →](./06-building-javascript.md)
