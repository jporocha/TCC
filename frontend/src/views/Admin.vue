<template>
  <div class="schedule">
    <h1>Página para gerenciamento dos usuários</h1>
    <UserTable />
  </div>
</template>

<script>
import UserTable from "@/components/User/UserTable";
export default {
  components: {
    UserTable,
  },
};
</script>
