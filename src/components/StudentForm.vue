<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="name"
      label="Nome"
    />

    <v-text-field
      v-model="email"
      label="Email"
      type="email"
    />

    <v-text-field
      v-model="registration"
      label="Matrícula"
    />

    <v-text-field
      v-model="grade"
      label="Nota"
    />

    <v-btn
      type="submit"
      color="green"
      block
      class="mt-2"
      :loading="loading"
    >
      Salvar
    </v-btn>
    <v-btn
      type="button"
      color="red"
      block
      class="mt-2"
      @click="onCancel"
    >
      Cancelar
    </v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    student: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
  created() {
    if (this.student) {
      this.name = this.student.name;
      this.email = this.student.email;
      this.registration = this.student.registration;
      this.grade = this.student.grade;
      this.id = this.student.id;
    }
  },
  data() {
    return {
      name: '',
      email: '',
      registration: '',
      grade: '',
      id: null,
    };
  },
  methods: {
    onSubmit() {
      let data = {
        name: this.name,
        email: this.email,
        registration: this.registration,
        grade: this.grade,
      };
      if(Object.keys(this.student).length){
        data.id = this.student.id;
        this.$emit('onUpdate', data)
      }
      else this.$emit('onCreate', data);

    },
    onCancel() {
      this.$emit('onCancel')
    }
  },
};
</script>

<style scoped>
</style>
