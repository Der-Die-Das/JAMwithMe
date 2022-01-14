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
          id="password"
          name="password"
          label="password"
          type="password"
          solo
          class="test"
          color="secondary"
        ></v-text-field>
                <v-text-field
          id="password"
          name="password"
          label="retype password"
          type="password"
          solo
          class="test"
          color="secondary"
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
</script>










