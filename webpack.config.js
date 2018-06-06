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
    entry: './src/js/friend.js',
    devServer: {
        index: 'friend.html'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module: { rules },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                drop_debugger: false,
                warnings: false
            }
        }),
        new ExtractTextPlugin('./src/style/friend.css'),
        new HtmlPlugin({
            template: './src/template/friend-template.hbs',
            filename: 'friend.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};
