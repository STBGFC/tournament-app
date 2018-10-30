<template>
    <p v-if="tableEntries == undefined || tableEntries.length === 0" class="lead noresults">
      No fixtures have been created in this group yet.
    </p>
    <table v-else class="table tp">
      <thead>
        <tr>
          <th class="text-left">Team</th>
          <th class="text-right">Pld</th>
          <th class="text-right">W</th>
          <th class="text-right">D</th>
          <th class="text-right">L</th>
          <th class="text-right">F</th>
          <th class="text-right">A</th>
          <th class="text-right">Pts</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in tableEntries" :key="entry.name" @click="highlight(entry.name)" :class="{'team-highlight': highlighted === entry.name}">
          <td class="text-left">{{entry.name}}</td>
          <td class="text-right">{{entry.played}}</td>
          <td class="text-right">{{entry.won}}</td>
          <td class="text-right">{{entry.drawn}}</td>
          <td class="text-right">{{entry.lost}}</td>
          <td class="text-right">{{entry.goalsFor}}</td>
          <td class="text-right">{{entry.goalsAgainst}}</td>
          <td class="text-right points">{{entry.points}}</td>
        </tr>
      </tbody>
    </table>
</template>

<script>
import leaguesort from 'leaguesort'

export default {
  name: 'league-table',
  props: {
    pResults: Array
  },
  computed: {
    tableEntries() {
      return leaguesort.calculateTable(this.results)
    },
    highlighted() {
      return this.$store.state.highlighted
    }
  },
  data: function() {
    return {
      results: this.pResults
    }
  },
  methods: {
    highlight: function(teamName) {
      if (this.highlighted !== teamName) {
        this.$store.commit('highlight', teamName);
      }
      else {
        this.$store.commit('highlight', '');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p.noresults {
  background-color: #333;
  color: whitesmoke;
  padding: 3px 8px;
}
th.points {
  background-color: #333;
}
</style>
