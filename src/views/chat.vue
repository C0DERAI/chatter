<template>
    <div id="chat" class="component__container chat__container neomorphism--light">
      <!-- {{usrImgPerm}} -->
      <!-- 'userImg','imgPermission', 'picurl', 'username' -->
      <LoginPopup :userImg="userImgUrl" :imgPermission="usrImgPerm" :username="username"></LoginPopup>
        <header class="chat__header neomorphism">
          <!-- {{this.$store.state.uid}} -->
          <div class="chat__header__user__info">
            <img class="chat__header__user__info__img" :src="userImgUrl" alt="user image">
            <h3 class="chat__header__user__info__name">{{username}}</h3>
          </div>
          <button class="signout__btn" @click="logout"><img src="../assets/power-icon.svg" alt="logout button icon"></button>
          <!-- <ul  v-for="user in activeUsers" :key="user.id">
            <li class="test"> {{user}}</li>
          </ul> -->
        </header>
        <section class="chat__box component__container__chatbox">
          <!-- chat messages -->
          <ul>
            <li v-for="messages in messageList" :key="messages.key" :class="(messages.username == username ? 'message current--user neomorphism message--in' : 'message neomorphism msg--other message--in')">
              <div class="msg--content--txt">
                <span v-if="messages.username == username " class="current--user--name message--name">Me</span>
                <span v-else class="current--user--name message--name">{{messages.username}}</span>
                <br/>
                <span class="message--txt">{{messages.content}}</span>
                <div class="message--timestamp">
                  <span class="message--timestamp--time">{{messages.dateStamp}}</span>
                  <span class="message--timestamp--date">{{messages.timeStamp}}</span>
                </div>
              </div>
              <img :class="(messages.username == username ? 'hide--img' : 'msg--usr--img')" :src="messages.usrImgUrl" alt="user image">
            </li>
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
  // import firebase from 'firebase';
  import {db, dbRefObj} from '../store/firestore/db';
  import LoginPopup from '../components/userLogginPopup';
    export default {
        el: 'Chat',
        props:['username', 'picurl', 'uid', 'logout'],
        beforeCreate(){
          // if(db.collection("LoggedUsers").where('name', '!=',this.username)){
          //   db.collection("LoggedUsers").add({name: this.username});
          // }
           db.collection("LoggedUsers").where('name', '==',this.$store.state.userProfile.name).get()
            .then((querySnapshot) =>{
              var curtLogUsrId = '';
              querySnapshot.forEach((doc)=>{
                curtLogUsrId = doc.id;
                // initializing user name id to firestore
                // var curtLogUsrId = '';
                  this.currentLogUsrId = curtLogUsrId; 
                  this.$store.state.uid = curtLogUsrId;
                  // console.log(curtLogUsrId);
                // db.collection("LoggedUsers").doc(this.currentLogUsrId).get().then((doc) => {
                //   this.activeUsers.push(doc.data().name);
                //   // console.log(this.activeUsers);
                // });
              })
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
            userImgUrl: this.$store.state.userProfile.picture,
            usrImgPerm:  this.$store.state.userImgPermission,
            firebaseUserRef: db.collection("LoggedUsers").doc("name"),
            currentLogUsrId: '',
            activeUsers:[],
            // timeStamp:'',
            // dateStamp:new Date().toLocaleDateString()
          }
        },
        methods:{
          sendMessage(e){
           e.preventDefault();
           const currentTime = ()=>{
                  var today = new Date();
              var timeStamp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              return timeStamp;
           }
           const newMessage = {
              message: this.inputMessage,
              username: this.username,
              uid : this.uid,
              msgUsrImg:'',
              timeStamp: currentTime(),
              dateStamp: new Date().toLocaleDateString()
           }
           if(this.inputMessage !==""){
              // dbRefObj.on('value', snap => console.log(snap.val()));
              // dbRefObj.push({newMessage})
               db.collection("LoggedUsers").where('name', '==', newMessage.username).get()
                .then((querySnapshot) =>{
                  var curtLogUsrId = '';
                  querySnapshot.forEach((doc)=>{
                    curtLogUsrId = doc.id;
                    db.collection("LoggedUsers").doc(curtLogUsrId)
                    .get()
                    .then((doc) => {
                      if(doc.exists){
                        newMessage.msgUsrImg = doc.data().picUrl;
                        // this.getDateTime()
                      }else{
                        console.log("No data found!")
                      }
                    })
                    .then(()=>{
                      dbRefObj.push({newMessage})
                      // console.log(newMessage.msgUsrImg)
                    })
                    .then(()=>{
                      this.inputMessage="";
                      newMessage.dateStamp="";
                      newMessage.timeStamp="";
                    })
                    .catch((err)=>{console.log("Error: ", err);})
                      // this.currentLogUsrId = curtLogUsrId; 
                      // this.$store.state.uid = curtLogUsrId;
                  })
                })
                .catch((err)=>{
                  console.log(err)
                });
              
             return;
            }else if(this.inputMessage === ""){
              alert('Please type in a message!')
            }
          },
         
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
                content: data[key].newMessage.message,
                usrImgUrl: data[key].newMessage.msgUsrImg,
                timeStamp: data[key].newMessage.timeStamp,
                dateStamp: data[key].newMessage.dateStamp
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