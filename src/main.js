import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import 'firebase/firestore';
import firebase from 'firebase'
import { auth } from './store/firestore/db'

auth.onAuthStateChanged(()=>{
  createApp(App).use(store).mount('#app')
})
