<template>
  <div>
    <nav class="navbar navbar-expand-sm bg-light">
      <div class="collapse navbar-collapse">
        <div class="navbar-nav mr-auto">
          <div class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Home' }">Home</router-link>
          </div>
          <div class="nav-item">
            <router-link class="nav-link" :to="{ name: 'Products' }">Products</router-link>
          </div>
        </div>
        <span class="navbar-text">
          <b-button variant="outline-danger" @click="logout()">Logout</b-button>
        </span>
      </div>

    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "Frontend",
  methods: {
    logout(){
      sessionStorage.removeItem('userdetails');
      this.$router.push({ name:'Login' });
      /* this.$store.dispatch('auth/user_login',this.user).then(response=>{
        if(response.data.success == true){
          sessionStorage.setItem('userdetails', {});
          this.$router.push({ name:'Login' });
        }
      }).catch(error=>{
        console.log(error);
      }); */
    }
  }
}
</script>
<style scoped>
</style>