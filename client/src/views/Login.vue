<template>
    <login-form></login-form>
    <div class="create-group my-8 py-6 px-6 max-w-md mx-auto bg-white rounded-l shadow-md space-y-6 md:py-6 md:flex-row md:items-center md:space-y-8 md:space-x-6">
    <h2 class="text-lg text-black font-semibold">Résultat API</h2> 
        <ul v-if="user">
            <li v-for="(value, name) in user" :key="name">
            {{ value }}
            </li>
        </ul>
        <div v-else>{{ message }}</div>
    </div>
</template>

<script>
import axios from 'axios';
import loginForm from '../components/login-form.vue';
axios.defaults.baseURL = 'http://localhost:3000';

    export default {
        name: 'Login',
        data() {
            return {
            message:'',
            error: '',
            user: '',
            newUser: {
                username: undefined,
                email: undefined,
                password: undefined,
                passwordConfirm: undefined,
                birthday: undefined,
                roles: ["ROLE_USER"],
            }
            };
        },
        components:{
            loginForm,
        }
    }
</script>