# vue3next

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Project depend：
- [vue-router-next](https://github.com/vuejs/vue-router-next): 路由

- [vuex](https://github.com/vuejs/vuex): 状态管理

- [jest](https://github.com/facebook/jest): 前端自动化测试

- [@vue/test-utils @vue/server-test-utils](https://github.com/vuejs/vue-test-utils): vue测试


- [sinon](https://github.com/sinonjs/sinon): 测试解耦工具


    
    

## 目前遇到的问题： vue-next安装

> problem

Vue create project，run serve运行出错，`vue-loader-v16不存在`，

其次，如果直接修改依赖vue-loader名字为vue-loader-v16解决了上一个报错以后，会继续提示vue-template-compiler的问题

> solve

最终解决办法，追踪vue-loader-v16版本，查找到vue-loader的tag版本推荐v16.0.0-beta3可用

于是，download当前tag，在此基础上build生成dist目录，整包放置到node_modules依赖下面，文件夹命名vue-loader-v16

在生成v16之前，做了版本上的一点错误修复（修复ts代码类型断言错误）

同时对新增本地tag，命名: v16.0.0-beta.3.1

> 后来发现，以上方式不合适，于是更改为，从vue-loader的next分支更新代码，打成依赖包放置在npm资源上

提供以下dev环境安装（非官方，仅供个人学习）

- [vue-loader-v16](https://www.npmjs.com/package/vue-loader-v16)

```sh
npm i vue-loader-v16
```