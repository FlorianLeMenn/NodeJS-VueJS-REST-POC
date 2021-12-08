<template>
    <h1 class="text-xl font-semibold max-w-md mx-auto text-center" >Liste des groupes</h1>
    <group-form></group-form>
</template>

<script>
import groupForm from '../components/group-form.vue';

export default {
  name: 'Home',
  data() {
    return {
      message:'',
    };
  },
  components:{
      groupForm,
    },
}
</script>