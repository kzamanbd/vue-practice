import { createStore } from 'vuex';
import $axios from '@/plugins/axios';

// ? init vuex store
export default createStore({
    state: {
        token: localStorage.getItem('token') || null,
        user: localStorage.getItem('user') || null,
        tags: [],
        users: [],
    },

    getters: {
        loggedIn(state) {
            return state.token !== null;
        },

        user(state) {
            return state.user;
        },
        getTags(state) {
            return state.tags;
        },
        getUsers(state) {
            return state.users;
        },
    },

    actions: {
        async user({ commit, getters }) {
            if (getters.loggedIn) {
                try {
                    const response = await $axios.get('/auth/current-user');
                    localStorage.setItem('user', response.data.user);
                    commit('user', response.data.user);
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async serverInit({ commit }) {
            try {
                const response = await $axios.get('/init-app');
                commit('setTags', response.data.tags);
                commit('setUsers', response.data.users);
            } catch (err) {
                console.log(err.response);
            }
        },

        async logout(context) {
            if (context.getters.loggedIn) {
                try {
                    await $axios.post('/auth/logout');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },

    mutations: {
        token(state, data) {
            return (state.token = data);
        },
        user(state, data) {
            return (state.user = data);
        },
        setTags(state, data) {
            state.tags = data;
        },

        setUsers(state, data) {
            state.users = data;
        },
    },
});
