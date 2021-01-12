import Vue from 'vue';

const state = {
    userId: null,
    isLoggedIn: false,
    loginError: '',
    registrationComplete: false,
    registrationMessage: ''
};

const getters = {
    isLoggedIn: (state) => { return state.isLoggedIn; },
    userId: (state) => { return state.userId; },
    loginError: (state) => { return state.loginError; },
    registrationComplete: (state) => { return state.registrationComplete; },
    registrationMessage: (state) => { return state.registrationMessage; }
};

const actions = {
    async loginUser({ commit }, payload) {
        await Vue.axios.post('/user/login', { username: payload.username, password: payload.password }).then((resp) => {
            let data = resp.data;
            if (data) {
                if (data.user) {
                    payload.userId = data.user.id;
                    payload.email = data.user.email;
                    commit('loginUser', payload);
                } else {
                    commit('loginError');
                }
            }
        }).catch(() => {
            commit('loginError');
        })
    },

    async registerUser({ commit }, payload) {
        if (payload.email.length < 1 || payload.username.length < 1 || payload.password.length < 1) {
            commit('registerError');
        } else {
            await Vue.axios.post('/user/register', { email: payload.email, username: payload.username, password: payload.password }).then((resp) => {
                let data = resp.data;
                if (data) {
                    if (!data.error) {
                        commit('registerUser');
                    } else {
                        commit('registerError');
                    }
                }
            }).catch(() => {
                commit('registerError');
            });
        }
    },

    logout({ commit }) {
        commit('logout');
    }
};

const mutations = {
    loginUser(state, payload) {
        state.username = payload.username;
        state.userId = payload.userId;
        state.isLoggedIn = true;
    },

    loginError(state) {
        state.isLoggedIn = false;
        state.loginError = "Login failed. \n Incorrect username or password.";
    },

    registerUser(state) {
        state.registrationMessage = "Registration completed.";
        state.registrationComplete = true;
    },

    registerError(state) {
        state.isLoggedIn = false;
        state.loginError = "Registration failed. \n Username or E-mail already in use.";
    },

    logout(state) {
        state.isLoggedIn = false;
        state.userId = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
