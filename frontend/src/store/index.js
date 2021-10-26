import Vue from "vue";
import Vuex, { Store } from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    appointment: {
      _id: null,
      date: null,
      start: null,
      end: null,
      patientId: null,
      prescription: [],
      exams: [],
      doctorNotes: {
        queixaPrincipal: "",
        historicoMolestia: "",
        historicoFamiliar: "",
        exameFisico: "",
        examesApresentados: "",
        hipoteseDiagnostica: "",
        Condutas: "",
      },
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getPatient: (state) => {
      return state.appointment.patientId;
    },
    getNotes: (state) => {
      return state.appointment.doctorNotes;
    },
    getPrescriptions: (state) => {
      return state.appointment.prescription;
    },
    getExams: (state) => {
      return state.appointment.exams;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    loadAppointment(state, appointment) {
      state.appointment = appointment;
    },
    editAppointment(state, changes = null) {
      if (changes) state.appointment[changes.header] = changes.payload;
      localStorage.setItem("appointment", JSON.stringify(state.appointment));
    },
    loadLocalStorage(state) {
      if (localStorage.getItem("appointment")) {
        state.appointment = JSON.parse(localStorage.getItem("appointment"));
      }
    },
    saveToDatabase(state) {
      state.appointment = {
        _id: null,
        date: null,
        start: null,
        end: null,
        patient: null,
        prescription: [],
        exams: [],
        doctorNotes: {
          queixaPrincipal: "",
          historicoMolestia: "",
          historicoFamiliar: "",
          exameFisico: "",
          examesApresentados: "",
          hipoteseDiagnostica: "",
          Condutas: "",
        },
      };
      localStorage.setItem("appointment", JSON.stringify(state.appointment));
    },
  },
  actions: {
    SET_USER(context, user) {
      context.commit("setUser", user);
    },
    LOAD_APPOINTMENT(context, appointment) {
      context.commit("loadAppointment", appointment);
    },
    SAVE_CHANGES(context, changes) {
      context.commit("editAppointment", changes);
    },
    LOAD_MEMORY(context) {
      context.commit("loadLocalStorage");
    },
    SAVE_APPOINTMENT({ context, state }) {
      return new Promise((resolve, reject) => {
        axios
          .put("/appointment/appointmentResults", state.appointment)
          .then((res) => {
            state.appointment = {
              _id: null,
              date: null,
              start: null,
              end: null,
              patient: null,
              prescription: [],
              exams: [],
              doctorNotes: {
                queixaPrincipal: "",
                historicoMolestia: "",
                historicoFamiliar: "",
                exameFisico: "",
                examesApresentados: "",
                hipoteseDiagnostica: "",
                Condutas: "",
              },
            };
            localStorage.setItem(
              "appointment",
              JSON.stringify(state.appointment)
            );
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
