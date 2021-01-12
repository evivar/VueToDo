import Vue from 'vue';

const state = {
    userId: null,
    isLoggedIn: false,
    loginError: '',
    registrationComplete: false,
    registrationMessage: '',
    showErrorProfile: false
};

const getters = {
    isLoggedIn: (state) => { return state.isLoggedIn; },
    userId: (state) => { return state.userId; },
    loginError: (state) => { return state.loginError; },
    registrationComplete: (state) => { return state.registrationComplete; },
    registrationMessage: (state) => { return state.registrationMessage; },
    showErrorProfile: (state) => { return state.showErrorProfile; }
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

    async saveChanges({ commit }, payload) {
        if (((payload.newPassword).replace(/(\n|\r|\t|\0|^\s+|\s+$|[\b])/gim, '')).length > 0) {
            console.log('Longitud :>> ', ((payload.newPassword).replace(/(\n|\r|\t|\0|^\s+|\s+$|[\b])/gim, '')).length);
            await Vue.axios.post('/user/updateProfile', { email: payload.user.email, username: payload.user.username, oldPassword: payload.user.password, newPassword: payload.newPassword }).then((resp) => {
                let data = resp.data;
                if (data) {
                    if (data.user) {
                        payload.userId = data.user.id;
                        payload.email = data.user.email;
                        // commit('loginUser', payload);
                    } else {
                        commit('loginError');
                    }
                }
            }).catch(() => {
                commit('loginError');
            });
        } else {
            commit('showErrorProfile')
        }
    },

    openErrorProfileDialog({ commit }) {
        commit('openErrorProfileDialog')
    },

    closeErrorProfileDialog({ commit }) {
        commit('closeErrorProfileDialog')
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

    showErrorProfile(state) {
        state.showErrorProfile = true;
    },

    openErrorProfileDialog(state) {
        state.showErrorProfile = true;
    },

    closeErrorProfileDialog(state) {
        state.showErrorProfile = false;
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
