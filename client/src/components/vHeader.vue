   <template>
  <div class="headerTop">
    <div class="headerTopLogo">
<router-link to="/Feed"
            >
      <img src="../assets/logo.png" alt="Logo">
      </router-link>
    </div>
    <div class="headerTopIcons">
      <i>
        <router-link to="/Profile">
          <img :src="user.profilePicture" alt="PP"/>
        </router-link>
      </i>
    </div>
  </div>
</template>

      <script>
import axios from "axios";

export default {
  data() {
    return {
      user: {},
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
};
</script>
      