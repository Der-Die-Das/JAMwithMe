<template>
  <div>
    <div class="headerTop">
      <div class="headerTopLogo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <div class="headerTopIcons">
        <i>
          <router-link to="/Profile">  <img :src="user.profilePicture" alt="ProfilePicture" />
          </router-link>
        </i>
      </div>
    </div>

    <div class="postsSettings">
      <div class="postSetting">
        <div class="postSettingsHeader">
          <div class="Title">Edit Post</div>
        </div>
        <div class="postSettingContent">
 <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Genre"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="32"
      label="Tags"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
        <v-textarea
          name="input-7-1"
          label="Description"
          value=""
          counter="100"
          auto-grow
        ></v-textarea>

  <v-file-input
    accept="image/*"
    label="Image"
    prepend-icon="mdi-image-outline"

  ></v-file-input>
      <v-spacer></v-spacer>
  </form>
        <v-btn
        block
        color="secondary"
        :disabled="!form"
        :loading="isLoading"
        depressed
      >
        Post
      </v-btn>

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
    },
  }

</script>










