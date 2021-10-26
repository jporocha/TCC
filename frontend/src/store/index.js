import Vue from "vue";
import Vuex, { Store } from "vuex";
import dayjs from "dayjs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    appointment: {
      _id: null,
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
    },
  },
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getTimes: (state) => {
      return {
        start: state.appointment.start,
        end: state.appointment.end,
      };
    },
    getPatient: (state) => {
      return state.appointment.patient;
    },
    getAppointment: (state) => {
      return state.appointment;
    },
    inProgress: (state) => {
      return state.appointment.start && !state.appointment.end;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    startAppointment(state, appointment) {
      state.appointment.patient = appointment.patientId;
      state.appointment._id = appointment._id;
      state.appointment.end = null;
      state.appointment.start = state.appointment.start
        ? state.appointment.start
        : dayjs();
    },
    finishAppointment(state) {
      if (state.appointment.start) {
        state.appointment.end = dayjs();
      }
    },
    updateAppointment(state, changes) {
      state[changes.field] = changes.payload;
    },
    loadLocalStorage(state) {
      state.appointment = JSON.parse(localStorage.appointment);
    },
    saveToDB(state) {
      console.log(state.appointment);
      state.appointment = {
        start: null,
        end: null,
        patient: null,
        prescription: [],
        exams: [],
        doctorNotes: {},
      };
    },
  },
  actions: {
    SET_USER(context, user) {
      context.commit("setUser", user);
    },
    START_APPOINTMENT(context, appointment) {
      context.commit("startAppointment", appointment);
      context.commit("saveToLocalStorage");
    },
    FINISH_APPOINTMENT(context) {
      context.commit("finishAppointment");
    },
    SAVE_CHANGES(context, changes) {
      context.commit("updateAppointment", changes);
    },
    SAVE_APPOINTMENT(context) {
      context.commit("saveToDB");
    },
  },
});
