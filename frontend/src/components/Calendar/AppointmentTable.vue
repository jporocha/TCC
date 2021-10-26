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
      <v-btn fab text small color="grey darken-2" @click="goToCalendar">
        <v-icon small> mdi-calendar </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        class="my-2"
        small
        color="app"
        @click="showInsert"
        v-if="userRole === 'Recepção'"
        >Nova consulta</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="events"
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon @click="viewEvent(item)" v-bind="attrs" v-on="on">
              <v-icon small color="purple">mdi-account-edit</v-icon>
            </v-btn>
          </template>
          <span>Editar consulta</span>
        </v-tooltip>
      </template></v-data-table
    >
    <v-dialog v-model="showDialog" max-width="600px">
      <NewAppointment :key="appointmentKey" v-on:close="closeDialog" />
    </v-dialog>
    <v-dialog v-model="showAppointment" max-width="600px">
      <EditAppointment
        :key="idAppointment"
        :id="idAppointment"
        v-on:close="closeEdit"
      />
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import NewAppointment from "./Appointment.vue";
import EditAppointment from "./EditAppointment.vue";

export default {
  components: {
    NewAppointment,
    EditAppointment,
  },
  computed: {
    userRole() {
      return this.$store.getters.getUser.role;
    },
  },
  data: () => ({
    showDialog: false,
    appointmentKey: 10000,
    idAppointment: null,
    showAppointment: false,
    loading: true,
    events: [],
    busca: "",
    headers: [
      {
        text: "Médico",
        value: "doctor",
        sortable: true,
        align: "center",
      },
      {
        text: "Paciente",
        value: "name",
        sortable: true,
        align: "center",
      },
      {
        text: "Data",
        value: "start",
        sortable: false,
        align: "center",
      },
      {
        text: "Hora",
        value: "startTime",
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
    closeDialog(update) {
      this.showDialog = false;
      if (update) this.fetchAppointments();
    },
    closeEdit(update) {
      this.showAppointment = false;
      if (update) this.fetchAppointments();
    },
    goToCalendar() {
      this.$emit("toCalendar");
    },
    fetchAppointments() {
      axios
        .get("/appointment/")
        .then((res) => {
          let dados = res.data;
          let events = [];
          dados.forEach((ev) => {
            events.push({
              _id: ev._id,
              name: `${ev.patientId.name}`,
              doctor: `${ev.doctorId.name}`,
              start: dayjs(ev.date).format("DD/MM/YYYY"),
              startTime: dayjs(ev.date).format("HH:mm"),
              tipo: ev.tipo,
            });
            this.loading = false;
          });
          this.events = events;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showInsert() {
      this.appointmentKey = Math.random();
      this.showDialog = true;
    },
    viewEvent(event) {
      this.idAppointment = event._id;
      this.showAppointment = true;
    },
  },
};
</script>