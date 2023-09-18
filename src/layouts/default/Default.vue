<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      permanent
      floating
      flat
    >
      <template v-slot:prepend>
        <v-list-item
          v-if="user"
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/lego/1.jpg"
          :title="user.name"
          subtitle="Bem vindo!"
        ></v-list-item>
      </template>

      <v-list color="transparent">
        <v-list-item prepend-icon="mdi-view-dashboard" title="Lista de alunos"></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            color="blue"
            block
            @click="logout"
            :loading="loading.logout"
          >
            Logout
          </v-btn>
        </div>
      </template>

    </v-navigation-drawer>

    <v-app-bar flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>

      <v-app-bar-title>Students Manager</v-app-bar-title>

      <template v-slot:append>
        <v-btn icon="mdi-github"></v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
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
    drawer: null,
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
