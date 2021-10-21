import Vue from "vue";
import Vuex, { Store } from "vuex";
import dayjs from "dayjs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    appointment: {
      start: null,
      end: null,
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
    inProgress: (state) => {
      return state.appointment.start && !state.appointment.end;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    startAppointment(state) {
      state.appointment.end = null;
      state.appointment.start = dayjs();
    },
    finishAppointment(state) {
      if (state.appointment.start) {
        state.appointment.end = dayjs();
      }
    },
  },
  actions: {
    SET_USER(context, user) {
      context.commit("setUser", user);
    },
    START_APPOINTMENT(context) {
      context.commit("startAppointment");
    },
    FINISH_APPOINTMENT(context) {
      context.commit("finishAppointment");
    },
  },
});
