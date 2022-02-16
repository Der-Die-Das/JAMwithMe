<template>
  <div style="margin-bottom: 120px">
    <vHeader />
    <vFooter />
    <div class="profilePictureHeader">
    <span  >
      <v-avatar>
        <img :src="creator.creatorPicture" alt="PP" />
      </v-avatar>
    </span>
    <span class="title"> {{ creator.username }}</span>
    </div>
    <div>
      <div class="profileDescription">
        <div>{{ creator.bio }}</div>
      </div>
      <div class="posts" v-for="jam in jams" :key="jam.id">
        <div class="post">
          <div class="postHeader">
            <div class="postUser">
              <div class="postUserPic">
              </div>
            </div>
          </div>

          <div class="postContent">
            <div></div>

            <img
              :src="jam.thumbnail"
              alt="PostImg"
              onerror="this.src='https://picsum.photos/400/200'"
            />
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
              @click:append="comment(jam)"
            ></v-textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import vFooter from "../components/vFooter";
import vHeader from "../components/vHeader";

export default {
  components: { vFooter, vHeader},
  data() {
    return {
      creator: {},
      user: {},
            jams: [
        {
          vcomment: "",
        },
            ],
    };
  },

  async mounted() {
    const vm = this;
    axios.get("user/current").catch(function (error) {
      if (error.response.status == 401) {
        vm.$router.push("/login").catch(() => {});
      }
    });

            var currentLoggedInUser = (await axios.get("user/current")).data;
    this.user = currentLoggedInUser;
    this.user.profilePicture =
      axios.defaults.baseURL +
      "/media/" +
      currentLoggedInUser.profilepicturepath;
      
    await axios.get("user/"+this.$route.query.userID).then((creatorResp) => {
      this.creator = creatorResp.data;

      Vue.set(
        this.creator,
        "creatorPicture",
        axios.defaults.baseURL + "media/" + this.creator.profilepicturepath
      );
    });

 this.jams = [];
    var allJamIds = (await axios.get("user/jams?userID=" + this.$route.query.userID)).data;
    for (let i = 0; i < allJamIds.length; i++) {
      var fullJamInfo = (await axios.get("jam?jamID=" + allJamIds[i])).data;
      this.jams.push(fullJamInfo);
      this.jams[i].vcomment = "";
      this.jams[i].thumbnail =
        axios.defaults.baseURL + "media/" + fullJamInfo.thumbnailpath;
    }
  },
methods: {
    async likeJam(liked, jamID) {
      if (liked) {
        await axios.post("jam/unlike", { jamID });
      } else {
        await axios.post("jam/like", { jamID });
      }
      const element = this.jams.filter((x) => x.id == jamID)[0];
      const jamIndex = this.jams.indexOf(element);
      axios.get("jam/liked?jamID=" + jamID).then((likedResp) => {
        Vue.set(this.jams[jamIndex], "liked", likedResp.data.liked);
      });
      axios.get("jam/likes?jamID=" + jamID).then((likesResp) => {
        Vue.set(this.jams[jamIndex], "likes", likesResp.data.likeCount);
      });
    },
    // async comment(jamID) {
    //   const element = this.jams.filter((x) => x.id == jamID)[0];
    //   const jamIndex = this.jams.indexOf(element);
    //   if (this.jams[jamIndex].vcomment != "") {
    //     // console.log(this.jams[jamIndex].vcomment);
    //     await axios.post("comment/create", {
    //       jamID,
    //       comment: this.jams[jamIndex].vcomment,
    //     });
    //   }
    //   this.jams[jamIndex].vcomment = "";
    //   console.log(this.jams[jamIndex]);
    // },
    comment(jam) {
      if (jam.vcomment != "") {
        axios.post("comment/create", {
          jamID: jam.id,
          comment: jam.vcomment,
        });
        (jam.vcomment = ""), Vue.delete(jam, "vcomment");
      }
    },
  },
};


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
