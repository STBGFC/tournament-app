<template>
  <div class="container" id="selected-competition">
    
    <h4 class="text-right"><fa-icon icon="futbol"/> <strong>{{compName}}/{{compSection}}</strong></h4>

    <div class="panel-body shadow p-3 mb-5 rounded">
      <b-tabs>
        <b-tab title="1" active>
          <div class="row">
            <div class="col">
              <league-table :results = "results" />
            </div>

            <div class="col">
              <h4 class="text-center"><fa-icon icon="running"/> Group 1 Results</h4>
              <result-list :results = "results" />     
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
  props: {
    compName: String, 
    compSection: String
  },
  computed: mapState([
    'tournament', 'highlighted'
  ]),
  data: function() {
    let competition = {
      name: this.compName,
      section: this.compSection
    }
    return {
      results: this.$store.getters.resultsFor(competition)
    }
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
