<template>
    <div class="px-8 flex justify-center flex-wrap content-center sm:justify-around">
        <div v-for="group in groups" :key="group.id" class="py-8 px-8 bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:space-y-0 sm:space-x-6">
            <div class="text-center space-y-2 sm:text-left">
                <div class="space-y-0.5">
                <p class="text-lg text-black font-semibold">
                {{ capitalizeTitle }}
                {{ formatedDate }}
                {{ group.id }} - {{ group.title }}
                </p>
                <p>
                    <span class="text-gray-500 font-medium" >Admin :</span> {{group.admin.username}}
                </p>
                <p class="text-gray-500 font-medium">
                    <span class="text-gray-500 font-medium" >Membres :</span> {{group.group_members.length > 0 ? group.group_members.length : 0 }}
                </p>
                <p class="font-medium">
                    {{ group.description }}
                </p>
                <span class="text-gray-500 font-medium" >Création :</span> {{ group.createdAt }}
                </div>
                <button class="py-2 px-4 font-semibold rounded-md shadow-md text-white bg-green-500 hover:bg-green-700">Modifier</button>
                <button @click="deleteGroup(group.id)"  class="py-2 px-4 font-semibold rounded-md shadow-md text-white bg-red-500 hover:bg-red-700">Supprimer</button>
            </div>
        </div>
    </div>
    <div class="px-8 flex justify-center flex-wrap content-center sm:justify-around">
        <div class="my-8 py-6 px-6 max-w-md mx-auto bg-white rounded-l shadow-md space-y-6 md:py-6 md:flex-row md:items-center md:space-y-8 md:space-x-6">
            <h2 class="text-lg text-black font-semibold" >Ajouter un groupe</h2>
            <div v-if="error">
                <p class="text-red-500 text-xs italic">{{ error }}</p>
            </div>
            <form @submit.prevent="addGroup" method="POST" action="http://localhost:3000/group" >
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
                    <input v-model="newGroup.title" type="text" name="title" id="title" autocomplete="given-name" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block sm:text-sm border border-gray-300 rounded-md" />
                </div>
                <div class=" sm:py-6">
                    <label for="about" class="block text-sm font-medium text-gray-700">
                    Description
                    </label>
                    <div class="mt-1">
                        <textarea v-model="newGroup.description" id="about" name="description" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="you@example.com" />
                    </div>
                    <p class="mt-2 text-sm text-gray-500">
                    Brief description for your profile. URLs are hyperlinked.
                    </p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                    Photo
                    </label>
                    <div class="mt-1 flex items-center">
                    <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                    <button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Change
                    </button>
                    </div>
            </div>
            <fieldset class="space-y-6 sm:py-6">
                <div class="flex items-start">
                    <div class="flex items-center h-5">
                        <input v-model="newGroup.private" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" name="private" id="">
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="private" class="font-medium text-gray-700">Groupe privé</label>
                        <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                </div>
            </fieldset>
                <input type="submit" class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700" value="Ajouter">
            </form>
        </div>
        <div class="my-8 py-6 px-6 max-w-md mx-auto bg-white rounded-l shadow-md space-y-6 md:py-6 md:flex-row md:items-center md:space-y-8 md:space-x-6">    
            <h2 class="text-lg text-black font-semibold">Résultat API</h2>
                <ul>
                    <li v-for="(value, name) in groups" :key="name">
                    {{ name }} - {{ value }}
                    </li>
                </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
    name: 'groupForm',
    data() {
        return {
            error: '',
            groups: [],
            newGroup: {
                title: null,
                description: null,
                private: 0,
                user_id: 6
            },
        }
    },
    async mounted() {
        try {
            const resp = await axios.get('/groups');
            if (!resp)
                return 'Groups not found.'

            this.groups = resp.data;
        } catch (error) {
            this.message = "Groups error.";
        }
    },
    async updated() {
        try {
            const resp = await axios.get('/groups');
            if (!resp)
                return 'Groups not found.'

            this.groups = resp.data;
        } catch (error) {
            this.message = "Groups error.";
        }
    },
    methods: {
        async addGroup() {
            try {
                if(!this.newGroup.title || !this.newGroup.user_id) return this.error = 'Champs incomplet';

                const resp = await axios.post('http://localhost:3000/group', this.newGroup);
                if (!resp)
                    return 'Groups not found.'
            } catch (error) {
                this.message = "Groups error.";
            }
        },
        async editGroup() {

        },
        async deleteGroup(id) {
            try {
                if(!id) return;
                const resp = await axios.delete(`http://localhost:3000/group/${id}`);
                if (!resp)
                    return 'Groups not found.'
                console.log(resp);

            } catch (error) {
                this.message = "Groups error.";
            }
        }
    },
    computed: {
        capitalizeTitle() {
            this.groups.map( item => item.title = item.title.charAt(0).toUpperCase() + item.title.slice(1));
        },
        formatedDate() {
            this.groups.map( item => {
                if (item.createdAt) {
                    const date = new Date(String(item.createdAt));
                    item.createdAt = new Intl.DateTimeFormat('default', { dateStyle: 'short' }).format(date);
                }
            });
        }
    }
}
</script>
