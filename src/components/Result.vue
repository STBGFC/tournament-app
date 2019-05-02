<template>
    <tr>
        <td class="text-center text-muted info-col">{{result.tag}}</td>
        <td class="text-center text-muted info-col">{{time(result.dateTime)}}</td>
        <td class="text-center text-muted info-col">{{result.pitch}}</td>
        <td class="text-right" :class="{'team-highlight': highlighted === result.homeTeam}" @click="highlight(result.homeTeam)">{{result.homeTeam}}</td>
        <td class="text-center points">{{homeScore}}</td>
        <td class="text-center points">{{awayScore}}</td>
        <td class="text-left" :class="{'team-highlight': highlighted === result.awayTeam}" @click="highlight(result.awayTeam)">{{result.awayTeam}}</td>
    </tr>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'result',
  props: ['result'],
  computed: {
    highlighted() {
      return this.$store.state.highlighted
    },
    homeScore() {
      let r = this.result
      if ('homeGoals' in r && r.homeGoals >= 0) {
        return r.homeGoals + (r.awayPens || r.homePens ? '(' + r.homePens + ')' : '');
      } else {
        return '';
      }
    },
    awayScore() {
      let r = this.result
      if ('awayGoals' in r && r.awayGoals >= 0) {
        return (r.awayPens || r.homePens ? '(' + r.awayPens + ')' : '') + r.awayGoals;
      } else {
        return '';
      }
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
    },
    time: function(dateTime) {
      return moment(dateTime).tz('UTC').format('hh:mm')
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/_vars.scss";

.points {
  font-weight: bold;
  color: $emphasis-colour;
}
td.info-col {
    width: 15px;
}
</style>
