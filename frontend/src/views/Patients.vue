<template>
  <div>
    <div class="d-flex justify-center">
      <PatientTable />
    </div>
  </div>
</template>

<script>
import PatientTable from "@/components/Patient/PatientTable";
export default {
  components: {
    PatientTable,
  },
};
</script>

<style scoped>
</style>