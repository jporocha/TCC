import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "./../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/admin",
    name: "Admin",
    meta: { access: "Administrador" },
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
    meta: { access: "Administrador" },
    component: () => import("../views/Exams.vue"),
  },
  {
    path: "/medicamentos",
    name: "Medications",
    meta: { access: "Administrador" },
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
  {
    path: "/upload/:id",
    name: "Upload",
    component: () => import("../views/Upload.vue"),
  },
  {
    path: "*",
    name: "PageNotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (["Home", "Login", "Upload"].includes(to.name)) {
    next();
  } else {
    if (!store.state.user) {
      next("/");
    } else {
      if (to.meta.access) {
        if (store.state.user.role === to.meta.access) {
          next();
        } else {
          next("/");
        }
      } else {
        next();
      }
    }
  }
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
