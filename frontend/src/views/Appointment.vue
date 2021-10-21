<template>
  <div class="py-2">
    <v-row class="px-2">
      <v-col cols="12">
        <AppointmentController />
      </v-col>
      <v-col cols="12">
        <Anamnese v-on:notesChanged="updateNotes" />
      </v-col>
      <v-col cols="12" lg="6">
        <SelectMedications />
      </v-col>
      <v-col cols="12" lg="6">
        <SelectExams />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Anamnese from "@/components/Appointment/Anamnese";
import AppointmentController from "@/components/Appointment/AppointmentController";
import SelectMedications from "@/components/Appointment/SelectMedications";
import SelectExams from "@/components/Appointment/SelectExams";

export default {
  components: {
    AppointmentController,
    Anamnese,
    SelectMedications,
    SelectExams,
  },
  data() {
    return {
      doctorNotes: {},
    };
  },
  methods: {
    updateNotes(payload) {
      this.doctorNotes = payload;
    },
  },
};
</script>

<style scoped>
</style>