# Webpack Configuration Guide

Complete guide to understanding and customizing the webpack configuration for theme building.

## 📋 Overview

The `webpack.config.js` file handles:
- ✅ Automatic theme discovery
- ✅ JavaScript compilation (ES6+ → ES5)
- ✅ SCSS compilation (SCSS → CSS)
- ✅ Asset copying (images, fonts)
- ✅ Code minification (production)
- ✅ Source maps (development)

## 📁 Complete Webpack Configuration

**File:** `webpack.config.js`

```javascript
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// ============================================
// 1. THEME DISCOVERY
// ============================================
// Automatically find all themes
const themesDir = path.resolve(__dirname, 'src/themes');
const getEntries = () => {
    const entries = {};
    if (fs.existsSync(themesDir)) {
        const themes = fs.readdirSync(themesDir);
        themes.forEach(theme => {
            const themePath = path.join(themesDir, theme);
            if (fs.statSync(themePath).isDirectory()) {
                const jsPath = path.join(themePath, 'js/app.js');
                const sassPath = path.join(themePath, 'sass/app.scss');

                const entryFiles = [];
                if (fs.existsSync(jsPath)) entryFiles.push(jsPath);
                if (fs.existsSync(sassPath)) entryFiles.push(sassPath);

                if (entryFiles.length > 0) {
                    entries[theme] = entryFiles;
                }
            }
        });
    }
    return entries;
};

// ============================================
// 3. WEBPACK CONFIGURATION
// ============================================
module.exports = {
    // Mode: 'development' or 'production'
    mode: process.env.NODE_ENV || 'development',
    
    // Entry points
    entry: getEntries(),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'themes/[name]/app.js',
        clean: true
    },
    
    // Module rules (loaders)
    module: {
        rules: [
            // ============================================
            // JavaScript Rule
            // ============================================
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['last 2 versions', 'ie >= 11']
                                }
                            }]
                        ]
                    }
                }
            },
            
            // ============================================
            // SCSS/CSS Rule
            // ============================================
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 1. Extract CSS to separate file
                    MiniCssExtractPlugin.loader,
                    
                    // 2. Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,        // Don't process URLs
                            importLoaders: 1,  // Number of loaders before css-loader
                            sourceMap: process.env.NODE_ENV === 'development'
                        }
                    },
                    
                    // 3. Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development'
                        }
                    }
                ]
            },
            
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'themes/[name]/assets/[hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'themes/fonts/[name][ext][query]'
                }
            }
        ]
    },
    
    // ============================================
    // Plugins
    // ============================================
    plugins: [
        // Extract CSS to separate files
        new MiniCssExtractPlugin({
            filename: 'themes/[name]/app.css'
        }),
        
        // Copy static assets (images, fonts)
        new CopyPlugin({
            patterns: [
                {
                    from: 'src/themes/*/img/**/*',
                    to: ({ context, absoluteFilename }) => {
                        const projectRoot = path.join(__dirname, 'src/themes');
                        const relativePath = path.relative(projectRoot, absoluteFilename);
                        return Promise.resolve(`themes/${relativePath}`);
                    },
                    noErrorOnMissing: true
                },
                {
                    from: 'src/themes/*/fonts/**/*',
                    to: ({ context, absoluteFilename }) => {
                        const projectRoot = path.join(__dirname, 'src/themes');
                        const relativePath = path.relative(projectRoot, absoluteFilename);
                        return Promise.resolve(`themes/${relativePath}`);
                    },
                    noErrorOnMissing: true
                }
            ],
        }),
    ],
    
    // ============================================
    // Resolve Configuration
    // ============================================
    resolve: {
        extensions: ['.js', '.json', '.scss']
    },
    
    // ============================================
    // Development Server (optional)
    // ============================================
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        compress: true,
        port: 9000
    },
    
    // ============================================
    // Source Maps
    // ============================================
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,
    
    // ============================================
    // Performance
    // ============================================
    performance: {
        hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
```

## 🔧 Configuration Sections Explained

### 1. Theme Discovery

```javascript
const themesDir = path.join(__dirname, 'src/themes');
const themes = fs.readdirSync(themesDir).filter(file => {
    return fs.statSync(path.join(themesDir, file)).isDirectory();
});
```

**What it does:**
- Scans `src/themes/` directory
- Finds all subdirectories
- Each subdirectory is treated as a theme

**Result:**
```javascript
// themes = ['basic', 'elegant', 'my-theme']
```

### 2. Entry Creation

```javascript
themes.forEach(theme => {
    const jsPath = path.join(themePath, 'js/app.js');
    if (fs.existsSync(jsPath)) {
        entries[`themes/${theme}/app`] = `./${path.relative(__dirname, jsPath)}`;
    }
});
```

**What it does:**
- For each theme, looks for `js/app.js` and `sass/app.scss`
- Creates webpack entry points
- Outputs to `dist/themes/[theme-name]/app.js` and `app.css`

