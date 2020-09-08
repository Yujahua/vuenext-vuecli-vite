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
                // path.resolve(__dirname, './node_modules/nib/lib/nib/vendor'),
                // path.resolve(__dirname, './node_modules/nib/lib/nib/gradients'),
                // path.resolve(__dirname, './node_modules/nib/lib/nib/flex'),

                path.resolve(__dirname, './src/components/_style/global.styl'),
                path.resolve(__dirname, './src/components/_style/mixin/util.styl'),

                // this useage is error, for wrong order.
                // path.resolve(__dirname, './src/components/_style/mixin/*.styl'),

                path.resolve(__dirname, './src/components/_style/mixin/theme.variable.styl'),
                path.resolve(__dirname, './src/components/_style/mixin/theme.basic.styl'),
                path.resolve(__dirname, './src/components/_style/mixin/theme.components.styl'),
                
                
                
            ]
        }
    }
}