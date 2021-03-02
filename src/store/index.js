import { createStore } from 'vuex'
// import firebase from '@/firebase';
import {db} from '../store/firestore/db';
import firebase from 'firebase';

export default createStore({
  state: {
    userImgPermission: false,
    userProfile: {},
    uid:'',
    loggedIn: false
  },
  getters: {
    userProfile: ({userProfile}) => userProfile,
    loggedIn: ({loggedIn}) => loggedIn,
    userImgPermission: ({userImgPermission}) => userImgPermission,
  },
  mutations: {
    togglePermission(state, payload){
          state.userImgPermission = payload;
          localStorage.setItem('userImgPermission', state.userImgPermission );
    },
    initialiseStore(state){
      if (localStorage.getItem('userImgPermission')) {
          state.userImgPermission = localStorage.getItem('userImgPermission');
      }
    },
    async USER_DETAILS(state, userProfile) {
      try{
        state.loggedIn = true;    
        state.userProfile ={
          name: userProfile.displayName,
          picture: userProfile.photoURL
        };
      
        // console.log(state.userProfile)
      }catch(error){
        console.log(error)
      }
    },
    LOGOUT(state) {
      state.loggedIn = false;
      state.userProfile = {};
    }
  },
  actions: {
    
    async login(store) {
        if (store.state.loggedIn) 
          return;
    
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
          await firebase.auth().signInWithPopup(provider);
          await db.collection("LoggedUsers").add({
            name: store.state.userProfile.name
            ,picUrl: store.state.userProfile.picture});
          await location.reload();
        } catch(error) {
          console.log(error);
        }
      },
      async logout(store) {
        try {
          await firebase.auth().signOut();
          await db.collection("LoggedUsers").doc(store.state.uid).delete();
          await localStorage.removeItem('token');
          store.state.uid = '';
          await location.reload();
        } catch(error) {
          console.log(error);
        }
      },togglePermission({ commit }, payload ){
        commit("togglePermission", payload)
      },
  },
  modules: {
  }
})
