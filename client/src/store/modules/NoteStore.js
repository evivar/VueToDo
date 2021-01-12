import Vue from 'vue';

const state = {
    user: null,
    completed: [],
    nonCompleted: [],
    profileDialog: false
};

const getters = {
    user: (state) => { return state.user; },
    completed: (state) => { return state.completed; },
    nonCompleted: (state) => { return state.nonCompleted; },
    totalNotes: (state) => { return state.nonCompleted.length + state.completed.length; },
    completedPct: (state) => { return state.completed.length * 100 / (state.nonCompleted.length + state.completed.length); },
    nonCompletedPct: (state) => { return state.nonCompleted.length * 100 / (state.nonCompleted.length + state.completed.length); },
    profileDialog: (state) => { return state.profileDialog; }
};

const actions = {
    setUser({ commit }, payload) {
        commit('setUser', payload);
    },

    openProfileDialog({ commit }) {
        commit('openProfileDialog');
    },

    closeProfileDialog({ commit }) {
        commit('closeProfileDialog');
    },

    async getNotes({ commit, state }) {
        await Vue.axios.post('/notes/index', { id: state.user.userId }).then((resp) => {
            let data = resp.data;
            if (data) {
                commit('getNotes', data);
            } else {
                commit('notesError');
            }
        }).catch(() => {
            commit('notesError');
        })
    },

    async addNote({ commit, state }, note) {
        await Vue.axios.post('/notes/createNote', { id: state.user.userId, note: note }).then((resp) => {
            let data = resp.data;
            if (data) {
                commit('getNotes', data);
            } else {
                commit('notesError');
            }
        }).catch(() => {
            commit('notesError');
        })
    },

    async deleteCompletedNotes({ commit }) {
        await Vue.axios.post('/notes/deleteCompletedNotes', { id: state.user.userId }).then((resp) => {
            let data = resp.data;
            if (data) {
                commit('getNotes', data);
            } else {
                commit('notesError');
            }
        }).catch(() => {
            commit('notesError');
        })
    },

    async completeNote({ commit }, noteId) {
        await Vue.axios.post('/notes/completeNote', { id: state.user.userId, noteId: noteId }).then((resp) => {
            let data = resp.data;
            if (data) {
                commit('getNotes', data);
            } else {
                commit('notesError');
            }
        }).catch(() => {
            commit('notesError');
        })
    },

    async deleteNote({ commit }, noteId) {
        await Vue.axios.post('/notes/deleteNote', { id: state.user.userId, noteId: noteId }).then((resp) => {
            let data = resp.data;
            if (data) {
                commit('getNotes', data);
            } else {
                commit('notesError');
            }
        }).catch(() => {
            commit('notesError');
        })
    }


};

const mutations = {

    setUser(state, payload) {
        state.user = payload.user;
    },

    openProfileDialog(state) {
        state.profileDialog = true;
    },

    closeProfileDialog(state) {
        state.profileDialog = false;
    },

    getNotes(state, payload) {
        state.completed = payload.completed;
        state.nonCompleted = payload.nonCompleted;
    },

    notesError(state) {
        state.isLoggedIn = false;
        state.loginError = "Login failed. \n Incorrect username or password.";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
