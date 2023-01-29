import { createRouter, createWebHistory } from "vue-router";
import { authRoutes } from "./auth";
import { adminRoutes } from "./admin";
import { useAuth } from "../stores/auth";

const routes = [...authRoutes, ...adminRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// const auth = useAuth();
// const user = useUser();
// (async () => {
//   await user.getUser();
// })();

router.beforeEach((to, from, next) => {
  const auth = useAuth();
  if (to.meta.requireAuth) {
    if (auth.authenticated) {
      next();
    } else {
      next({
        name: "login",
      });
    }
  }

  if (to.meta.authPage) {
    console.log(from);
    if (!auth.authenticated) {
      next();
    } else {
      next(from);
    }
  }
});

export default router;
