<template>
  <div id="logmodal" class="login__popup__container login--popup--in">
    <div class="user__img__container">
      <img v-if="imgPermission" :src="userImg" alt="user image/icon">
      <img v-else src="../assets/user-icon.png" alt="user image/icon">
    </div>
    <h5>{{ username }} just joined the chat{{ imgPermission }}</h5>
  </div>
</template>
<script>
export default {
  name:'Logmodal',
  props:['userImg','imgPermission', 'username'],
  data(){
    return{
      userIcon: '../assets/user-icon.png'
    }
  },
  methods:{
    hideLoginPop(){
      var logPopup = document.getElementById("logmodal");
      var logPopupClasses = logPopup.classList.value;
      var classSplit = logPopupClasses.split(" ");
      // console.log(classSplit)
      if(classSplit.includes("login--popup--in", 0)){
        setTimeout(()=>{
          logPopup.classList.remove("login--popup--in");
          logPopup.classList.add("login--popup--out");
        },3500)
      }
    }
  },
  mounted(){
    this.hideLoginPop();
  }
}
</script>