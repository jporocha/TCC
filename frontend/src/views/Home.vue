<template>
  <div>Página inicial</div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    checkLogged() {
      axios
        .get("/auth/user")
        .then((res) => {
          if (res.data.nome) {
            this.$store.dispatch("SET_USER", res.data);
          }
        })
        .catch((err) => {
          this.$store.dispatch("SET_USER", null);
        });
    },
  },
  mounted() {
    this.checkLogged();
  },
};
</script>

<style scoped>
</style>