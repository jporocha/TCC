<template>
  <v-card color="white">
    <v-toolbar
      ><v-toolbar-title>Dados da consulta</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn tile icon text @click="emitClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider class="mb-4"></v-divider>
    <v-card-text v-html="appointmentText"> </v-card-text>
    <v-divider></v-divider>
    <v-card-actions v-if="appointment">
      <v-btn
        small
        :disabled="!!appointment.end"
        color="red"
        @click="cancelAppointment"
        v-if="user.role === 'Recepção'"
        >Cancelar</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        small
        :disabled="!!patient || !!appointment.end"
        @click="startAppointment"
        color="blue"
        v-if="appointment && user && user.id === appointment.doctorId._id"
        >{{ patient ? "Há consulta em andamento" : "Iniciar consulta" }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  props: {
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      appointment: null,
    };
  },
  computed: {
    appointmentText() {
      let text = "";
      if (!this.appointment) return text;
      text += `<strong>Médico: </strong>${
        this.appointment.doctorId.name
      }<br /><strong>Paciente: </strong>${
        this.appointment.patientId.name
      }<br /><strong>Data da consulta: </strong>${dayjs(
        this.appointment.date
      ).format("DD/MM/YYYY[ às ]HH:mm")}`;
      if (this.appointment.end)
        text += `<br /><strong>Consulta finalizada em ${dayjs(
          this.appointment.end
        ).format("DD/MM/YYYY[ às ]HH:mm")}.`;
      return text;
    },
    user() {
      return this.$store.getters.getUser;
    },
    patient() {
      return this.$store.getters.getPatient;
    },
  },
  methods: {
    loadAppointment() {
      axios
        .get(`/appointment/${this.id}`)
        .then((res) => {
          this.appointment = res.data[0];
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
        });
    },
    emitClose(update = false) {
      this.$emit("close", update);
    },
    cancelAppointment() {
      axios
        .put(`/appointment/cancel/${this.id}`)
        .then((res) => {
          this.$root.vtoast.show({
            color: "green",
            message: "Consulta cancelada com sucesso",
          });
          this.emitClose(true);
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
        });
    },
    startAppointment() {
      this.appointment.doctorNotes = {
        queixaPrincipal: "",
        historicoMolestia: "",
        historicoFamiliar: "",
        exameFisico: "",
        examesApresentados: "",
        hipoteseDiagnostica: "",
        Condutas: "",
      };
      this.appointment.start = dayjs().format("YYYY-MM-DDTHH:mm:ss");
      this.$store.dispatch("LOAD_APPOINTMENT", this.appointment);
      this.$router.push("/consulta");
    },
  },
  mounted() {
    this.loadAppointment();
  },
};
</script>

<style scoped>
</style>