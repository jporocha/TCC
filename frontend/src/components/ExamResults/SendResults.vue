<template>
  <div>
    <v-card>
      <v-card-title>Enviar resultados</v-card-title>
      <v-card-text>
        <v-text-field
          dense
          outlined
          label="E-mail do paciente"
          v-model="patientMail"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn small text color="red" @click="closeDialog">Cancelar</v-btn>
        <v-spacer> </v-spacer>
        <v-btn
          small
          text
          color="green"
          @click="sendData"
          :disabled="!validEmail || busy"
        >
          Enviar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    closeDialog() {
      this.$emit("close", false);
    },
    sendData() {
      this.busy = true;
      let payload = {
        patientEmail: this.patientMail,
        id: this.item._id,
      };
      axios
        .post("/file/sendToPatient", payload)
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: res.data,
          });
          this.busy = false;
          this.$emit("close", true);
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
          this.busy = false;
        });
    },
  },
  computed: {
    validEmail() {
      let test = /.+@.+\..+/.test(this.patientMail);
      return test;
    },
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      patientMail: "",
      busy: false,
    };
  },
  mounted() {
    console.log(this.item);
  },
};
</script>

<style scoped>
</style>