# API Reference

Complete API reference for @hashtagcms/web-ui-kit components and utilities. 

> [!NOTE]
> Most core logic is inherited from `@hashtagcms/web-sdk`. This documentation focuses on how that logic is integrated into our themes.

## 🎨 Theme APIs

### Modern Theme (Tailwind)
**Standard**: Tailwind CSS 4.x
**Integration**: Utilities-first approach.

The Modern theme doesn't rely on a complex class-based API. Instead, it uses standard Tailwind utilities. 
- **Navigation**: Uses `@hashtagcms/web-sdk` for active state management.
- **Components**: Stylized using Tailwind classes in Blade templates.

### Basic Theme (Legacy)
**Standard**: Bootstrap 5 + SCSS
**Integration**: Standard Bootstrap data-attributes.

---

## 🔧 SDK Core Components

These components are provided by `@hashtagcms/web-sdk` and are used across all themes.

### FormSubmitter
Standard form submission handler with built-in validation and AJAX support.

#### Options:
- `form`: CSS Selector or HTMLElement.
- `submitUrl`: API endpoint.
- `onSuccess`: Callback for successful submission.
- `onError`: Callback for errors.

### Analytics
Multi-tier tracking system for HashtagCms and Third-party collectors.

#### Methods:
- `trackPageView(url)`: Tracks a page view in GA and CMS.
- `trackCmsPage({ categoryId })`: Specific tracking for HashtagCMS server statistics.

### AppConfig
Centralized configuration manager supporting dot-notation.

#### Methods:
- `getValue(key, defaultValue)`: Get a config value (e.g., `theme.main.primary_color`).

---

## 🏗️ Playground Mock API
When building for the **HashtagCMS Playground**, you have access to mocked HashtagCMS globals in your Blade templates:

- `$cms['site']`: Site information.
- `$cms['meta']`: Page metadata.
- `$theme_name`: The active theme alias (e.g., `modern`).

---

[← Back to Getting Started](./01-getting-started.md) | [FAQ →](./08-faq.md)
