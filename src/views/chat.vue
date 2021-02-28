<template>
    <div id="chat" class="component__container chat__container glass__bg">
      <!-- {{usrImgPerm}} -->
      <!-- 'userImg','imgPermission', 'picurl', 'username' -->
      <LoginPopup :userImg="userImgUrl" :imgPermission="usrImgPerm" :username="username"></LoginPopup>
        <header class="chat__header">
          <div class="chat__header__user__info">
          <img :src="userImgUrl" alt="user image">
            <h3 class="chat__header__user__info__name">{{username}}</h3>
          </div>
          <button class="signout__btn" @click="signOut"><span>Logout</span><img src="../assets/logout-ico.svg" alt="logout button icon"></button>
          <!-- <ul  v-for="user in activeUsers" :key="user.id">
            <li class="test"> {{user}}</li>
          </ul> -->
        </header>
        <section class="chat__box component__container__chatbox">
          <!-- chat messages -->
          <ul>
            <li v-for="messages in messageList" :key="messages.key" :class="(messages.username == username ? 'message current--user' : 'message')"><span class="current--user--name message--name">{{messages.username}} <img :class="(messages.username == username ? 'hide--image' : 'usrimg')" :src="picurl" alt="senders pic"> </span><br/>{{messages.content}}</li>
          </ul>
        </section>
        <footer class="chat__footer">
          <form class="chat__footer__form" @submit.prevent="sendMessage">
            <input class="chatbox__msg__input" type="text" v-model="inputMessage"  placeholder="Your message"/>
            <button class="chatbox__msg__submit" type="submit" value="Send"><img src="../assets/send-ico.svg" alt="send icon"></button>
          </form>
        </footer>
    </div>
</template>

<script>
  // import { ref} from 'vue';
  import firebase from 'firebase';
  import {db, dbRefObj} from '../store/firestore/db';
  import LoginPopup from '../components/userLogginPopup';
    export default {
        el: 'Chat',
        props:['username', 'picurl', 'uid'],
        beforeCreate(){
          // if(db.collection("LoggedUsers").where('name', '!=',this.username)){
          //   db.collection("LoggedUsers").add({name: this.username});
          // }
           db.collection("LoggedUsers").where('name', '==',this.username).get()
            .then((querySnapshot) =>{
              var curtLogUsrId = '';
              querySnapshot.forEach((doc)=>{
                curtLogUsrId = doc.id;
                // initializing user name id to firestore
                // var curtLogUsrId = '';
                  this.currentLogUsrId = curtLogUsrId; 
                  // console.log(curtLogUsrId);
                db.collection("LoggedUsers").doc(this.currentLogUsrId).get().then((doc) => {
                  this.activeUsers.push(doc.data().name);
                  // console.log(this.activeUsers);
                });
              })
            }).then(()=>{
              if(this.currentLogUsrId.length < 1){
                db.collection("LoggedUsers").add({name: this.username});
                // console.log(this.currentLogUsrId.length, this.currentLogUsrId);
              }
            })
            .catch((err)=>{
              console.log(err)
            });
        },
        components:{
          LoginPopup,
        },
        data(){
          return{
            inputMessage:'',
            messageList:[],
            loggedUser:'',
            usrImgPerm:  this.$store.state.userImgPermission,
            userImgUrl: this.picurl,
            firebaseUserRef: db.collection("LoggedUsers").doc("name"),
            currentLogUsrId: '',
            activeUsers:[],
          }
        },
        methods:{
          sendMessage(e){
           e.preventDefault();
           const newMessage = {
              message: this.inputMessage,
              username: this.username,
              uid : this.uid
           }
           if(this.inputMessage.value !=""||this.inputMessage.value != null){
              // dbRefObj.on('value', snap => console.log(snap.val()));
              // dbRefObj.push({newMessage})
              dbRefObj.push({newMessage})
              this.inputMessage="";
             return;
            }
          },
          signOut(){
            firebase
            .auth()
            .signOut()
            .then(()=>{
              db.collection("LoggedUsers").doc(this.currentLogUsrId).delete();
              // this.currentLogUsrId = '';
            })
            .then(() => {
              localStorage.removeItem('token');
              document.location.href = "/";
              })
            .catch(err => alert(err.message));
          }
        },
        mounted(){
          // var vm = this;
          // this.firestoreUsrNameId();
          dbRefObj.on('value',snapshot=>{
            const data = snapshot.val();
            let messageCollection =[];
            Object.keys(data).forEach(key=>{
              messageCollection.push({
                id: key,
                username: data[key].newMessage.username,
                content: data[key].newMessage.message
              })
            })
            this.messageList = messageCollection;
          }); 
          // this.addToActiveUsr();
          // console.log(this.currentLogUsrId)
        }
        
    }
</script>

<style lang="scss">
</style>