import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const state = {
  events: [],
};

const getters = {
  events: (state) => state.events,
};

const mutations = {
  setEvents: (state, events) => (state.events = events),
};

const actions = {
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
