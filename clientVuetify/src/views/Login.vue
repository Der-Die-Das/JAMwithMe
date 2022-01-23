<template>
  <v-container>
    <!-- <div class="credentials">
      <img src="../assets/logo.png" alt="Logo" />
      <v-form>
        <v-text-field
          name="login"
          label="username or email"
          type="text"
          solo
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="password"
          label="password"
          @click:append="show1 = !show1"
          solo
        ></v-text-field>
      </v-form>
      <v-btn color="secondary" block>log in</v-btn>

      <v-container class="test2">
        <v-row align="top">
          <v-divider></v-divider>
          <div class="test">or</div>
          <v-divider></v-divider>
        </v-row>
      </v-container>
      <v-btn block color="secondary">sign up</v-btn>
    </div> -->
    <input type="text" v-model="credentials.username" />
    <button @click="submit">login</button>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return { credentials: { username: "asd", password: "asd" } };
  },
  methods: {
    submit: function () {
      console.log(this.credentials.username);
    },
  },
};
</script>










