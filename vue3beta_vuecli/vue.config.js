const path = require('path')
const resolve = path.resolve

module.exports = {
    devServer: {
        // host: '0.0.0.0',     // default
        // port: 8080           // default
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@examples': resolve('examples'),
                '@csii/vx-mobile$': process.env.env === 'production' ? resolve('lib/@csii/vx-mobile.umd') : resolve('src/components'),
                '@csii/vx-mobile/lib': !process.env.env === 'production' ? resolve('src/components') : resolve('lib'),
                '@csii/vx-mobile/components': resolve('src/components')
            }
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            'preProcessor': 'stylus',
            'patterns': [
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
    outputDir: 'lib',          // default: dist
    productionSourceMap: false, // 生成map后缀文件，对压缩代码错误追踪调试，生产环境关闭
    css: {
        extract: true           // production set true
    }
}