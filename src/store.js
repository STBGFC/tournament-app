import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tournament: {
      name: 'Sandhurst 2019',
      siteUrl: 'https://a.b.c/foo',
      club: 'STBGFC',
      description: 'Welcome to the Sandhurst Town Boys & Girls FC Summer Tournament.'
    },
    results: [
      {__v:0,day:1,dateTime:30600000,duration:'8m',pitch:'1',competition:{name:'U11', section:'A', group:'1'},tag:'1', homeTeam:'Arsenal', awayTeam:'Liverpool', homeGoals:2, awayGoals:1},
      {__v:0,day:1,dateTime:30600000,duration:'8m',pitch:'2',competition:{name:'U11', section:'A', group:'1'},tag:'2', homeTeam:'Chelsea', awayTeam:'Man. Utd.', homeGoals:1, awayGoals:1, homePens:1, awayPens:2},
      {__v:0,day:1,dateTime:32400000,duration:'8m',pitch:'1',competition:{name:'U11', section:'A', group:'1'},tag:'3', homeTeam:'Newcastle', awayTeam:'Arsenal'},
      {__v:0,day:1,dateTime:32400000,duration:'8m',pitch:'2',competition:{name:'U11', section:'A', group:'1'},tag:'4', homeTeam:'Liverpool', awayTeam:'Chelsea'},
    ],
    highlighted: ''
  },
  mutations: {
    highlight(state, teamName) {
      state.highlighted = teamName
    }
  },
  getters: {
    // eslint-disable-next-line
    resultsFor: (state) => (competition) => {
      //return state.results.find(result => result.competition.name == competition.name)
      return state.results
    }
  }
})
