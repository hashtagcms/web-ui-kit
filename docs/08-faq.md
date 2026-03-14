# Frequently Asked Questions (FAQ)

## 🎨 Modern vs Legacy Themes

### Q: What is the recommended theme standard?
**A:** We strongly recommend using the **Modern** theme standard. It is built with **Tailwind CSS**, which offers better performance, easier customization, and modern design patterns.

### Q: Is the Basic theme still supported?
**A:** Yes, it is maintained as a legacy theme for backwards compatibility. However, all new features and premium design updates will be focused on the Tailwind-based modern ecosystem.

## 🚀 HashtagCMS Playground

### Q: How do I test my custom theme in real-time?
**A:** Use the **HashtagCMS Playground**. Run `npm run playground` and visit `http://localhost:3000`. You can switch to your theme using the switcher in the bottom-right corner.

### Q: Why does my theme show a PHP error in the Playground?
**A:** This usually happens if your Blade template uses a Laravel/HashtagCMS helper that isn't mocked in our Lite renderer. 
- **Fix**: Check `src/lib/blade-renderer.php` and ensure any helpers like `app()->HashtagCms` are handled. We've optimized the renderer to support both `app('HashtagCmsLayoutManager')` and property-based access.

### Q: Can I add new pages to the Playground?
**A:** Yes!
1. Add a new JSON data file in `fake-data/`.
2. Add a mapping in `src/core/data/link-map.json`.
3. The playground will automatically include the new page in its switcher.

## 🛠️ Development & Customization

### Q: How do I customize Tailwind colors for the Modern theme?
**A:** Edit the `@theme` block in your theme's `app.scss` (Tailwind 4.x standard):
```scss
@theme {
  --color-primary: #3498db;
}
```

### Q: How do I customize colors for Legacy themes?
**A:** Override the SCSS variables in your theme's `_variables.scss` before importing the theme styles.

### Q: Why are my asset paths broken in production?
**A:** Ensure you are using the standard asset helper pattern in your Blade files:
`/assets/hashtagcms/fe/{{ $theme_name }}/css/app.css`.

## 📦 Building and Deployment

### Q: How do I compile my theme?
**A:** Run `npm run build`. This will generate production-ready assets in `dist/themes/[your-theme]/`.

### Q: How do I integrate with Laravel?
**A:** Use the built-in installer: `npx web-ui-kit`. This will copy your selected theme's views and assets into your Laravel structure.

---

[← Back to Main README](../README.md)
