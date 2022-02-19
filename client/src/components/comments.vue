   <template>
  <div>
    <div class="commentTitle">Comments:</div>
    <div v-for="comment in postComments" :key="comment.id">
      <div class="comments">
        <div class="postUser">
          <div class="postUserPic">
            <img :src="comment.creatorPicture" alt="ProfilePicture" />
          </div>
          <div class="postUserName">
            {{ comment.creator }}
            <span>{{ comment.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

      <script>
import axios from "axios";
import Vue from "vue";
export default {
  props: {
    ID: Number,
  },
  data() {
    return {
      postComments: [],
    };
  },
  watch: {
    ID: function (newVal) {
      axios.get("jam/comments?jamID=" + newVal).then((Resp) => {
        this.postComments = Resp.data;
        for (let i = 0; i < Resp.data.length; i++) {
          this.postComments[i] = Resp.data[i];
        }
        for (let i = 0; i < this.postComments.length; i++) {
          axios
            .get("user/" + this.postComments[i].creator)
            .then((creatorResp) => {
              Vue.set(
                this.postComments[i],
                "creator",
                creatorResp.data.username
              );
              Vue.set(
                this.postComments[i],
                "creatorPicture",
                axios.defaults.baseURL +
                  "media/" +
                  creatorResp.data.profilepicturepath
              );
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.commentTitle {
  font-weight: 400;
  margin-left: 10px;
}

.comments {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
}
.comments img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}


</style>
      