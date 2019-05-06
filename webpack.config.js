const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

/**
 * Generates a webpack config Object
 *
 * @param {{NODE_ENV: string}} env
 * @param argv
 * @returns webpack config
 */
module.exports = function (env, argv)
{
    const NODE_ENV = env.NODE_ENV || 'production';
    const base = {
        entry: {
            home: './src/homeEntry.tsx',
            map: './src/mapEntry.tsx'
        },
        output: {
            filename: 'js/[name].[contentHash:8].js',
            path: path.resolve(process.cwd(), 'dist'),
            publicPath: '/'
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
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                                name: '[name].[hash:8].[ext]'
                            }
                        }

                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts',
                                name: '[name].[hash:8].[ext]'
                            }
                        }

                    ]
                }
            ]
        },
        devServer: {
            port: 3000,
            contentBase: './dist',
            //inline: false,
            // overlay: {
            //     warning: true,
            //     errors: true
            // }
            staticOptions: {
                extensions: ['html']
            }
        },
        mode: NODE_ENV,
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
                chunks: ['home', 'vendors'],
                favicon: "./src/images/rsg_logo.png",
                meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}

            }),
            new HtmlWebpackPlugin({
                filename: 'map.html',
                template: './public/index.html',
                alwaysWriteToDisk: true,
                chunks: ['map', 'vendors'],
                favicon: "./src/images/rsg_logo.png",
                meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
            }),
            new HtmlWebpackHarddiskPlugin(),
            new GenerateSW({
                clientsClaim: true,
                skipWaiting: true
            }),
            new WebpackPwaManifest({
                filename: '[name].[hash:8].[ext]',
                name: 'Project Shade',
                short_name: 'Shade',
                description: 'My awesome Progressive Web App!',
                theme_color: '#000',
                background_color: '#000',
                crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
                icons: [
                    {
                        src: path.resolve('src/images/rsg_logo.png'),
                        sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
                        destination: 'icons'
                    }
                ]
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
                "process.env.PUBLIC_URL": JSON.stringify('')
            })
        ]
    };

    return base;
};
