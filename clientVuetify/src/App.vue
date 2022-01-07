<template>
  <div class="app">
    <footer>
      <router-link class="nav" to="/Feed"><font-awesome-icon icon="home" /></router-link>
      <router-link class="nav" to="/Search"
        ><font-awesome-icon icon="search"
      /></router-link>
      <router-link to="/Jam"><img src="./assets/icon.jpg" alt="jam" /></router-link>
    </footer>
    <main role="main">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
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
  padding: 14px;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  inset: auto 0 0 0;
  width: 100%;
  background: #fff;
  z-index: 100;
}
.nav {
  color: #333;
}
footer img {
  width: 30px;
  height: 30px;
  margin-top: -8px;
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

.slidecontainer {
  width: 50%;
  height: 25px;
}

/* The slider itself */
.slider {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  display: inline;
  position: absolute;
  left: 55%;
  transform: translateX(-50%);
  margin-top: 6px;
  width: 70%; /* Full-width */
  height: 4px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 14px; /* Set a specific slider handle width */
  height: 14px; /* Slider handle height */
  background: #000000; /* Green background */
  cursor: pointer; /* Cursor on hover */
  border-radius: 50%;

}

.slider::-moz-range-thumb {
  width: 40px; /* Set a specific slider handle width */
  height: 40px; /* Slider handle height */
  background: #000000; /* Green background */
  cursor: pointer; /* Cursor on hover */
  border-radius: 50%;
    padding: 20px;
}
/* The slider itself */
.slider2 {
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  display: inline;
  position: absolute;
  left: 55%;
  transform: translateX(-50.5%);
  margin-top: 9px;
  width: 55%; /* Full-width */
  height: 4px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;
}

/* Mouse-over effects */
.slider2:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider2::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 14px; /* Set a specific slider handle width */
  height: 14px; /* Slider handle height */
  background: #000000; /* Green background */
  cursor: pointer; /* Cursor on hover */
  border-radius: 50%;
}

.slider2::-moz-range-thumb {
  width: 40px; /* Set a specific slider handle width */
  height: 40px; /* Slider handle height */
  background: #000000; /* Green background */
  cursor: pointer; /* Cursor on hover */
  border-radius: 50%;
 padding: 200px;
}
.recordingName {
  font-weight: 700;
margin: 15px;

}



.recordingContentHeader {
  font-size: 14px;
  margin: auto;
  text-align: left;

}

.recordingTime {
padding-bottom: 10px;
display: flex;
  vertical-align: center;
  justify-content: space-between;
}
.recordingTimeControl{
padding-bottom: 18px;
}
.recordingTimeControl span:nth-child(1){
  position: relative;
  left: 35.3%;
}
.recordingTimeControl span:nth-child(2){
  position: relative;
  left: 47.5%;
}
.recordingTimeControl span:nth-child(3){
  position: relative;
  left: 59.5%;
}
.recordingVol {
padding-bottom: 18px;
  display: flex;
  vertical-align: center;
}
.recordingBass {
padding-bottom: 18px;
  display: flex;
  vertical-align: center;
}
.recordingTreble {
padding-bottom: 18px;
  display: flex;
  vertical-align: center;
}
.recordingPan {
padding-bottom: 18px;
  vertical-align: center;
    justify-content: space-between;
}

.recordings{
  z-index: 0;
}

.recordingSettingTitle {
  font-weight: 200;
  font-size: 12px;
}
.recordingSettingStartValue {
    position: absolute;
    left: 20%;
  font-weight: 200;
  font-size: 8px;
  margin-top: 7px;
}
.recordingSettingEndValue {
      position: absolute;
    left: 84%;
  font-weight: 200;
  font-size: 8px;
    margin-top: 7px;
    width: 6%;
    text-align: end;
}


.newRecord {
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  inset: auto auto 40px auto;
  z-index: 99;

  width: 100%;
  background: #fff;
}
.newRecord img {
  width: 30px;
}

.postSettingName {
  font-weight: 700;
  display: inline-block;
  margin-left: 15px;
}
.postSettingContent {
  margin-left: 15px;
}

.postSettingContentHeader {
  font-size: 14px;
  margin-bottom: 2px;
}

.postSettingContent:last-child {
  font-size: 14px;
  margin-top: 40px;
  margin-bottom: 2px;
}

.postSettingContentHeader img {
  width: 20px;
  margin: auto;
  display: block;
  margin-top: -20px;
}
textarea {
  height: 40px;
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

</style>
