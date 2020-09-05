## vuenext-vitejs实践
（未开启）
### 源链接
- [sitejs](https://github.com/vitejs/vite)

## vuenext-vuecli实践
（进行中）
### 源链接

- [vuenext](https://github.com/vuejs/vue-next)

- [vue-cli-plugin-vue-next](https://github.com/vuejs/vue-cli-plugin-vue-next)

- [vue-loader-next](https://github.com/vuejs/vue-loader/tree/next)

## Vue CLI

As of v4.5.0, `vue-cli` now provides built-in option to choose Vue 3 preset when creating a new project.

```sh
npm install @vue/cli

vue create <yourproject> 
```

**Note**:

Before use vue cli command run `npm run serve`, it looks like we have to download `vue-loader` at tag version `v16.0.0-beta.3`
([click me](https://github.com/vuejs/vue-loader/tree/v16.0.0-beta.3)) which `@vue/cli-service` dependency. In fact, that's not a correct answer. We'd better use the branch `next` ([click me here!](https://github.com/vuejs/vue-loader/tree/next)) instead.

Secondly, at the right version, run `npm install --production `, `npm run build` and then put the code dir `./dist` to your project modules, like `vuenext-vuecli-vite`'s modules. It is in this path: `./node_modules/@vue/cli-service/node_modules`. We should create a new folrder named `vue-load-v16` to put them.

But that's still a problem, if run `npm install` next time, the folder `vue-load-v16` deleted. To solve this problem, I publish a npm resource to save the `vue-loader-v16`.
install
```sh
npm i vue-loader-v16
```
Link is [vue-load-v16](https://www.npmjs.com/package/vue-loader-v16)

> At last: I hear that all the issues caused by npm, it's low version made it，so I delete my v16 dependency in the project，upgrade npm version to the newest release，updete modules，and this time run server is ok.