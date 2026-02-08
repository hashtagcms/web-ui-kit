# API Reference

Complete API reference for @hashtagcms/web-ui-kit components and utilities.

## Core Components

### FormSubmitter (Newsletter) Component

Standard form submission handler with built-in validation.

**Package:** `@hashtagcms/web-sdk`

#### Constructor

```javascript
new FormSubmitter(options)
```

**Options:**
- `form` (string|HTMLElement) - Form element selector
- `submitUrl` (string) - API endpoint (default: `/common/newsletter`)
- `onSuccess` (function) - Success callback
- `onError` (function) - Error callback

**Example:**
```javascript
import { FormSubmitter } from '@hashtagcms/web-sdk';

const form = new FormSubmitter({
    form: '#newsletter-form',
    onSuccess: (data) => console.log('Subscribed!', data)
});
```

#### Methods

##### `submit()`
Programmatically triggers form submission.

**Returns:** `Promise<any>`

##### `validator.validate()`
Access the internal validator manually.

**Returns:** `boolean`

### AppConfig

Centralized configuration manager supporting dot-notation.

**Package:** `@hashtagcms/web-sdk`

#### Constructor

```javascript
new AppConfig(configData)
```

#### Methods

##### `getValue(key, defaultValue?)`
Retrieves a configuration value. Supports **dot notation** for nested keys.

**Parameters:**
- `key` (string) - Configuration key (e.g., `'site.name'`)
- `defaultValue` (any) - Value to return if key is missing

**Returns:** `any`

**Example:**
```javascript
const siteName = config.getValue('site.name', 'Default Site');
```

---

### Analytics

Multi-tier tracking system for HashtagCms and Third-party collectors.

**Package:** `@hashtagcms/web-sdk`

#### Methods

##### `trackPageView(url, callback?)`
**Master Method**. Tracks a page view across all configured systems (GA, Custom Callbacks).

**Parameters:**
- `url` (string) - Page URL to track

**Example:**
```javascript
analytics.trackPageView('/products/list');
```

##### `trackCmsPage(data, callback?)`
**CMS Specific**. Tracks a category/page view specifically for the HashtagCms server.

**Parameters:**
- `data` (Object) - Must contain `categoryId`.

**Example:**
```javascript
analytics.trackCmsPage({ categoryId: 10, pageId: 200 });
```

##### `google.trackPageView(url)`
Directly tracks a page view in Google Analytics only.

---

## Theme Classes

### Basic Theme

**Location:** `src/themes/basic/js/app.js`

#### Features
- Automatic component initialization
- FormSubmitter (Newsletter) integration
- Dual-tier Analytics tracking

#### Usage
```javascript
import '@hashtagcms/web-ui-kit/src/themes/basic/js/app';
```

---

### Elegant Theme

**Location:** `src/themes/elegant/js/app.js`

#### Constructor

```javascript
new ElegantTheme()
```

#### Methods

##### `initSmoothScroll()`
Initializes smooth scrolling for anchor links.

**Returns:** `void`

##### `initParallax()`
Initializes parallax scrolling effects.

**Returns:** `void`

**HTML:**
```html
<div class="parallax" data-speed="0.5">
    <!-- Content -->
</div>
```

##### `initCardAnimations()`
Initializes card scroll animations.

**Returns:** `void`

**HTML:**
```html
<div class="feature-card">
    <!-- Card content -->
</div>
```

#### Usage
```javascript
import '@hashtagcms/web-ui-kit/src/themes/elegant/js/app';
```

---

## SCSS Variables

### Basic Theme Variables

**Location:** `src/themes/basic/sass/_variables.scss`

```scss
// Colors
$body-bg: #ffffff;
$text-color: #333333;
$primary-color: #4CAF50;

// Typography
$font-family-sans-serif: 'Raleway', sans-serif;
$font-size-base: 16px;

// Spacing
$container-max-width: 1200px;
```

### Elegant Theme Variables

**Location:** `src/themes/elegant/sass/_variables.scss`

```scss
// Colors
$primary-dark: #0a1929;
$primary-blue: #1e3a5f;
$accent-cyan: #00d4ff;
$accent-purple: #6366f1;
$text-primary: #e8eaed;
$text-secondary: #9ca3af;

// Typography
$font-primary: 'Inter', sans-serif;
$font-mono: 'JetBrains Mono', monospace;

// Effects
$transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
$shadow-elegant: 0 20px 60px rgba(0, 0, 0, 0.3);
$glow-cyan: 0 0 20px rgba(0, 212, 255, 0.3);
```

---

## SCSS Mixins

### Responsive Breakpoints

```scss
// Usage in your theme
@media (max-width: 768px) {
  .hero {
    font-size: 2rem;
  }
}
```

### Common Patterns

#### Glass Effect (Elegant Theme)

```scss
.glass-effect {
  background: rgba($surface-light, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba($accent-cyan, 0.1);
}
```

#### Gradient Text (Elegant Theme)

```scss
.gradient-text {
  background: linear-gradient(135deg, $accent-cyan, $accent-purple);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## CSS Classes

### Basic Theme Classes

#### Layout
- `.container` - Main container
- `.hero` - Hero section
- `.hero-bg-1`, `.hero-bg-2` - Hero backgrounds
- `.hero-inner` - Hero inner wrapper
- `.hero-text` - Hero text

#### Components
- `.featured-card` - Feature card
- `.shadow-common` - Common shadow
- `.section-our-specaility` - Features section
- `.section-subscribe` - Subscribe section

#### Icons
- `.__icon` - Icon wrapper
- `.design-card`, `.design-mobile`, `.design-fast-loading` - Icon variants

### Elegant Theme Classes

#### Layout
- `.hero` - Hero section
- `.hero-content` - Hero content wrapper
- `.hero-title` - Hero title
- `.hero-subtitle` - Hero subtitle

#### Components
- `.feature-card`, `.tech-card` - Feature cards
- `.glass-effect` - Glass morphism effect
- `.gradient-text` - Gradient text
- `.glow` - Glow effect
- `.parallax` - Parallax element

#### Animations
- `.animate-in` - Fade in animation
- `.fadeInUp` - Fade in up animation

---

## Events

### Subscribe Component Events

```javascript
// Listen for successful subscription
document.addEventListener('subscribe:success', (event) => {
    console.log('Subscribed:', event.detail.email);
});

// Listen for subscription error
document.addEventListener('subscribe:error', (event) => {
    console.error('Error:', event.detail.error);
});
```

### Form Helper Events

```javascript
// Listen for validation
document.addEventListener('form:validate', (event) => {
    console.log('Valid:', event.detail.valid);
});

// Listen for submission
document.addEventListener('form:submit', (event) => {
    console.log('Data:', event.detail.data);
});
```

---

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

TypeScript definitions are included in `@hashtagcms/web-sdk`.

---

## Related Documentation

- [Getting Started](./01-getting-started.md)
- [Creating Themes](./02-creating-themes.md)
- [Theme Structure](./03-theme-structure.md)
- [Contributing](../CONTRIBUTING.md)
