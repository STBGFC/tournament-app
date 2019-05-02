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

        <div id="competitions">
            <div class="btn-group" v-for="comp in tournament.competitions" :key="comp.name">
                <button type="button" class="btn btn-lg btn-default btn-agegroup dropdown-toggle" data-toggle="dropdown">
                    {{ comp.name }}
                </button>
            </div>
        </div>
        
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

<style lang="scss">
@import "@/assets/_vars.scss";

.container .jumbotron {
  background-color: $emphasis-colour;
  color: $primary-bg-colour;
  border-radius: 0;
  padding: 20px 15px;
  p {
    color: silver;
    margin-bottom: 15px;
    font-size: 1.5rem;
    font-weight: 200;
  }
}

blockquote > footer {
  color: $primary-bg-colour;
  font-family: Arial, sans-serif;
  font-weight: normal;
  font-style: italic;
  border-left: 5px solid $emphasis-colour;
  padding: 15px;
}

@media screen and (max-width: 767px) {
  .jumbotron { 
    background-size: 60px auto; 
  }
}

@media screen and (min-width: 768px) {
  .jumbotron { 
    background-size: 85px auto; 
  }
  div#selected-competition>h4 { 
    color: #333;
  }
}
</style>
