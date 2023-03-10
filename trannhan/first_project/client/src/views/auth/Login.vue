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
          Login
        </h2>
      </div>
      <vee-form
        v-slot="{ handleSubmit }"
        :validation-schema="schema"
        :initial-values="initialValues"
        as="div"
      >
        <form class="mt-8 space-y-6" @submit="handleSubmit($event, onSubmit)">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <Field
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              <error-message name="email" class="text-red-500" />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <Field
                name="password"
                type="password"
                autocomplete="current-password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <error-message name="password" class="text-red-500" />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
          <div class="text-center">
            <div class="text-sm">
              <router-link
                :to="{ name: 'register' }"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don't have an account yet? Register Here
              </router-link>
            </div>
          </div>
        </form>
      </vee-form>
    </div>
  </div>
</template>

<script setup>
// import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../../stores/auth";
import { useUser } from "../../stores/user";
import { login } from "../../api/modules/auth";
import { toastSuccess, toastError } from "@/utils/toastMessage";
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const { setAuthenticated } = useAuth();
const { setUser } = useUser();
const router = useRouter();

// Define a validation schema
const schema = yup.object({
  email: yup.string().required().email().label("Email Address"),
  password: yup.string().required().min(8).label("Your Password"),
});

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = async (values) => {
  const { res, err } = await login(values);
  if (res) {
    setAuthenticated(true);
    setUser(res);
    toastSuccess("Login success !");
    router.replace({ name: "admin-dashboard" });
  }
  if (err) {
    console.log(err);
    setAuthenticated(false);
    setUser(null);
    toastError(err);
  }
};
</script>
