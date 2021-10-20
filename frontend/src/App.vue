<template>
  <v-app>
    <v-app-bar class="appBar" clipped-left app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="appName">
        <v-icon>mdi-stethoscope</v-icon>
        CliniMed
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar class="ml-10" color="grey darken-1" size="32"></v-avatar>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-subheader>SEÇÕES</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
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

    <v-main>
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
export default {
  data() {
    return {
      drawer: null,
      selectedItem: 1,
      items: [
        { text: "Agenda", icon: "mdi-calendar", link: "Schedule" },
        { text: "Pacientes", icon: "mdi-account", link: "Patients" },
        { text: "Consulta", icon: "mdi-alarm-check", link: "Appointment" },
        { text: "Usuários", icon: "mdi-account-edit", link: "Admin" },
        { text: "Medicamentos", icon: "mdi-pill", link: "Medications" },
        { text: "Exames", icon: "mdi-inbox-multiple", link: "Exams" },
        { text: "Login", icon: "mdi-account-check", link: "Login" },
        { text: "Sobre", icon: "mdi-help", link: "About" },
      ],
      links: [],
    };
  },
  components: {
    vtoast,
  },
  mounted() {
    this.$root.vtoast = this.$refs.vtoast;
  },
  methods: {
    loadRoute(link) {
      this.$router.push({ name: link });
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
  background: var(--v-app-base);
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
  background: linear-gradient(
    90deg,
    var(--v-app-lighten1),
    var(--v-app-lighten3)
  );
}
</style>