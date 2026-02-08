# Frequently Asked Questions (FAQ)

## Installation & Setup

### Q: How do I install the themes package?

**A:** Install via npm:
```bash
npm install @hashtagcms/web-ui-kit
```

### Q: Can I use the themes without a build system?

**A:** Yes! Use the pre-compiled assets from the `dist/` folder:
```html
<link rel="stylesheet" href="node_modules/@hashtagcms/web-ui-kit/dist/themes/basic/app.css">
<script src="node_modules/@hashtagcms/web-ui-kit/dist/themes/basic/app.js"></script>
```

### Q: Which theme should I choose?

**A:** 
- **Basic Theme**: Choose if you want a traditional, content-focused design
- **Elegant Theme**: Choose if you want a modern, tech-focused design with animations

---

## Customization

### Q: How do I customize theme colors?

**A:** Override SCSS variables before importing the theme:
```scss
// Override colors
$primary-color: #your-color;
$secondary-color: #your-color;

// Import theme
@import "~@hashtagcms/web-ui-kit/src/themes/basic/sass/app";
```

### Q: Can I use only parts of a theme?

**A:** Yes! Import specific components from the SDK:
```javascript
// Import only the form submitter component
import { FormSubmitter } from '@hashtagcms/web-sdk';
```

### Q: How do I add custom fonts?

**A:** Add Google Fonts or custom fonts in your theme's SCSS:
```scss
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

$font-primary: 'Your Font', sans-serif;
```

---

## Development

### Q: How do I create a new theme?

**A:** Follow these steps:
1. Create directory: `src/themes/my-theme/`
2. Add `js/app.js` and `sass/app.scss`
3. Run `npm run build`

See [Creating Themes](./02-creating-themes.md) for detailed guide.

### Q: How do I test my theme locally?

**A:** 
1. Build the theme: `npm run build`
2. Create a test HTML file
3. Link to compiled assets in `dist/`

### Q: Can I use TypeScript?

**A:** Currently, the package is JavaScript-only. TypeScript support may be added in future versions.

### Q: How do I debug build errors?

**A:**
1. Check webpack output for specific errors
2. Verify all import paths are correct
3. Ensure SCSS syntax is valid
4. Check that all required dependencies are installed

---

## Features

### Q: Does the theme work with React/Vue/Angular?

**A:** The themes are framework-agnostic and work with any framework. Import the styles and adapt the JavaScript components as needed.

### Q: Are the themes responsive?

**A:** Yes! All themes are mobile-first and fully responsive.

### Q: Do themes support dark mode?

**A:** The Elegant theme has a dark color scheme. You can customize any theme to support dark mode by overriding color variables.

### Q: Can I use Font Awesome icons?

**A:** Yes! The Basic theme includes Font Awesome 4.7.0. You can also add Font Awesome 5/6 to any theme.

---

## Performance

### Q: How large are the compiled assets?

**A:**
- **Basic Theme**: ~240KB CSS, ~366KB JS
- **Elegant Theme**: ~200KB CSS, ~50KB JS

### Q: How can I reduce bundle size?

**A:**
1. Import only needed components
2. Use tree-shaking with modern bundlers
3. Optimize images before adding them
4. Use production builds

### Q: Are the themes optimized for performance?

**A:** Yes! Themes use:
- Minified production builds
- Optimized CSS
- Lazy loading where appropriate
- Efficient animations

---

## Compatibility

### Q: Which browsers are supported?

**A:** Latest 2 versions of:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### Q: Does it work with Bootstrap 5?

**A:** Yes! The themes are built on Bootstrap 5.3.3.

### Q: Can I use with older versions of Node.js?

**A:** Recommended Node.js version is 14.x or higher.

---

## Integration

### Q: How do I integrate with Laravel?

**A:**
1. Install the package
2. Import in your `resources/js/app.js`:
   ```javascript
   import '@hashtagcms/web-ui-kit/src/themes/basic/js/app';
   ```
3. Import in your `resources/sass/app.scss`:
   ```scss
   @import "~@hashtagcms/web-ui-kit/src/themes/basic/sass/app";
   ```
4. Build with Laravel Mix or Vite

### Q: How do I integrate with WordPress?

**A:**
1. Install via npm in your theme directory
2. Enqueue compiled assets in `functions.php`:
   ```php
   wp_enqueue_style('theme', get_template_directory_uri() . '/node_modules/@hashtagcms/web-ui-kit/dist/themes/basic/app.css');
   wp_enqueue_script('theme', get_template_directory_uri() . '/node_modules/@hashtagcms/web-ui-kit/dist/themes/basic/app.js');
   ```

### Q: Can I use with static site generators?

**A:** Yes! Works with Jekyll, Hugo, 11ty, and other static site generators. Link to the compiled assets or import in your build process.

---

## Contributing

### Q: How can I contribute a new theme?

**A:**
1. Fork the repository
2. Create your theme in `src/themes/your-theme/`
3. Test thoroughly
4. Submit a pull request

See [Contributing Guidelines](../CONTRIBUTING.md).

### Q: Can I report bugs or request features?

**A:** Yes! Open an issue on [GitHub](https://github.com/hashtagcms/web-ui-kit/issues).

### Q: How do I submit a theme for inclusion?

**A:**
1. Ensure it follows the theme structure
2. Include documentation
3. Add screenshots/demo
4. Submit a pull request

---

## Licensing

### Q: What license is the package under?

**A:** MIT License - free to use in personal and commercial projects.

### Q: Can I use the themes in commercial projects?

**A:** Yes! The MIT license allows commercial use.

### Q: Do I need to credit HashtagCms?

**A:** Not required, but appreciated!

---

## Troubleshooting

### Q: Styles are not loading

**A:** Check:
1. CSS file is correctly linked
2. Path to CSS file is correct
3. No conflicting CSS
4. Browser cache is cleared

### Q: JavaScript features not working

**A:** Check:
1. JS file is correctly linked
2. No JavaScript errors in console
3. Required HTML structure is present
4. Dependencies are loaded

### Q: Build fails with "Module not found"

**A:** Check:
1. All dependencies are installed: `npm install`
2. Import paths are correct
3. Files exist at specified paths

### Q: Fonts not loading

**A:** Check:
1. Font files are in the correct directory
2. Font paths in SCSS are correct
3. Fonts are copied to `dist/` during build

---

## Updates

### Q: How do I update to the latest version?

**A:**
```bash
npm update @hashtagcms/web-ui-kit
```

### Q: Will updates break my customizations?

**A:** Minor and patch updates should not break customizations. Major updates may have breaking changes - check the changelog.

### Q: How do I check the current version?

**A:**
```bash
npm list @hashtagcms/web-ui-kit
```

---

## Support

### Q: Where can I get help?

**A:**
- Check this FAQ
- Read the [documentation](./01-getting-started.md)
- Ask in [GitHub Discussions](https://github.com/hashtagcms/web-ui-kit/discussions)
- Open an [issue](https://github.com/hashtagcms/web-ui-kit/issues)

### Q: Is there a community?

**A:** Join the discussion on GitHub Discussions to connect with other developers.

### Q: Can I hire someone to customize a theme?

**A:** Check the HashtagCms community for developers offering customization services.

---

## Related Documentation

- [Getting Started](./01-getting-started.md)
- [Creating Themes](./02-creating-themes.md)
- [Theme Structure](./03-theme-structure.md)
- [API Reference](./07-api-reference.md)
- [Contributing](../CONTRIBUTING.md)
