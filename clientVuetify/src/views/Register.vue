<template>
  <div>
    <div class="credentials">
      <img src="../assets/logo.png" alt="Logo" />
      <v-form>
        <v-text-field
          name="login"
          label="email"
          type="text"
          solo
          class="test"
        ></v-text-field>
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
      </v-form>

          <v-btn
      block
            color ="secondary"
      >register</v-btn>
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










