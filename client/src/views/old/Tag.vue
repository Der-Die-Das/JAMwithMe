<template>
  <div>
    <vHeader />
    <vFooter />
    <div class="Title">
        #rock
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
          <div></div>
          <img src="https://picsum.photos/800/401" alt="PostImg" />
          <div class="postContentControl">
            <v-slider
              class="postContentControl"
              prepend-icon="mdi-play"
              v-model="media"
              inverse-label
          dark
            >            
            </v-slider>           
                      <div class="time"> 00:10 / 03:10</div>
          </div>

        </div>
        <div class="postIcons">
          <i> <font-awesome-icon :icon="['far', 'heart']" /> </i>
          <i> <font-awesome-icon :icon="['far', 'comment']" /> </i>
          <div class="directJam">
            <router-link to="/Jam"
              ><img src="../assets/icon.jpg" alt="jam"
            /></router-link>
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
    <v-textarea
      label="Add comment..."
      rows="1"
      auto-grow
      :value="value"
            append-icon="mdi-send-circle-outline"
    ></v-textarea>
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
            <v-slider
              class="postContentControl"
              prepend-icon="mdi-play"
              v-model="media"
              inverse-label
          dark
            >            
            </v-slider>           
                      <div class="time"> 00:10 / 03:10</div>
          </div>
        </div>
        <div class="postIcons">
          <i> <font-awesome-icon :icon="['far', 'heart']" /> </i>
          <i> <font-awesome-icon :icon="['far', 'comment']" /> </i>
          <div class="directJam">
            <router-link to="/Jam"
              ><img src="../assets/icon.jpg" alt="jam"
            /></router-link>
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
    <v-textarea
      label="Add comment..."
      rows="1"
      auto-grow
      :value="value"
            append-icon="mdi-send-circle-outline"
    ></v-textarea>
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
            <v-slider
              class="postContentControl"
              prepend-icon="mdi-play"
              v-model="media"
              inverse-label
          dark
            >            
            </v-slider>           
                      <div class="time"> 00:10 / 03:10</div>
          </div>
        </div>
        <div class="postIcons">
          <i> <font-awesome-icon :icon="['far', 'heart']" /> </i>
          <i> <font-awesome-icon :icon="['far', 'comment']" /> </i>
          <div class="directJam">
            <router-link to="/Jam"
              ><img src="../assets/icon.jpg" alt="jam"
            /></router-link>
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
    <v-textarea
      label="Add comment..."
      rows="1"
      auto-grow
      :value="value"
      append-icon="mdi-send-circle-outline"
    ></v-textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vFooter from "../components/vFooter"
import vHeader from "../components/vHeader"
export default {
  components: {vFooter,vHeader},
  data() {
    return {
            user: {},
    };
  },

    async mounted() {
    var currentLoggedInUser = (
      await axios.get("user/current").catch(function (error) {
        if (error.response.status == 401) {
          this.$router.push("/login").catch(() => {});
        }
      })
    ).data;
    this.user = currentLoggedInUser;
    this.user.profilePicture =
      axios.defaults.baseURL +
      "/media/" +
      currentLoggedInUser.profilepicturepath;
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
