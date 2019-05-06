import tournament from './tournament'
import results from './results'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchTournament () {
    return fetch(tournament, 1000)
  },

  fetchResults () {
    return fetch(results, 1000)
  }
}