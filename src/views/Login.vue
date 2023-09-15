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
        >
          Login
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      console.log('onSubmit');
      console.log(this.email);
      console.log(this.password);
      this.$router.push('/lista-de-alunos');
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
