# Webpack Configuration Guide

Complete guide to understanding the build system for HashtagCms themes.

## 📋 Overview

The `webpack.config.js` is designed for **Multi-Theme Compilation**. It automatically discovers any theme you create under `src/themes/` and builds its specific assets.

### Features
- ✅ **Automatic Discovery**: Finds `js/app.js` and `sass/app.scss` in every theme folder.
- ✅ **Babel Support**: Modern JavaScript (ES6+) support.
- ✅ **SCSS & Tailwind**: Integrated PostCSS and Sass loaders for both legacy and modern styling.
- ✅ **Asset Management**: Automatic copying of images and fonts.
- ✅ **Universal Modules**: Builds themes as UMD modules for maximum compatibility.

## 📁 Build Workflow

### 1. Discovery
The config scans `src/themes/` and creates a webpack entry for each subdirectory that contains an `app.js` or `app.scss`. 

### 2. Processing
- **JavaScript**: Processed through `babel-loader`.
- **Styles**: Processed through `MiniCssExtractPlugin` → `css-loader` → `postcss-loader` → `sass-loader`.
- **Assets**: Images and fonts are copied to the `dist/` folder while maintaining the theme prefix.

### 3. Output
Assets are saved to:
`dist/themes/[theme-name]/app.all.js` (and `.css`)

## 🛠️ Configuration Details

### PostCSS (Tailwind Support)
The system includes `postcss-loader` which is used by our **Modern** theme to process Tailwind CSS directives.

```javascript
{
    test: /\.s[ac]ss$/i,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader'
    ]
}
```

### Static Asset Copying
We use `CopyPlugin` to ensure that theme-specific images and fonts are accessible in the production build.

## 🏗️ Build Scripts

```bash
# Start development watch mode
npm run watch

# Production build (minified)
npm run build

# Run HashtagCMS Playground
npm run playground
```

## 🔍 Troubleshooting

### Theme Not Building?
1.  Check if your theme folder contains `js/app.js` or `sass/app.scss`.
2.  Ensure you have run `npm install` to install all loaders.
3.  Check the terminal for specific SCSS or JSX syntax errors.

---

[← Back to Theme Structure](./03-theme-structure.md) | [Building CSS →](./05-building-css.md)
