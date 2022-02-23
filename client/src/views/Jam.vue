<template>
  <div>
    <vHeader />
    <vFooter />
    <v-btn @click="test()">test</v-btn>
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
                v-model="newTitle"
                :counter="10"
                label="Name"
                required
                @change="checkForm()"
              ></v-text-field>
              <v-textarea
                v-model="newDescription"
                name="input-7-1"
                label="newDescription"
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
            <v-btn
              @click="postNewJam()"
              block
              color="secondary"
              :disabled="!form"
              depressed
            >
              Post
            </v-btn>
            <v-progress-circular
              v-if="isUpdating"
              class="progress"
              :size="200"
              color="blue"
              indeterminate
            ></v-progress-circular>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="preJamsAvailable">
        <div class="Title">preJams</div>
        <v-expansion-panels class="recordings">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span class="recordingContentHeader">
                {{ preJams.title }}
              </span>
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
                    <div class="recordingSettings">
                      <v-slider
                        v-model="recordingInfos[0].volume"
                        min="-30"
                        max="10"
                        value="0"
                        thumb-label
                      >
                      </v-slider>
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
                    <div class="recordingSettings">
                      <v-slider
                        v-model="recordingInfos[0].bass"
                        min="-10"
                        max="10"
                        value="0"
                        thumb-label
                      >
                      </v-slider>
                    </div>
                  </v-col>
                  <v-col> </v-col>
                  <v-col> </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="2">
                    <span>Mid</span>
                  </v-col>
                  <v-col cols="10">
                    <div class="recordingSettings">
                      <v-slider
                        v-model="recordingInfos[0].middle"
                        min="-10"
                        max="10"
                        value="10"
                        thumb-label
                        >>
                      </v-slider>
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
                    <div class="recordingSettings">
                      <v-slider
                        v-model="recordingInfos[0].treble"
                        min="-10"
                        max="10"
                        value="0"
                        thumb-label
                        >>
                      </v-slider>
                    </div>
                  </v-col>
                  <v-col> </v-col>
                  <v-col> </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="2">
                    <span>Pan</span>
                  </v-col>
                  <v-col
                    ><span class="recordingSettingStartValue">L</span></v-col
                  >
                  <v-col cols="10">
                    <div class="recordingTime">
                      <v-slider
                        v-model="recordingInfos[0].pan"
                        min="-1"
                        max="1"
                        value=""
                        step="0.1"
                        thumb-label
                      >
                      </v-slider>
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
      </div>

      <div class="Title">new Recording</div>
      <v-expansion-panels class="recordings">
        <v-expansion-panel>
          <v-expansion-panel-header>
            <span class="recordingContentHeader"> Your new Recording </span>
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
                  <div class="recordingSettings">
                    <v-slider
                      v-model="newRecording.volume"
                      min="-30"
                      max="10"
                      value="0"
                      thumb-label
                    >
                    </v-slider>
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
                  <div class="recordingSettings">
                    <v-slider
                      v-model="newRecording.bass"
                      min="-10"
                      max="10"
                      value="0"
                      thumb-label
                    >
                    </v-slider>
                  </div>
                </v-col>
                <v-col> </v-col>
                <v-col> </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="2">
                  <span>Mid</span>
                </v-col>
                <v-col cols="10">
                  <div class="recordingSettings">
                    <v-slider
                      v-model="newRecording.middle"
                      min="-10"
                      max="10"
                      value="10"
                      thumb-label
                      >
                    </v-slider>
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
                  <div class="recordingSettings">
                    <v-slider
                      v-model="newRecording.treble"
                      min="-10"
                      max="10"
                      value="0"
                      thumb-label
                      >
                    </v-slider>
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
                    <v-slider
                      v-model="newRecording.pan"
                      min="-1"
                      max="1"
                      value=""
                      step="0.1"
                      thumb-label
                    >
                    </v-slider>
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
          @click="handleFileUpload()"
          :icon="['far', 'folder']"
          style="color: black"
          size="2x"
        />
        <img src="../assets/record.svg" alt="" />

        <img src="../assets/upload.svg" alt="" @click="editPost = true" />
        <input
          ref="uploader"
          class="d-none"
          type="file"
          @change="onFileChanged"
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import vFooter from "../components/vFooter";
import vHeader from "../components/vHeader";
export default {
  components: { vFooter, vHeader },
  data() {
    return {
      isUpdating: false,
      isSelecting: false,
      editPost: false,
      user: {},
      form: false,
      rawRecording: "null",
      newjamID: null,
      newCreator: null,
      newTitle: null,
      newDescription: null,
      preJams: [],
      preJamsAvailable: false,
      postImage: null,
      newCreationDate: null,
      preJamID: null,
      recordingInfos: [],
      newRecording: {
        volume: 0,
        bass: 0,
        middle: 0,
        treble: 0,
        pan: 0,
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
    if (this.$route.query.jamID != null) {
      console.log();
      this.preJamsAvailable = true;
      axios.get("jam?jamID=" + this.$route.query.jamID).then((preJamResp) => {
        this.preJams = preJamResp.data;
        this.recordingInfos = preJamResp.data.recordinginfos;
        console.log(preJamResp.data.recordinginfos);
      });
    }
  },
  methods: {
    checkForm() {
      if (
        this.newTitle &&
        this.newDescription &&
        this.postImage &&
        this.newTitle.length <= 10 &&
        this.newDescription.length <= 100
      ) {
        this.form = true;
      } else {
        this.form = false;
      }
    },
    handleFileUpload() {
      this.isSelecting = true;

      // After obtaining the focus when closing the FilePicker, return the button state to normal
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      // Trigger click on the FileInput
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.rawRecording = e.target.files[0];
      this.handleFileUpload(this.rawRecording);
      console.log(this.rawRecording);

      // Do whatever you need with the file, liek reading it with FileReader
    },

    updateRecordingSettings() {
      console.log(this.recordingInfos);
    },

    test() {
      this.recordingInfos.push(this.newRecording);
      console.log(this.recordingInfos);
    },
    async postNewJam() {
      this.isUpdating = true;
      this.recordingInfos.push(this.newRecording);
      let formData = new FormData();
      formData.append("rawrecording", this.rawRecording);
      formData.append("thumbnail", this.postImage);
      formData.append("title", this.newTitle);
      formData.append("description", this.newDescription);
      if (this.preJamID != null) formData.append("preJamID", this.preJamID);
      // formData.append("recordinginfos", [this.recordingInfos]);
      formData.append("recordinginfos", JSON.stringify(this.recordingInfos));
      await axios.post("jam/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      this.$router.push("/feed").catch(() => {});
      this.isUpdating = false;
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
  
  
  
  
  
  
  
  
  
  
  
