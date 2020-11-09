import { createApp } from 'vue'
import App from './App.vue'


import router from '../../notepad/router' // <---

createApp(App).use(router).mount('#app')
