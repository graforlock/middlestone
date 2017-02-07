var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        frameworks: ['tap'],
        files: [
            {
                pattern: 'test-context.js', watched: false
            }
        ],

        preprocessors: {
            'test-context.js': ['webpack', 'coverage']
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

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i.e.
            noInfo: true,
            // and use stats to turn off verbose output
            stats: {
                // options i.e.
                chunks: false
            }
        },

        reporters: ['tape', 'coverage'],

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
        singleRun: false,

        plugins: [
            require('karma-webpack'),
            require('karma-tap'),
            require('karma-coverage'),
            require('karma-tape-reporter'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher')
        ]
    });
};