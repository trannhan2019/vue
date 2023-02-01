import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";
// import * as components from "vuetify/components";
import { VBtn, VIcon, VApp, VAppBar, VSpacer } from "vuetify/components";
import * as directives from "vuetify/directives";
import { loadFonts } from "./webfontloader";

loadFonts();

export default createVuetify({
  components: {
    VApp,
    VAppBar,
    VBtn,
    VIcon,
    VSpacer,
  },
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
});
