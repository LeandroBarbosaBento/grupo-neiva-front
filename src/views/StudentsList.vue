<template>
  <v-container>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Nome
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            Matrícula
          </th>
          <th class="text-left">
            Nota
          </th>
          <th class="text-left">
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in students"
          :key="student.name"
        >
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.registration }}</td>
          <td>{{ student.grade }}</td>
          <td>
            <v-col cols="auto">
              <v-btn density="comfortable" icon="mdi-pencil-outline"></v-btn>
            </v-col>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import api from '@/utils/api.js'

export default {
  data() {
    return {
      students: [],
      loading: {
        login: false,
      }
    };
  },
  created() {
    api.get('/student/list')
      .then((response) => {
        this.students = response.data.data;
      })
      .catch((e) => {
        console.log('error');
        console.log(e);
      });
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
