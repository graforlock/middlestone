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
})], outputFile;

if (argv.build == 'prod') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName.toLowerCase() + '.umd.min.js';
} else {
    outputFile = libraryName.toLowerCase() + '.umd.js';
}


module.exports = {
    entry: sourceEntryPoint,
    devtool: 'source-map',
    output: {
        path: path.resolve(distDir),
        filename: outputFile,
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