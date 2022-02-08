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
          autocomplete="on"
          solo
        ></v-text-field>
        <v-text-field
          v-model="credentials.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="password"
          label="password"
          autocomplete="current-password"
          @click:append="show1 = !show1"
          solo
        ></v-text-field>
        <v-btn @click="submit" color="secondary" block>log in</v-btn>
      </v-form>

      <v-container class="test2">
        <v-row>
          <v-divider></v-divider>
          <div class="test">or</div>
          <v-divider></v-divider>
        </v-row>
      </v-container>
      <v-btn to="/register" block color="secondary">sign up</v-btn>
    </div>
    <v-dialog v-model="passwordErrorDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Login failed
        </v-card-title>

        <v-card-text> The username or password is incorrect” </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="passwordErrorDialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      show1: false,
      passwordErrorDialog: false,
      credentials: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    async submit() {
      const vm = this;
      axios
        .post("user/login", {
          username: this.credentials.username,
          password: this.credentials.password,
        })
        .then(function () {
          vm.$router.push("/feed");
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            //vm.$router.push("/register");
            vm.credentials.password = null;
            vm.passwordErrorDialog = true;
          }
        });
    },
  },
};
</script>