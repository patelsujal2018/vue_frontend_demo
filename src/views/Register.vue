<template>
  <div class="register">
    <h1>Register</h1>
    <form method="post" @submit.prevent="register">
        Firstname : <input type="text" name="firstname" value="" v-model="user.firstname"/>
        <div v-if="validationErrors.firstname" class="text-danger">{{ validationErrors.firstname[0] }}</div>
        <br/>
        Lastname : <input type="text" name="lastname" value="" v-model="user.lastname"/>
        <div v-if="validationErrors.lastname" class="text-danger">{{ validationErrors.lastname[0] }}</div>
        <br/>
        Email : <input type="email" name="email" value="" v-model="user.email"/>
        <div v-if="validationErrors.email" class="text-danger">{{ validationErrors.email[0] }}</div>
        <br/>
        Password : <input type="password" name="password" value="" v-model="user.password"/>
        <div v-if="validationErrors.password" class="text-danger">{{ validationErrors.password[0] }}</div>
        <br/>
        Confirm Password : <input type="password" name="confirm_password" value="" v-model="user.confirm_password"/>
        <div v-if="validationErrors.confirm_password" class="text-danger">{{ validationErrors.confirm_password[0] }}</div>
        <br/>
        <input type="submit" name="register" value="register"/>
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
  name: "Register",
  components: {},
  methods:{
    register(){
      this.$store.dispatch('auth/user_register',this.user).then(response=>{
        if(response.data.success == true){
          var userdetails = JSON.stringify({ islogin:true, loginUserToken:response.data.data.token })
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
