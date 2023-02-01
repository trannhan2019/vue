import { defineStore } from "pinia";

export const useAuth = defineStore("auth", {
  state: () => {
    return {
      authenticated: false,
    };
  },
  actions: {
    setAuthenticated(data) {
      this.authenticated = data;
    },

    // async registerUser(data) {
    //   const { res, err } = await register(data);
    //   const userStore = useUser();
    //   if (res) {
    //     this.authenticated = true;
    //     userStore.setUser(res);
    //     this.router.replace({ name: "admin-dashboard" });
    //   }
    //   if (err) {
    //     console.log(err);
    //     this.authenticated = false;
    //     userStore.setUser(null);
    //   }
    // },
    // logoutUser() {
    //   const userStore = useUser();
    //   localStorage.removeItem("token");
    //   this.authenticated = false;
    //   userStore.setUser(null);
    //   this.router.push({ name: "login" });
    // },

    // async loginUser(data) {
    //   const userStore = useUser();
    //   const { res, err } = await login(data);
    //   if (res) {
    //     this.authenticated = true;
    //     userStore.setUser(res);
    //     this.router.replace({ name: "admin-dashboard" });
    //   }
    //   if (err) {
    //     console.log(err);
    //     this.authenticated = false;
    //     userStore.setUser(null);
    //   }
    // },
  },
  persist: {
    key: "auth",
    storage: sessionStorage,
  },
});
