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

---

## Project Core Dependencies：
- [vue-router-next](https://github.com/vuejs/vue-router-next): vue 3 router

- [vuex](https://github.com/vuejs/vuex): import not yet

## Project Test Dependencies

- [jest](https://github.com/facebook/jest): web automated testing

    `npm install jest -g` install jest global，run command `jest --init`

- [@vue/test-utils @vue/server-test-utils](https://github.com/vuejs/vue-test-utils): vue testing


- [sinon](https://github.com/sinonjs/sinon): testing decoupling tool

## Project dev use

- [stylus](https://stylus.bootcss.com/): css preprocessor

    `npm i stylus stylus-loader --save-dev`

## Npm links

- [vue-router-next](https://www.npmjs.com/package/vue-router/v/4.0.0-beta.7)

- [@vue/cli-plugin-router](https://www.npmjs.com/package/@vue/cli-plugin-router): vue-cli (EN: command-line interface) to manage router

## Issues have been solved： vue-next-vuecli install

> problem

After creat a vue 3 project, use vue-cli: `vue create project`. when I run `npm run serve` to run a serve, it throws error `vue-loader-v16 does not exsits`.

> solve

Finally，by tracing the verison of vue-loader，I find out vue-loader's new tag verison, and by the occured error message before I guess v16.0.0-beta3 can stable.
So，I download the tag，based it to build the dist directory，and put the package into the node_modules，named as `vue-loader-v16`

Before building it, also I modified in the version a little (resolve ts code's assert lost error)

At the same time add a tag in my local git, named: v16.0.0-beta.3.1。

> But after then I find it can not be that way to solve the problem. When I use package module， I should fix it every time. So I deceied change the way that，update it from npm. SO I update vue-loader'next branch code，and build it put away on the npm.

provide dev install below（Non-finicial，just for private studing）

- [vue-loader-v16](https://www.npmjs.com/package/vue-loader-v16)

```sh
npm i vue-loader-v16
```
> At last: I hear that all the issues caused by npm, it's low version made it，so I delete my v16 dependency in the project，upgrade npm version to the newest release，updete modules，and this time run server is ok.