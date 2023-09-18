<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      width="300px"
    >
      <v-card>
        <v-card-title class="text-center">
          {{ formTitleText }}
        </v-card-title>
        <v-card-text>
          <student-form
            :student="selectedStudent"
            :loading="loading.save"
            @onCancel="onCancel"
            @onUpdate="updateStudent"
            @onCreate="createStudent"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span>Lista de estudantes</span>
        <v-btn
          prepend-icon="mdi-plus-circle"
          color="green"
          @click="dialog = true"
        >
          <template v-slot:prepend>
            <v-icon color="white"></v-icon>
          </template>
          Cadastrar novo
        </v-btn>
      </v-card-title>
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
            v-for="(student, index) in students"
            :key="student.id"
          >
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.registration }}</td>
            <td>{{ student.grade }}</td>
            <td>
              <v-col cols="auto">
                <v-btn
                  density="comfortable"
                  icon="mdi-pencil-outline"
                  @click="setSelectedStudent(index)"
                />
              </v-col>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>

  <v-snackbar
    v-model="snackbar.show"
    :timeout="2000"
    :color="snackbar.type"
    location="center top"
  >
    {{ snackbar.text }}

    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="snackbar.show = false"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>

</template>

<script>
import api from '@/utils/api.js'
import StudentForm from '@/components/StudentForm.vue'


export default {
  components: {
    StudentForm,
  },
  data() {
    return {
      students: [],
      selectedStudent: {},
      snackbar: {
        text: '',
        type: '',
        show: false,
      },
      loading: {
        save: false,
      },
      dialog: false,
    };
  },
  computed: {
    formTitleText() {
      return Object.keys(this.selectedStudent).length ? 'Editar estudante' : 'Cadastrar novo estudante';
    }
  },
  watch: {
    dialog(newVal){
      if(!newVal) this.selectedStudent = {};
    }
  },
  created() {
    this.getStudentsList();
  },
  methods: {
    getStudentsList(){
      api.get('/student/list')
        .then((response) => {
          this.students = response.data.data;
        })
        .catch((e) => {
          console.log('error');
          console.log(e);
        });
    },
    setSelectedStudent(index) {
      this.selectedStudent = this.students[index];
      this.dialog = true;
    },
    onCancel() {
      this.selectedStudent = {};
      this.dialog = false;
    },
    updateStudent(params) {
      console.log('update');
      console.log(params);

      this.loading.save = true;
      api.post('/student/update/' + params.id, params)
        .then((response) => {
          console.log(response.data);
          this.snackbar.text = 'Dados atualizados com sucesso!';
          this.snackbar.type = 'success';
        })
        .catch((e) => {
          this.snackbar.text = 'Erro ao atualizar os dados! ';
          this.snackbar.text += e.response.data.message;
          this.snackbar.type = 'error';
          console.log('error');
          console.log(e);
        })
        .finally(() => {
          this.getStudentsList();
          this.snackbar.show = true;
          this.loading.save = false;
        });
    },
    createStudent(params) {

      this.loading.save = true;
      api.post('/student/create/', params)
        .then((response) => {
          console.log(response.data);
          this.snackbar.text = 'Estudante cadastrado com sucesso!';
          this.snackbar.type = 'success';
        })
        .catch((e) => {
          this.snackbar.text = 'Erro ao cadastrar os dados! ';
          this.snackbar.text += e.response.data.message;
          this.snackbar.type = 'error';
          console.log('error');
          console.log(e);
        })
        .finally(() => {
          this.getStudentsList();
          this.snackbar.show = true;
          this.loading.save = false;
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
