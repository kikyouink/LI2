var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var  UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    entry:'./src/app/core.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
    },
    devServer: {
        open: true
    },
    mode:'development',
    optimization: {
        minimize: false
        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: 'vendor',
        //             chunks: 'all'
        //         }
        //     }
        // }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/page/home/home.html',
            filename: 'index.html',
            hash: true
        }),
        new UglifyJSPlugin({
            uglifyOptions: {
                warning: "verbose",
                ecma: 6,
                beautify: false,
                compress: false,
                comments: false,
                mangle: false,
                toplevel: false,
                keep_classnames: true,
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin('style.css')
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        }, 
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'images/'
                    }
                  },
                ]
            },
            {
                test: /\.html$/,
                use: [ 
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ],
            }
        ]
    }
};