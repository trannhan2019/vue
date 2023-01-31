import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";

import { createVuetify } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";
// import * as components from "vuetify/components";
import { VBtn, VIcon } from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components: {
    VBtn,
    VIcon,
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
