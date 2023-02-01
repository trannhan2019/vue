import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => {
    return {
      user: null,
    };
  },
  actions: {
    setUser(data) {
      if (data === null) {
        localStorage.removeItem("token");
      } else {
        if (data.token) localStorage.setItem("token", data.token);
      }
      this.user = data;
    },
  },
  persist: {
    key: "user",
    storage: sessionStorage,
    paths: ["user.name", "user.email"],
  },
});
