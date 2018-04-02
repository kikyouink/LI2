var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/page/home/home.html',
            filename: 'index.html',
            hash: true
        }),
        new ExtractTextPlugin('style.css')
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ] 
            },
            {
                test: /\.html$/,
                use: [ {
                  loader: 'html-loader',
                  options: {
                    minimize: true
                  }
                }],
            }
        ]
    }
};