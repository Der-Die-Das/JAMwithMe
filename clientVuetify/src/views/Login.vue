<template>
  <v-container>
    <div class="credentials">
      <img src="../assets/logo.png" alt="Logo" />
      <v-form>
        <v-text-field
          v-model="credentials.username"
          name="username"
          label="username or email"
          type="text"
          solo
        ></v-text-field>
        <v-text-field
          v-model="credentials.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="password"
          label="password"
          @click:append="show1 = !show1"
          solo
        ></v-text-field>
        <v-btn @click="submit" color="secondary" block>log in</v-btn>
      </v-form>

      <v-container class="test2">
        <v-row >
          <v-divider></v-divider>
          <div class="test">or</div>
          <v-divider></v-divider>
        </v-row>
      </v-container>
      <v-btn block color="secondary">sign up</v-btn>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
            show1: false,
      credentials: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    submit() {
      console.log(this.credentials.username);
      axios.post('http://localhost:3000/api/user/login', {
        username: this.credentials.username,
        password: this.credentials.password,
      });
    },
  },
};
</script>