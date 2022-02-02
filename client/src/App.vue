<template>
  <v-app>
    <div v-if="loggedIn">
      <footer>
        <span
          ><router-link class="nav" to="/Feed"
            ><font-awesome-icon icon="home" /></router-link
        ></span>
        <span
          ><router-link class="nav" to="/Search"
            ><font-awesome-icon icon="search" /></router-link
        ></span>
        <span
          ><router-link to="/Jam"
            ><img src="./assets/icon.jpg" alt="jam" /></router-link
        ></span>
      </footer>
    </div>
    <main role="main">
      <router-view />
    </main>
  </v-app>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000/api/";
export default {
  name: "App",
  data() {
    return {
      loggedIn: false,
    };
  },


  async mounted() {
    const vm = this;
    axios
      .get("user")
      .then(function () {
      vm.$router.push("/feed").catch(()=>{});
      vm.loggedIn = true;
      })
      .catch(function (error) {
     //   console.log(error.response.status); // 401
     //   console.log(error.response.data.error); //Please Authenticate or whatever returned from server
        if (error.response.status == 401) {
          vm.$router.push("/login").catch(()=>{});
        }
      });
  },
};
</script>

<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  --border: #eeeeee;
}

* {
  box-sizing: border-box;
  padding: none;
  margin: none;
  font-family: sans-serif;
}

hr.solid {
  border: 1px solid rgb(0, 0, 0);
}

header {
  top: 0;
  z-index: 1;
  position: fixed;
  background-color: #fff;
  width: 100%;
}

.headerTop {
  display: flex;
  align-items: center;
  height: 50px;
  justify-content: space-between;
  padding: 15px 10px;
}
.headerTop > * {
  width: 60%;
}
.headerTopLogo img {
  max-width: 80%;
}
.headerTopIcons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.headerTopIcons i {
  margin: 0px 8px;
  align-content: center;
}
.headerTopIcons img {
  display: block;
  margin: auto;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: -10px;
}
.posts {
  margin-bottom: 60px;
}
.postHeader {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
}
.postHeader img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}
.postUser {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
}
.postContent {
  max-width: 100%;
  max-height: 500px;
  overflow: hidden;
  position: relative;
}
.postContentControl {
  display: flex;
  position: absolute;
  bottom: 10px;
  left: 5px;
  z-index: 95;
  width: 88%;
  height: 24px;
}
.postContent img {
  height: 200px;
  width: 100%;
  max-width: 400px;
  object-fit: cover;
}
.postText {
  padding: 0px 10px;
}
.postIcons {
  display: flex;
  align-items: center;
  padding: 5px 10px;
}

.postIcons i {
  margin: 0px 10px;
}
.postIcons i:first-child {
  margin-left: 5px;
}

.postIcons img {
  width: 25px;
  height: 25px;
  margin-top: 2px;
  margin-right: -4px;
}
.directJam {
  margin-left: auto;
}
.likeCounter span {
  margin-left: 10px;
}
.username {
  font-weight: 700;
  display: inline-block;
  margin-right: 5px;
  margin-top: 5px;
}
.hashtag {
  color: rgb(62, 62, 201);
}
footer {
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  inset: auto auto 0 auto;
  width: 100%;
  background: #fff;
  z-index: 100;
}
.nav {
  color: #333;
  align-items: center;
}
footer img {
  width: 32px;
  height: 32px;
  margin-top: -8px;
}

footer span {
  width: 32px;
  text-align: center;
}

.postComment {
  display: flex;
  align-items: center;
  padding: 0px 10px;
  margin-bottom: 10px;
  margin-top: 5px;
}
.postComment img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}
.postCommentText {
  border: none;
  width: 240px;
}
.postTime {
  color: white;
  font-weight: 800;
  font-size: 8px;
  width: 6%;
  text-align: end;
  white-space: nowrap;
  margin-bottom: 20px;
}

.Title {
  font-weight: 700;
  margin: 15px;
}

.recordingContentHeader {
  font-size: 14px;
  margin: auto;
  text-align: left;
}

.recordingTime {
  display: flex;
  vertical-align: center;
  justify-content: space-between;
}
.recordingTimeControl {
}
.recordingTimeControl span:nth-child(1) {
  position: relative;
  left: 35.3%;
}
.recordingTimeControl span:nth-child(2) {
  position: relative;
  left: 47.5%;
}
.recordingTimeControl span:nth-child(3) {
  position: relative;
  left: 59.5%;
}
.recordingVol {
  display: flex;
  vertical-align: center;
}
.recordingBass {
  display: flex;
  vertical-align: center;
}
.recordingTreble {
  display: flex;
  vertical-align: center;
}
.recordingPan {
  vertical-align: center;
  justify-content: space-between;
}

.recordings {
  z-index: 0;
}

.recordingSettingTitle {
  font-weight: 200;
  font-size: 12px;
}
.recordingSettingStartValue {
  position: absolute;
  font-weight: 200;
  font-size: 8px;
  margin-top: 26px;
  width: 40px;
  margin-left: -12px;
  text-align: center;
}

.teest {
  text-align: right;
  font-weight: 200;
  font-size: 8px;
}
.recordingSettingEndValue {
  position: absolute;
  right: 12px;
  font-weight: 200;
  font-size: 8px;
  margin-top: 26px;
  width: 40px;
  text-align: center;
}

.newRecord {
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  inset: auto auto 60px auto;
  z-index: 99;
  width: 100%;
  background: #fff;
}
.newRecord img {
  width: 32px;
}

.postSettingName {
  font-weight: 700;
  display: inline-block;
  margin-left: 15px;
}
.postSettingContent {
  margin-left: 15px;
  margin-right: 15px;
}

.postSettingText {
  border: none;
  background: rgb(241, 241, 241);
  border-radius: 4px;
  width: 95%;
  margin-left: -2px;
  height: 20px;
  margin-bottom: 20px;
}
.credentials {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  margin-top: 30%;
}

.credentials img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
}
.usernameText {
  border: none;
  background: rgb(241, 241, 241);
  border-radius: 4px;
  width: 95%;
  height: 20px;
  margin-bottom: 20px;
}
.passwordText {
  border: none;
  background: rgb(241, 241, 241);
  border-radius: 4px;
  width: 95%;
  height: 20px;
  margin-bottom: 20px;
}
.test {
  margin-top: -10px;
  margin-left: 8px;
  margin-right: 8px;
  color: rgb(94, 94, 94);
}
.test2 {
  margin-top: 20px;
}
.test3 {
  width: 32px;
  height: 48px;
}

.test4 {
  color: aqua;
}

.time {
  color: #eeeeee;
  display: flex;
  position: absolute;
  float: right;
  right: 0px;
  bottom: 10px;
  z-index: 95;
  width: 10%;
  font-size: 10px;
  white-space: nowrap;
}

.search {
  margin-top: 15px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.searchResults {
  margin-top: 40px;
}
.profileDescription {
  margin-bottom: 20px;
}
</style>

