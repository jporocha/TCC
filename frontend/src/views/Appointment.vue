<template>
  <div>
    <Anamnese v-on:notesChanged="updateNotes" />
    <SelectMedications />
    <SelectExams />
  </div>
</template>

<script>
import Anamnese from "@/components/Appointment/Anamnese";
import SelectMedications from "@/components/Appointment/SelectMedications";
import SelectExams from "@/components/Appointment/SelectExams";

export default {
  components: {
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