import { createStore } from 'vuex'

export default createStore({
  state: {
    userImgPermission: false
  },
  mutations: {
    togglePermission(state, payload){
      // localStorage.removeItem('userImgPermission')
      // if (localStorage.getItem('userImgPermission')) {
          // localStorage.removeItem('userImgPermission');
          state.userImgPermission = payload;
          localStorage.setItem('userImgPermission', state.userImgPermission );
    },
    initialiseStore(state){
      if (localStorage.getItem('userImgPermission')) {
          state.userImgPermission = localStorage.getItem('userImgPermission');
      }
    }
  },
  actions: {
    togglePermission({ commit }, payload ){
      commit("togglePermission", payload)
    }
  },
  modules: {
  }
})
