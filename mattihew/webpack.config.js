const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = function (env, argv)
{
    const base = {
        entry: {
            index: './src/clientEntry.tsx'
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

    if (env.platform === 'server')
    {
        base.target = 'node';
        base.entry = './src/server/server.ts';
        base.output.filename = 'js/server.js';
    }
    else if (env.platform === 'web')
    {
        base.optimization = {
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
