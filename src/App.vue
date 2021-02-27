<template>
  <Background></Background>
  <ChatView v-if="user" :uid="user.uid" :username="user.displayName" :picurl="user.photoURL"></ChatView>
  <LoginForm v-else></LoginForm>
</template>

<script>
import { reactive, ref} from 'vue';
import LoginForm from './view/login'
import ChatView from './view/chat';
import Background from './components/bg';
import firebase from 'firebase';

export default {
  name: 'App',
  beforeCreate(){
    this.$store.commit('initialiseStore');
  },
  components: {
    LoginForm,
    ChatView,
    Background
  },
  setup(){
    // const store = useStore();
    const userNameInput = ref("");
    const state = reactive({
      username:"",
      message:[]
    })

    return{
      userNameInput,
      state,
      user:firebase.auth().currentUser
    }
  }
}
</script>

<style lang="scss">
@import './styles/main.scss';
  
</style>
