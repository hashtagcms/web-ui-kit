# Theme Structure

Understanding the structure of the @hashtagcms/web-ui-kit package.

## 📁 Package Structure

```
@hashtagcms/web-ui-kit/
├── dist/                      # Compiled assets (generated)
│   └── themes/
│       ├── modern/            # Standard Tailwind Theme
│       └── basic/             # Legacy Theme
├── src/
│   └── themes/                # Individual themes
│       ├── modern/
│       │   ├── js/
│       │   ├── sass/          # Tailwind entry point
│       │   └── views/         # Blade templates
│       └── basic/ (Legacy)
├── fake-data/                 # JSON data for Playground
├── playground.js              # Playground server
├── src/lib/                   # Core rendering logic
├── docs/                      # Documentation
├── package.json
└── webpack.config.js          # Build configuration
```

## 🎨 Theme Directory Structure

Each theme follows this structure:

```
src/themes/[theme-name]/
├── js/
│   └── app.js              # JavaScript entry point
├── sass/ (or css/)
│   └── app.scss            # style entry point
├── views/                  # Blade templates (Required for Playground)
│   ├── _layout_/           # Main layout templates
│   ├── _services_/         # Data service templates
│   └── [module].blade.php  # Module-specific templates
├── img/                    # Theme images
└── fonts/                  # Theme fonts (optional)
└── langs/                  # Language/Translation files
```

### Views Directory (Blade)

The `views/` directory is critical if you want to use the **HashtagCMS Playground**. It should contain your Blade templates organized by module name.

- **`_layout_/index.blade.php`**: The main skeleton of your theme.
- **`header.blade.php`**, **`footer.blade.php`**, etc.: Individual module views.

### JavaScript Structure

**`js/app.js`** - Theme JavaScript entry point

```javascript
// Import shared core components from @hashtagcms/web-sdk
import { Analytics, FormSubmitter, AppConfig } from '@hashtagcms/web-sdk';

class MyTheme {
    constructor() {
        this.initComponents();
    }

    initComponents() {
        // Initialize shared components
        new FormSubmitter({ form: '#subscribe-form' });
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MyTheme());
} else {
    new MyTheme();
}
```

## 🧪 Playground Integration

The playground automatically discovers themes in `src/themes/`. For a theme to be "Playground Ready", it must:
1.  Have a `views/` directory with at least a `_layout_/index.blade.php`.
2.  Have an entry in `webpack.config.js` (handled automatically if `js/app.js` or `sass/app.scss` exists).

## 🔧 Core Components (via @hashtagcms/web-sdk)

Shared logic and components are managed in the `@hashtagcms/web-sdk` package.

#### FormSubmitter Component
Handles newsletter subscription forms and general form submissions.

#### Analytics
Standardized tracking for HashtagCms and Google Analytics.

## 🎯 Build System

Our build system (Webpack) automatically:
1.  **Discovers themes** in `src/themes/`
2.  **Compiles assets** to `dist/themes/[theme-name]/`
3.  **Copies static assets** (images, fonts)

---

[← Back to Getting Started](./01-getting-started.md) | [Creating Themes →](./02-creating-themes.md)
