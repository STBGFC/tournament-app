<template>
  <div class="container" id="selected-competition">
    
    <h4 class="text-right"><fa-icon icon="futbol"/> <strong>{{competition.name}}/{{competition.section}}</strong></h4>

    <div class="panel-body">
      <b-tabs>
        <b-tab title="1" active>
          <div class="row">
            <div class="col">
              <league-table :p-results = "results" />
            </div>

            <div class="col">
              <section ng-show="group.results.length > 0">
                <h4 class="text-center">Group 1 Results</h4>
                <result-list :p-results = "results" />               
              </section>
            </div>
          </div>        
        </b-tab>
        <b-tab title="2" >
          <br>I'm the second tab content
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LeagueTable from '@/components/LeagueTable.vue'
import ResultList from '@/components/ResultList.vue'

export default {
  name: 'competition-view',
  components: {
    LeagueTable,
    ResultList
  },
  computed: mapState([
    'tournament', 'highlighted'
  ]),
  data: function() {
    return {
      competition: {
        name: "U11",
        section: "A"
      },
      results: [
        {__v:0,day:1,dateTime:30600000,duration:'8m',pitch:'1',competition:{name:'U11', section:'A', group:'1'},tag:'1', homeTeam:'Arsenal', awayTeam:'Liverpool', homeGoals:2, awayGoals:1},
        {__v:0,day:1,dateTime:30600000,duration:'8m',pitch:'2',competition:{name:'U11', section:'A', group:'1'},tag:'2', homeTeam:'Chelsea', awayTeam:'Man. Utd.', homeGoals:1, awayGoals:1, homePens:1, awayPens:2},
        {__v:0,day:1,dateTime:32400000,duration:'8m',pitch:'1',competition:{name:'U11', section:'A', group:'1'},tag:'3', homeTeam:'Newcastle', awayTeam:'Arsenal'},
        {__v:0,day:1,dateTime:32400000,duration:'8m',pitch:'2',competition:{name:'U11', section:'A', group:'1'},tag:'4', homeTeam:'Liverpool', awayTeam:'Chelsea'},
      ]
    }
  }
}
</script>

<style lang="scss">
.nav-tabs { border-bottom: 0px; }
.nav-link.active {
  background-color: #333 !important;
  color: whitesmoke !important;
  border: 0px !important;
}
.panel-body {
    padding: 10px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: rgba(0,0,255,0.1);
}
</style>
