import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tournament: {
      name: 'Sandhurst 2019',
      siteUrl: 'https://a.b.c/foo',
      club: 'STBGFC',
      description: 'Welcome to our tourney'
    },
    highlighted: ''
  },
  mutations: {
    highlight(state, teamName) {
      state.highlighted = teamName
    }
  },
  actions: {

  }
})
