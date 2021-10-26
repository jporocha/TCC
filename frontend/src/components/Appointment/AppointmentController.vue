<template>
  <div>
    <v-card v-if="patient && patient.name">
      <v-card-title>
        <strong>Paciente:</strong> {{ patient.name }}
      </v-card-title>
      <v-card-subtitle>
        Data de nascimento: {{ formatDate(patient.dateOfBirth) }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  computed: {
    patient() {
      return this.$store.getters.getPatient;
    },
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
  },
};
</script>

<style scoped>
</style>