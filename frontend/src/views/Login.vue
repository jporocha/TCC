<template>
  <v-container
    fluid
    class="d-flex fill-height justify-center align-center cardBG"
    ><v-spacer></v-spacer>
    <transition name="rotate" mode="out-in">
      <LoginCard v-on:ForgotPass="changeToPass" v-if="modo === 1" />
      <ForgotPass v-on:Login="changeToLogin" v-else-if="modo === 2" />
    </transition>
    <v-spacer></v-spacer>
  </v-container>
</template>

<script>
import LoginCard from "@/components/Login/LoginCard";
import ForgotPass from "@/components/Login/ForgotPass";

export default {
  components: {
    LoginCard,
    ForgotPass,
  },
  data() {
    return {
      email: "",
      password: "",
      valid: null,
      modo: 1,
    };
  },
  methods: {
    changeToPass() {
      this.modo = 2;
    },
    changeToLogin() {
      this.modo = 1;
    },
  },
  mounted() {
    if (this.$store.getters.getUser) this.$router.push("/");
  },
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: darkblue;
  display: block;
}

@keyframes rotateIn {
  0% {
    opacity: 0;
    transform: perspective(50cm) rotateY(90deg);
  }
  100% {
    opacity: 1;
    transform: perspective(50cm) rotateY(0deg);
  }
}

@keyframes rotateOut {
  0% {
    opacity: 0;
    transform: perspective(50cm) rotateY(-90deg);
  }
  100% {
    opacity: 1;
    transform: perspective(50cm) rotateY(0deg);
  }
}

.rotate-enter-active {
  animation: rotateIn 0.5s;
}

.rotate-leave-active {
  animation: rotateOut 0.5s reverse;
}
</style>
