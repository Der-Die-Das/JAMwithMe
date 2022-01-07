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
           <router-link to="/Profile"><img src="https://picsum.photos/99" alt="ProfilePicture" /></router-link>
        </i>
      </div>
    </div>

    <div class="postsSettings">
      <div class="postSetting">
        <div class="postSettingsHeader">
          <div class="postSettingName">Edit Post</div>
          <hr class="solid" />
        </div>
        <div class="postSettingContent">
          <div class="postSettingContentHeader">Name:</div>
          <input
            class="postSettingText"
            v-model="message"
            placeholder="add a name..."
          />
        </div>
        <div class="postSettingContent">
          <div class="postSettingContentHeader">Genre:</div>
          <input
            class="postSettingText"
            v-model="message"
            placeholder="add genres..."
          />
        </div>
                <div class="postSettingContent">
          <div class="postSettingContentHeader">Tags:</div>
          <input
            class="postSettingText"
            v-model="message"
            placeholder="add tags..."
          />
        </div>
                <div class="postSettingContent">
          <div class="postSettingContentHeader">Description:</div>
          <textarea class="postSettingText" name="Text1" cols="40" rows="5"></textarea>

  
        </div>
                <div class="postSettingContent">
          <span class="postSettingContentHeader">Image:
                            <img src="../assets/upload.svg" alt="" />
          </span>

        </div>
        






      </div>
    </div>
  </div>
</template>

<script>


</script>










