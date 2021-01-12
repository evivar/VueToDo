import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/UserStore';
import note from './modules/NoteStore';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        note
    }
});