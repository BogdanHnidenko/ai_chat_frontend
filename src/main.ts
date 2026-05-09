import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'
import getStart from './modules/getStart'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const hideSplash = () => {
  const splash = document.getElementById('splash')
  if (!splash) return
  splash.classList.add('hidden')
  setTimeout(() => splash.remove(), 400)
}

Promise.all([
  getStart(),
  new Promise(resolve => setTimeout(resolve, 1000)),
]).then(() => {
  app.mount('#app')
  hideSplash()
})
