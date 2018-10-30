<template>
  <div id="app">
    <div id="wrap">
      <b-navbar toggleable="md" type="dark" fixed="top" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">
          <img src="../assets/badge-icon.png"/> {{tournament.name}} 
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
  ])
}
</script>

<style lang="scss">
/* todo: replace common values with scss variables */
html, body { height: 100%; }
body {
  padding-top: 80px;
}
h1 {
    margin-top: 0;
}
#app {
  height: 100%;
}  
#wrap {
  min-height: 100%;
  height: auto !important;
  margin: 0 auto -40px;
  padding: 0 0 40px;
}
#footer {
  height: 40px;
}
.container .credit {
  margin: 10px 0;
}
.panel .table {
  margin-bottom: 0;
}
.table thead tr {
  background-color: #333;
  color: whitesmoke;
}
.table thead > tr > th {
  border-bottom: 1px solid #fff;
}

.bg-dark {
  background-color: #333 !important;
}
a.navbar-brand img {
  margin-top: -1px;
}
a.navbar-brand img {
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
