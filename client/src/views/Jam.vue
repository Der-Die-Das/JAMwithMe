<template>
  <div>
    <vHeader />
    <vFooter />
    <v-progress-circular
      v-if="isLoading"
      class="progress"
      :size="200"
      color="blue"
      indeterminate
    ></v-progress-circular>
    <div v-else>
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
                  :counter="32"
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
          <v-expansion-panels
            accordion
            class="recordings"
            v-model="preJamsPanel"
          >
            <v-expansion-panel
              @click="closeNewRecording()"
              v-for="preJam in preJams"
              :key="preJam.title"
            >
              <v-expansion-panel-header>
                <span class="recordingContentHeader">
                  {{ preJam.title }}
                </span>
              </v-expansion-panel-header>

              <v-expansion-panel-content class="recording">
                <div class="recordingContent">
                  <v-row class="mb-5" no-gutters>
                    <v-col cols="2">
                      <span>Time</span>
                    </v-col>
                    <v-col>
                      <span class="recordingSettingStartValue"
                        >00:12</span
                      ></v-col
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
                          v-model="preJam.volume"
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
                          v-model="preJam.bass"
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
                          v-model="preJam.middle"
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
                          v-model="preJam.treble"
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
                          v-model="preJam.pan"
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
        <v-expansion-panels
          accordion
          class="recordings"
          v-model="newRecordingPanel"
        >
          <v-expansion-panel @click="closePreJams()">
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
                      <v-slider @change="timeChanged($event)"> </v-slider>
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
                          @click="playOrPause()"
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
                        @change="volChanged($event)"
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
                        @change="bassChanged($event)"
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
                        @change="midChanged($event)"
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
                        @change="trebleChanged($event)"
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
                  <v-col
                    ><span class="recordingSettingStartValue">L</span></v-col
                  >
                  <v-col cols="10">
                    <div class="recordingTime">
                      <v-slider
                        v-model="newRecording.pan"
                        min="-1"
                        max="1"
                        value=""
                        step="0.1"
                        thumb-label
                        @change="panChanged($event)"
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
  </div>
</template>
  
  <script>
import axios from "axios";
import vFooter from "../components/vFooter";
import vHeader from "../components/vHeader";
import tone from "../functions/tone";
var jamPlayers = new tone.JamPlayers(axios.defaults.baseURL + "media/");
export default {
  components: { vFooter, vHeader },
  data() {
    return {
      isLoading: true,
      items: [{ message: "Foo" }, { message: "Bar" }],
      preJamsPanel: null,
      newRecordingPanel: null,
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
      preJamIDs: [],
      preJamCount: null,
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
      this.preJamsAvailable = true;

      this.preJams = [];

      var fullPreJamInfo = (
        await axios.get("jam?jamID=" + this.$route.query.jamID)
      ).data;
      fullPreJamInfo.recordinginfos[0].title = fullPreJamInfo.title;
      this.preJamIDs.push(fullPreJamInfo.prejam);
      this.preJamCount = fullPreJamInfo.recordinginfos.length;
      this.getPreJams(this.$route.query.jamID);
      this.preJams = fullPreJamInfo.recordinginfos;
      this.preJams.reverse();
      this.preJamID = this.$route.query.jamID;
    } else {
      this.isLoading = false;
    }
  },
  methods: {
    closePreJams() {
      this.preJamsPanel = null;
    },
    closeNewRecording() {
      this.newRecordingPanel = null;
    },

    async getPreJams(id) {
      const vm = this;
      var tempID = id;

      if (vm.preJamCount != 0) {
        for (let i = 0; i < vm.preJamCount; i++) {
          await axios.get("jam?jamID=" + tempID).then(function (nextpreJam) {
            vm.preJamIDs.unshift(nextpreJam.data.prejam);
            if (nextpreJam.data.prejam != null) {
              tempID = nextpreJam.data.prejam.toString();
            }
            vm.preJams[i].title = nextpreJam.data.title;
            vm.preJams.unshift();
          });
        }
      }

      this.isLoading = false;
    },
    checkForm() {
      if (
        this.newTitle &&
        this.newDescription &&
        this.postImage &&
        this.newTitle.length <= 32 &&
        this.newDescription.length <= 100
      ) {
        this.form = true;
      } else {
        this.form = false;
      }
    },
    handleFileUpload() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    async onFileChanged(e) {
      this.rawRecording = e.target.files[0];
      this.handleFileUpload(this.rawRecording);
      var arrayBuffer = await e.target.files[0].arrayBuffer();
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      jamPlayers.loadJam({
        id: 1,
        recordinginfos: [
          {
            id: 1,
            pan: 0,
            volume: 10,
            bass: 0,
            treble: 0,
            middle: 0,
            recording_rawrecording: {
              buffer: audioBuffer,
            },
          },
        ],
      });
    },

    async postNewJam() {
      this.isUpdating = true;
      this.preJams.push(this.newRecording);
      let formData = new FormData();
      formData.append("rawrecording", this.rawRecording);
      formData.append("thumbnail", this.postImage);
      formData.append("title", this.newTitle);
      formData.append("description", this.newDescription);
      if (this.preJamID != null) formData.append("preJamID", this.preJamID);
      formData.append("recordinginfos", JSON.stringify(this.preJams));
      await axios.post("jam/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      this.$router.push("/feed").catch(() => {});
      this.isUpdating = false;
    },
    playOrPause() {
      console.log("test");
      jamPlayers.playOrPause(1);
    },
    timeChanged($event) {
      jamPlayers.setTime(1, (jamPlayers.getDuration(1) * $event) / 100);
      jamPlayers.playing = true;
    },
    volChanged($event) {
      var currentRecordingInfo = jamPlayers.jamPlayers[0].recordinginfos;
      currentRecordingInfo[0].volume = $event;
      jamPlayers.setSettings(1, currentRecordingInfo);
    },
    bassChanged($event) {
      var currentRecordingInfo = jamPlayers.jamPlayers[0].recordinginfos;
      currentRecordingInfo[0].bass = $event;
      jamPlayers.setSettings(1, currentRecordingInfo);
    },
    midChanged($event) {
      var currentRecordingInfo = jamPlayers.jamPlayers[0].recordinginfos;
      currentRecordingInfo[0].middle = $event;
      jamPlayers.setSettings(1, currentRecordingInfo);
    },
    trebleChanged($event) {
      var currentRecordingInfo = jamPlayers.jamPlayers[0].recordinginfos;
      currentRecordingInfo[0].treble = $event;
      jamPlayers.setSettings(1, currentRecordingInfo);
    },
    panChanged($event) {
      var currentRecordingInfo = jamPlayers.jamPlayers[0].recordinginfos;
      currentRecordingInfo[0].pan = $event;
      jamPlayers.setSettings(1, currentRecordingInfo);
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
  
  
  
  
  
  
  
  
  
  
  

