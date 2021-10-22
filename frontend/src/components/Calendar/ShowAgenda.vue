<template>
  <div>
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
        <v-menu bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right> mdi-menu-down </v-icon>
            </v-btn>
          </template>
          <v-list>
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
    <v-calendar
      class="mb-4"
      ref="calendar"
      v-model="focus"
      color="primary"
      :events="events"
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
    ></v-calendar>
    <v-dialog v-model="showDialog" max-width="600px">
      <NewAppointment :key="appointmentKey" v-on:close="closeDialog" />
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import NewAppointment from "./Appointment.vue";

export default {
  components: {
    NewAppointment,
  },
  data: () => ({
    showDialog: false,
    appointmentKey: 10000,
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
    colors: [
      "blue",
      "deep-purple",
      "indigo",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.fetchAppointments();
  },
  methods: {
    closeDialog(update) {
      this.showDialog = false;
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
              name: `${ev.patientId.name}`,
              start: dayjs(ev.date).format("YYYY-MM-DDTHH:mm:ss"),
              end: dayjs(ev.date)
                .add(duration, "minutes")
                .format("YYYY-MM-DDTHH:mm:ss"),
              color: this.colors[this.rnd(0, this.colors.length - 1)],
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
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
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
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>