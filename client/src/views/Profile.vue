<template>
  <div>
    <div class="headerTop">
      <div class="headerTopLogo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <div class="headerTopIcons">
        <i>
          <router-link to="/Profile"
            ><img src="https://picsum.photos/99" alt="ProfilePicture"
          /></router-link>
        </i>
      </div>
    </div>

    <div class="postsSettings">
      <div class="postSetting">
        <div class="postSettingsHeader">
          <div class="Title">Edit Profile</div>
        </div>
        <div class="Title">profileXX</div>
        <div class="postSettingContent">
          <form>
            <v-textarea
              v-model="profile.bio"
              name="input-7-1"
              label="Description"
              value=""
              counter="100"
              auto-grow
            ></v-textarea>

            <v-file-input
              v-model="profile.userPic"
              accept="image/*"
              label="Profile image"
              prepend-icon="mdi-image-outline"
            ></v-file-input>
            <v-spacer></v-spacer>
          </form>
          <div class="Title">change Password</div>
          <v-text-field
            v-model="profile.oldPassword"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="old password"
            label="old password"
            @click:append="show1 = !show1"
            solo
          ></v-text-field>
          <v-text-field
            v-model="profile.newPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            name="password"
            label="new password"
            @click:append="show2 = !show2"
            solo
          ></v-text-field>
          <v-text-field
            v-model="passwordCheck"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show3 ? 'text' : 'password'"
            name="retype-password"
            label="retype password"
            @click:append="show3 = !show3"
            solo
          ></v-text-field>
          <v-btn
            @click="changeUserSettings"
            block
            color="secondary"
            depressed
          >
            CHANGE
          </v-btn>

          <br />
          <v-btn @click="logout" block color="secondary" depressed>
            LOG OUT
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
      show1: false,
      show2: false,
      show3: false,
      passwordCheck: null,
      profile: {
        bio: null,
        userPic: null,
        oldPassword: null,
        newPassword: null,
      },
    };
  },
  methods: {
    async logout() {
      await axios.post("user/logout");
      this.$router.push("/login");
    },
    async changeUserSettings() {
      if (this.profile.bio !== null) {
        await axios.post("user", {
          bio: this.profile.bio,
        });
      } if (this.profile.newPassword !== null) {
        if (this.profile.newPassword == this.passwordCheck) {
          axios.put("user/password", {
            oldPassword: this.profile.oldPassword,
            newPassword: this.profile.newPassword,
          });
        }
      }
    },
  },
};
</script>










