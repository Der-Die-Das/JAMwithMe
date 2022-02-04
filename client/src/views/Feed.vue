<template>
  <div>
    <div class="headerTop">
      <div class="headerTopLogo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <div class="headerTopIcons">
        <i>
          <router-link to="/Profile">
            <img :src="user.profilePicture" alt="ProfilePicture" />
          </router-link>
        </i>
      </div>
    </div>

    <div class="posts" v-for="jam in jams" :key="jam.id">
      <div class="post">
        <div class="postHeader">
          <div class="postUser">
            <div class="postUserPic">
              <img :src="jam.creatorPicture" alt="ProfilePicture" />
            </div>
            <div class="postUserName">
              {{ jam.creator }}
            </div>
          </div>
        </div>

        <div class="postContent">
          <div></div>
          <img src="https://picsum.photos/800/401" alt="PostImg" />
          <div class="postContentControl">
            <v-slider
              class="postContentControl"
              prepend-icon="mdi-play"
              inverse-label
              dark
            >
            </v-slider>
            <div class="time">00:10 / 03:10</div>
          </div>
        </div>
        <div class="postIcons">
          <i>
            <v-icon @click="likeJam(jam.liked, jam.id)">
              {{ jam.liked ? "mdi-heart" : "mdi-heart-outline" }}
            </v-icon>
          </i>
          <i><font-awesome-icon :icon="['far', 'comment']" /> </i>
          <div class="directJam">
            <router-link to="/Jam"
              ><img src="../assets/icon.jpg" alt="jam"
            /></router-link>
          </div>
        </div>
        <div class="likeCounter">
          <span>{{ jam.likes }} Likes</span>
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
            <img :src="user.profilePicture" alt="ProfilePicture" />
          </div>
          <v-textarea
            v-model="jam.vcomment"
            label="Add comment..."
            rows="1"
            auto-grow
            append-icon="mdi-send-circle-outline"
            @click:append="comment(jam.id)"
          ></v-textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

export default {
  data() {
    return {
      jams: [],
      user: {},
    };
  },

  async mounted() {
    var currentLoggedInUser = (await axios.get("user/current")).data;
    this.user = currentLoggedInUser;
    this.user.profilePicture =
      axios.defaults.baseURL +
      "/media/" +
      currentLoggedInUser.profilepicturepath;

    this.jams = [];
    var allJamIds = (await axios.get("jam/all")).data;
    for (let i = 0; i < allJamIds.length; i++) {
      var fullJamInfo = (await axios.get("jam?jamID=" + allJamIds[i])).data;
      this.jams.push(fullJamInfo);
      this.jams[i].vcomment = "";
      await axios.get("user/" + fullJamInfo.creator).then((creatorResp) => {
        Vue.set(this.jams[i], "creator", creatorResp.data.username);
        Vue.set(
          this.jams[i],
          "creatorPicture",
          axios.defaults.baseURL +
            "/media/" +
            creatorResp.data.profilepicturepath
        );
      });
      // Problem: nur erster Post zeigt Likes an.
      await axios
        .get("jam/likes?jamID=" + this.jams[i].id)
        .then((likesResp) => {
          Vue.set(this.jams[i], "likes", likesResp.data.likeCount);
        });
      await axios
        .get("jam/liked?jamID=" + this.jams[i].id)
        .then((likedResp) => {
          Vue.set(this.jams[i], "liked", likedResp.data.liked);
        });
    }
  },

  methods: {
    // ToDo: Refresh vom LikeCounter / Like Symbol
    async likeJam(liked, jamID) {
      if (liked) {
        await axios.post("jam/unlike", { jamID });
      } else {
        await axios.post("jam/like", { jamID });
      }
      const element = this.jams.filter((x) => x.id == jamID)[0];
      const jamIndex = this.jams.indexOf(element);
      await axios.get("jam/liked?jamID=" + jamID).then((likedResp) => {
        Vue.set(this.jams[jamIndex], "liked", likedResp.data.liked);
      });
      await axios.get("jam/likes?jamID=" + jamID).then((likesResp) => {
        Vue.set(this.jams[jamIndex], "likes", likesResp.data.likeCount);
      });
    },
    comment(jamID) {
      const element = this.jams.filter((x) => x.id == jamID)[0];
      const jamIndex = this.jams.indexOf(element);
      // Problem: Erster SenBTN versendet Text vom zweiten Feld. Zweiter BTN funktioniert nicht.
      console.log(this.jams[jamIndex].vcomment);
      axios.post("comment/create", {
        jamID,
        comment: this.jams[jamIndex].vcomment,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

