# Building CSS for Themes

Complete guide to setting up and building CSS/SCSS for your theme.

## 📁 CSS File Structure

```
src/themes/my-theme/
└── sass/
    ├── app.scss            # Main SCSS entry point
    ├── _variables.scss     # Theme variables
    ├── _my-theme.scss      # Theme styles
    └── _mixins.scss        # Optional mixins
```

## 🎯 Step 1: Create SCSS Variables

**File:** `src/themes/my-theme/sass/_variables.scss`

```scss
// ============================================
// My Theme Variables
// ============================================

// Color Palette
// ============================================
$primary-color: #3498db;
$secondary-color: #2ecc71;
$accent-color: #e74c3c;
$text-color: #333333;
$text-light: #666666;
$background-color: #ffffff;
$border-color: #dddddd;

// Typography
// ============================================
$font-primary: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-secondary: 'Georgia', serif;
$font-mono: 'Monaco', 'Courier New', monospace;

$font-size-base: 16px;
$font-size-small: 14px;
$font-size-large: 18px;

$line-height-base: 1.6;
$line-height-heading: 1.2;

// Spacing
// ============================================
$container-max-width: 1200px;
$section-padding: 80px;
$element-spacing: 20px;

// Breakpoints
// ============================================
$breakpoint-mobile: 576px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 992px;
$breakpoint-wide: 1200px;

// Effects
// ============================================
$border-radius: 4px;
$box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
$transition-speed: 0.3s;

// Bootstrap Overrides
// ============================================
// These variables override Bootstrap defaults
$body-bg: $background-color;
$body-color: $text-color;
$font-family-sans-serif: $font-primary;
$font-size-root: $font-size-base;

$theme-colors: (
  "primary": $primary-color,
  "secondary": $secondary-color,
  "success": $secondary-color,
  "danger": $accent-color,
  "warning": #f39c12,
  "info": #3498db,
  "light": #f8f9fa,
  "dark": #343a40
);

$link-color: $primary-color;
$link-hover-color: darken($primary-color, 15%);
```

## 🎨 Step 2: Create Theme Styles

**File:** `src/themes/my-theme/sass/_my-theme.scss`

