<template>
  <table class="table tp">
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
    <tbody v-if="tableEntries == undefined || tableEntries.length === 0">
      <tr>
        <td colspan="8">
          No fixtures have been played in this group yet.
        </td>
      </tr>
    </tbody>
    <tbody v-else>
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
    results: Array
  },
  computed: {
    tableEntries() {
      return leaguesort.calculateTable(this.results)
    },
    highlighted() {
      return this.$store.state.highlighted
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
@import "@/assets/_vars.scss";

p.noresults {
  background-color: $contrast-bg-colour;
  color: $contrast-fg-colour;
  padding: 3px 8px;
}
th {
  border-top: 1px solid $contrast-bg-colour;
  .points {
    background-color: $contrast-bg-colour;
  }
}
</style>
