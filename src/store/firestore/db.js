import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyAn4dd_ExnfgWaE80Yb37rDTF4VEG2ivK8",
  authDomain: "chat-chatter.netlify.app",
  projectId: "chatter-917d3",
  storageBucket: "chatter-917d3.appspot.com",
  messagingSenderId: "213432918773",
  appId: "1:213432918773:web:e03826c1f0dd79d9421bbc"
})



// utils
const db = firebaseConfig.firestore();
const auth = firebaseConfig.auth();
const dbRefObj = firebaseConfig.database().ref('messages');

export {
  db,
  auth,
  dbRefObj
}



