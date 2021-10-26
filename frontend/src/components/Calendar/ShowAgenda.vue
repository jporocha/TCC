<template>
  <div>
    <v-sheet height="60">
      <v-toolbar flat>
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              outlined
              color="grey darken-2"
              v-bind="attrs"
              v-on="on"
            >
              <span>{{ doctors[doctorIndex].substr(0, 20) }}</span>
              <v-icon right> mdi-menu-down </v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(doctor, index) in doctors" :key="doctor">
              <v-list-item-title @click="doctorIndex = index">{{
                doctor
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-btn fab text small color="grey darken-2" @click="goToTable">
          <v-icon small> mdi-table </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              outlined
              color="grey darken-2"
              v-bind="attrs"
              v-on="on"
            >
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right> mdi-menu-down </v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Dia</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Semana</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Mês</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-sheet height="60">
      <v-toolbar flat>
        <v-btn fab text small color="grey darken-2" @click="prev">
          <v-icon small> mdi-chevron-left </v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
          <v-icon small> mdi-chevron-right </v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          v-if="userRole === 'Recepção'"
          fab
          text
          small
          class="mr-4"
          color="grey darken-4"
          @click="showInsert"
        >
          <v-icon small> mdi-plus </v-icon>
        </v-btn>
        <v-btn
          fab
          text
          small
          class="mr-4"
          color="grey darken-2"
          @click="setToday"
        >
          <v-icon small>mdi-home</v-icon>
        </v-btn>
      </v-toolbar>
    </v-sheet>
    <v-calendar
      class="mb-4"
      ref="calendar"
      v-model="focus"
      color="primary"
      :events="filteredEvents"
      :event-color="getEventColor"
      :type="type"
      interval-minutes="30"
      interval-height="40"
      interval-count="20"
      first-time="08:00"
      locale="pt-br"
      weekdays="1,2,3,4,5"
      @click:more="viewDay"
      @click:date="viewDay"
      @click:event="viewEvent"
    ></v-calendar>
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
  data: () => ({
    showDialog: false,
    appointmentKey: 10000,
    idAppointment: null,
    showAppointment: false,
    focus: "",
    type: "week",
    typeToLabel: {
      month: "Mês",
      week: "Semana",
      day: "Dia",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    doctors: ["Todos", "João Paulo de Oliveira Rocha", "Kassio Lohner Prado"],
    doctorIndex: 0,
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.fetchAppointments();
    this.loadDoctors();
  },
  computed: {
    filteredEvents() {
      return this.doctorIndex === 0
        ? this.events
        : this.events.filter(
            (el) => el.doctor === this.doctors[this.doctorIndex]
          );
    },
    userRole() {
      return this.$store.getters.getUser.role;
    },
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
    fetchAppointments() {
      axios
        .get("/appointment/")
        .then((res) => {
          let dados = res.data;
          let events = [];
          dados.forEach((ev) => {
            let duration = ev.tipo === "Consulta" ? 30 : 15;
            events.push({
              _id: ev._id,
              name: `${ev.patientId.name}`,
              doctor: `${ev.doctorId.name}`,
              start: dayjs(ev.date).format("YYYY-MM-DDTHH:mm:ss"),
              end: dayjs(ev.date)
                .add(duration, "minutes")
                .format("YYYY-MM-DDTHH:mm:ss"),
              color: this.stringToColour(ev.patientId.name),
              timed: true,
            });
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
    goToTable() {
      this.$emit("toTable");
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    viewEvent({ event }) {
      this.idAppointment = event._id;
      this.showAppointment = true;
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    stringToColour(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      let colour = "#";
      for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        colour += ("00" + value.toString(16)).substr(-2);
      }
      return colour;
    },
    loadDoctors() {
      axios
        .get("/users/doctors")
        .then((res) => {
          this.doctors = res.data.map((el) => el.name);
          this.doctors.unshift("Todos");
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
        });
    },
  },
};
</script>