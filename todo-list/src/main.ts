// src/main.ts
console.log('main.ts loaded')
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'

console.log('Before creating app')

const app = createApp(App)

console.log('Before using router')
app.use(router)

console.log('Before using store')
app.use(createPinia())

console.log('Before mounting app')
app.mount('#app')
