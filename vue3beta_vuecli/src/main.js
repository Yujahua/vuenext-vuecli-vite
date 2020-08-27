import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/**
 * about vue-router
 */
console.dir(router)
createApp(App).use(router).mount('#app')
