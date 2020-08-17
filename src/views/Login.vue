<template>
  <div class="login">
    <h1>Login</h1>
    <form method="post" @submit.prevent="login">
        Email : <input type="email" name="email" value="" v-model="user.email"/>
        <div v-if="validationErrors.email" class="text-danger">{{ validationErrors.email[0] }}</div>
        <br/>
        Password : <input type="password" name="password" value="" v-model="user.password"/>
        <div v-if="validationErrors.password" class="text-danger">{{ validationErrors.password[0] }}</div>
        <br/>
        <input type="submit" name="login" value="login"/>
    </form>
  </div>
</template>

<script>
export default {
  data(){
      return{
          user:{},
          validationErrors:[],
      }
  },
  name: "Login",
  components: {},
  methods:{
    login(){
      this.$store.dispatch('auth/user_login',this.user).then(response=>{
        if(response.data.success == true){
            var userdetails = JSON.stringify({ islogin:true, login_user_token:response.data.data.token })
            sessionStorage.setItem('userdetails', userdetails);
            this.user = {};
            this.$router.push({ name:'Home' });
        } else if(response.data.success == false){
            this.validationErrors = [];
            this.validationErrors = response.data.message;
        }
      }).catch(error=>{
        console.log(error);
      });
    }
  }
};
</script>
