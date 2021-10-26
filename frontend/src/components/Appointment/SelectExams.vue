<template>
  <div>
    <v-card>
      <v-card-title
        >Exames
        <v-spacer></v-spacer>
        <v-btn text color="blue" @click="pickDialog = true">Novo exame</v-btn>
      </v-card-title>
      <v-card-text>
        <v-list v-if="examsList.length" :key="examsList.length">
          <v-list-item
            v-for="(item, index) in examsList"
            :key="`Exame ${index}`"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn small @click="removeItem(index)" icon>
                <v-icon small color="red">mdi-trash-can</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <div v-else>Não há exames solicitados para o paciente.</div>
      </v-card-text>
    </v-card>
    <v-dialog v-model="pickDialog" max-width="600px">
      <v-card color="white">
        <v-card-title>Novo exame</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                dense
                v-model="newExam"
                outlined
                item-text="name"
                item-value="_id"
                :items="exams"
                label="Selecione um exame."
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="red" @click="pickDialog = false">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="green" @click="insertExam">Inserir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pickDialog: false,
      examsList: [],
      exams: [],
      newExam: "",
    };
  },
  methods: {
    fetchExams() {
      axios
        .get("/exams")
        .then((res) => {
          this.exams = res.data;
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: "Falha no carregamento de exames",
            icon: "mdi-alert",
          });
        });
    },
    insertExam() {
      let exam = this.exams.filter((el) => el._id === this.newExam)[0];
      this.examsList.push({
        name: exam.name,
        id: this.newExam,
      });
      console.log(this.examsList);
      this.pickDialog = false;
    },
    removeItem(item) {
      this.examsList.splice(item, 1);
    },
  },
  mounted() {
    this.fetchExams();
  },
};
</script>

<style scoped>
</style>