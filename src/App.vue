<template>
  <div id="app">
    <div id="wrap">
      <b-navbar toggleable="md" type="dark" fixed="top" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">
          <img src="img/badge-icon.png"/>
          NavBar
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-item-dropdown text="Lang" right>
              <b-dropdown-item href="#">EN</b-dropdown-item>
              <b-dropdown-item href="#">ES</b-dropdown-item>
              <b-dropdown-item href="#">RU</b-dropdown-item>
              <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content">
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>


      <router-view/>

    </div>

    <div id="footer" class="hidden-print">
      <div class="container">
        <p class="text-center">
          <small>
            <a :href="tournament.siteUrl">{{ tournament.club }}</a>
            | &copy;2013-18 Darren Davison
          </small>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  // todo: pull from vuex store
  data: function() {
    return {
      tournament: {
        name: 'STBGFC May Tournament',
        siteUrl: 'https://a.b.c/foo',
        club: 'STBGFC'
      }
    }
  }
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
.navbar {
  border-radius: 0;
  margin-bottom: 0;
}
.navbar-custom { background-color: #000; }
.navbar-right { margin-right: 0; }
.navbar-text { font-weight: bold; }
a.navbar-brand img {
  margin-top: -13px;
}
a.navbar-brand img {
  max-height: 46px;
}
.centered-pills { text-align:center; }
.centered-pills ul.nav-pills { display:inline-block; }
.centered-pills li { display:inline; }
.centered-pills a { float:left; }

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
@media screen and (max-width: 767px) {
  .jumbotron { background-size: 60px auto; }
}

@media screen and (min-width: 768px) {
  .jumbotron { background-size: 85px auto; }
}
</style>
