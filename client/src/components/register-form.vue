<template>
  <div class="bg-indigo-100 flex justify-center items-center">
    <div class="lg:w-2/5 md:w-1/2 w-2/3">
      
      <form
        @submit.prevent="addUser"
        method="POST"
        action="http://localhost:3000/user"
        class="bg-white p-10 rounded-lg shadow-lg min-w-full"
      >
        <h1 class="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
          Créer son compte
        </h1>
        <div>
          <label
            class="text-gray-800 font-semibold block my-3 text-md"
            for="username"
            >Nom d'utilisateur</label
          >
          <input
            v-model="newUser.username"
            class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
          <div v-if="error.name == 'username'">
            <p class="text-red-500 text-xs italic">{{ error.message }}</p>
          </div>
        </div>
        <div>
          <label
            class="text-gray-800 font-semibold block my-3 text-md"
            for="email"
            >E-mail</label
          >
          <input
            v-model="newUser.email"
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
        <div
          x-data
          x-init="flatpickr($refs.datetimewidget, {wrap: true, enableTime: true, dateFormat: 'M j, Y h:i K'});"
          x-ref="datetimewidget"
          class="flatpickr container mx-auto col-span-6 sm:col-span-6 mt-5"
        >
          <label
            for="datetime"
            class="text-gray-800 font-semibold block my-3 text-md"
            >Date de naissance</label
          >
          <div class="flex align-middle align-content-center">
            <input
              v-model="newUser.birthday"
              x-ref="datetime"
              type="text"
              id="datetime"
              data-input
              placeholder="Select.."
              class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            />

            <a
              class="
                h-11
                w-10
                input-button
                cursor-pointer
                rounded-r-md
                bg-transparent
                border-gray-300 border-t border-b border-r
              "
              title="clear"
              data-clear
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 mt-2 ml-1"
                viewBox="0 0 20 20"
                fill="#c53030"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <div v-if="error.name == 'birthday'">
              <p class="text-red-500 text-xs italic">{{ error.message }}</p>
            </div>
          </div>
        </div>
        <div>
          <label
            class="text-gray-800 font-semibold block my-3 text-md"
            for="password"
            >Mot de passe</label
          >
          <input
            v-model="newUser.password"
            class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <div>
          <label
            class="text-gray-800 font-semibold block my-3 text-md"
            for="confirm"
            >Confirmer le mot de passe</label
          >
          <input
            v-model="newUser.passwordConfirm"
            class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            type="password"
            name="passwordConfirm"
            id="confirm"
            placeholder="confirm password"
          />
          <div v-if="error.name == 'passwordConfirm'">
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
          S'enregistrer
        </button>
      </form>
      <FlashMessage />
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

export default {
  name: "registerForm",
  data() {
    return {
      message: "",
      error: "",
      user: "",
      newUser: {
        username: undefined,
        email: undefined,
        password: undefined,
        passwordConfirm: undefined,
        birthday: undefined,
        roles: ["ROLE_USER"],
      },
    };
  },
  components: {
  },
  watch: {
    //whenever question changes, this function will run
  },
  methods: {
    async addUser() {
      try {
        const message = await axios.post(`/signup`, this.newUser);
        if (!message) {
          this.$flashMessage.show({
              type: 'error',
              title: 'Création du compte',
              message: 'Impossible de creer le compte'
          });
        }

        this.$flashMessage.show({
            type: 'success',
            title: 'Création du compte',
            text: message.data
        });

      } catch (error) {
   
        this.error = error.response.data;
      }
    },
  },
};
</script>