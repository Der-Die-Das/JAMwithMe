<template>
  <div style="margin-bottom: 120px">
    <vHeader />
    <vFooter />
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
                <span>{{jam.title }}</span>
              </div>
            </div>
          </div>

          <div class="postContent">
            <div></div>
            <!-- <img src="https://picsum.photos/800/401" alt="PostImg" /> -->
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
                @click:prepend="playJam(jam)"
              >
              </v-slider>
              <div class="time">00:10 / 03:10</div>
            </div>
          </div>
                    <div class="postText">

              {{jam.description}}

            </div>
          <div class="postIcons">
            <i>
              <v-icon @click="likeJam(jam.liked, jam.id)">
                {{ jam.liked ? "mdi-heart" : "mdi-heart-outline" }}
              </v-icon>
            </i>
            <i
              ><font-awesome-icon
                @click="showComments(jam)"
                :icon="['far', 'comment']"
              />
            </i>
            <div class="directJam">
              <router-link to="/Jam"
                ><img src="../assets/icon.jpg" alt="jam"
              /></router-link>
            </div>
          </div>
          <div class="likeCounter">
            <span>{{ jam.likes }} Likes</span>
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
import tone from "../functions/tone";

var jamPlayers = new tone.JamPlayers(axios.defaults.baseURL + "media/");

export default {
  components: { vFooter, vHeader },
  data() {
    return {
      jams: [
        {
          vcomment: "",
          showComments: true,
        },
      ],

      user: {},
      isLoading: true,
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

    this.jams = [];
    var allJamIds = (await axios.get("jam/all")).data;
    for (let i = 0; i < allJamIds.length; i++) {
      var fullJamInfo = (await axios.get("jam?jamID=" + allJamIds[i])).data;
      this.jams.push(fullJamInfo);
      this.jams[i].vcomment = "";
      this.jams[i].thumbnail =
        axios.defaults.baseURL + "media/" + fullJamInfo.thumbnailpath;

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

      jamPlayers.loadJam(fullJamInfo);
    }

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
      console.log(jam.showComments);
      Vue.set(this.jam, "showComments", jam.showComments);
    },

    playJam(jam) {
      if (jamPlayers.paused && jamPlayers.currentlyPlaying == jam.id) {
        console.log("resume");
        jamPlayers.resume();
      } else if (!jamPlayers.paused && jamPlayers.currentlyPlaying == jam.id) {
        jamPlayers.pause();
        console.log("pause");
      } else {
        jamPlayers.play(jam.id);
        console.log("play");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

