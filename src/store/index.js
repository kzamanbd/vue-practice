import { createStore } from 'vuex';
import $axios from '@/plugins/axios';

// ? init vuex store
export default createStore({
    state: {
        tags: [],
        users: [],
        token: localStorage.getItem('token') || null,
        user: localStorage.getItem('user') || null,
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
                    commit('SET_USER', response.data.user);
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async serverInit({ commit }) {
            try {
                const response = await $axios.get('/init-app');
                commit('SET_TAGS', response.data.tags);
                commit('SET_USERS', response.data.users);
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
        SET_TOKEN(state, data) {
            return (state.token = data);
        },
        SET_USER(state, data) {
            return (state.user = data);
        },
        SET_TAGS(state, data) {
            state.tags = data;
        },

        SET_USERS(state, data) {
            state.users = data;
        },
    },
});
