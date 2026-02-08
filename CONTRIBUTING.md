# Contributing to HashtagCms Themes

We welcome contributions! Whether you're fixing a bug in the core logic or designing a brand new theme.

## 🏗️ Project Structure

- **`src/core`**: Place generic, reusable logic here. Avoid theme-specific code.
- **`src/themes`**: Place visual designs here.

## 🎨 Adding a Theme

If you want to contribute a new theme:
1. Create a new folder in `src/themes/`.
2. Ensure it has a `sass/app.scss` and `js/app.js` entry point.
3. Use the variables from `src/core/sass` where possible to maintain consistency.

## 🧪 Testing

Currently, this package is tested by linking it to a local HashtagCms project.
```bash
npm link
# In your project
npm link @hashtagcms/web-ui-kit
```
