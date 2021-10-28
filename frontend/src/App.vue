<template>
  <v-app>
    <v-app-bar class="appBar" clipped-left app>
      <v-app-bar-nav-icon
        v-if="user"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="appName" @click="goToHome">
        <v-icon>mdi-stethoscope</v-icon>
        CliniMed
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        small
        text
        color="grey darken-2"
        v-if="!user"
        @click="loadRoute('Login')"
      >
        Login
      </v-btn>
      <div v-else class="d-flex align-center">
        <div class="body-2 text-right d-none d-sm-flex">
          {{ user.nome }} <br />
          Acesso: {{ user.role }}
        </div>
        <v-menu bottom rounded offset-y min-width="220px">
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-avatar color="blue darken-4" size="30">
                <span class="white--text text-h6">{{
                  user.nome.charAt(0)
                }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <div class="d-md-none body-2 mx-2">
                  {{ user.nome }} <br />
                  {{ user.role }}
                  <v-divider class="my-2"></v-divider>
                </div>
                <v-btn small depressed rounded text @click="logOut">
                  Desconectar
                </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-if="showDrawer" v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-show="
              item.acesso.includes(user.role) &&
              (emAndamento || !item.consultaAtiva)
            "
            v-for="(item, i) in items"
            :key="i"
            @click="loadRoute(item.link)"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="fillWidth">
      <router-view></router-view>
    </v-main>
    <vtoast ref="vtoast" />
    <v-footer app class="appBar">
      CliniMed v. 1.0
      <v-spacer></v-spacer>
      {{ new Date().toLocaleDateString("pt-br") }}
    </v-footer>
  </v-app>
</template>

<script>
import vtoast from "@/helpers/vtoast";
import axios from "axios";
export default {
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    showDrawer() {
      return this.user && this.drawer;
    },
    emAndamento() {
      return this.$store.getters.getPatient;
    },
  },
  data() {
    return {
      drawer: false,
      selectedItem: -1,
      items: [
        {
          text: "Agenda",
          icon: "mdi-calendar",
          link: "Schedule",
          acesso: ["Recepção", "Médico", "Administrador"],
          consultaAtiva: false,
        },
        {
          text: "Pacientes",
          icon: "mdi-account",
          link: "Patients",
          acesso: ["Recepção", "Médico", "Administrador"],
          consultaAtiva: false,
        },
        {
          text: "Consulta",
          icon: "mdi-alarm-check",
          link: "Appointment",
          acesso: ["Médico"],
          consultaAtiva: true,
        },
        {
          text: "Usuários",
          icon: "mdi-account-edit",
          link: "Admin",
          acesso: ["Administrador"],
          consultaAtiva: false,
        },
        {
          text: "Medicamentos",
          icon: "mdi-pill",
          link: "Medications",
          acesso: ["Administrador"],
          consultaAtiva: false,
        },
        {
          text: "Exames",
          icon: "mdi-inbox-multiple",
          link: "Exams",
          acesso: ["Administrador"],
          consultaAtiva: false,
        },
        {
          text: "Resultados",
          icon: "mdi-inbox",
          link: "Resultados",
          acesso: ["Médico"],
          consultaAtiva: false,
        },
      ],
      links: [],
    };
  },
  components: {
    vtoast,
  },
  mounted() {
    this.$root.vtoast = this.$refs.vtoast;
    this.checkLogged();
    this.$store.dispatch("LOAD_MEMORY");
  },
  methods: {
    loadRoute(link) {
      this.$router.push({ name: link });
    },
    checkLogged() {
      axios
        .get("/auth/user")
        .then((res) => {
          if (res.data.nome) {
            this.$store.dispatch("SET_USER", res.data);
          }
        })
        .catch((err) => {
          this.$store.dispatch("SET_USER", null);
        });
    },
    logOut() {
      axios
        .get("/auth/logout")
        .then(() => {
          this.$store.dispatch("SET_USER", null);
          this.$router.push("/");
        })
        .catch((err) => {
          this.$root.vtoast.show({
            color: "orange",
            message: err.response.data,
            icon: "mdi-alert",
          });
        });
    },
    goToHome() {
      this.selectedItem = -1;
      this.$router.push("/");
    },
  },
};
</script>

<style>
.appName {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-rendering: geometricPrecision;
  font-weight: lighter;
}

.cardBG {
  background: var(--v-app-darken2);
  background: -webkit-linear-gradient(
    22deg,
    var(--v-app-base),
    var(--v-app-darken2),
    var(--v-app-darken4)
  );
  background: linear-gradient(
    22deg,
    var(--v-app-base),
    var(--v-app-darken2),
    var(--v-app-darken4)
  );
}

.appBar {
  background: var(--v-app-lighten1);
  background: linear-gradient(90deg, var(--v-app-base), var(--v-app-lighten3));
}

.fillWidth {
  width: 100%;
}
</style>