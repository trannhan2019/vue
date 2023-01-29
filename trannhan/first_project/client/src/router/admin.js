import AdminLayout from "../layouts/Admin.vue";
import Dashboard from "../views/admin/Dashboard.vue";

export const adminRoutes = [
  {
    path: "/admin",
    component: AdminLayout,
    redirect: {
      name: "admin-dashboard",
    },
    // redirect: "/admin/dashboard",
    children: [
      //dashboard
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: Dashboard,
      },
    ],
    meta: {
      requireAuth: true,
    },
  },
];
