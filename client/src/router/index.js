import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Users from '../views/Users.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';

const routes = [
    {
        path:'/',
        name: 'Home',
        component: Home
    },
    {
        path: '/users',
        name: 'Users',
        component: Users
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    // {
    //     path: '/logout',
    //     name: 'Login',
    //     component: Login
    // }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;