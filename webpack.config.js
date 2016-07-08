const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    debug: true,
    recursive: true,
    entry: ['src/app'],
    target: 'web',
    output: {
        path: __dirname + '/.tmp/public',
        filename: 'bundle.min.js'
    },

    resolve: {
        root:  __dirname,
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },

    postcss: [
        autoprefixer({ browsers: [
            'Android 2.3',
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 8',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6'
        ]})
    ],

    // Add hot reloading
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body',
            filename: 'index.html'
        })
        // new webpack.optimize.UglifyJsPlugin()
    ]
};