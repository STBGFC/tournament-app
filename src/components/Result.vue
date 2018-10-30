<template>
    <tr>
        <td class="text-center text-muted info-col">{{result.tag}}</td>
        <!-- TODO: filter time format -->
        <!-- <td class="text-center text-muted info-col">{{result.dateTime | date:'HH:mm' : '+0100'}}</td> -->
        <td class="text-center text-muted info-col">{{result.dateTime}}</td>
        <td class="text-center text-muted info-col">{{result.pitch}}</td>
        <td class="text-right" :class="{'team-highlight': highlighted === result.homeTeam}" @click="highlight(result.homeTeam)">{{result.homeTeam}}</td>
        <td class="text-center points">{{homeScore}}</td>
        <td class="text-center points">{{awayScore}}</td>
        <td class="text-left" :class="{'team-highlight': highlighted === result.awayTeam}" @click="highlight(result.awayTeam)">{{result.awayTeam}}</td>
    </tr>
</template>

<script>
export default {
  name: 'result',
  props: ['pResult'],
  data: function() {
    return {
      result: this.pResult
    }
  },
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
    }
  }
}
</script>
