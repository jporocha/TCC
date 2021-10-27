<template>
  <div>
    <v-card v-if="patient && patient.name">
      <v-card-title>
        <strong>Paciente:</strong> {{ patient.name }}
      </v-card-title>
      <v-card-subtitle>
        Data de nascimento: {{ formatDate(patient.dateOfBirth) }}
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small text color="blue" @click="showHistory">Prontuário</v-btn>
      </v-card-actions>
    </v-card>
    <v-bottom-sheet v-model="dialog">
      <v-card color="white" class="pt-4">
        <v-card-text>
          <Prontuario :pacientId="patientId" />
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Prontuario from "@/components/Prontuario/Prontuario";
export default {
  computed: {
    patient() {
      return this.$store.getters.getPatient;
    },
  },
  data() {
    return {
      dialog: false,
      patientId: null,
    };
  },
  components: {
    Prontuario,
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("DD/MM/YYYY");
    },
    showHistory() {
      this.patientId = this.patient._id;
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
</style>