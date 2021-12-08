import { createApp } from 'vue'
import App from './App.vue'
import FlashMessage from '@smartweb/vue-flash-message';
import router from './router/index'
import './index.css'

createApp(App)
.use(router)
.use(FlashMessage)
.mount('#app')
