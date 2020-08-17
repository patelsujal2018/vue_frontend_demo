<template>
  <div class="home">
    <h1>Home</h1>
    <table align="center" border="1">
      <tr>
        <th>No</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Email</th>
      </tr>
      <tr v-for="(user,index) in userlist" :key="index">
        <td>{{ index+1 }}</td>
        <td>{{ user.firstname }}</td>
        <td>{{ user.lastname }}</td>
        <td>{{ user.email }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  mounted(){
    this.getUserList();
  },
  computed:{
    userlist(){
      return this.$store.getters['users/getuserlist'];
    }
  },
  methods:{
    getUserList(){
      this.$store.dispatch('users/get_user_list').then(response=>{
        console.log(response);
      }).catch(error=>{
        console.log(error);
      });
    }
  }
};
</script>
