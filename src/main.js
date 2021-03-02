import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import 'firebase/firestore'
// import firebase from 'firebase'
import { auth } from './store/firestore/db'
import './store/firestore/auth'
import router from './router'

auth.onAuthStateChanged(()=>{
  createApp(App)
  .use(store, router)
  .use(router)
  .mount('#app')
})
