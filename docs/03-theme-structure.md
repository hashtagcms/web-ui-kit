# Theme Structure

Understanding the structure of the @hashtagcms/web-ui-kit package.

## 📁 Package Structure

```
@hashtagcms/web-ui-kit/
├── dist/                      # Compiled assets (generated)
│   └── themes/
│       ├── basic/
│       │   ├── app.css
│       │   ├── app.js
│       │   ├── fonts/
│       │   └── img/
│       └── elegant/
│           ├── app.css
│           ├── app.js
│           └── img/
├── src/
│   └── themes/                # Individual themes
│       ├── basic/
│       │   ├── js/
│       │   │   └── app.js
│       │   ├── sass/
│       │   │   ├── app.scss
│       │   │   ├── _variables.scss
│       │   │   ├── _basic.scss
│       │   │   └── font-awesome/
│       │   ├── img/
│       │   └── fonts/
│       └── elegant/
│           ├── js/
│           │   └── app.js
│           ├── sass/
│           │   ├── app.scss
│           │   ├── _variables.scss
│           │   └── _elegant.scss
│           └── img/
├── docs/                      # Documentation
├── package.json
├── webpack.config.js          # Build configuration
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

## 🎨 Theme Directory Structure

Each theme follows this structure:

```
src/themes/[theme-name]/
├── js/
│   └── app.js              # JavaScript entry point
├── sass/
│   ├── app.scss            # SCSS entry point
│   ├── _variables.scss     # Theme variables
│   └── _[theme-name].scss  # Theme styles
├── img/                    # Theme images
└── fonts/                  # Theme fonts (optional)
```

### JavaScript Structure

**`js/app.js`** - Theme JavaScript entry point

```javascript
// Import shared core components from @hashtagcms/web-sdk
import { Analytics, FormSubmitter, AppConfig } from '@hashtagcms/web-sdk';

// Theme-specific class
class ThemeName {
    constructor() {
        this.initComponents();
        this.initFeatures();
    }

    initComponents() {
        // Initialize shared components
    }

    initFeatures() {
        // Theme-specific features
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ThemeName());
} else {
    new ThemeName();
}
```

### SCSS Structure

**`sass/app.scss`** - Main SCSS entry point

```scss
// Import fonts
@import url('https://fonts.googleapis.com/css2?family=...');

// Import variables
@import "variables";

// Import theme styles
@import "theme-name";

// Import Bootstrap
@import '~bootstrap/scss/bootstrap';
```

**`sass/_variables.scss`** - Theme variables

```scss
// Color Palette
$primary-color: #...;
$secondary-color: #...;

// Typography
$font-primary: '...', sans-serif;

// Bootstrap Overrides
$body-bg: $primary-color;
$theme-colors: (
  "primary": $primary-color,
  "secondary": $secondary-color
);
```

**`sass/_theme-name.scss`** - Theme styles

```scss
// All theme-specific styles
body { ... }
.navbar { ... }
.hero { ... }
```

## 🔧 Core Components (via @hashtagcms/web-sdk)

### Shared JavaScript Components

Shared logic and components are now managed in the `@hashtagcms/web-sdk` package.

#### FormSubmitter (Newsletter) Component
Handles newsletter subscription forms and general form submissions.

**Usage:**
```javascript
import { FormSubmitter } from '@hashtagcms/web-sdk';

const form = new FormSubmitter({
    form: '#subscribe-form',
    submitUrl: '/common/newsletter'
});
```

#### Form Validation
Form validation is now handled by the `FormValidator` module within the Web SDK or automatically via the `FormSubmitter` class.

**Usage:**
```javascript
import { FormValidator } from '@hashtagcms/web-sdk';

const validator = new FormValidator('#my-form');
validator.validate();
```

### Shared Utilities

Located in `src/core/js/utils/`:

#### Analytics
Standardized tracking for HashtagCms and Google Analytics.

**Usage:**
```javascript
import { Analytics } from '@hashtagcms/web-sdk';
const analytics = new Analytics();

