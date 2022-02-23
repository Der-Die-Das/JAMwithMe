<template>
  <div>
    <vHeader />
    <vFooter />
    <div v-if="editPost">
      <div class="postsSettings">
        <div class="postSetting">
          <div class="postSettingsHeader">
            <span class="newTitle">Edit Post</span>
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
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="newTitle">new Recording</div>
      <v-expansion-panels class="recordings">
        <v-expansion-panel>
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
                      v-model="recordingInfos.volume"
                      min="-30"
                      max="10"
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
                      v-model="recordingInfos.bass"
                      min="-10"
                      max="10"
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
                      v-model="recordingInfos.middle"
                      min="-10"
                      max="10"
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
                      v-model="recordingInfos.treble"
                      min="-10"
                      max="10"
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
                <v-col><span class="recordingSettingStartValue">L</span></v-col>
                <v-col cols="10">
                  <div class="recordingTime">
                    <v-slider
                      v-model="recordingInfos.pan"
                      min="-1"
                      max="1"
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
      <div class="newRecord" @click="handleFileUpload()">
        <font-awesome-icon
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
import tone from "../functions/tone";
var jamPlayers = new tone.JamPlayers(axios.defaults.baseURL + "media/");
export default {
  components: { vFooter, vHeader },
  data() {
    return {
      isSelecting: false,
      editPost: false,
      user: {},
      form: false,
      rawRecording: "null",
      newjamID: null,
      newCreator: null,
      newTitle: null,
      newDescription: null,
      preJam: null,
      postImage: null,
      newCreationDate: null,
      preJamID: null,
      recordingInfos: [
        {
          volume: "0",
          pan: "0",
          bass: "0",
          middle: "0",
          treble: "0",
        },
      ],
    };
  },

  async mounted() {
    const vm = this;
    axios.get("user/current").catch(function (error) {
      if (error.response.status == 401) {
        vm.$router.push("/login").catch(() => {});
      }
    });
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
    async onFileChanged(e) {
      this.rawRecording = e.target.files[0];
      this.handleFileUpload(this.rawRecording);

      // Do whatever you need with the file, like reading it with FileReader
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

    updateRecordingSettings() {
      console.log(this.recordingInfos);
    },
    async postNewJam() {
      let formData = new FormData();
      formData.append("rawrecording", this.rawRecording);
      formData.append("thumbnail", this.postImage);
      formData.append("title", this.newTitle);
      formData.append("description", this.newDescription);
      if (this.preJamID != null) formData.append("preJamID", this.preJamID);
      // formData.append("recordinginfos", [this.recordingInfos]);
      formData.append("recordinginfos", JSON.stringify(this.recordingInfos));

      console.log(formData);
      console.log(this.recordingInfos);
      await axios.post("jam/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
  
  
  
  
  
  
  
  
  
  
  