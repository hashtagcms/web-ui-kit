const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Helper to find all themes
const themesDir = path.resolve(__dirname, 'src/themes');
const getEntries = () => {
    const entries = {};
    if (fs.existsSync(themesDir)) {
        const themes = fs.readdirSync(themesDir);
        themes.forEach(theme => {
            const themePath = path.join(themesDir, theme);
            if (fs.statSync(themePath).isDirectory()) {
                // Check if app.js and app.scss exist
                const jsPath = path.join(themePath, 'js/app.js');
                const sassPath = path.join(themePath, 'sass/app.scss');

                // We create a combined entry for each theme
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

module.exports = {
    entry: getEntries(),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'themes/[name]/app.js',
        library: {
            name: ['HashtagCmsUI', '[name]'],
            type: 'umd',
        },
        globalObject: 'this',
        clean: true
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
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'themes/[name]/app.css'
        }),
        new CopyPlugin({
            patterns: [
                // Copy Theme Images (e.g., src/themes/basic/img -> dist/themes/basic/img)
                {
                    from: 'src/themes/*/img/**/*',
                    to: ({ context, absoluteFilename }) => {
                        const projectRoot = path.join(__dirname, 'src/themes');
                        const relativePath = path.relative(projectRoot, absoluteFilename);
                        // Output: themes/basic/img/file.png
                        return Promise.resolve(`themes/${relativePath}`);
                    },
                    noErrorOnMissing: true
                },
                // Copy Fonts (e.g., src/themes/basic/fonts -> dist/themes/basic/fonts)
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
    resolve: {
        extensions: ['.js', '.json', '.scss']
    }
};
