<template>
  <Header
    >Dashboard
    <template #button>
      <Menu>
        <MenuButton>{{ user.name }} </MenuButton>
        <MenuItems>
          <MenuItem v-slot="{ active }">
            <a :class="{ 'bg-blue-500': active }" href="/account-settings">
              Account settings
            </a>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              @click.prevent="logoutUser"
              :class="{ 'bg-blue-500': active }"
            >
              Logout
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </template>
  </Header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <RouterView />
    </div>
  </main>
</template>
<script setup>
import Header from "../components/admin/Header.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { useUser } from "../stores/user";
import { useAuth } from "../stores/auth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const { setUser, user } = useUser();
const { setAuthenticated } = useAuth();
const router = useRouter();

const logoutUser = () => {
  localStorage.removeItem("token");
  setAuthenticated(false);
  setUser(null);
  router.push({ name: "login" });
  toast.success("Logout Success !", {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
  });
};
</script>
