import axios from 'axios';

const apiUrl = 'http://localhots:3000';

const state = {
  calendars: [],
};

const getters = {
  setCalendars: (state, calendars) => (state.calendars = calendars),
};

const mutations = {
  setCalendars: (state, calendars) => (state.calendars = calendars),
};

const actions = {
  async fetchCalendars({ commit }) {
    const response = await axios.get(`${apiUrl}/calendars`);
    commit('setCalendars', response.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};