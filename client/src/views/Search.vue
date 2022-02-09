<template>
  <div>
    <vHeader />
    <vFooter />
    <div class="search">
      <v-autocomplete
        v-model="model"
        :loading="isLoading"
        :search-input.sync="search"
        clearable
        hide-details
        hide-selected
        hide-no-data
        item-text="name"
        item-value="symbol"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        solo
      >
      </v-autocomplete>
      <template>
        <v-list>
          <div v-for="user in users" :key="user.id">
            <v-divider></v-divider>
            <v-list-item @click="selectUser(user.id)">
              <v-list-item-avatar>
                <img :src="user.userPicture" alt="ProfilePicture" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ user.username }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </v-list>
      </template>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Vue from "vue";
import vFooter from "../components/vFooter";
import vHeader from "../components/vHeader";
export default {
  components: { vFooter, vHeader },
  data() {
    return {
      timeout: null,
      user: {},
      users: [],
      input: null,
      isLoading: false,
      model: null,
      search: null,
      val: 0,
    };
  },
  async mounted() {
    await axios.get("user/current").catch(function (error) {
      if (error.response.status == 401) {
        this.$router.push("/login").catch(() => {});
      }
    });
  },
  watch: {
    async model(val) {
      if (val != null) this.tab = 0;
      else this.tab = null;
    },

    search(model) {
      // Items have already been loaded
      this.isLoading = true;
      this.input = model;
      this.updateSearch(model);
      // Lazily load input items
    },
  },
  methods: {
    updateSearch(input, time = 2000) {
      this.users = [];
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        axios
          .get("user?usernamePattern=" + input)
          .then((res) => {
            this.users = res.data;
            this.isLoading = false;
            for (let i = 0; i < this.users.length; i++) {
              //  console.log(this.users[i].profilepicturepath)
              Vue.set(
                this.users[i],
                "userPicture",
                axios.defaults.baseURL +
                  "media/" +
                  this.users[i].profilepicturepath
              );
            }
          })

          .catch((err) => {
            console.log(err);
          });
      }, time);
    },
    selectUser(id) {
       console.log(id)
      this.$router.push("/otherProfile").catch(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
