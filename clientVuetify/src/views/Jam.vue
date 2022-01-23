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
              <v-col>                <span class="recordingSettingStartValue ">00:12</span></v-col>
              <v-col cols="10">
                <div class="recordingTime">
                  <v-slider> </v-slider>
                </div>
              </v-col>
              <v-col >
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
              <span><font-awesome-icon icon="undo" flip="horizontal" /></span>
            </div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2">
                <span>Vol</span>
              </v-col>
              <v-col cols="10">
                <div class="recordingVol">
                  <v-slider > </v-slider>
                </div>
              </v-col>
              <v-col>
              </v-col> 
              <v-col>
              </v-col>
            </v-row>
                        <v-row no-gutters>
              <v-col cols="2">
                <span>Bass</span>
              </v-col>
              <v-col cols="10">
                <div class="recordingBass">
                  <v-slider > </v-slider>
                </div>
              </v-col>
              <v-col>
              </v-col> 
              <v-col>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2">
                <span>Treble</span>
              </v-col>
              <v-col cols="10">
                <div class="recordingTreble">
                  <v-slider > </v-slider>
                </div>
              </v-col>
              <v-col>
              </v-col> 
              <v-col>
              </v-col>
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
              <v-col>
              </v-col>
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
      <router-link to="/Post"
        ><img src="../assets/upload.svg" alt="" />
      </router-link>
    </div>
  </div>
</template>
  
  <script>
</script>
  
  
  
  
  
  
  
  
  
  
  