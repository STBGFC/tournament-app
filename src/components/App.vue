<template>
  <div id="app">
    <div id="wrap">
      <b-navbar toggleable="md" type="dark" fixed="top" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">
          {{tournament.name}} 
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item to="/competition/U11/A">Competition</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Team Search"/>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Go</b-button>
            </b-nav-form>

            <b-nav-item-dropdown text="Competitions" right>
              <b-dropdown-item href="#">A</b-dropdown-item>
              <b-dropdown-item href="#">B</b-dropdown-item>
              <b-dropdown-item href="#">C</b-dropdown-item>
              <b-dropdown-item href="#">D</b-dropdown-item>
              </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>

      <transition name="slide-right">
        <router-view/>
      </transition>

    </div>

    <div id="footer" class="hidden-print">
      <div class="container">
        <p class="text-center">
          <small>
            <a :href="tournament.siteUrl">{{ tournament.club }}</a>
            | &copy;2013-2019 Darren Davison
          </small>
        </p>
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
  ]),
  async created () {
    await this.$store.dispatch('fetchTournament')
  }
}
</script>

<style lang="scss">
@import '@/assets/_vars.scss';

html, body { 
  height: 100%; 
}
body {
  font-family: $font-stack;
  padding-top: 80px;
  background-color: $primary-bg-colour;
}
h1 {
    margin-top: 0;
}
a,
a:hover,
a:focus {
    color: $emphasis-colour;
}

#app {
  height: 100%;
}  
#wrap {
  min-height: 100%;
  height: auto !important;
  margin: 0 auto -40px;
  padding: 0 0 $footer-height;
}
#footer {
  height: $footer-height;
  color: #ccc;
  background-color: rgba(48,48,48,0.75);
  a {
    color: $contrast-fg-colour;
    border-bottom: 1px dotted $contrast-fg-colour;
    text-decoration: none;
  }
}

.dropdown-menu>li>a:hover,
.dropdown-menu>li>a:focus {
  background-color: $emphasis-colour;
  color: $primary-bg-colour;
}
.container .credit {
  margin: 10px 0;
}
.panel .table {
  margin-bottom: 0;
}
.table thead tr {
  background-color: $contrast-bg-colour;
  color: $contrast-fg-colour;
}
.table thead > tr > th {
  border-bottom: 1px solid $primary-bg-colour;
}

.bg-dark {
  background-color: $contrast-bg-colour !important;
}

a.navbar-brand img {
  margin-top: -1px;
  max-height: 46px;
}

@media print {
  body {
    .no-print {
      display: none;
    }
    .table {
      page-break-after: always;
      page-break-inside: avoid;
    }
    padding-top: 0px;
  }
}
</style>