```scss
// ============================================
// My Theme Styles
// ============================================

// Import Google Fonts
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

// Base Styles
// ============================================
* {
  box-sizing: border-box;
}

body {
  font-family: $font-primary;
  font-size: $font-size-base;
  line-height: $line-height-base;
  color: $text-color;
  background-color: $background-color;
  margin: 0;
  padding: 0;
}

// Typography
// ============================================
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: $line-height-heading;
  color: $primary-color;
  margin-top: 0;
  margin-bottom: $element-spacing;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

p {
  margin-top: 0;
  margin-bottom: $element-spacing;
}

a {
  color: $primary-color;
  text-decoration: none;
  transition: color $transition-speed ease;

  &:hover {
    color: darken($primary-color, 15%);
  }
}

// Layout
// ============================================
.container {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: 0 $element-spacing;
}

section {
  padding: $section-padding 0;
}

// Navigation
// ============================================
.navbar {
  background-color: $primary-color;
  padding: 1rem 0;
  box-shadow: $box-shadow;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;

    &:hover {
      color: rgba(white, 0.9);
    }
  }

  .nav-link {
    color: white;
    padding: 0.5rem 1rem;
    transition: opacity $transition-speed ease;

    &:hover {
      opacity: 0.8;
    }

    &.active {
      font-weight: 500;
      border-bottom: 2px solid white;
    }
  }
}

// Hero Section
// ============================================
.hero {
  min-height: 500px;
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: $section-padding $element-spacing;

  h1 {
    color: white;
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  .btn {
    margin: 0.5rem;
  }
}

// Buttons
// ============================================
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: $font-size-base;
  font-weight: 500;
  text-align: center;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: all $transition-speed ease;

  &-primary {
    background-color: $primary-color;
    color: white;

    &:hover {
      background-color: darken($primary-color, 10%);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba($primary-color, 0.3);
    }
  }

  &-secondary {
    background-color: $secondary-color;
    color: white;

    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }

  &-outline {
    background-color: transparent;
    border: 2px solid $primary-color;
    color: $primary-color;

    &:hover {
      background-color: $primary-color;
      color: white;
    }
  }
}

// Cards
// ============================================
.card {
  background: white;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  padding: $element-spacing * 1.5;
  margin-bottom: $element-spacing;
  transition: transform $transition-speed ease, box-shadow $transition-speed ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  h3 {
    margin-top: 0;
  }
}

// Forms
// ============================================
.form-group {
  margin-bottom: $element-spacing;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: $text-color;
}

input[type="text"],
input[type="email"],
input[type="password"],
textarea,
select {
  width: 100%;
  padding: 0.75rem;
  font-size: $font-size-base;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  transition: border-color $transition-speed ease;

  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
  }
}

// Footer
// ============================================
footer {
  background-color: #f8f9fa;
  padding: $section-padding 0 $element-spacing;
  margin-top: $section-padding;
  border-top: 1px solid $border-color;

  a {
    color: $text-light;

    &:hover {
      color: $primary-color;
    }
  }
}

// Utilities
// ============================================
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.mt-1 { margin-top: $element-spacing * 0.5; }
.mt-2 { margin-top: $element-spacing; }
.mt-3 { margin-top: $element-spacing * 1.5; }

.mb-1 { margin-bottom: $element-spacing * 0.5; }
.mb-2 { margin-bottom: $element-spacing; }
.mb-3 { margin-bottom: $element-spacing * 1.5; }

// Responsive
// ============================================
@media (max-width: $breakpoint-tablet) {
  .hero {
    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .navbar {
    .container {
      flex-direction: column;
    }
  }

  section {
    padding: $section-padding * 0.6 0;
  }
}

@media (max-width: $breakpoint-mobile) {
  h1 { font-size: 1.75rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }

  .container {
    padding: 0 $element-spacing * 0.75;
  }
}
```

## 📝 Step 3: Create Main SCSS Entry Point

**File:** `src/themes/my-theme/sass/app.scss`

```scss
// ============================================
// My Theme - Main Entry Point
// ============================================

// Import Google Fonts (if not using CDN)
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

// 1. Import Theme Variables FIRST
// This must come before Bootstrap to override defaults
@import "variables";

// 2. Import Theme Styles
@import "my-theme";

// 3. Import Bootstrap Framework LAST
// Bootstrap will use your variable overrides
@import '~bootstrap/scss/bootstrap';

// 4. Any additional overrides or custom styles
// Add here if you need to override Bootstrap styles
```

### Import Order is Critical:

1. **Variables** - Define your colors, fonts, etc.
2. **Theme Styles** - Your custom CSS
3. **Bootstrap** - Framework (uses your variables)
4. **Overrides** - Any final tweaks

## 🔧 Step 4: Configure Webpack for CSS

The webpack configuration automatically detects and compiles your SCSS files.

**File:** `webpack.config.js` (already configured)

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 1. Extract CSS to separate file
                    MiniCssExtractPlugin.loader,
                    
                    // 2. Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,  // Don't process URLs in CSS
                            importLoaders: 1
                        }
                    },
                    
                    // 3. Compiles Sass to CSS
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
};
```

### What Each Loader Does:

1. **sass-loader** - Compiles SCSS to CSS
2. **css-loader** - Resolves `@import` and `url()`
3. **MiniCssExtractPlugin** - Extracts CSS to separate file

## 🏗️ Step 5: Build CSS

```bash
# Development build (with source maps)
npm run dev

# Production build (minified)
npm run build

# Watch mode (auto-rebuild on changes)
npm run watch
```

### Build Output:

```
dist/
└── themes/
    └── my-theme/
        └── app.css         # Compiled CSS
