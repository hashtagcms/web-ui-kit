# Creating a New Theme

This guide walks you through creating a custom theme for HashtagCms.

## 🎨 Quick Start

### 1. Create Theme Directory Structure

```bash
cd web-ui-kit
mkdir -p src/themes/my-theme/{js,sass,img,fonts}
```

Your theme should have this structure:
```
src/themes/my-theme/
├── js/
│   └── app.js          # Theme JavaScript entry point
├── sass/
│   ├── app.scss        # Main SCSS entry point
│   ├── _variables.scss # Theme variables
│   └── _my-theme.scss  # Theme styles
├── img/                # Theme images
└── fonts/              # Theme fonts (optional)
```

### 2. Create JavaScript Entry Point

**File:** `src/themes/my-theme/js/app.js`

```javascript
import { Analytics, FormSubmitter, AppConfig } from '@hashtagcms/web-sdk';

/**
 * My Theme - Custom Theme
 */

class MyTheme {
    constructor() {
        this.initSubscribe();
        this.initCustomFeatures();
    }

    initSubscribe() {
        const form = new FormSubmitter({
            form: '#subscribe-form'
        });
    }

    initCustomFeatures() {
        // Add your custom JavaScript features here
        console.log('My Theme initialized!');
    }
}

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MyTheme());
} else {
    new MyTheme();
}
```

### 3. Create SCSS Variables

**File:** `src/themes/my-theme/sass/_variables.scss`

```scss
// My Theme Variables

// Color Palette
$primary-color: #3498db;
$secondary-color: #2ecc71;
$text-color: #333333;
$background-color: #ffffff;

// Typography
$font-primary: 'Roboto', sans-serif;
$font-size-base: 16px;
$line-height-base: 1.6;

// Spacing
$container-max-width: 1200px;
$section-padding: 80px;

// Bootstrap Overrides
$body-bg: $background-color;
$body-color: $text-color;
$font-family-sans-serif: $font-primary;

$theme-colors: (
  "primary": $primary-color,
  "secondary": $secondary-color
);
```

### 4. Create Theme Styles

**File:** `src/themes/my-theme/sass/_my-theme.scss`

```scss
/**
 * My Theme - Custom Styles
 */

// Import Google Fonts
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

// Base Styles
body {
  font-family: $font-primary;
  background-color: $background-color;
  color: $text-color;
  line-height: $line-height-base;
}

// Typography
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  color: $primary-color;
}

// Navigation
.navbar {
  background-color: $primary-color;
  
  .nav-link {
    color: white !important;
    
    &:hover {
      opacity: 0.8;
    }
  }
}

// Hero Section
.hero {
  min-height: 500px;
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  h1 {
    color: white;
    font-size: 3rem;
    margin-bottom: 1rem;
  }
}

// Buttons
.btn-primary {
  background-color: $primary-color;
  border-color: $primary-color;
  
  &:hover {
    background-color: darken($primary-color, 10%);
    border-color: darken($primary-color, 10%);
  }
}

// Cards
.card {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
}

// Footer
footer {
  background-color: #f8f9fa;
  padding: 3rem 0;
  margin-top: 4rem;
}

// Responsive
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
}
```

### 5. Create Main SCSS Entry Point

**File:** `src/themes/my-theme/sass/app.scss`

```scss
// My Theme - Main Entry Point

// Import Google Fonts
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

// Theme Variables
@import "variables";

// Theme Styles
@import "my-theme";

// Bootstrap Framework
@import '~bootstrap/scss/bootstrap';
```

### 6. Add Theme Images (Optional)

Place your images in `src/themes/my-theme/img/`:
- Hero backgrounds
- Feature images
- Icons
- Logos

### 7. Build Your Theme

The webpack configuration will automatically detect and build your new theme:

```bash
npm run build
```

Your compiled theme will be available at:
- `dist/themes/my-theme/app.css`
- `dist/themes/my-theme/app.js`
- `dist/themes/my-theme/img/` (if you added images)

## 🎯 Best Practices

### 1. Use Shared Core Components

Leverage the shared components from `@hashtagcms/web-sdk`:
- `FormSubmitter` - Newsletter subscription and form handling
- `AppConfig` - Configuration management
- `Analytics` - Tracking and telemetry

### 2. Follow Naming Conventions

- Use kebab-case for theme names: `my-awesome-theme`
- Prefix custom classes with your theme name: `.my-theme-card`
- Use semantic variable names: `$primary-color`, not `$blue`

### 3. Make It Responsive

Always test your theme on:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

### 4. Optimize Assets

- Compress images before adding them
- Use SVG for icons when possible
- Minimize custom fonts

### 5. Document Your Theme

Add a README in your theme directory:

**File:** `src/themes/my-theme/README.md`

```markdown
# My Theme

Description of your theme.

## Features
- Feature 1
- Feature 2

## Color Palette
- Primary: #3498db
- Secondary: #2ecc71

## Usage
\`\`\`scss
@import "~@hashtagcms/web-ui-kit/src/themes/my-theme/sass/app";
\`\`\`
```

## 🧪 Testing Your Theme

### 1. Test Locally

Create a test HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Theme Test</title>
    <link rel="stylesheet" href="../../dist/themes/my-theme/app.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="#">My Theme</a>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <h1>Welcome to My Theme</h1>
            <p>A beautiful custom theme for HashtagCms</p>
        </div>
    </section>

    <script src="../../dist/themes/my-theme/app.js"></script>
</body>
</html>
```

### 2. Check Responsiveness

Test on different screen sizes using browser dev tools.

### 3. Validate Accessibility

- Check color contrast ratios
- Ensure keyboard navigation works
- Test with screen readers

## 📤 Contributing Your Theme

Once your theme is ready:

1. **Test thoroughly** on different browsers and devices
2. **Document** all features and customization options
3. **Create a pull request** with:
   - Theme files
   - Documentation
   - Screenshots/demo
4. **Follow** the [Contributing Guidelines](../CONTRIBUTING.md)

## 💡 Examples

Check out existing themes for reference:
- [Basic Theme](../src/themes/basic/) - Traditional design
- [Elegant Theme](../src/themes/elegant/) - Modern tech aesthetic

## 🆘 Need Help?

- Check the [FAQ](./08-faq.md)
- Review [Theme Structure](./03-theme-structure.md)
- Ask in [GitHub Discussions](https://github.com/hashtagcms/web-ui-kit/discussions)
