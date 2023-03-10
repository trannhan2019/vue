import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import Vue3Toasity from "vue3-toastify";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
// import { useUser } from "./stores/user";

import "./assets/main.css";
import "vue3-toastify/dist/index.css";

//su dung pinia persister de luu state
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
pinia.use(({ store }) => {
  store.router = markRaw(router); //de su dung route trong pinia
});
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(Vue3Toasity);

app.mount("#app");

// authentication su dung api get user
// (async () => {
//   const app = createApp(App);
//   const pinia = createPinia();

//   pinia.use(({ store }) => {
//     store.router = markRaw(router);
//   });

//   app.use(pinia);

//   const user = useUser();
//   await user.getUser();

//   app.use(router);
//   app.use(Vue3Toasity);
//   app.mount("#app");
// })();
