<template>
  <div id="login" class="container login__container">
    <!-- <div class="logo">Chatter</div> -->
    <div class="logo__container">
      <img class="logo" src="../assets/chatter-logo.png" alt="chatter logo img">
    </div>
    <div class="info__container">
    <h2 class="login__header">A place to speak your mind and connect</h2>
      <p class="login__more__info">Chatter is a free open public chat app.</p>
    </div>
      <div class="permission__checkbox__container">
      <div class="button-cover">
        <div class="button b2" id="button-11">
          <input id="userImgPermissionCheckbox" type="checkbox" @click="userPermissionToggler" class="checkbox">
          <div class="knobs">
            <span></span>
          </div>
          <div class="layer"></div>
        </div>
      </div>
        <p class="permission__checkbox__txt">Use your gmail photo?</p>
    </div>
      <button class="login__btn" @click="loginSubmit">
        <span class="login__btn__icon"><img class="login__btn__icon__img" src="../assets/google-icon.png" alt="google icon"> </span>
        <span class="login__btn__txt">Login with google</span>
      </button>
  </div>
  <div class="mockup">
    <img src="../assets/mockup.png" alt="mockup image">
  </div>
</template>

<script>
import firebase from 'firebase'
import store from '../store/index';

export default {
  // vuexstore,
  name:'Login',
  data(){
    return{
      user:firebase.auth().currentUser,
      // imgPermission: store.state.userImgPermission
    }
  },
  methods:{
    useImg(){
      store.commit("imgPermissionToggle");
    },
    loginSubmit(){
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider).catch(error => alert(error));
    },
    userPermissionToggler(){
      const checkBoxState = document.getElementById('userImgPermissionCheckbox').checked;
      this.$store.dispatch('togglePermission', checkBoxState);
      // console.log(checkBox);
    }
  }
}
</script>
<style lang="scss">

</style>
