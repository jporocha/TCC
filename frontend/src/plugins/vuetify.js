import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        app: "#03fcb6",
      },
    },
    options: {
      customProperties: true,
    },
  },
});
