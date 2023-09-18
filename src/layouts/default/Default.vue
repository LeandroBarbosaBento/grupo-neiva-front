<template>
  <v-app id="inspire">
    <v-app-bar flat>
      <v-app-bar-title>Students Manager</v-app-bar-title>

      <template v-slot:append>
        <v-btn icon="mdi-github"></v-btn>


        <v-btn
          prepend-icon="mdi-logout"
          @click="logout"
        >
          <template v-slot:prepend>
            <v-icon color="black"></v-icon>
          </template>
          Logout
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import api from '@/utils/api.js'

export default {
  data: () => ({
    loading: {
      logout: false,
    },
    user: null,
  }),
  created() {
    this.user = JSON.parse(localStorage.getItem('user'));
  },
  methods: {
    logout() {

      this.loading.logout = true;

      api.post('/auth/logout')
        .then(() => {
          this.$router.push('/login')
        })
        .catch((e) => {
          console.log('error');
          console.log(e);
        })
        .finally(() => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          this.$router.push('/login')
          this.loading.logout = false;
        });

    }
  }
}
</script>
