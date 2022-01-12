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
 <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Genre"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="32"
      label="Tags"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
        <v-textarea
          name="input-7-1"
          label="Description"
          value=""
          auto-grow
        ></v-textarea>

  <v-file-input
    accept="image/*"
    label="Image"
    prepend-icon="mdi-image-outline"

  ></v-file-input>
      <v-spacer></v-spacer>
  </form>
        <v-btn
        block
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
      >
        Post
      </v-btn>

        </div>
        






      </div>
    </div>
  </div>
</template>

<script>


</script>










