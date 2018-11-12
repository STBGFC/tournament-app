<template>
  <div class="container" id="selected-competition">
    
    <h4 class="text-right"><fa-icon icon="futbol"/> <strong>{{competition.name}}/{{competition.section}}</strong></h4>

    <div class="panel-body shadow p-3 mb-3 rounded">
      <b-tabs>
        <b-tab v-for="(group, index) in competition.groups" :key="group" :title="''+(index+1)">
          <div class="row">
            <div class="col">
              <league-table :results = "results.filter( result => result.competition.group == group )" />
            </div>

            <div class="col">
              <h4 class="text-center"><fa-icon icon="running"/> Group {{index+1}} Results</h4>
              <result-list :results = "results.filter( result => result.competition.group == group )" />     
            </div>
          </div>        
        </b-tab>
      </b-tabs>
    </div>

    <div v-if="koResults.length > 0" class="panel-body shadow p-3 mb-3 rounded">
      <div class="col">
        <h4 class="text-center"><fa-icon icon="bell"/> Knockout Section</h4>
        <result-list :results = "koResults" />     
      </div>
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
  props: {
    compName: String, 
    compSection: String
  },
  computed: mapState([
    'tournament', 'highlighted'
  ]),
  created() {
    this.competition = this.tournament.competitions.find(
      competition =>
      competition.name === this.compName &&
      competition.section === this.compSection
    )
    this.results = this.$store.getters.resultsFor(this.competition)
    this.koResults = this.results.filter( result => result.competition.group == undefined )
  }
}
</script>

<style lang="scss">
@import "@/assets/_vars.scss";

#competitions {
  margin-bottom: 5px;
}

.list-group-item.active,
.list-group-item.active:hover,
.list-group-item.active:focus {
    background-color: $emphasis-colour;
    border-color: $emphasis-colour;
}
.points {
    color: $emphasis-colour;
    background-color: #ddd;
    width: 22px;
    font-weight: bold;
}
.team-highlight {
  font-weight: bold;
  color: $team-highlight-fg-colour;
  text-transform: uppercase;
}
.nav-tabs { 
  border-bottom: 1px; 
  margin-bottom: -1px;
}
.nav-link.active {
  background-color: $contrast-bg-colour !important;
  color: $contrast-fg-colour !important;
  border: 0px !important;
}
.panel-body {
    padding: 10px;
    background-color: $panel-bg-colour;
}
</style>
