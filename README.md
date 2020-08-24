## vuenext-vitejs实践
（未开启）
### 源链接
- [sitejs](https://github.com/vitejs/vite)

## vuenext-vuecli实践
（进行中）
### 源链接

- [vuenext](https://github.com/vuejs/vue-next)

- [vue-cli-plugin-vue-next](https://github.com/vuejs/vue-cli-plugin-vue-next)

## Vue CLI

As of v4.5.0, `vue-cli` now provides built-in option to choose Vue 3 preset when creating a new project.

```sh
npm install @vue/cli

vue create <yourproject> 
```

**Note**:

Before use vue cli command run `npm run serve`, maybe you should download `vue-loader` at tag version `v16.0.0-beta.3`
([click me](https://github.com/vuejs/vue-loader/tree/v16.0.0-beta.3)).

Secondly, at the version, run `npm run build` and then put the code all to your project modules, like `vuenext-vuecli-vite`'s modules. It is at this path: `./node_modules`. You should create a new folrder named as `vue-load-v16` to put them.

But when you run, may get the error like: 
```log
> tsc

src/index.ts:91:19 - error TS2345: Argument of type 'SyntaxError | CompilerError' is not assignable to parameter of type 'CompilerError'.
  Property 'code' is missing in type 'SyntaxError' but required in type 'CompilerError'.

91       formatError(err, source, resourcePath)
                     ~~~

  node_modules/@vue/compiler-core/dist/compiler-core.d.ts:162:5
    162     code: number;
            ~~~~
    'code' is declared here.


Found 1 error.
```
you should fix it at `./src/index.ts`, import `CompilerError` from '@vue/compiler-sfc', then assert the argument: `err` of function `formatError`, like this: 

`formatError(<CompilerError>err, source, resourcePath)`