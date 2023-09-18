<template>

</template>

<script>
import api from '@/utils/api.js'

export default {
  data() {
    return {
      user: null,
      loading: {
        login: false,
      }
    };
  },
  create() {
    console.log('user');
    this.user = localStorage.getItem('user');
    console.log(this.user);
  },
  methods: {

  },
};
</script>

<style scoped>
.bg-school {
  background: url('../assets/back-to-school.jpg');
  background-size: cover;
}
</style>
