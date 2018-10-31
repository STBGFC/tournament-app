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
      <result v-for="result in results" :key="result.tag" :pResult="result"/>
    </tbody>
  </table>
</template>

<script>
import Result from '@/components/Result.vue'

export default {
  name: 'result-list',
  components: {
    Result
  },
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
  color: blueviolet;
}
td.info-col {
    width: 15px;
}
</style>