**Result:**
```javascript
entries = {
    'themes/basic/app': './src/themes/basic/js/app.js',
    'themes/elegant/app': './src/themes/elegant/js/app.js'
}
```

### 3. JavaScript Loader

```javascript
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
```

**What it does:**
- Finds all `.js` files
- Excludes `node_modules`
- Transpiles ES6+ to ES5 using Babel
- Supports modern JavaScript features

**Supports:**
- Arrow functions
- Classes
- Template literals
- Destructuring
- Async/await
- And more...

### 4. SCSS Loader

```javascript
{
    test: /\.s[ac]ss$/i,
    use: [
        MiniCssExtractPlugin.loader,  // Extract to file
        'css-loader',                  // Process CSS
        'sass-loader'                  // Compile SCSS
    ]
}
```

**What it does:**
- Finds all `.scss` and `.sass` files
- Compiles SCSS to CSS
- Processes CSS (resolves imports)
- Extracts to separate CSS file

**Processing order (bottom to top):**
1. `sass-loader` - SCSS → CSS
2. `css-loader` - Process CSS
3. `MiniCssExtractPlugin` - Extract to file

### 5. Asset Copying

```javascript
new CopyWebpackPlugin({
    patterns: [
        {
            from: 'src/themes/*/img/**/*',
            to: 'themes/[path][name][ext]'
        }
    ]
})
```

**What it does:**
- Copies images from `src/themes/*/img/`
- Copies fonts from `src/themes/*/fonts/`
- Maintains directory structure
- Outputs to `dist/themes/[theme-name]/`

## 📝 Adding a New Theme

When you add a new theme, webpack automatically:

1. **Discovers it** during build
2. **Creates entries** for JS and SCSS
3. **Compiles** both files
4. **Copies** images and fonts
5. **Outputs** to `dist/themes/your-theme/`

**No webpack configuration changes needed!**

## 🎯 Customizing Webpack

### Adding PostCSS (Autoprefixer)

```bash
npm install --save-dev postcss postcss-loader autoprefixer
```

**Update SCSS rule:**
```javascript
{
    test: /\.s[ac]ss$/i,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        require('autoprefixer')
                    ]
                }
            }
        },
        'sass-loader'
    ]
}
```

### Adding CSS Minification

```bash
npm install --save-dev css-minimizer-webpack-plugin
```

**Add to webpack config:**
```javascript
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [
            `...`,  // Extend existing minimizers
            new CssMinimizerPlugin()
        ]
    }
};
```

### Adding Image Optimization

```bash
npm install --save-dev image-minimizer-webpack-plugin imagemin
```

**Add to webpack config:**
```javascript
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
    plugins: [
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ['imagemin-mozjpeg', { quality: 80 }],
                        ['imagemin-pngquant', { quality: [0.6, 0.8] }]
                    ]
                }
            }
        })
    ]
};
```

### Using Aliases

```javascript
resolve: {
    alias: {
        '@core': path.resolve(__dirname, 'src/core'),
        '@themes': path.resolve(__dirname, 'src/themes'),
        '@components': path.resolve(__dirname, 'src/core/js/components')
    }
}
```

**Usage in code:**
```javascript
// Instead of:
import Subscribe from '../../../core/js/components/subscribe';

// Use:
import Subscribe from '@components/subscribe';
```

## 🏗️ Build Scripts

**File:** `package.json`

```json
{
  "scripts": {
    "dev": "webpack --mode development --progress --color",
    "prod": "webpack --mode production --progress --color",
    "build": "npm run prod",
    "watch": "webpack --mode development --watch --progress --color"
  }
}
```

### Script Explanation:

- **`npm run dev`** - Development build with source maps
- **`npm run prod`** - Production build (minified)
- **`npm run build`** - Alias for production build
- **`npm run watch`** - Watch mode (auto-rebuild)

## 🔍 Troubleshooting

### Build Fails

**Check:**
1. All dependencies installed: `npm install`
2. No syntax errors in webpack.config.js
3. Node.js version (14.x or higher recommended)

### Theme Not Detected

**Check:**
1. Theme directory exists in `src/themes/`
2. Contains `js/app.js` or `sass/app.scss`
3. Directory name is valid (no spaces)

### Assets Not Copied

**Check:**
1. `copy-webpack-plugin` is installed
2. Files exist in `src/themes/[theme]/img/` or `fonts/`
3. Glob patterns are correct

### Slow Build

**Optimize:**
1. Exclude unnecessary files
2. Use cache: `cache: { type: 'filesystem' }`
3. Limit source maps in production
4. Use `thread-loader` for parallel processing

## 📚 Related Documentation

- [Building JavaScript](./06-building-javascript.md) - JavaScript compilation
- [Building CSS](./05-building-css.md) - CSS/SCSS compilation
- [Creating Themes](./02-creating-themes.md) - Theme creation guide
- [Theme Structure](./03-theme-structure.md) - File organization

---

**Official Webpack Docs:** https://webpack.js.org/
