const path = require('path')

module.exports = {
    devServer: {
        // host: '0.0.0.0',     // default
        // port: 8080           // default
    },
    pluginOptions: {
        'style-resources-loader': {
            'preProcessor': 'stylus',
            'patterns': [
                path.resolve(__dirname, './src/components/_style/*.styl'),
                path.resolve(__dirname, './src/components/_style/mixin/*.styl')
            ]
        }
    }
}