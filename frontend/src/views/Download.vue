<template>
  <div class="d-flex pt-6">
    <v-spacer></v-spacer>
    <v-card width="700px">
      <v-card-title>Download de resultado de exame</v-card-title>
      <v-card-subtitle>
        <p><strong>Exame: </strong>{{ exam }}</p>
        <p><strong>Nome do paciente: </strong>{{ patient }}</p>
      </v-card-subtitle>
      <v-card-text>
        <v-text-field
          label="Código para download"
          v-model="code"
          dense
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="busy || !code"
          color="green"
          text
          @click="downloadItem"
          >Download</v-btn
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
    downloadItem() {
      console.log(this.filedata);
      let payload = {
        code: this.code,
        id: this.id,
        mimetype: this.filedata.mimetype,
      };
      axios
        .post(`/file/userDownload`, payload, {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.filedata.filename);
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
          });
        });
    },
  },
  data() {
    return {
      patient: "",
      exam: "",
      code: "",
      busy: false,
      filedata: null,
    };
  },
  mounted() {
    axios
      .get(`/file/validateUpload/${this.id}`)
      .then((res) => {
        this.patient = res.data.patient;
        this.exam = res.data.name;
        this.filedata = res.data;
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