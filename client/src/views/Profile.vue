<template>
  <v-container fluid class="py-0 px-0">
    <vHeader />
    <vFooter />
    <div class="profilePictureHeader">
      <span>
        <v-avatar>
          <img :src="user.userPicture" alt="PP" />
        </v-avatar>
      </span>
      <span class="title"> {{ user.username }}</span>
    </div>
    <div>
      <div class="postsSettings">
        <div class="postSetting">
          <div class="postSettingsHeader">
            <div class="Title">Edit Profile</div>
          </div>

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
            <br />
            <v-btn @click="getOwnJams()" block color="secondary" depressed>
              {{ showJams ? "HIDE OWN JAMS" : "SHOW OWN JAMS" }}
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
    <!-- Do sött eigentlech am besche en component häre                 -->
    <div v-if="showJams">
      <div class="posts" v-for="jam in jams" :key="jam.id">
        <div class="post">
          <div class="postHeader">
            <div class="postUser">
              <div class="postUserName">
                {{ jam.title }}
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
            <v-icon @click="deleteJam(jam.id)" dark class="deleteBtn">
              {{ "mdi-delete-forever" }}</v-icon
            >
            <div class="postContentControl">
              <v-slider
                class="postContentControl"
                :prepend-icon="jam.playing ? 'mdi-pause' : 'mdi-play'"
                inverse-label
                dark
                @click:prepend="playJam(jam)"
              >
              </v-slider>
              <div class="time">00:10 / 03:10</div>
            </div>
          </div>
        </div>
        <div class="postText">
          {{ jam.description }}
        </div>
        <div class="postIcons">
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
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import vFooter from "../components/vFooter";
import vHeader from "../components/vHeader";
export default {
  components: { vFooter, vHeader },
  data() {
    return {
      jams: [
        {
          vcomment: "",
          playing: false,
          showComments: true,
        },
      ],
      userInfo: false,
      user: {},
      passwordErrorDialog: false,
      userInfosChanged: false,
      userPasswordChanged: false,
      show1: false,
      show2: false,
      show3: false,
      passwordCheck: null,
      showJams: null,
      profile: {
        bio: null,
        userPic: null,
        oldPassword: null,
        newPassword: null,
      },
    };
  },
  async mounted() {
    const vm = this;
    axios.get("user/current").catch(function (error) {
      if (error.response.status == 401) {
        vm.$router.push("/login").catch(() => {});
      }
    });
    this.getUser();
  },
  methods: {
    async logout() {
      await axios.post("user/logout");
      this.$router.push("/login");
    },
    async getUser() {
      var currentLoggedInUser = (await axios.get("user/current")).data;
      this.user = currentLoggedInUser;
      this.user.userPicture =
        axios.defaults.baseURL +
        "/media/" +
        currentLoggedInUser.profilepicturepath;
      this.profile.bio = this.user.bio;
    },
    async getOwnJams() {
      this.showJams = !this.showJams;
      if (this.showJams) {
        var vm = this;
              this.jams = [];
      var allJamIds = (await axios.get("user/jams?userID=" + vm.user.id))
        .data;
      for (let i = 0; i < allJamIds.length; i++) {
        var fullJamInfo = (await axios.get("jam?jamID=" + allJamIds[i])).data;
        vm.jams.push(fullJamInfo);
        vm.jams[i].vcomment = "";
        vm.jams[i].thumbnail =
          axios.defaults.baseURL + "media/" + fullJamInfo.thumbnailpath;
      }
      }

    },
    deleteJam(id) {
      axios.delete("jam/delete", {
        data: {
          jamID: id,
        },
      })
    },

    handleFileUpload(event) {
      console.log(event);
      this.profile.userPic = event;
    },
    checkForm() {
      if (
        (this.profile.bio !== this.user.bio &&
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
        if (this.profile.bio !== this.user.bio) {
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

<style scoped>
.deleteBtn {
  display: flex;
  position: absolute;
  top: 10px;
  right: 5px;
  z-index: 100;
  height: 24px;
}
</style>










