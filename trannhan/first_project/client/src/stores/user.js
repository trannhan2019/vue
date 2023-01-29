import { defineStore } from "pinia";
import { ref } from "vue";
import { get } from "../api/modules/user";
import { useAuth } from "./auth";

export const useUser = defineStore("user", () => {
  const user = ref(null);
  const authStore = useAuth();

  function setUser(payload) {
    if (payload === null) {
      localStorage.removeItem("token");
    } else {
      if (payload.token) localStorage.setItem("token", payload.token);
    }
    user.value = payload;
  }

  async function getUser() {
    const { res, err } = await get();

    if (res) {
      user.value = res;
      authStore.setAuthenticated(true);
    }
    if (err) {
      console.log(err);
      authStore.setAuthenticated(false);
      user.value = null;
    }
  }

  return {
    user,
    setUser,
    getUser,
  };
});
