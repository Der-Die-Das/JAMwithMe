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
           <router-link to="/Profile">

<img src="https://picsum.photos/99" alt="ProfilePicture" />

           </router-link>
        </i>
      </div>
    </div>

    <div class="posts">
      <div class="post">
        <div class="postHeader">
          <div class="postUser">
            <div class="postUserPic">
              <img src="https://picsum.photos/101" alt="ProfilePicture" />
            </div>
            <div class="postUserName">Testbenutzer</div>
          </div>
        </div>
               

        <div class="postContent">
          <img src="https://picsum.photos/800/401" alt="PostImg" />
          <div class="postContentControl">
                          <span><font-awesome-icon icon="pause" color="white" size="sm" /></span>
              <span class="imgSlidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value="0"
                  class="imgSlider"
                />
              </span>
              <span class="postTime">00:11 / 03:02</span>
          </div>
        </div>
        <div class="postIcons">
          <i> <font-awesome-icon :icon="['far', 'heart']"/> </i>
          <i> <font-awesome-icon :icon="['far', 'comment']" /> </i>
          <i> <font-awesome-icon :icon="['far', 'paper-plane']" /> </i>
          <div class="directJam">
            <router-link to="/Jam"><img src="../assets/icon.jpg" alt="jam" /></router-link>
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
            <div class="post">
        <div class="postHeader">
          <div class="postUser">
            <div class="postUserPic">
              <img src="https://picsum.photos/101" alt="ProfilePicture" />
            </div>
            <div class="postUserName">Testbenutzer</div>
          </div>
        </div>
               

        <div class="postContent">
          <img src="https://picsum.photos/800/402" alt="PostImg" />
          <div class="postContentControl">
                          <span><font-awesome-icon icon="pause" color="white" size="sm" /></span>
              <span class="imgSlidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value="0"
                  class="imgSlider"
                />
              </span>
              <span class="postTime">00:11 / 03:02</span>
          </div>
        </div>
        <div class="postIcons">
          <i> <font-awesome-icon :icon="['far', 'heart']"/> </i>
          <i> <font-awesome-icon :icon="['far', 'comment']" /> </i>
          <i> <font-awesome-icon :icon="['far', 'paper-plane']" /> </i>
           <div class="directJam">
            <router-link to="/Jam"><img src="../assets/icon.jpg" alt="jam" /></router-link>

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
            <div class="post">
        <div class="postHeader">
          <div class="postUser">
            <div class="postUserPic">
              <img src="https://picsum.photos/101" alt="ProfilePicture" />
            </div>
            <div class="postUserName">Testbenutzer</div>
          </div>
        </div>
               

        <div class="postContent">
          <img src="https://picsum.photos/800/403" alt="PostImg" />
          <div class="postContentControl">
                          <span><font-awesome-icon icon="pause" color="white" size="sm" /></span>
              <span class="imgSlidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value="0"
                  class="imgSlider"
                />
              </span>
              <span class="postTime">00:11 / 03:02</span>
          </div>
        </div>
        <div class="postIcons">
          <i> <font-awesome-icon :icon="['far', 'heart']"/> </i>
          <i> <font-awesome-icon :icon="['far', 'comment']" /> </i>
          <i> <font-awesome-icon :icon="['far', 'paper-plane']" /> </i>
          <div class="directJam">
            <router-link to="/Jam"><img src="../assets/icon.jpg" alt="jam" /></router-link>
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
