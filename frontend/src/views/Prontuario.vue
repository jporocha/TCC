<template>
  <div>
    Prontuário do paciente
    <div
      v-for="(consulta, index) in consultas"
      :key="consulta._id"
      class="mx-auto my-auto"
    >
      <Consulta :consulta="consulta" :index="index" />
      <v-divider class="my-4"></v-divider>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Consulta from "@/components/Prontuario/Consulta";
export default {
  props: {
    pacientId: {
      type: String,
      default: "6172b42c5851939d12037d60",
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
          this.patient = res.data;
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