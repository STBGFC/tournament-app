<template>
<div class="container" id="main">
    <div class="md-7">

        <div class="jumbotron">
            <h1>{{tournament.name}}</h1>
            <blockquote>
                <p>{{tournament.description}}</p>
                <footer>Select a competition below to view results and fixtures</footer>
            </blockquote>
        </div>


        <!-- <div id="competitions">
            <div class="btn-group" ng-repeat="comp in tournament.competitions | unique: 'name'">
                <button type="button" class="btn btn-lg btn-default btn-agegroup dropdown-toggle" data-toggle="dropdown">
                    {{ comp.name }} <span class="small glyphicon glyphicon-triangle-bottom"></span>
                </button>
                <ul class="dropdown-menu" role="menu">
                    <li ng-repeat="comp2 in tournament.competitions | filter: {name: comp.name}: true">
                        <a ui-sref="results({ name: comp2.name, section: comp2.section })">{{comp2.section}}</a>
                    </li>
                </ul>
            </div>
        </div> -->
        
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  computed: mapState([
    'tournament'
  ])
}
</script>

<style lang="scss" scoped>
@import "@/assets/_vars.scss";

.jumbotron {
    background-color: $emphasis-colour;
    p {
      margin-bottom: 15px;
      font-size: 1.5rem;
      font-weight: 200;
    }
}
blockquote > footer {
    color: $primary-bg-colour;
}
</style>
