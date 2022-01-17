<template>
  <div>
    <div class="headerTop">
      <div class="headerTopLogo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <div class="headerTopIcons">
        <i>
           <router-link to="/Profile"><img src="https://picsum.photos/99" alt="ProfilePicture" /></router-link>
        </i>
      </div>
    </div>

    <div class="postsSettings">
      <div class="postSetting">
        <div class="postSettingsHeader">
          <div class="Title">Edit Profile</div>
        </div>
        <div class="postSettingContent">
 <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Username"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
        <v-textarea
          name="input-7-1"
          label="Description"
          value=""
          counter="100"
          auto-grow
        ></v-textarea>

  <v-file-input
    accept="image/*"
    label="Profile image"
    prepend-icon="mdi-image-outline"

  ></v-file-input>
      <v-spacer></v-spacer>
  </form>

          <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="password"
          label="password"
          @click:append="show1 = !show1"
          solo
        ></v-text-field>
                <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          name="retype-password"
          label="retype password"
          @click:append="show2 = !show2"
          solo
        ></v-text-field>
        <v-btn
        block
        color="secondary"
        :disabled="!form"
        :loading="isLoading"
        depressed
      >
        CHANGE
      </v-btn>

        </div>
        






      </div>
    </div>
  </div>
</template>

<script>
 export default {
    data () {
      return {
        show1: false,
        show2: false,
      }
    }
 }

</script>










