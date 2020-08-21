import Vue from 'vue'
import WebPrint from '../plugins/web-print' 

const app = Vue.createApp({})

app.config.devtools = true;
app.errorHandler = (err, vm, info) => {
}
app.warnHandler = (msg, vm, trace) => {
}
// This can replace Vue 2.x `Vue.prototype` extending
app.config.globalProperties.$http = () => {}
// Except all native HTML and SVG tags, others can use blew,
// then Vue won't throw warnings link `Unknown custom element`
app.config.isCustomElement = tag => tag.startsWith('ico-')
// useage, like app.mixin({extend: {...attrs})
app.config.optionMergeStrategies.extend = (parent, child, vm) => {
    return Object.assign(parent, child);
}
// Register component
app.component('my-component', {
   /** */ 
})
// Retrieve component
const MyComponent = app.component('my-component', {})
// Register directive
app.directive('my-directive', {
    /** */
    beforeMount() {},
    mounted(el) {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {}
})
// register function directive
app.directive('my-directive', () => {
    /** this will be called as hooks: `mounted` and `updated`*/
})
// Retrieve the directive definition if registered
const myDirective = app.directive('my-directive')
// Global API, website: https://v3.vuejs.org/api/global-api.html
// plugins 
app.use(WebPrint)
app.mount('#app')

