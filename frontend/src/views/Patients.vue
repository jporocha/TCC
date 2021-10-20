<template>
  <div>
    <p>Rota para controle dos pacientes</p>
    <div class="d-flex justify-center">
      <EditUser />
    </div>
  </div>
</template>

<script>
import EditUser from "@/components/User/UserEdit";
export default {
  components: {
    EditUser,
  },
};
</script>

<style scoped>
</style>