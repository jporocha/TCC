<template>
  <v-card width="100%">
    <v-card-title class="py-3 my-0">
      <v-text-field
        style="max-width: 600px"
        outlined
        dense
        class="white"
        v-model="busca"
        append-icon="mdi-magnify"
        label="Busca"
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn class="my-2" small color="app" @click="createPatient"
        >Inserir paciente</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="patientHeaders"
      :items="patients"
      :search="busca"
      dense
      item-key="_id"
      class="elevation-1"
      :loading="loading"
      loading-text="Carregando pacientes..."
      no-data-text="Não há pacientes a exibir..."
      :items-per-page="10"
      :footer-props="{
        'items-per-page-all-text': 'Todos',
        'items-per-page-text': 'Pacientes por página:',
        'items-per-page-options': [5, 10, 15, -1],
      }"
      :header-props="{
        'sort-by-text': 'Organizar por',
      }"
    >
      <template v-slot:[`item.enabled`]="{ item }">
        <v-simple-checkbox v-model="item.enabled" disabled></v-simple-checkbox>
      </template>
      <template v-slot:[`item.dateOfBirth`]="{ item }">
        {{ formatDate(item.dateOfBirth) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="editPatient(item)" v-bind="attrs" v-on="on">
              <v-icon small color="purple">mdi-account-edit</v-icon>
            </v-btn>
          </template>
          <span>Editar paciente</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="patientDialog">
      <EditPatient
        :key="patientKey"
        :patient="patient"
        v-on:close="closePatient"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import EditPatient from "./EditPatient.vue";

export default {
  props: ["admin"],
  components: {
    EditPatient,
  },
  data() {
    return {
      patients: [],
      patientHeaders: [
        {
          text: "Nome",
          value: "name",
          sortable: false,
        },
        { text: "Data de nascimento", value: "dateOfBirth", sortable: false },
        {
          text: "CPF / Nome dos pais",
          value: "identificador",
          sortable: false,
        },
        {
          text: "Ativo?",
          value: "enabled",
          sortable: false,
        },
        {
          text: "Ações",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      loading: true,
      busca: "",
      patient: null,
      patientDialog: false,
      patientKey: Math.random(),
    };
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
    fetchPatients() {
      axios
        .get("/patients")
        .then((res) => {
          this.patients = res.data.map((el) => {
            let newEl = Object.assign({}, el);
            newEl.identificador = el.cpf ? el.cpf : el.nameOfParents;
            return newEl;
          });
          this.loading = false;
          this.$root.vtoast.show({
            color: "green",
            message: "Pacientes carregados",
          });
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
          this.loading = false;
        });
    },
    closePatient(reload) {
      if (reload) this.fetchPatients();
      this.patientDialog = false;
    },
    editPatient(patient) {
      this.patient = patient;
      this.patientKey = patient._id;
      this.patientDialog = true;
    },
    createPatient() {
      this.patient = null;
      this.patientKey = Math.random();
      this.patientDialog = true;
    },
  },
  mounted() {
    this.fetchPatients();
  },
};
</script>

<style scoped>
</style>