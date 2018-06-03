let webpack = require('webpack');
let HtmlPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let rules = require('./webpack.config.rules')();
let path = require('path');

rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
    })
});

module.exports = {
    entry: {
        friend: './src/js/friend.js'
    },
    devServer: {
        friend: 'friend.html'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist')
    },
    devtool: 'source-map',
    module: { rules },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                drop_debugger: false,
                warnings: false
            }
        }),
        new ExtractTextPlugin('./style/friend.css'),
        new HtmlPlugin({
            title: 'Friend',
            template: './src/template/friend-template.hbs',
            filename: 'friend.html',
            chunks: ['friend']
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};
