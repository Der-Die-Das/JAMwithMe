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

          <v-btn
      block
            color ="secondary"
            @click="register()"
      >register</v-btn>
    </div>
    <v-dialog
      v-model="dialog"
      width="500"
    >


      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

 export default {
    data () {
      return {
        dialog: false,
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
      if (this.credentials.password == this.passwordCheck){
              console.log(this.credentials.username);
      axios.post('http://localhost:3000/api/user/register', {
        username: this.credentials.username,
        email: this.credentials.email,
        password: this.credentials.password,
      });
      }
      else{
        this.credentials.password = null;
        this.passwordCheck = null;

      }

    },
  },
};
      
</script>










