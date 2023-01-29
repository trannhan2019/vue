<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="full-name" class="sr-only">Full Name</label>
            <input
              v-model="user.name"
              name="name"
              type="text"
              autocomplete="name"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="user.email"
              name="email"
              type="email"
              autocomplete="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="user.password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Retype Password</label>
            <input
              v-model="user.re_password"
              name="re_password"
              type="password"
              autocomplete="current-password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Retype Password"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
        <div class="text-center">
          <div class="text-sm">
            <router-link
              :to="{ name: 'login' }"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Login Here
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";
import { useUser } from "@/stores/user";
import { register } from "@/api/modules/auth";
import { toast } from "vue3-toastify";

const user = reactive({
  name: "",
  email: "",
  password: "",
  re_password: "",
});

const { setAuthenticated } = useAuth();
const { setUser } = useUser();
const router = useRouter();

const onSubmit = async () => {
  const { res, err } = await register(user);
  if (res) {
    setAuthenticated(true);
    setUser(res);
    toast.success("Register success !", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
    router.replace({ name: "admin-dashboard" });
  }
  if (err) {
    setAuthenticated(false);
    setUser(null);
    toast.error(`Error: ${err.message}`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  }
};
</script>
