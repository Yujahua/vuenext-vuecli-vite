// If you want to use vuex, uncomment two lines below

import { createApp } from 'vue'
// import {store} from './store'
import App from './App.vue'
import router from './router'

var app = createApp(App)

app
// .use(store)
.use(router)
.mount('#app')
