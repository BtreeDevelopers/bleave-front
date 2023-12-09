import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Vuetify
import "vuetify/styles";
import "./style.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as heroIcon from "@heroicons/vue/24/outline";

import router from "./router";

const vuetify = createVuetify({
  components,
  directives,
  display: {
    mobileBreakpoint: "sm",
  },
  icons: {
    aliases: {
      ...heroIcon,
    },
  },
  theme: {
    defaultTheme: "pine",
    themes: {
      pine: {
        dark: true,
        colors: {
          background: "#161922",
          background2: "#252831",
          surface: "#7F7F7F",
          primary: "#5093FE",
          secondary: "#5093FE",
          success: "#00F391",
          warning: "#FF8A00",
          error: "FE5050",
          gray1: "#6C6C6C",
        },
      },
    },
  },
});
export { pinia };
const app = createApp(App);
app.use(vuetify);
app.use(pinia);
app.use(router);
app.mount("#app");
