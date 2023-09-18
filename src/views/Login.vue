<template>
  <v-sheet
    class="d-flex align-center justify-center bg-school"
    rounded
    width="100%"
    height="100vh"
  >
    <v-card
      class="mx-auto my-auto px-6 py-8"
      min-width="350px"
    >
      <template v-slot:title>
        Login
      </template>
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          class="mb-2"
          clearable
          label="Email"
          placeholder="Digite o seu email"
          type="email"
        ></v-text-field>

        <v-text-field
          v-model="password"
          clearable
          label="Senha"
          placeholder="Digite a sua senha"
          type="password"
        ></v-text-field>

        <br>

        <v-btn
          block
          color="blue"
          size="large"
          type="submit"
          variant="elevated"
          :loading="loading.login"
        >
          Login
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>

  <v-snackbar
    v-model="snackbar"
    :timeout="2000"
    color="error"
    location="center top"
  >
    {{ text }}

    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="snackbar = false"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>

</template>

<script>
import api from '@/utils/api.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      snackbar: false,
      text: '',
      loading: {
        login: false,
      }
    };
  },
  methods: {
    onSubmit() {
      this.loading.login = true;
      api.post('/auth/login', {
        email: this.email,
        password: this.password,
      })
      .then((response) => {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        this.$router.push('/lista-de-alunos')
      })
      .catch((e) => {
        this.snackbar = true;
        this.text = e.response.data.message;
      })
      .finally(() => {
        this.loading.login = false;
      });
    },
  },
};
</script>

<style scoped>
.bg-school {
  background: url('../assets/back-to-school.jpg');
  background-size: cover;
}
</style>
