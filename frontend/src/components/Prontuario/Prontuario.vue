<template>
  <div>
    <v-card v-if="patient" class="overflow-y-auto" style="max-height: 500px">
      <v-card-title>
        {{ patient.name }}
      </v-card-title>
      <v-card-subtitle>
        Data de nascimento: {{ patient.dataNascimento }}
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text v-if="filtered.length">
        <div
          v-for="(consulta, index) in filtered"
          :key="consulta._id"
          class="mx-auto my-auto"
        >
          <Consulta :consulta="consulta" :index="index" />
          <v-divider class="my-4"></v-divider>
        </div>
      </v-card-text>
      <v-card-text v-else class="font-weight-light font-italic">
        Paciente nunca foi atendido pela clínica.
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import Consulta from "@/components/Prontuario/Consulta";
export default {
  props: {
    pacientId: {
      type: String,
      default: "6172b42c5851939d12037d60",
    },
  },
  computed: {
    filtered() {
      return this.consultas.filter((el) => el.end);
    },
  },
  data() {
    return {
      consultas: [],
      patient: null,
    };
  },
  components: {
    Consulta,
  },
  methods: {
    loadAppointments() {
      axios
        .get(`/appointment/byPatient/${this.pacientId}`)
        .then((res) => {
          this.consultas = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    patientData() {
      axios
        .get(`/patients/${this.pacientId}`)
        .then((res) => {
          this.patient = res.data[0];
          this.patient.dataNascimento = dayjs(this.patient.dateOfBirth).format(
            "DD/MM/YYYY"
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.loadAppointments();
    this.patientData();
  },
};
</script>

<style scoped>
</style>