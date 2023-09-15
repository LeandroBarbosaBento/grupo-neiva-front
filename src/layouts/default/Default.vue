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
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/lego/1.jpg"
          title="Nome do professor"
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
  export default {
    data: () => ({ drawer: null }),
  }
</script>
