<template>
  <navigation></navigation>
  <router-view/>
</template>

<script>
import navigation from './components/Navbar.vue';

export default {
    name: 'App',
    data() {
      return {
        message:'',
      };
    },
    components:{
      navigation,
      },
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
