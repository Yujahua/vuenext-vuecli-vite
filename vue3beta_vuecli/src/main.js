// If you want to use vuex, uncomment two lines below

import { createApp } from 'vue'
// import {store} from './store'
import App from './App.vue'
import router from './router'
import textillate from './plugins/vue-textillate'

var app = createApp(App)

app
// .use(store)
.use(router)
.use(textillate)
.mount('#app')
