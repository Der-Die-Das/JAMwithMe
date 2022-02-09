<template>
  <div>
    <vHeader />
    <vFooter />
    <div v-if="editPost">
      <div class="postsSettings">
        <div class="postSetting">
          <div class="postSettingsHeader">
            <span class="Title">Edit Post</span>
            <span
              style="float: right; margin-right: 10px"
              @click="editPost = false"
              >edit Jam</span
            >
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
    <div v-else>
      <div class="Title">new Recording</div>
      <v-expansion-panels class="recordings">
        <v-expansion-panel v-for="(item, i) in 5" :key="i">
          <v-expansion-panel-header>
            <span class="recordingContentHeader">RecordingXX</span>
          </v-expansion-panel-header>

          <v-expansion-panel-content class="recording">
            <div class="recordingContent">
              <v-row class="mb-5" no-gutters>
                <v-col cols="2">
                  <span>Time</span>
                </v-col>
                <v-col>
                  <span class="recordingSettingStartValue">00:12</span></v-col
                >
                <v-col cols="10">
                  <div class="recordingTime">
                    <v-slider> </v-slider>
                  </div>
                </v-col>
                <v-col>
                  <span class="recordingSettingEndValue">03:02</span>
                </v-col>

                <v-col>
                  <div class="recordingTimeControl">
                    <span><font-awesome-icon icon="undo" /></span>
                    <span
                      ><font-awesome-icon
                        :icon="['far', 'pause-circle']"
                        style="color: black"
                        size="lg"
                    /></span>
                    <span
                      ><font-awesome-icon icon="undo" flip="horizontal"
                    /></span>
                  </div>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="2">
                  <span>Vol</span>
                </v-col>
                <v-col cols="10">
                  <div class="recordingVol">
                    <v-slider> </v-slider>
                  </div>
                </v-col>
                <v-col> </v-col>
                <v-col> </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="2">
                  <span>Bass</span>
                </v-col>
                <v-col cols="10">
                  <div class="recordingBass">
                    <v-slider> </v-slider>
                  </div>
                </v-col>
                <v-col> </v-col>
                <v-col> </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="2">
                  <span>Treble</span>
                </v-col>
                <v-col cols="10">
                  <div class="recordingTreble">
                    <v-slider> </v-slider>
                  </div>
                </v-col>
                <v-col> </v-col>
                <v-col> </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="2">
                  <span>Pan</span>
                </v-col>
                <v-col><span class="recordingSettingStartValue">L</span></v-col>
                <v-col cols="10">
                  <div class="recordingTime">
                    <v-slider> </v-slider>
                  </div>
                </v-col>
                <v-col>
                  <span class="recordingSettingEndValue">R</span>
                </v-col>
                <v-col> </v-col>
              </v-row>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="recordings"></div>
      <div class="newRecord">
        <font-awesome-icon
          :icon="['far', 'folder']"
          style="color: black"
          size="2x"
        />
        <img src="../assets/record.svg" alt="" />

        <img src="../assets/upload.svg" alt="" @click="editPost = true" />
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
      editPost: false,
      user: {},
      form: false,
      postName: null,
      postDescription: null,
      postImage: null,
      preJamID: null,
      recordingInfos: [
        // jam = "asdf",
        // recording = "0",
        // volume = "0",
        // pan = "0",
        // middle = "0",
        // bass = "0",
        // treble = "0",
      ],
    };
  },

  async mounted() {
    await axios.get("user/current").catch(function (error) {
      if (error.response.status == 401) {
        this.$router.push("/login").catch(() => {});
      }
    });
  },
  methods: {
    checkForm() {
      if (
        this.postName &&
        this.postDescription &&
        this.postImage &&
        this.postName.length <= 10 &&
        this.postDescription.length <= 100
      ) {
        this.form = true;
      } else {
        this.form = false;
      }
    },
  },
};
</script>
  
  
  
  
  
  
  
  
  
  
  