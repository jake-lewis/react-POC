const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = function(env, argv) {
    const base = {
        entry: './src/server/server.ts',
        output: {
            filename: 'js/server.js',
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
        mode: 'development'
    };

    if (env.platform === 'server') {
        base.target = 'node';
    }
    else if (env.platform === 'web') {
        base.entry = './src/clientEntry.tsx';
        base.output.filename = 'js/client.[contentHash:8].js';
        base.optimization = {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        };
        base.plugins = [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                alwaysWriteToDisk: true
            }),
            new HtmlWebpackHarddiskPlugin()
        ];
    }

    return base;
};
