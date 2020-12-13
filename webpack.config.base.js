const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './index.ts'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './index.html', to: 'index.html' },
            ],
        }),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    },
};