```

## 🎨 Advanced SCSS Features

### Using Mixins

**File:** `src/themes/my-theme/sass/_mixins.scss`

```scss
// Responsive breakpoint mixin
@mixin respond-to($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: $breakpoint-mobile) { @content; }
  }
  @else if $breakpoint == tablet {
    @media (max-width: $breakpoint-tablet) { @content; }
  }
  @else if $breakpoint == desktop {
    @media (min-width: $breakpoint-desktop) { @content; }
  }
}

// Flexbox center mixin
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// Button mixin
@mixin button-variant($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  border: none;

  &:hover {
    background-color: darken($bg-color, 10%);
  }
}
```

**Usage:**
```scss
@import "mixins";

.hero {
  @include flex-center;
  min-height: 500px;
}

.btn-custom {
  @include button-variant(#e74c3c);
}

.mobile-only {
  @include respond-to(mobile) {
    display: block;
  }
}
```

### Using Variables in Calculations

```scss
$base-spacing: 20px;

.element {
  padding: $base-spacing;
  margin: $base-spacing * 2;
  width: calc(100% - #{$base-spacing * 2});
}
```

### Nesting

```scss
.card {
  padding: 20px;

  .card-title {
    font-size: 1.5rem;
    
    &:hover {
      color: $primary-color;
    }
  }

  .card-body {
    p {
      margin-bottom: 10px;
    }
  }
}
```

## 🖼️ Handling Images and Fonts

### Images

**In SCSS:**
```scss
.hero {
  background-image: url('../img/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}
```

**File location:**
```
src/themes/my-theme/
├── sass/
│   └── app.scss
└── img/
    └── hero-bg.jpg
```

### Fonts

**Using Google Fonts:**
```scss
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

$font-primary: 'Roboto', sans-serif;
```

**Using Local Fonts:**
```scss
@font-face {
  font-family: 'MyFont';
  src: url('../fonts/myfont.woff2') format('woff2'),
       url('../fonts/myfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

$font-primary: 'MyFont', sans-serif;
```

## 📝 CSS Best Practices

### 1. Use Variables for Consistency
```scss
// Good
.button {
  color: $primary-color;
  padding: $element-spacing;
}

// Bad
.button {
  color: #3498db;
  padding: 20px;
}
```

### 2. Follow BEM Naming Convention
```scss
.card {
  // Block
}

.card__title {
  // Element
}

.card--featured {
  // Modifier
}
```

### 3. Keep Specificity Low
```scss
// Good
.nav-link {
  color: white;
}

// Bad
nav ul li a {
  color: white;
}
```

### 4. Mobile-First Approach
```scss
// Base styles (mobile)
.element {
  font-size: 14px;
}

// Tablet and up
@media (min-width: 768px) {
  .element {
    font-size: 16px;
  }
}

// Desktop and up
@media (min-width: 992px) {
  .element {
    font-size: 18px;
  }
}
```

## 🔍 Troubleshooting

### CSS Not Loading

**Check:**
1. File exists at `src/themes/my-theme/sass/app.scss`
2. No SCSS syntax errors
3. Build completed successfully
4. Correct path in HTML: `<link rel="stylesheet" href="dist/themes/my-theme/app.css">`

### Import Errors

**Check:**
1. Bootstrap is installed: `npm install bootstrap`
2. Tilde (~) prefix for node_modules: `@import '~bootstrap/scss/bootstrap'`
3. Underscore prefix for partials: `@import "variables"`

### Styles Not Applied

**Check:**
1. Import order (variables → theme → bootstrap)
2. CSS specificity (use browser dev tools)
3. Typos in class names
4. Browser cache (hard refresh: Ctrl+Shift+R)

## 📚 Related Documentation

- [Building JavaScript](./BUILDING_JAVASCRIPT.md) - JavaScript compilation guide
- [Webpack Configuration](./WEBPACK_CONFIGURATION.md) - Complete webpack setup
- [Theme Structure](./THEME_STRUCTURE.md) - File organization
- [Creating Themes](./CREATING_THEMES.md) - Complete theme guide

---

**Next:** [Webpack Configuration →](./WEBPACK_CONFIGURATION.md)
