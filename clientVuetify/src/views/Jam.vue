<template>
  <div>
    <div class="headerTop">
      <div class="headerTopLogo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <div class="headerTopIcons">
        <i
          ><a href="#"
            ><font-awesome-icon
              :icon="['far', 'heart']"
              style="color: black"
              size="lg" /></a
        ></i>
        <i>
          <router-link to="/Profile"
            ><img src="https://picsum.photos/99" alt="ProfilePicture"
          /></router-link>
        </i>
      </div>
    </div>
    <div class="recordingName">new Recording</div>
    <v-expansion-panels class="recordings">
      <v-expansion-panel v-model="panel" v-for="(item, i) in 5" :key="i">
        <v-expansion-panel-header>
          <span class="recordingContentHeader">RecordingXX</span>
        </v-expansion-panel-header>

        <v-expansion-panel-content class="recording">
          <div class="recordingContent">
            <div class="recordingTime">
              <span class="recordingSettingTitle">Time</span>
              <span class="slidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value="50"
                  class="slider2"
                />
              </span>
              <span class="recordingSettingStartValue">00:12</span>
              <span class="recordingSettingEndValue">03:02</span>
            </div>
            <div class="recordingTimeControl">
              <span><font-awesome-icon icon="undo" /></span>
              <span><font-awesome-icon
                :icon="['far', 'pause-circle']"
                style="color: black"
                size="lg"
              /></span>
              <span><font-awesome-icon icon="undo" flip="horizontal" /></span>
              
              
            </div>

            <div class="recordingVol">
              <span class="recordingSettingTitle">Vol</span>
              <span class="slidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value="50"
                  class="slider"
                />
              </span>
            </div>
            <div class="recordingBass">
              <span class="recordingSettingTitle">Bass</span>
              <span class="slidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value="50"
                  class="slider"
                />
              </span>
            </div>
            <div class="recordingTreble">
              <span class="recordingSettingTitle">Treble</span>
              <span class="slidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value="50"
                  class="slider"
                />
              </span>
            </div>
            <div class="recordingPan">
              <span class="recordingSettingTitle">Pan</span>
              <span class="slidecontainer">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value="50"
                  class="slider2"
                />
              </span>
              <span class="recordingSettingStartValue">L</span>

              <span class="recordingSettingEndValue">R</span>
            </div>
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
      <img src="../assets/upload.svg" alt="">
    </div>
  </div>
</template>
  
  <script>
</script>
  
  
  
  
  
  
  
  
  
  
  