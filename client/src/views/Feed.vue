<template>
  <div style="margin-bottom: 120px">
    <vHeader />
    <vFooter />
    <v-progress-circular
      v-if="isLoading"
      class="progress"
      :size="200"
      color="blue"
      indeterminate
    ></v-progress-circular>
    <div v-if="!isLoading">
      <div class="posts" v-for="jam in jams" :key="jam.id">
        <div class="post">
          <div class="postHeader">
            <div class="postUser">
              <div class="postUserPic">
                <img :src="jam.creatorPicture" alt="ProfilePicture" />
              </div>
              <div class="postUserName">
                {{ jam.creator }}
                <span>{{ jam.title }}</span>
              </div>
            </div>
          </div>

          <div class="postContent">
            <img
              :src="jam.thumbnail"
              alt="PostImg"
              onerror="this.src='https://picsum.photos/400/200'"
            />
            <div class="postContentControl">
              <v-slider
                class="postContentControl"
                :prepend-icon="jam.playing ? 'mdi-pause' : 'mdi-play'"
                inverse-label
                dark
                @click:prepend="playJam(jam)"
                @change="timeChanged($event, jam)"
              >
              </v-slider>
              <div class="time">
                00:10 / {{ ("0" + parseInt(jam.duration / 60)).slice(-2) }}:{{
                  ("0" + parseInt(jam.duration % 60)).slice(-2)
                }}
              </div>
            </div>
          </div>
          <div class="postText">
            {{ jam.description }}
          </div>
          <div class="postIcons">
            <i>
              <v-icon @click="likeJam(jam.liked, jam.id)">
                {{ jam.liked ? "mdi-heart" : "mdi-heart-outline" }}
              </v-icon>
            </i>
            <i
              ><font-awesome-icon
                @click="
                  jam.showComment = !jam.showComment
                "
                :icon="['far', 'comment']"
              />
            </i>
            <div @click="directJam(jam.id)" class="directJam">
              <img src="../assets/icon.jpg" alt="jam" />
            </div>
          </div>
          <div class="likeCounter">
            <span>{{ jam.likes }} Likes</span>
          </div>
          <div>
            <v-comments v-if="jam.showComment" :ID="jam.id"> </v-comments>
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
import vComments from "../components/comments.vue";
import tone from "../functions/tone";

var jamPlayers = new tone.JamPlayers(axios.defaults.baseURL + "media/");

export default {
  components: { vFooter, vHeader, vComments },
  data() {
    return {
      commentJamID: 0,

      jams: [
        {
        },
      ],

      user: {},
      isLoading: true,
    };
  },

  async mounted() {
    axios.get("user/current").catch(function (error) {
      if (error.response.status == 401) {
        this.$router.push("/login").catch(() => {});
      }
    });
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

      fullJamInfo.vcomment = "";
      fullJamInfo.thumbnail =
        axios.defaults.baseURL + "media/" + fullJamInfo.thumbnailpath;
      fullJamInfo.duration = 2730;

      fullJamInfo.playing = false;
      fullJamInfo.showComment = false;
      jamPlayers.loadJam(fullJamInfo);
      this.jams.push(fullJamInfo);


      jamPlayers.loadJam(fullJamInfo).then(() => {
        // this.jams[i].duration = jamPlayers.getDuration(this.jams[i].id);
        this.$set(
          this.jams[i],
          "duration",
          jamPlayers.getDuration(this.jams[i].id)
        );
        // Vue.set(
        //   this.jams[i],
        //   "duration",
        //   jamPlayers.getDuration(this.jams[i].id)
        // );
      });

      axios.get("user/" + fullJamInfo.creator).then((creatorResp) => {
        Vue.set(this.jams[i], "creator", creatorResp.data.username);
        Vue.set(
          this.jams[i],
          "creatorPicture",
          axios.defaults.baseURL +
            "media/" +
            creatorResp.data.profilepicturepath
        );
      });
      axios.get("jam/likes?jamID=" + this.jams[i].id).then((likesResp) => {
        Vue.set(this.jams[i], "likes", likesResp.data.likeCount);
      });
      axios.get("jam/liked?jamID=" + this.jams[i].id).then((likedResp) => {
        Vue.set(this.jams[i], "liked", likedResp.data.liked);
      });
      //this.jams[i].playing = false;
    }
          console.log(this.jams);

    this.isLoading = false;
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

    comment(jam) {
      if (jam.vcomment != "") {
        axios.post("comment/create", {
          jamID: jam.id,
          comment: jam.vcomment,
        });
        (jam.vcomment = ""), Vue.delete(jam, "vcomment");
      }
    },
    showComments(jam) {
      jam.showComments = !jam.showComments;
      Vue.set(this.jam, "showComments", jam.showComments);
    },

    playJam(jam) {
      jamPlayers.playOrPause(jam.id);
      jam.playing = !jam.playing;
    },
    timeChanged($event, jam) {
      jamPlayers.setTime(
        jam.id,
        (jamPlayers.getDuration(jam.id) * $event) / 100
      );
      jamPlayers.playing = true;
    },

    directJam(id) {
      this.$router.push({ path: "/Jam", query: { jamID: id } }).catch(() => {});
    },
  },
};
</script>

<style scoped>
.progress {
  z-index: 100;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
}
</style>



