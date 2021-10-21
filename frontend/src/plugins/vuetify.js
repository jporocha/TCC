import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        app: "#03fcb6",
        app2: "#fc0349",
        app3: "#C5FC03",
        app4: "#3A03FC",
      },
    },
    options: {
      customProperties: true,
    },
  },
});
