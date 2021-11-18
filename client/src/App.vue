<template>
  <h1>Hello</h1>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <p>
        <span class="tag is-primary">{{ i + 1 }}</span>
        Name : {{ item.username }}
      </p>
    </div>

</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
  name: 'App',
  data() {
    return {
      items: []
    };
  },
  async mounted () {
    const resp = await axios.get('/users')
    this.items = resp.data;
    console.log(this.items);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
