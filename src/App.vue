<template>
  <Background></Background>
  <ChatView v-if="user" 
  :uid="user.uid" 
  :logout="logout"
  :username="user.displayName" 
  :picurl="user.photoURL"></ChatView>
  <LoginForm :login="login" v-else></LoginForm>
</template>

<script>
import { reactive, ref} from 'vue';
import { mapActions, mapGetters } from 'vuex';

import LoginForm from './views/login'
import ChatView from './views/chat';
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
  computed: {
      ...mapGetters({
        userProfile: 'userProfile',
        loggedIn: 'loggedIn'
      })
  },
  methods:{
    ...mapActions({
        login: 'login',
        logout: 'logout'
      })
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