// Track CMS page
analytics.trackCmsPage({ categoryId: 1 });

// Track URL (Master method)
analytics.trackPageView('/home');
```

### Shared Helpers

#### Common Helpers
Provides common utility functions.

**Usage:**
```javascript
import { AppConfig } from '@hashtagcms/web-sdk';

const config = new AppConfig();
```

## 🎯 Build System

### Webpack Configuration

The `webpack.config.js` automatically:

1.  **Discovers themes** in `src/themes/`
2.  **Creates entries** for each theme's JS and SCSS
3.  **Compiles assets** to `dist/themes/[theme-name]/`
4.  **Copies static assets** (images, fonts)

### Build Process

```bash
# Development build
npm run dev

# Production build
npm run build

# Watch mode
npm run watch
```

### Output Structure

After building, the `dist/` directory contains:

```
dist/
└── themes/
    ├── basic/
    │   ├── app.css          # Compiled CSS
    │   ├── app.js           # Compiled JS
    │   ├── fonts/           # Copied fonts
    │   └── img/             # Copied images
    └── elegant/
        ├── app.css
        ├── app.js
        └── img/
```

## 📦 Package.json Structure

```json
{
  "name": "@hashtagcms/web-ui-kit",
  "version": "1.0.8",
  "main": "dist/themes/basic/app.js",
  "files": [
    "dist",
    "src"
  ],
  "scripts": {
    "dev": "webpack --mode development --progress --color",
    "prod": "webpack --mode production --progress --color",
    "build": "npm run prod",
    "watch": "webpack --mode development --watch --progress --color"
  },
  "dependencies": {
    "@hashtagcms/web-sdk": "^1.0.3",
    "axios": "^1.8.0",
    "bootstrap": "^5.3.3"
  },
  "devDependencies": {
    "webpack": "^5.89.0",
    "sass": "^1.69.0",
    // ... other dev dependencies
  }
}
```

## 🔄 Import Paths

### From Application Code

```scss
// Import theme SCSS
@import "~@hashtagcms/web-ui-kit/src/themes/basic/sass/app";
```

```javascript
// Import theme JS
import '@hashtagcms/web-ui-kit/src/themes/basic/js/app';
```

### From Theme Code

```javascript
// Import core components (from @hashtagcms/web-sdk)
import { Subscribe, Analytics, AppConfig } from '@hashtagcms/web-sdk';
```

```scss
// Import Bootstrap (from theme SCSS)
@import '~bootstrap/scss/bootstrap';
```

## 🎨 Asset Paths

### Images

**In SCSS:**
```scss
.hero-bg {
  background-image: url('../img/hero-bg.png');
}
```

**In HTML:**
```html
<img src="node_modules/@hashtagcms/web-ui-kit/dist/themes/basic/img/hero.png">
```

### Fonts

**In SCSS:**
```scss
$fa-font-path: "../fonts";
@import "font-awesome/scss/font-awesome";
```

## 📝 File Naming Conventions

- **Themes:** kebab-case (`my-theme`, `elegant-theme`)
- **SCSS partials:** Prefix with underscore (`_variables.scss`, `_mixins.scss`)
- **JavaScript:** camelCase for variables, PascalCase for classes
- **Images:** kebab-case (`hero-bg.png`, `feature-icon.svg`)

## 🔍 Dependencies

### Runtime Dependencies
- `axios` - HTTP client
- `bootstrap` - UI framework

### Development Dependencies
- `webpack` - Module bundler
- `babel` - JavaScript transpiler
- `sass` - CSS preprocessor
- `mini-css-extract-plugin` - CSS extraction
- `copy-webpack-plugin` - Asset copying

## 📚 Related Documentation

- [Getting Started](./01-getting-started.md)
- [Creating Themes](./02-creating-themes.md)
- [Contributing](../CONTRIBUTING.md)
- [API Reference](./07-api-reference.md)
