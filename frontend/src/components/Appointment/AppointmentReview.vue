<template>
  <div>
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
      :headers="headers"
      :items="appointments"
      :search="busca"
      dense
      item-key="_id"
      class="elevation-1"
      :loading="loading"
      loading-text="Carregando consultas..."
      no-data-text="Não há consultas a exibir..."
      :items-per-page="20"
      :footer-props="{
        'items-per-page-all-text': 'Todos',
        'items-per-page-text': 'Consultas por página:',
        'items-per-page-options': [10, 20, 30, 40, -1],
      }"
      :header-props="{
        'sort-by-text': 'Organizar por',
      }"
    >
      <template v-slot:[`item.date`]="{ item }">
        {{ formatDate(item.date) }}
      </template>
      <template v-slot:[`item.hour`]="{ item }">
        {{ formatHour(item.date) }}
      </template>
      <template v-slot:[`item.start`]="{ item }">
        {{ formatHour(item.start) }}
      </template>
      <template v-slot:[`item.end`]="{ item }">
        {{ formatHour(item.end) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="viewEvent(item)" v-bind="attrs" v-on="on">
              <v-icon small color="blue">mdi-table-edit</v-icon>
            </v-btn>
          </template>
          <span>Editar prontuário</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <v-dialog v-model="showDialog">
      <EditAppointment
        :id="selectedId"
        :key="selectedId"
        v-on:close="showDialog = false"
      />
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import EditAppointment from "./EditAppointment.vue";

export default {
  components: {
    EditAppointment,
  },
  data: () => ({
    loading: true,
    showDialog: false,
    appointments: [],
    selectedId: null,
    busca: "",
    headers: [
      {
        text: "Paciente",
        value: "patientId.name",
        sortable: true,
        align: "center",
      },
      {
        text: "Médico",
        value: "doctorId.name",
        sortable: true,
        align: "center",
      },
      {
        text: "Data",
        value: "date",
        sortable: true,
        align: "center",
      },
      {
        text: "Hora",
        value: "hour",
        sortable: false,
        align: "center",
      },
      {
        text: "Início",
        value: "start",
        sortable: false,
        align: "center",
      },
      {
        text: "Fim",
        value: "end",
        sortable: false,
        align: "center",
      },
      {
        text: "Tipo",
        value: "tipo",
        sortable: false,
        align: "center",
      },
      {
        text: "Ações",
        value: "actions",
        sortable: false,
        align: "center",
      },
    ],
  }),
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    formatDate(day) {
      return dayjs(day).format("DD/MM/YYYY");
    },
    formatHour(day) {
      return dayjs(day).format("HH:mm");
    },
    fetchAppointments() {
      axios
        .get("/appointment/")
        .then((res) => {
          this.appointments = res.data.filter((el) => el.end);
          this.loading = false;
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: "Falha na busca da agenda",
            icon: "mdi-alert",
          });
        });
    },
    viewEvent(event) {
      this.selectedId = event._id;
      this.showDialog = true;
    },
  },
};
</script>