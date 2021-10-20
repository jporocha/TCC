import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/sobre",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/consulta",
    name: "Appointment",
    component: () => import("../views/Appointment.vue"),
  },
  {
    path: "/exames",
    name: "Exams",
    component: () => import("../views/Exams.vue"),
  },
  {
    path: "/medicamentos",
    name: "Medications",
    component: () => import("../views/Medications.vue"),
  },
  {
    path: "/agenda",
    name: "Schedule",
    component: () => import("../views/Schedule.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/pacientes",
    name: "Patients",
    component: () => import("../views/Patients.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
