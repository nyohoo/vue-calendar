import axios from 'axios';
import { serializeCalendar } from '../../functions/serializers';

const apiUrl = 'http://localhost:3000';

const state = {
  calendars: [],
};

const getters = {
  calendars: state => state.calendars.map(calendar => serializeCalendar(calendar)),
};

const mutations = {
  setCalendars: (state, calendars) => (state.calendars = calendars),
};

const actions = {
  async fetchCalendars({ commit }) {
    const response = await axios.get(`${apiUrl}/calendars`);
    console.log(response);
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