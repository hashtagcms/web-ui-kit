# Building JavaScript for Themes

Complete guide to setting up and building JavaScript for your theme. 

## 📁 JavaScript File Structure

```
src/themes/my-theme/
└── js/
    └── app.js              # JavaScript entry point
```

## 🎯 Step 1: Create JavaScript Entry Point

**File:** `src/themes/my-theme/js/app.js`

```javascript
// Import core components from @hashtagcms/web-sdk
import { Analytics, FormSubmitter, AppConfig } from '@hashtagcms/web-sdk';

class MyTheme {
    constructor() {
        this.initComponents();
        this.initFeatures();
    }

    initComponents() {
        // Shared components
        new FormSubmitter({ form: '#subscribe-form' });
        window.HashtagCms.Analytics = new Analytics();
        window.HashtagCms.AppConfig = new AppConfig();
    }

    initFeatures() {
        // Custom theme logic
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MyTheme());
} else {
    new MyTheme();
}
```

## 🧪 Testing with the Playground

The **HashtagCMS Playground** is the best way to verify your JavaScript in a simulated environment.

1.  **Run Playground**: `npm run playground`.
2.  **Toggle Theme**: Use the switcher to select your theme.
3.  **Check Console**: The playground serves your compiled `dist/themes/[theme]/app.js`. Use the browser console to debug.
4.  **Auto-Reload**: Running `npm run watch` will recompile your JS automatically, which is then reflected in the playground on page refresh.

## 🏗️ Build Scripts

```bash
# Development build
npm run dev

# Production build
npm run build

# Watch mode (Recommended for dev)
npm run watch
```

## 📦 Using Core Components

### FormSubmitter
Used for newsletters and contact forms. 

```javascript
import { FormSubmitter } from '@hashtagcms/web-sdk';
new FormSubmitter({ form: '#my-form' });
```

### Analytics
Standard tracking for CMS events.

```javascript
import { Analytics } from '@hashtagcms/web-sdk';
const analytics = new Analytics();
analytics.trackCmsPage({ categoryId: 1 });
```

---

[← Back to Webpack Configuration](./04-webpack-configuration.md) | [Building CSS →](./05-building-css.md)
