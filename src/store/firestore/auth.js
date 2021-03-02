import { auth } from './db'
// import firebaseConfig from './db';
import store from '../index';

auth.onAuthStateChanged(function(user) {
  if (user) {
    store.commit('USER_DETAILS', user);
    // console.log("login successful")
  } else {
    store.commit('LOGOUT');
  }
});