import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

export const authRoutes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      authPage: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      authPage: true,
    },
  },
];
