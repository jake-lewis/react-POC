const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = function(env, argv) {
    const base = {
        entry: {
            home: './src/homeEntry.tsx',
            map: './src/mapEntry.tsx'
        },
        output: {
            filename: 'js/[name].[contentHash:8].js',
            path: path.resolve(process.cwd(), 'dist'),
            publicPath:'/'
        },
        devtool: 'eval-source-map',
        resolve: {
            extensions: ['.ts', ".tsx", ".js", ".jsx", ".json"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'awesome-typescript-loader'
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        devServer: {
            port: 3000,
            contentBase: './dist',
            inline: false,
            overlay: {
                warning: true,
                errors: true
            }
        },
        mode: 'development',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './public/index.html',
                alwaysWriteToDisk: true,
                chunks: ['home', 'vendors']
            }),
            new HtmlWebpackPlugin({
                filename: 'map.html',
                template: './public/index.html',
                alwaysWriteToDisk: true,
                chunks: ['map', 'vendors']
            }),
            new HtmlWebpackHarddiskPlugin(),
            new GenerateSW({
                clientsClaim: true,
                skipWaiting: true
            }),
            new WebpackPwaManifest({
                name: 'Project Shade',
                short_name: 'Shade',
                description: 'My awesome Progressive Web App!',
                background_color: '#ffffff',
                crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
                icons: [
                  {
                    src: path.resolve('src/assets/rsg_logo.png'),
                    sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
                  }
                ]
              })
        ]
    };

    return base;
};
