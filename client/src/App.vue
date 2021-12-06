<template>
  <navigation></navigation>
  <group-form></group-form>

<div class="search my-8 py-6 px-6 mx-8  max-w-md mx-auto rounded-l shadow-md bg-white md:flex sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
    <input name="find-user" class="border mx-auto" placeholder="Rechercher un utilisateur..." v-model="findUser" />
</div>
<div class="create-group my-8 py-6 px-6 max-w-md mx-auto bg-white rounded-l shadow-md space-y-6 md:py-6 md:flex-row md:items-center md:space-y-8 md:space-x-6">
  <h2 class="text-lg text-black font-semibold">Résultat de recherche API</h2> 
    <ul v-if="user">
        <li v-for="(value, name) in user" :key="name">
        {{ value }}
        </li>
    </ul>
    <div v-else>{{ message }}</div>
</div>  
</template>

<script>
import axios from 'axios';
import groupForm from './components/group.vue';
import navigation from './components/navbar.vue';

axios.defaults.baseURL = 'http://localhost:3000';

export default {
  name: 'App',
  data() {
    return {
      message:'',
      findUser: '',
      user: '',
    };
  },
  components:{
      groupForm,
      navigation,
    },
  watch: {
      //whenever question changes, this function will run
      findUser(userId) {
        if (+userId) {
          this.getUser(userId);
        }
      }
    },
  methods: {
    async getUser(userId) {
        try {
          const resp = await axios.get(`/user/${userId}`);
          if (!resp)
            this.message = 'User not found.'

          this.user = resp.data;
          console.log(this.user );
        } catch (error) {
          this.message = `User error ${error.response.status}`;
        }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
