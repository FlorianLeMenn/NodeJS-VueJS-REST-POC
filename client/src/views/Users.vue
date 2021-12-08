<template>
    <h1 class="text-xl font-semibold max-w-md mx-auto text-center" >Page users</h1>
    <div class="search my-8 py-6 px-6 mx-8  max-w-md mx-auto rounded-l shadow-md bg-white md:flex sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <label for="find-user" class="">API user route : /user:id</label>
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
axios.defaults.baseURL = 'http://localhost:3000';

export default {
  name: 'Users',
  data() {
    return {
      message:'',
      error: '',
      user: '',
      findUser: ''
    };
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
        } catch (error) {
          this.error = `User error ${error.response.status}`;
        }
    },
  },
}
</script>