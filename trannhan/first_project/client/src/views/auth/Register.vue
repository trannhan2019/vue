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
      <VeeForm
        v-slot="{ handleSubmit }"
        :validation-schema="schema"
        as="div"
        :initial-values="initialValues"
      >
        <form class="mt-8 space-y-6" @submit="handleSubmit($event, onSubmit)">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="full-name" class="sr-only">Full Name</label>
              <Field
                name="name"
                type="text"
                autocomplete="name"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
              <ErrorMessage name="name" />
            </div>
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <Field
                name="email"
                type="email"
                autocomplete="email"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <Field
                name="password"
                type="password"
                autocomplete="current-password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <ErrorMessage name="password" class="text-red-500" />
            </div>
            <div>
              <label for="password" class="sr-only">Retype Password</label>
              <Field
                name="re_password"
                type="password"
                autocomplete="current-password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Retype Password"
              />
              <ErrorMessage name="re_password" />
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
      </VeeForm>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";
import { useUser } from "@/stores/user";
import { register } from "@/api/modules/auth";
import { toastSuccess, toastError } from "@/utils/toastMessage";
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required().min(5).label("Your name"),
  email: yup.string().required().email().label("Email Address"),
  password: yup.string().required().min(6).label("Your Password"),
  re_password: yup
    .string()
    .required()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
});
const initialValues = {
  name: "",
  email: "",
  password: "",
  re_password: "",
};

const { setAuthenticated } = useAuth();
const { setUser } = useUser();
const router = useRouter();

const onSubmit = async () => {
  const { res, err } = await register(user);
  if (res) {
    setAuthenticated(true);
    setUser(res);
    toastSuccess("Register success");
    router.replace({ name: "admin-dashboard" });
  }
  if (err) {
    setAuthenticated(false);
    setUser(null);
    toastError(err);
  }
};
</script>
