<template>
  <div>
    <div class="headerTop">
      <div class="headerTopLogo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <div class="headerTopIcons">
        <i
          ><a href="#"
            ><font-awesome-icon
              :icon="['far', 'heart']"
              style="color: black"
              size="lg" /></a
        ></i>
        <i>
           <router-link to="/Profile"><img src="https://picsum.photos/99" alt="ProfilePicture" /></router-link>
        </i>
      </div>
    </div>

    <div class="recordings">
      <div class="recording">
        <div class="recordingHeader">
          <div class="postUser">
            <div class="postUserPic">
              <img src="https://picsum.photos/101" alt="ProfilePicture" />
            </div>
            <div class="postUserName">Testbenutzer</div>
          </div>
        </div>
               

        <div class="recordingContent">
          <img src="https://picsum.photos/800/401" alt="PostImg" />
        </div>
        <div class="postIcons">
          <i> <font-awesome-icon :icon="['far', 'heart']"/> </i>
          <i> <font-awesome-icon :icon="['far', 'comment']" /> </i>
          <i> <font-awesome-icon :icon="['far', 'paper-plane']" /> </i>
          <div class="directJam">
            <a href="#"> <img src="../assets/icon.jpg" alt="jam" /></a>
          </div>
        </div>
        <div class="likeCounter">
          <span>100 Likes</span>
        </div>
        <div class="postText">
          <p>
            <span class="username"> Testbenutzer</span>Lorem ipsum dolor sit
            amet consectetur adipisicing elit.
            <span class="hashtag"> #rock</span>
          </p>
        </div>
        <div class="postComment">
          <div class="postUserPic">
        <img src="https://picsum.photos/99" alt="ProfilePicture" />
          </div>
          <input class="postCommentText" v-model="message" placeholder="Add comment..."/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
