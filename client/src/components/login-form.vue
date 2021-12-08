<template>
  <div class="bg-indigo-100 flex justify-center items-center">
    <div class="lg:w-2/5 md:w-1/2 w-2/3">
      <form
        method="POST"
        action="http://localhost:3000/user"
        class="bg-white p-10 rounded-lg shadow-lg min-w-full"
      >
        <div>
          <label
            class="text-gray-800 font-semibold block my-3 text-md"
            for="email"
            >E-mail</label
          >
          <input
            class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            type="text"
            name="email"
            id="email"
            placeholder="@email"
          />
          <div v-if="error.name == 'email'">
            <p class="text-red-500 text-xs italic">{{ error.message }}</p>
          </div>
        </div>
        <div>
          <label
            class="text-gray-800 font-semibold block my-3 text-md"
            for="password"
            >Mot de passe</label
          >
          <input
            v-model="authUser.password"
            class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
            <div v-if="error.password == 'password'">
                <p class="text-red-500 text-xs italic">{{ error.message }}</p>
            </div>
        </div>
        <button
          type="submit"
          class="
            w-full
            mt-6
            bg-indigo-600
            rounded-lg
            px-4
            py-2
            text-lg text-white
            tracking-wide
            font-semibold font-sans
          "
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

export default {
        name: "loginForm",
        data() {
            return {
            message: "",
            error: "",
            authUser: {
                username: undefined,
                roles: ["ROLE_USER"],
            },
            };
        },
        components: {},
        watch: {},
        methods: {},
    };
</script>