<template>
  <div>
    <vHeader />
    <vFooter />

    <div class="postsSettings">
      <div class="postSetting">
        <div class="postSettingsHeader">
          <div class="Title">Edit Post</div>
        </div>
        <div class="postSettingContent">
          <form>
            <v-text-field
              v-model="postName"
              :counter="10"
              label="Name"
              required
              @change="checkForm()"
            ></v-text-field>
            <v-text-field
              v-model="postGenre"
              :counter="10"
              label="Genre"
              required
              @change="checkForm()"
            ></v-text-field>
            <v-text-field
              v-model="postTag"
              :counter="32"
              label="Tags"
              required
              @change="checkForm()"
            ></v-text-field>
            <v-textarea
              v-model="postDescription"
              name="input-7-1"
              label="Description"
              value=""
              counter="100"
              auto-grow
              @change="checkForm()"
            ></v-textarea>

            <v-file-input
              v-model="postImage"
              accept="image/*"
              label="Image"
              prepend-icon="mdi-image-outline"
              @change="checkForm()"
            ></v-file-input>
            <v-spacer></v-spacer>
          </form>
          <v-btn block color="secondary" :disabled="!form" depressed>
            Post
          </v-btn>
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
            loggedIn: false,
      user: {},
      form: true,
      postName: null,
      postGenre: null,
      postTag: null,
      postDescription: null,
      postImage: null,
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
  methods: {
    checkForm() {
      if (
        this.postName &&
        this.postGenre &&
        this.postTag &&
        this.postDescription &&
        this.postImage
      ) {
        this.form = true;
      } else {
        this.form = false;
      }
    },
  },


  
};
</script>










