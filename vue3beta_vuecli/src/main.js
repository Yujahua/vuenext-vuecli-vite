import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/**
 * about vue-router
 */
var app = createApp(App)

app.use(router).mount('#app')
