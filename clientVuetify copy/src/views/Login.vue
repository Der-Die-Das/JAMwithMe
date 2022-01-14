<template>
<v-container>

    <div class="credentials">
      <img src="../assets/logo.png" alt="Logo" />
      <v-form>
        <v-text-field
          name="login"
          label="username or email"
          type="text"
          solo
          class="test"
        ></v-text-field>
        <v-text-field
          id="password"
          name="password"
          label="password"
          type="password"
          solo
          class="test"
        ></v-text-field>
      </v-form>
      <v-btn
      color ="secondary"
      block
      >log in</v-btn>


    <v-container class="test2">
      <v-row align="top">
        <v-divider></v-divider><div class="test"> or </div><v-divider></v-divider>
      </v-row>
    </v-container>
          <v-btn
      block
            color ="secondary"
      >sign up</v-btn>
    </div>
    </v-container>

</template>

<script>
</script>










