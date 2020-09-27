# 9.7 plan

1. 面试：时间是10：00/10：30，三个人                                    [done 两个未接通，一个未通过]

    （一个光大、一个资源储备，一个vx）

2. vue.config 脚手架配置和loader传递参数                                [done 目前只处理了css]

    参考资料：
    
    https://cli.vuejs.org/zh/guide/css.html#向预处理器-loader-传递选项

    https://github.com/webpack-contrib/stylus-loader


3. stylus文件的引用和stylus-loader使用                                  [done 使用`style-resources-loader`对css资源处理，配置是在vue.config.js]

    参考资料：

4. 配置本地的组件解析@csii/vx-mobile

5. rollup打包

# 9.8 plan

6. node_modules中cli-service做了哪些事，从中总结如何过渡vx2 mobile原型      [done 放弃了旧原型拆开自己写的脚手架混乱不堪的问题，使用官方提供的cli]

7. vue-loader和vue-loader-v16的关系，如何使用vue-loader-v16

# 9.9 plan

8. vuex的使用                                                           [done 学习了概要部分]

9. vue-textillate作为插件使用

    备注：考虑到已经花了很多时间，研究jQuery的源码，目前来看，手机端zepto /zæp'təʊ/更实用一些，而vue-textillate插件目前最好也能做成官方推荐
方便ts推导的模式，函数式useTextillate此类，或者使用provide和inject的存取方式

10. webpack/vue-cli插件打包发布，@csii/vx-mobile

11. postcss补全插件的简化版，只对兼容浏览器写法补全                             [done 目前注释掉了，只用到了插件对px到rem的转换]

# 9.10 plan

12. vuex在vx4 mobile中应用                                                 [done 基本上没什么作用]

    Flux框架，Redux框架在reactjs中的作用

13. js Promise

14. webpack config

    [small piece case](https://github.com/Yujahua/vuex/blob/4.0/examples/webpack.config.js)

14. 发布vue-textillate github

15. 发布vue-textillate npm

# 9.11 plan

16. 面试候选人贾志鹏                                                        [done 面试通过]

17. 作为@csii/vx-mobile打包发布，可能需要一些配置，可以参照vx4-mobile-components component-api混合api原型中的@csii/vx-mobile

# 9.14 plan

18. 了解打好的包，被引入时@csii/vx-mobile/

# 9.22 plan

19. 使用vue-cli的方式对单组件打包

20. 对多组件打包

`https://cli.vuejs.org/zh/guide/build-targets.html#构建目标`