var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        frameworks: ['tap'],
        files: [
            {
                pattern: 'test-context.js', watched: false
            }
        ],

        exclude: [],

        preprocessors: {
            'test-context.js': ['webpack']
        },

        webpack: {
            node : {
                fs: 'empty'
            },
            module: {
                loaders: [
                    {
                        test: /\.js/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015']
                        }
                    }
                ]
            }

        },

        reporters: ['progress'],

        coverageReporter: {
            type: 'text'
        },

        browsers: ['Chrome_no_sandbox'],

        customLaunchers: {
            Chrome_no_sandbox: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        captureConsole: true,
        port: 9876,
        colors: true,
        singleRun: true,

        plugins: [
            require('karma-webpack'),
            require('karma-tap'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher')
        ]
    });
};