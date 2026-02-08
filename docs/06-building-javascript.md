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
// Import shared core components from @hashtagcms/web-sdk
import { Analytics, FormSubmitter, AppConfig } from '@hashtagcms/web-sdk';

/**
 * My Theme JavaScript
 */
class MyTheme {
    constructor() {
        console.log('My Theme initialized');
        this.initComponents();
        this.initFeatures();
    }

    /**
     * Initialize shared components
     */
    initComponents() {
        // Initialize form submitter
        this.contactForm = new FormSubmitter({ 
            form: '#subscribe-form' 
        });

        // Initialize app config
        window.HashtagCms.AppConfig = new AppConfig();

        // Initialize analytics
        window.HashtagCms.Analytics = new Analytics();
    }

    /**
     * Initialize theme-specific features
     */
    initFeatures() {
        // Add your custom JavaScript here
        this.setupNavigation();
        this.setupAnimations();
    }

    setupNavigation() {
        // Example: Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                document.body.classList.toggle('menu-open');
            });
        }
    }

    setupAnimations() {
        // Example: Scroll animations
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            // Your scroll logic here
        });
    }
}

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MyTheme());
} else {
    new MyTheme();
}
```

## 🔧 Step 2: Configure Webpack for JavaScript

The webpack configuration automatically detects your theme's JavaScript file.

**File:** `webpack.config.js` (already configured)

```javascript
const path = require('path');
const fs = require('fs');

// Automatically discover themes
const themesDir = path.join(__dirname, 'src/themes');
const themes = fs.readdirSync(themesDir).filter(file => {
    return fs.statSync(path.join(themesDir, file)).isDirectory();
});

// Create entries for each theme
const entries = {};
themes.forEach(theme => {
    // We create a combined entry for each theme
    const entryFiles = [];
    const jsPath = path.join(themesDir, theme, 'js/app.js');
    const sassPath = path.join(themesDir, theme, 'sass/app.scss');
    
    if (fs.existsSync(jsPath)) entryFiles.push(jsPath);
    if (fs.existsSync(sassPath)) entryFiles.push(sassPath);

    if (entryFiles.length > 0) {
        entries[theme] = entryFiles;
    }
});

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'themes/[name]/app.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
```

### What This Does:

1.  **Discovers Themes** - Scans `src/themes/` directory
2.  **Creates Entries** - For each `js/app.js` found
3.  **Compiles JavaScript** - Using Babel for ES6+ support
4.  **Outputs** - To `dist/themes/[theme-name]/app.js`

## 🏗️ Step 3: Build JavaScript

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
        └── app.js          # Compiled JavaScript
```

## 📦 Using Core Components

### Available Core Components (via @hashtagcms/web-sdk)

#### 1. FormSubmitter (replaces Subscribe)
```javascript
import { FormSubmitter } from '@hashtagcms/web-sdk';

const form = new FormSubmitter({
    form: '#subscribe-form'
});
```

#### 2. AppConfig
```javascript
import { AppConfig } from '@hashtagcms/web-sdk';

const config = new AppConfig({
    apiUrl: 'https://api.example.com'
});
```

#### 4. Analytics
```javascript
import { Analytics } from '@hashtagcms/web-sdk';
const analytics = new Analytics();

// Track CMS page
analytics.trackCmsPage({ categoryId: 1 });
```

## 🎨 Advanced JavaScript Features

### Adding External Libraries

**Install via npm:**
```bash
npm install library-name
```

**Import in your theme:**
```javascript
import libraryName from 'library-name';

class MyTheme {
    constructor() {
        this.library = libraryName;
    }
}
```

### Creating Custom Components

**File:** `src/themes/my-theme/js/components/slider.js`

```javascript
export default class Slider {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        // Slider logic
    }
}
```

**Import in app.js:**
```javascript
import Slider from './components/slider';

class MyTheme {
    initFeatures() {
        new Slider('.slider');
    }
}
```

### Event Handling

```javascript
class MyTheme {
    initFeatures() {
        // Click events
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', this.handleClick.bind(this));
        });

        // Custom events
        document.addEventListener('theme:ready', this.onThemeReady.bind(this));
    }

    handleClick(event) {
        console.log('Button clicked', event.target);
    }

    onThemeReady(event) {
        console.log('Theme is ready', event.detail);
    }
}
```

## 🧪 Testing JavaScript

### Browser Console Testing

```javascript
// Check if theme loaded
console.log(window.MyTheme);

// Test components
const subscribe = new Subscribe('#subscribe-form');
subscribe.validate();
```

### Adding Debug Mode

```javascript
class MyTheme {
    constructor() {
        this.debug = process.env.NODE_ENV === 'development';
        
        if (this.debug) {
            console.log('MyTheme: Debug mode enabled');
        }
    }

    log(...args) {
        if (this.debug) {
            console.log('[MyTheme]', ...args);
        }
    }
}
```

## 📝 JavaScript Best Practices

### 1. Use ES6+ Features
```javascript
// Arrow functions
const init = () => {
    console.log('Initialized');
};

// Destructuring
const { width, height } = element.getBoundingClientRect();

// Template literals
const message = `Welcome to ${themeName}`;
```

### 2. Handle Errors
```javascript
class MyTheme {
    initFeatures() {
        try {
            this.setupComplexFeature();
        } catch (error) {
            console.error('Feature failed:', error);
        }
    }
}
```

### 3. Clean Up Event Listeners
```javascript
class MyTheme {
    constructor() {
        this.handleScroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.handleScroll);
    }

    destroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        // Scroll logic
    }
}
```

### 4. Use Debouncing for Performance
```javascript
class MyTheme {
    constructor() {
        this.handleResize = this.debounce(this.handleResize.bind(this), 250);
        window.addEventListener('resize', this.handleResize);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    handleResize() {
        console.log('Window resized');
    }
}
```

## 🔍 Troubleshooting

### JavaScript Not Loading

**Check:**
1. File exists at `src/themes/my-theme/js/app.js`
2. No syntax errors (check console)
3. Build completed successfully
4. Correct path in HTML: `<script src="dist/themes/my-theme/app.js"></script>`

### Import Errors

**Check:**
1. Package is installed: `npm install @hashtagcms/web-ui-kit`
2. File extensions are omitted in imports
3. Named vs default exports match

### Build Errors

**Check:**
1. All dependencies installed: `npm install`
2. Babel configuration is correct
3. No circular dependencies

## 📚 Related Documentation

- [Building CSS](./05-building-css.md) - CSS compilation guide
- [Webpack Configuration](./04-webpack-configuration.md) - Complete webpack setup
- [API Reference](./07-api-reference.md) - Component APIs
- [Theme Structure](./03-theme-structure.md) - File organization

---

**Next:** [Building CSS →](./05-building-css.md)
