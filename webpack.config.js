const webpack = require('webpack');
const webpackConfig = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/public/src',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
};
module.exports = webpackConfig;