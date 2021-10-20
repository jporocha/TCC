<template>
  <v-card class="pa-2" width="300px">
    <v-card-title class="d-flex justify-center"> Login </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          prepend-icon="mdi-email-outline"
          v-model="email"
          label="E-mail"
          required
          outlined
          :rules="emailRules"
          dense
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-account-key-outline"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
          :type="showPass ? 'text' : 'password'"
          v-model="password"
          label="Senha"
          required
          outlined
          dense
          :rules="passwordRules"
        ></v-text-field>
        <div class="d-flex justify-center">
          <v-btn @click="login" color="green" min-width="150px" small
            >Entrar</v-btn
          >
        </div>
        <div
          @click="newEvent('ForgotPass')"
          class="link caption text-center mt-4"
        >
          Redefina sua senha.
        </div>
        <div @click="sendAccessToken" class="link caption text-center mt-4">
          Receber token de acesso único.
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      showPass: false,
      valid: null,
      emailRules: [
        (v) => !!v || "Forneça um e-mail",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      passwordRules: [(v) => (v && v.length >= 8) || "Senha inválida"],
    };
  },
  methods: {
    login() {
      let payload = {
        username: this.email,
        password: this.password,
      };
      axios
        .post("/auth/login", payload)
        .then((res) => {
          this.$root.vtoast.show({ message: "Login realizado com sucesso." });
          let rota = res.data === "admin" ? "Dashboard" : "Cliente";
          this.$router.push(rota);
        })
        .catch(() => {
          this.$root.vtoast.show({
            message: "Falha no login do usuário",
            color: "red lighten-2",
            icon: "mdi-account-alert",
          });
        });
    },
    sendAccessToken() {
      let payload = {
        email: this.email,
      };
      axios
        .post("/users/accessToken", payload)
        .then((res) => {
          this.$root.vtoast.show({ message: res.data });
        })
        .catch((err) => {
          this.$root.vtoast.show({
            message: err.response.data.erro,
            color: "red lighten-2",
            icon: "mdi-account-alert",
          });
        });
    },
    newEvent(payload) {
      this.$emit(payload);
    },
  },
};
</script>

<style scoped>
.link {
  cursor: pointer;
  color: darkblue;
  display: block;
}
</style>