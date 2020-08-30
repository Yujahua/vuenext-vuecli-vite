import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import textillate from './plugins/vue-textillate'

/**
 * about vue-router
 */
var app = createApp(App)

app
.use(router)
.use(textillate)
.mount('#app')
