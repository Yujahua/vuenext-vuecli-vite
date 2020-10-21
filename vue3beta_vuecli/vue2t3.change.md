## vue2 to vue3 process change points

1. `<template>` cannot be keyed. Place the key on real elements instead  vue/no-template-key


2. `.native` modifier on `v-on` directive is deprecated (vue/no-deprecated-v-on-native-modifier).

Solution: use `enter`

Docs: [no-deprecated-v-on-native-modifier](https://eslint.vuejs.org/rules/no-deprecated-v-on-native-modifier.html)

3. `.sync` modifier on 'v-bind' directive is deprecated. Use 'v-model:propName' instead

More: Inline templates attributes are deprecated.

4. `$scopedSlots` attributes are deprecated, use `$slots` instead.

Solution: use `$slots` instead.

5. `slot` attributes are deprecated (vue/no-deprecated-slot-attribute).

Solution: As define a named slot, you need a `slot` tag includes the context you'd like pass on, and `name` attribute sometimes is needed. 
To provide content to named slots, we can use the v-slot directive on a `<template>`, providing the name of the slot as v-slot‘s argument, eg: `v-solt:header`

Docs: [solt](https://cn.vuejs.org/v2/guide/components-slots.html)

6. `slot-scope` are deprecated (vue/no-deprecated-slot-scope-attribute).

Solution: use `v-slot` attribute instead.

Docs: [vue/no-deprecated-slot-scope-attribute](https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-deprecated-v-bind-sync.md)

7. [Not belong to other changes]

ant/element-ui form validate style [async validator](https://github.com/yiminghe/async-validator) (mobild form validation should keep pace with mobile )

Solution: unsolved problem

8. 