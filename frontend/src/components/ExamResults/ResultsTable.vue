<template>
  <v-card width="100%">
    <v-card-title class="py-3 my-0">
      <v-text-field
        style="max-width: 600px"
        outlined
        dense
        class="white"
        v-model="busca"
        append-icon="mdi-magnify"
        label="Busca"
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-data-table
      :headers="header"
      :items="resultados"
      :search="busca"
      dense
      item-key="_id"
      class="elevation-1"
      :loading="loading"
      loading-text="Carregando exames..."
      no-data-text="Não há exames a exibir..."
      :items-per-page="20"
      :footer-props="{
        'items-per-page-all-text': 'Todos',
        'items-per-page-text': 'Exames por página:',
        'items-per-page-options': [10, 20, 30, -1],
      }"
      :header-props="{
        'sort-by-text': 'Organizar por',
      }"
    >
      <template v-slot:[`item.date`]="{ item }">
        {{ formatDate(item.date) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div v-if="item.filename">
          <v-tooltip>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="downloadItem(item)" v-bind="attrs" v-on="on">
                <v-icon small color="blue">mdi-download</v-icon>
              </v-btn>
            </template>
            <span>Visualizar exame</span>
          </v-tooltip>
          <v-tooltip>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="sendItem(item)" v-bind="attrs" v-on="on">
                <v-icon small :color="item.patientEmail ? 'green' : 'red'"
                  >mdi-mail</v-icon
                >
              </v-btn>
            </template>
            <span>Enviar para paciente</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="sendMail">
      <SendResults :item="selectedItem" v-on:close="closeDialog" />
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import SendResults from "./SendResults.vue";

export default {
  components: {
    SendResults,
  },
  data() {
    return {
      selectedItem: null,
      loading: true,
      sendMail: false,
      resultados: [],
      header: [
        { text: "Data da solicitação", value: "date", sortable: true },
        {
          text: "Paciente",
          value: "patientId.name",
          sortable: true,
        },
        { text: "Exame", value: "nameOfExam", sortable: false },
        { text: "Enviado para", value: "patientEmail", sortable: false },
        {
          text: "Ações",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      busca: "",
    };
  },
  methods: {
    sendItem(item) {
      this.selectedItem = Object.assign({}, item);
      this.sendMail = true;
    },
    closeDialog(update = false) {
      if (update) this.fetchExams();
      this.sendMail = false;
    },
    downloadItem(item) {
      axios
        .post(`/file/download`, item, {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", item.filename);
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
    formatDate(day) {
      return dayjs(day).format("DD/MM/YYYY");
    },
    fetchExams() {
      axios
        .get(`/file/all/byDoctor`)
        .then((res) => {
          this.resultados = res.data.map((el) => {
            let temp = parseInt(el._id.substr(0, 8), 16) * 1000;
            let date = dayjs(temp).format("YYYY-MM-DD");
            el.date = date;
            return el;
          });
          this.loading = false;
          this.$root.vtoast.show({
            color: "green",
            message: "Exames carregados",
          });
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetchExams();
  },
};
</script>

<style lang="scss" scoped>
</style>