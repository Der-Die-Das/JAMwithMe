<template>
  <div>
    <div class="headerTop">
      <div class="headerTopLogo">
        <img src="../assets/logo.png" alt="Logo" />
      </div>
      <div class="headerTopIcons">
        <i
          ><a href="#"
            ><font-awesome-icon
              :icon="['far', 'heart']"
              style="color: black"
              size="lg" /></a
        ></i>
        <i>
           <router-link to="/Profile"><img src="https://picsum.photos/99" alt="ProfilePicture" /></router-link>
        </i>
      </div>
    </div>

    <div class="search">
    
    </div>
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
