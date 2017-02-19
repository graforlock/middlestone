var webpack = require('webpack');
    path = require('path'),
    argv = require('yargs').argv,
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var libraryName = 'thru',
    sourceDir = './src',
    distDir = './dist',
    sourceEntryPoint = './src/index.js';

var plugins = [new BrowserSyncPlugin({

    host: 'localhost',
    port: 3000,
    server: { baseDir: ['dist'] }
})];

if (argv.build == 'prod') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
}

module.exports = {
    entry: {
        '/': './src/index.js'
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(distDir),
        filename: '[name]index.js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components|dist)/
            }
        ]
    },
    resolve: {
        extensions: ['.js']
    },
    plugins: plugins
};