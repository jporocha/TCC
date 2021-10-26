<template>
  <div class="py-2">
    <v-row class="px-2">
      <v-col cols="12">
        <AppointmentController />
      </v-col>
      <v-col cols="12">
        <Anamnese />
      </v-col>
      <v-col cols="12" lg="6">
        <SelectMedications />
      </v-col>
      <v-col cols="12" lg="6">
        <SelectExams />
      </v-col>
      <v-col cols="12" class="text-right mb-2 pr-6">
        <v-btn @click="saveAppointment" color="blue"
          >Encerrar atendimento</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Anamnese from "@/components/Appointment/Anamnese";
import AppointmentController from "@/components/Appointment/AppointmentController";
import SelectMedications from "@/components/Appointment/SelectMedications";
import SelectExams from "@/components/Appointment/SelectExams";
import dayjs from "dayjs";

export default {
  components: {
    AppointmentController,
    Anamnese,
    SelectMedications,
    SelectExams,
  },
  computed: {
    patient() {
      return this.$store.getters.getPatient;
    },
  },
  methods: {
    saveAppointment() {
      let payload = {
        header: "end",
        payload: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
      };
      this.$store.dispatch("SAVE_CHANGES", payload);
      this.$store
        .dispatch("SAVE_APPOINTMENT")
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: "Consulta encerrada com sucesso.",
          });
          this.$router.push("/agenda");
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
        });
    },
  },
  beforeMount() {
    if (!this.patient) this.$router.push("/agenda");
  },
};
</script>

<style scoped>
</style>