<template>
  <div class="d-flex pt-6">
    <v-spacer></v-spacer>
    <v-card width="700px">
      <v-card-title>Envio de resultado de exames</v-card-title>
      <v-card-subtitle>
        <p><strong>Exame: </strong>{{ exam }}</p>
        <p><strong>Nome do paciente: </strong>{{ patient }}</p>
      </v-card-subtitle>
      <v-card-text>
        <v-file-input
          dense
          outlined
          truncate-length="20"
          v-model="attachment"
        ></v-file-input>
        <v-text-field
          label="Código para envio"
          v-model="code"
          dense
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="busy" color="green" text @click="sendFile"
          >Enviar</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    sendFile() {
      this.busy = true;
      let form = new FormData();
      form.append("attachment", this.attachment);
      form.append("code", this.code);
      form.append("id", this.id);
      axios
        .post("/file/insertAttachment", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: res.data,
          });
          this.busy = false;
          this.attachment = null;
          this.code = null;
          this.$router.push("/");
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
  data() {
    return {
      patient: "",
      exam: "",
      attachment: null,
      code: "",
      busy: false,
    };
  },
  mounted() {
    axios
      .get(`/file/validateUpload/${this.id}`)
      .then((res) => {
        this.patient = res.data.patient;
        this.exam = res.data.name;
      })
      .catch((err) => {
        this.$root.vtoast.show({
          color: "orange",
          message: err.response.data,
          icon: "mdi-alert",
        });
      });
  },
};
</script>

<style scoped>
</style>