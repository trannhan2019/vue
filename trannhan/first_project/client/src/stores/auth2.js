import { defineStore } from "pinia";
import { ref } from "vue";
import { useUser } from "./user";
import { register, login } from "../api/modules/auth";

export const useAuth2 = defineStore("auth2", () => {
  const authenticated = ref(false);
  const userStore = useUser();

  const setAuthenticated = (data) => {
    authenticated.value = data;
  };

  const registerUser = async (data) => {
    const { res, err } = await register(data);
    if (res) {
      setAuthenticated(true);
      userStore.setUser(res);
      this.router.replace({ name: "admin-dashboard" });
    }
    if (err) {
      console.log(err);
      setAuthenticated(false);
      userStore.setUser(null);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    userStore.setUser(null);
    this.router.push({ name: "login" });
  };

  const loginUser = async (data) => {
    const { res, err } = await login(data);
    if (res) {
      setAuthenticated(true);
      userStore.setUser(res);
      router.replace({ name: "admin-dashboard" });
    }
    if (err) {
      console.log(err);
      setAuthenticated(false);
      userStore.setUser(null);
    }
  };

  return {
    authenticated,
    setAuthenticated,
    registerUser,
    logoutUser,
    loginUser,
  };
});
