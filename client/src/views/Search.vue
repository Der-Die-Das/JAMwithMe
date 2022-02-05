<template>
  <div>
    <div class="headerTop">
      <div class="headerTopLogo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <div class="headerTopIcons">
        <i>
          <router-link to="/Profile">  <img :src="user.profilePicture" alt="ProfilePicture" />
          </router-link>
        </i>
      </div>
    </div>
    <div class="search">
      <v-autocomplete
      v-model="model"
        :items="items"
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
      <template >
        <v-tabs
          v-model="tab"
          color="blue-grey"
          slider-color="blue-grey"
        >
           <v-tab v-model="tab">
            <v-icon>
              mdi-menu
            </v-icon>
          </v-tab>
          <v-tab v-model="tab">
            <v-icon>
              mdi-account-outline
            </v-icon>
          </v-tab>
           <v-tab v-model="tab">
            <v-icon>
              mdi-pound
            </v-icon>
          </v-tab>
        </v-tabs>
<v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item.tab"
      >
    <v-list>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
          
        
      </v-tab-item>
    </v-tabs-items>

      </template>
    </div>
    </div>
</template>


<script>
import axios from "axios";
  export default {
    data () {
      return {
              user: {},
        isLoading: false,
        tab: null,
        model: null,
      search: null,
      val:  0,
items: [
        { header: 'Profiles' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
        },        
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ',
  
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
         
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
         
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
         
        },
      ],
    };
  },
          async mounted() {
    var currentLoggedInUser = (await axios.get("user/current")).data;
    this.user = currentLoggedInUser;
    this.user.profilePicture =
      axios.defaults.baseURL +
      "/media/" +
      currentLoggedInUser.profilepicturepath;
    },
        watch: {
      model (val) {
        if (val != null) this.tab = 0
        else this.tab = null
      },
      search () {
        // Items have already been loaded
        if (this.items.length > 0) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://api.coingecko.com/api/v3/coins/list')
          .then(res => res.clone().json())
          .then(res => {
            this.items = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },
  }
      
      
    

  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
