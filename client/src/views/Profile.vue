<template>
  <v-container>
    <div>
      <div class="headerTop">
        <div class="headerTopLogo">
          <img src="../assets/logo.png" alt="Logo" />
        </div>
        <div class="headerTopIcons">
          <i>
            <router-link to="/Profile"
              ><img
                v-bind:src="profileToShow.profilepicturepath"
                alt="ProfilePicture"
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
                @change="checkForm()"
              ></v-textarea>

              <v-file-input
                v-model="profile.userPic"
                accept="image/*"
                label="Profile image"
                prepend-icon="mdi-image-outline"
                @change="handleFileUpload($event), checkForm()"
              ></v-file-input>
              <v-spacer></v-spacer>
            </form>
            <div class="Title">change Password</div>
            <form>
              <v-text-field
                name="username"
                label="username"
                style="hidden"
                v-show="false"
                autocomplete="current-username"
              ></v-text-field>
              <v-text-field
                v-model="profile.oldPassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                autocomplete="current-password"
                name="old password"
                label="old password"
                @click:append="show1 = !show1"
                solo
                @change="checkForm()"
              ></v-text-field>
              <v-text-field
                v-model="profile.newPassword"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                autocomplete="new-password"
                name="password"
                label="new password"
                @click:append="show2 = !show2"
                solo
                @change="checkForm()"
              ></v-text-field>
              <v-text-field
                v-model="passwordCheck"
                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show3 ? 'text' : 'password'"
                autocomplete="new-password"
                name="retype-password"
                label="retype password"
                @click:append="show3 = !show3"
                solo
                @change="checkForm()"
              ></v-text-field>
            </form>
            <v-btn
              @click="changeUserSettings"
              :disabled="!userInfo"
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
    <v-dialog v-model="passwordErrorDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Password Error
        </v-card-title>

        <v-card-text>
          Your passwords do not match. Please try again.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="passwordErrorDialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="userInfosChanged" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Userinfos changed
        </v-card-title>

        <v-card-text> Your changes have been accepted. </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="userInfosChanged = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="userPasswordChanged" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Password changed
        </v-card-title>

        <v-card-text> You have changed your password. </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="userPasswordChanged = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userInfo: false,
      passwordErrorDialog: false,
      userInfosChanged: false,
      userPasswordChanged: false,
      show1: false,
      show2: false,
      show3: false,
      passwordCheck: null,
      profileToShow: {},
      profile: {
        bio: null,
        userPic: null,
        oldPassword: null,
        newPassword: null,
      },
    };
  },
  async mounted() {
    this.getUser();
  },
  methods: {
    async logout() {
      await axios.post("user/logout");
      this.$router.push("/login");
    },
    async getUser() {
      this.profileToShow = (await axios.get("/user/2")).data;
      this.profileToShow.profilepicturepath =
        axios.defaults.baseURL +
        "media/" +
        this.profileToShow.profilepicturepath;
      this.profile.bio = this.profileToShow.bio;
    },
    handleFileUpload(event) {
      console.log(event);
      this.profile.userPic = event;
    },
    checkForm() {
      if (
        (this.profile.bio !== this.profileToShow.bio &&
          this.profile.bio.length <= 100) ||
        (this.profile.newPassword !== null && this.passwordCheck !== null) ||
        this.profile.userPic !== null
      ) {
        this.userInfo = true;
      } else {
        this.userInfo = false;
      }
    },
    clearPasswords() {
      this.profile.oldPassword = null;
      this.profile.newPassword = null;
      this.passwordCheck = null;
    },

    async changeUserSettings() {
      const vm = this;
      let formData = new FormData();

      if (this.profile.bio !== null && this.profile.bio.length <= 100) {
        if (this.profile.bio !== this.profileToShow.bio) {
          formData.append("bio", this.profile.bio);
        }
        if (this.profile.userPic !== null) {
          formData.append("profilePicture", this.profile.userPic);
        }
        await axios.post(
          "user",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
          (this.userInfosChanged = true)
        ),
          (this.userInfo = false);
        this.profile.userPic = null;
        this.getUser();

        if (this.profile.newPassword !== null) {
          if (this.profile.newPassword == this.passwordCheck) {
            await axios
              .put("user/password", {
                oldPassword: this.profile.oldPassword,
                newPassword: this.profile.newPassword,
              })
              .catch(function (error) {
                if (error.response.status == 400) {
                  //vm.$router.push("/register");
                  vm.passwordErrorDialog = true;
                  vm.clearPasswords();
                }
              });
            if (!vm.passwordErrorDialog) {
              console.log("changed");
              this.userPasswordChanged = true;
              this.clearPasswords();
              this.getUser();
            }
          } else {
            console.log("error");
            this.passwordErrorDialog = true;
            this.clearPasswords();
            this.getUser();
          }
        }
      }
    },
  },
};
</script>










