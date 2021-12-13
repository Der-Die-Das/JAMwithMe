<template>
  <Feed />
</template>

<script>
import Feed from './components/Feed.vue'


export default {
  name: 'App',
  components: {
    Feed
  }
}

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
}
.headerTopIcons img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 10px;
}
.posts{
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
    margin-top: -10px;
}
.postIcons {
    display: flex;
    align-items: center;
    padding: 5px 10px;
}

.postIcons i {
    margin: 0px 5px;
}
.postIcons i:first-child {
    margin: 0px 5px 0px 0px;
}

.postIcons img {
    width: 25px;
    height: 25px;
    margin-top: 2px;
    margin-right: -4px ;
}
.directJam{
    margin-left: auto;
}
.likeCounter span{
    margin-left: 10px;
}
.username {
    font-weight: 700;
    display: inline-block;
    margin-right: 5px;
}
.hashtag {
    color: rgb(62,62,201);
}
footer {
    padding: 14px;
    display: flex;
    justify-content: space-evenly;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
}
footer a{
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
    margin-bottom: 8px;
}
.postComment img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 8px;
}
.postCommentText {
    color: gray;
}
</style>
