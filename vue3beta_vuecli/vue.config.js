const path = require('path')

module.exports = {
    pages: {
        index: {
            entry: './src/components/index.js'
        }
    },
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
    },
    // publicPath: '/'         // default
    // outputDir: 'lib',          // default: dist
    productionSourceMap: false,
    configureWebpack: config => {   // todo after vue.cofing settings
        if (process.env.NODE_ENV === 'production') {
          // 为生产环境修改配置...
        } else {
          // 为开发环境修改配置...
        }
    },
    // chainWebpack: config => {
    //     config.module
    //       .rule('vue')
    //       .use('vue-loader-v16')
    //         .loader('vue-loader-v16')
    //         .tap(options => {
    //           // 修改它的选项...
    //           return options
    //         })
    //         .end()
    //   }
}