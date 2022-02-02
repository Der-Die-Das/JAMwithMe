<template>
  <div>
    <div class="headerTop">
      <div class="headerTopLogo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <div class="headerTopIcons">
        <i>
          <router-link to="/Profile">
            <img src="https://picsum.photos/99" alt="ProfilePicture" />
          </router-link>
        </i>
      </div>

    </div>


    <div class="posts" v-for="idx in jams" v-bind:key="jams[idx]">

      <div class="post">

        <div class="postHeader">
          <div class="postUser">
            <div class="postUserPic">
              <img src="https://picsum.photos/101" alt="ProfilePicture" />
            </div>
            <div class="postUserName">
              {{jams[idx-1]}}
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
            append-icon="mdi-send-circle-outline"
          ></v-textarea>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      jams: [
        {
          id: null,
          creator: null,
          prejam: null,
          thumbnailpath: null,
          creationdate: null,
          recordinginfos: [],
        },
      ],
    };
  },
  async mounted() {
    await axios
    .get("jam/all")
    .then((response) => {
      this.jams = response.data;
    });
    for (let X = 0; X < this.jams.length; X++) {
    //  console.log(this.jams[X]);
      await axios
      .get("jam?jamID=" + this.jams[X])
     .then((resp) => {
        this.jams[X] = resp.data;
            //  console.log(this.jams[X].creator);
      });
      //console.log(this.jams[1].creator)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
