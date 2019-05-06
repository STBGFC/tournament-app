import Vue from 'vue'
import Vuex from 'vuex'
import client from 'api-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tournament: {},
    results: [],
    highlighted: ''
  },
  mutations: {
    highlight(state, teamName) {
      state.highlighted = teamName
    },
    setTournament(state, tournament) {
      state.tournament = tournament
    },
    setResults(state, results) {
      state.results = results
    }
  },
  actions: {
    fetchTournament ({commit}) {
      return client.fetchTournament().then(tournament => commit('setTournament', tournament))
    },
    fetchResults ({commit}) {
      return client.fetchResults().then(results => commit('setResults', results))
    }
  },
  getters: {
    resultsFor: (state) => (competition) => {
      return state.results.filter(
        result => 
        result.competition.name == competition.name &&
        result.competition.section == competition.section
      )
    }
  }
})
