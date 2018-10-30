<template>
  <table class="table tp">
  <thead>
    <tr>
      <th class="text-center" width="10px"><small><fa-icon icon="tag"/></small></th>
      <th class="text-center" width="10px"><small><fa-icon icon="clock"/></small></th>
      <th class="text-center" width="10px"><small><fa-icon icon="map"/></small></th>
      <th class="text-right">home</th>
      <th colspan="2"></th>
      <th>away</th>
    </tr>
  </thead>
  <tbody>
    <!-- TODO: results needs to be ordered by pitchNumber, then dateTime -->
    <tr v-for="result in results" :key="result.tag">
      <td class="text-center text-muted info-col">{{result.tag}}</td>
      <!-- TODO: filter time format -->
      <!-- <td class="text-center text-muted info-col">{{result.dateTime | date:'HH:mm' : '+0100'}}</td> -->
      <td class="text-center text-muted info-col">{{result.dateTime}}</td>
      <td class="text-center text-muted info-col">{{result.pitch}}</td>
      <td class="text-right" :class="{'team-highlight': highlighted === result.homeTeam}">{{result.homeTeam}}</td>
      <td class="text-center points">{{result.homeScore}}</td>
      <td class="text-center points">{{result.awayScore}}</td>
      <td class="text-left" :class="{'team-highlight': highlighted === result.awayTeam}">{{result.awayTeam}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
// https://codepen.io/sebastienrocks/pen/oaOwQq
export default {
  name: 'result-list',
  props: {
    pResults: Array
  },
  data: function() {
    return {
      highlighted: '', // TODO: link with LeagueTable property
      results: this.pResults
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.points {
  font-weight: bold;
}
td.info-col {
    width: 15px;
}
</style>
