<template>
  <div>
    <div class="credentials">
      <img src="../assets/logo.png" alt="Logo" />
      <v-form>
        <v-text-field
          v-model="credentials.username"
          name="login"
          label="username"
          type="text"
          solo
          class="test"
        ></v-text-field>
        <v-text-field
          v-model="credentials.email"
          name="login"
          label="email"
          type="text"
          solo
          class="test"
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
        <v-text-field
          v-model="passwordCheck"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          name="retype-password"
          label="retype password"
          @click:append="show2 = !show2"
          solo
        ></v-text-field>
      </v-form>

      <v-btn block color="secondary" @click="register()">register</v-btn>
    </div>
    <v-dialog v-model="userErrorDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Register Error
        </v-card-title>

        <v-card-text> Please choose a different Username. </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="(userErrorDialog = false)"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="passwordErrorDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Register Error
        </v-card-title>

        <v-card-text>
          your passwords do not match. please try again
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="(passwordErrorDialog = false)"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userErrorDialog: false,
      passwordErrorDialog: false,
      show1: false,
      show2: false,
      passwordCheck: null,
      credentials: {
        username: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    register() {
      const vm = this;
      if (this.credentials.password == this.passwordCheck) {
        console.log(this.credentials.username);
        axios
          .post("user/register", {
            username: this.credentials.username,
            email: this.credentials.email,
            password: this.credentials.password,
          })
          .then(function () {
            vm.$router.push("/feed");
          })
          .catch(function (error) {
            console.log(error.response.status); // 401
            console.log(error.response.data.error); //Please Authenticate or whatever returned from server
            if (error.response.status == 401) {
              //vm.$router.push("/register");
              vm.credentials.username = null;
              vm.userErrorDialog = true;
            }
          });
      } else {
        this.credentials.password = null;
        this.passwordCheck = null;
        this.passwordErrorDialog = true;
      }
    },
  },
};
</script>










