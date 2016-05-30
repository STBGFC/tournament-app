(function() {
    'use strict';

    angular
        .module('stbgfc.tournament', [
            'ngResource',
            'ui.utils',
            'ui.router',
            'btford.socket-io',
            'angularLocalStorage',
            'mgcrea.ngStrap.modal',
            'ui.gravatar',
            'ngSanitize',
            'btford.markdown'
        ])

        // ============================================================================================
        // controllers
        // ============================================================================================

        .controller('TournamentController', function (Tournament, $scope, $state, $log) {
            var tourneys = Tournament.query(function() {
                $scope.tournament = tourneys[0];
            });

            $scope.createCompetition = function(newComp) {
                $log.info('Creating new competition: ' + JSON.stringify(newComp));
                $scope.tournament.competitions.push(newComp);
                $scope.tournament.$update(function() {
                    $state.reload();
                });
            };

            /*
             * event handlers for things broadcast over the websocket
             */
            $scope.$on('socket:result', function(event, data) {
                var result = data;
                if ('competition' in result && 'homeTeam' in result) {
                    if ('homeGoals' in result && result.homeGoals >= 0) {
                        $('#videprinter').teletype({
                            text: [
                                result.competition.name + '/' + result.competition.section + (result.competition.group ? '/' + result.competition.group : '') + ': ' +
                                result.homeTeam + ' ' + result.homeScore + '-' +
                                result.awayScore + ' ' + result.awayTeam
                            ]
                        });
                    }
                }
            });

            $scope.$on('socket:news', function(event, data) {
                $log.debug('news received', data);
                if (data.title && data.body && data.created) {
                    $scope.announcement = data;

                    // OMG! this is awful.. jQuery from inside a controller. Please help!
                    $('#newsalert').modal({backdrop: false});
                }
                else {
                    $log.warn('invalid news broadcast message received');
                }
            });
        })

        .controller('ResultsController', function (Result, Table, $scope, $state, $stateParams, $log) {
            var _grp = $stateParams.group;
            if (_grp === '' || isNaN(_grp)) {
                _grp = 1;
            }

            // build the UI view of the competition
            var competition  = {
                name: $stateParams.name,
                section: $stateParams.section,
                groups: [],
                results: [],
                currentGroup: _grp
            };

            var numericTagComparator = function(a, b) {
                return a.index - b.index;
            };

            // awkward.. find the competition on the tournament and populate the UI version based on attributes
            for (var c = 0; c < $scope.tournament.competitions.length; c++) {
                var it = $scope.tournament.competitions[c];
                if (it.name === $stateParams.name && it.section === $stateParams.section) {
                    // populate groups array
                    for (var j = 0; j < it.groups; j++) {
                        competition.groups.push({
                            results: [],
                            table: []
                        });
                    }
                }
            }

            // fetch results for the competition and split into groups in the scope
            var compResults = Result.query({
                conditions:'{"competition.name":"' + $stateParams.name + '","competition.section":"' + $stateParams.section + '"}'
            }, function() {
                // split the results up into their groups
                for (var i=0; i < compResults.length; i++) {
                    var res = compResults[i];
                    if ('group' in res.competition) {
                        competition.groups[res.competition.group - 1].results.push(res);
                    }
                    else {
                        competition.results.push(res);
                    }
                }

                // update tables
                for (var j = 0; j < competition.groups.length; j++) {
                    competition.groups[j].table = [];
                    // sort results
                    competition.groups[j].results.sort(numericTagComparator);
                    updateTable(competition.groups[j].results, competition.groups[j].table);
                }
                competition.results.sort(numericTagComparator);
            });

            /*
             * given a single result and a current table (which can be the empty array []),
             * return an updated set of entries
             */
            var updateTable = function(resultsList, table) {
                for (var i = 0; i < resultsList.length; i++) {
                    var r = resultsList[i];
                    if ('homeGoals' in r) {
                        var hg = r.homeGoals;
                        var ag = r.awayGoals;
                        var ht = findEntryInTable(r.homeTeam, table);
                        var at = findEntryInTable(r.awayTeam, table);
                        applyResult(ht, at, hg, ag);
                    }
                }
                table.sort(leagueComparator);
            };

            var findEntryInTable = function(name, table) {
                for (var i = 0; i < table.length; i++) {
                    if (table[i].name === name) {
                        return table[i];
                    }
                }

                var entry = {played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, versus: []};
                entry.name = name;
                table.push(entry);
                return entry;
            };

            /*
             * function to apply a result to an existing table of entries in order to
             * update them.  The entries can then be resorted using the comparator
             */
            var applyResult = function(home, away, homeGoals, awayGoals) {
                home.played++;
                away.played++;
                var res = 0;
                if (homeGoals > awayGoals) {
                    home.won++;
                    away.lost++;
                    home.points += 3;
                    res = 1;
                }
                else if (homeGoals === awayGoals) {
                    home.drawn++;
                    away.drawn++;
                    home.points += 1;
                    away.points += 1;
                }
                else {
                    home.lost++;
                    away.won++;
                    away.points += 3;
                    res = -1;
                }
                home.goalsFor += homeGoals;
                away.goalsFor += awayGoals;
                home.goalsAgainst += awayGoals;
                away.goalsAgainst += homeGoals;

                // record head to head
                home.versus.push({
                    name: away.name, res: res
                });
                away.versus.push({
                    name: home.name, res: -res
                });
            };

            /*
             * comparator to sort an array of table entries using the most common mechanics
             * for European sports leagues (by points, then GD, then goals scored, then wins)
             */
            var leagueComparator = function(a, b) {
                // points
                if (a.points > b.points) { return -1; }
                if (a.points < b.points) { return 1; }

                // GD
                var aGD = a.goalsFor - a.goalsAgainst;
                var bGD = b.goalsFor - b.goalsAgainst;
                if (aGD > bGD) { return -1; }
                if (aGD < bGD) { return 1; }

                // scored
                if (a.goalsFor > b.goalsFor) { return -1; }
                if (a.goalsFor < b.goalsFor) { return 1; }

                // wins
                if (a.won > b.won) { return -1; }
                if (a.won < b.won) { return 1; }

                // head to head
                if (b.versus.length > 0) {
                    var c = 0;
                    for (var g = 0; g < a.versus.length; g++) {
                        c += (b.versus[g].name === a.name ? b.versus[g].res : 0);
                    }
                    if (c !== 0) {
                        return c;
                    }
                }

                // name
                return (a.name > b.name);
            };

            var withResult = function(result, del) {
                // if the result affects the current scope, update that scope
                if (result.competition.name === $scope.competition.name && result.competition.section === $scope.competition.section) {
                    var resultsList = $scope.competition.results;
                    if ('group' in result.competition) {
                        resultsList = $scope.competition.groups[result.competition.group - 1].results;
                    }

                    var i = getIndexFor(result, resultsList);
                    if (i !== -1) {
                        if (del) {
                            resultsList.splice(i, 1);
                        }
                        else {
                            resultsList[i] = result;
                        }
                    }
                    else {
                        resultsList.push(result);
                    }

                    if ('group' in result.competition) {
                        $scope.competition.groups[result.competition.group - 1].table = [];
                        updateTable(resultsList, $scope.competition.groups[result.competition.group - 1].table);
                    }

                    resultsList.sort(numericTagComparator);
                }
            };

            var getIndexFor = function(res, list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i]._id === res._id) {
                        return i;
                    }
                }
                return -1;
            };

            // assign local setup to $scope
            $scope.competition = competition;
            $scope.highlighted = '';

            /*
             * event handler for results broadcast over the websocket
             */
            $scope.$on('socket:result', function(event, data) {
                var result = data;
                if ('competition' in result && 'homeTeam' in result) {
                    withResult(data, false);
                }
                else {
                    $log.warn('invalid result broadcast message received: ' + JSON.stringify(result));
                }
            });

            $scope.$on('socket:remove', function(event, data) {
                withResult(data, true);
            });

            $scope.createResult = function() {
                $log.info('Creating new result');
                $scope.newResult = {
                    index: 1000,
                    competition: {
                        name: $stateParams.name,
                        section: $stateParams.section
                    }
                };
                if ($stateParams.group > 0) {
                    $scope.newResult.competition.group = $stateParams.group;
                }
            };

            $scope.saveResult = function(group) {
                var result = new Result($scope.newResult);
                if (group !== 0) {
                    result.competition.group = group;
                }
                if (!isNaN(result.tag)) {
                    result.index = result.tag;
                }
                $log.info('Saving new result: ' + JSON.stringify(result));
                result.$save(function() {
                    withResult(result, false);
                });
                $scope.newResult = {};
            };

            $scope.confirmTablePositions = function() {
                var teamList = [];
                var table = competition.groups[competition.currentGroup-1].table;
                for (var i = 0; i < table.length; i++) {
                    teamList.push(table[i].name);
                }
                var resourceTable = new Table(teamList);
                resourceTable.$save({
                    name: competition.name,
                    section: competition.section.replace(/ /g,''),
                    group: competition.currentGroup
                });
            };

            $scope.highlight = function(teamName) {
                if ($scope.highlighted !== teamName) {
                    $scope.highlighted = teamName;
                }
                else {
                    $scope.highlighted = '';
                }
            };
        })

        .controller('ResultEditController', function($scope, $state, $stateParams, Result, $log) {
            $scope.goalEntry = true; // or false for Penalties

            var res = Result.get({id: $stateParams.id}, function() {
                $scope.result = res;
            });

            $scope.addGoal = function(homeTeam, count) {
                var res = $scope.result;

                // initialise if no scores entered yet
                if (! ('homeGoals' in res)) {
                    res.homeGoals = 0;
                    res.awayGoals = 0;
                }
                if (!$scope.goalEntry && !('homePens' in res)) {
                    res.homePens = 0;
                    res.awayPens = 0;
                }

                var teamGoals = ($scope.goalEntry ? (homeTeam ? 'homeGoals' : 'awayGoals') : (homeTeam ? 'homePens' : 'awayPens')); // ugh.

                res[teamGoals] = res[teamGoals] + count;
                if (res[teamGoals] < 0) {
                    res[teamGoals] = 0;
                }
            };

            $scope.updateResult = function(res) {
                var result = new Result(res);
                $log.info('Updating result: ' + JSON.stringify(result));
                result.$update(function() {
                    if ('group' in result.competition) {
                        $state.go('resultsGroup', {name: result.competition.name, section: result.competition.section, group: result.competition.group});
                    }
                    else {
                        $state.go('results', {name: result.competition.name, section: result.competition.section});
                    }
                });
            };

            $scope.deleteResult = function(result) {
                $log.info('Deleting result: ' + JSON.stringify(result));
                var params = {name: result.competition.name, section: result.competition.section};
                result.$delete(function() {
                    $state.go('results', params);
                });
            };
        })

        .controller('NewsListController', function (News, $scope) {
            $scope.newsItems = News.query(function () {
                $scope.latestNews = $scope.newsItems[$scope.newsItems.length - 1];
            });
            $scope.searchBy = '';
        })

        .controller('NewsAdminController', function(News, $scope, $log) {
            $scope.createNews = function() {
                $log.info('Creating new announcement: ' + JSON.stringify($scope.news));
                var n = new News($scope.news);
                n.$save();
                $scope.news = {};
            };
        })

        .controller('FeedbackAdminController', function (Feedback, $scope, $state, $log) {
            $scope.feedbackItems = Feedback.query();
            $scope.searchBy = '';

            $scope.deleteFeedback = function(feedbackItem) {
                $log.info('Deleting feedback: ' + JSON.stringify(feedbackItem));
                feedbackItem.$delete(function() {
                    $state.reload();
                });
            };
        })

        .controller('FeedbackController', function(Feedback, storage, $scope) {
            var feedbackKey = 'stbgfc.tournament.feedback';
            $scope.feedbackSubmitted = storage.get(feedbackKey);
            console.log($scope.feedbackSubmitted);
            $scope.createFeedback = function() {
                var f = new Feedback($scope.feedback);
                f.$save(function() {
                    storage.set(feedbackKey, f.body);
                });
                $scope.feedback = {};
                $scope.feedbackSubmitted = f.body;
            };
        })

        .controller('PageController', function(Page, $scope, $stateParams) {
            var page = Page.get({id: $stateParams.id}, function() {
                $scope.page = page;
            });
        })

        .controller('PageListController', function(Page, $scope) {
            var pages = Page.query(function() {
                $scope.pages = pages;
            });
        })

        .controller('PageAdminController', function(Page, $scope, $state, $log) {
            $scope.pages = Page.query();

            $scope.editPage = function(id) {
                var page = Page.get({id: id}, function() {
                    $scope.page = page;
                });
            };

            $scope.savePage = function () {
                $log.info('Creating new page: ' + $scope.page.title);
                var page = new Page($scope.page);
                if ('_id' in $scope.page) {
                    page.$update();
                } else {
                    page.$save();
                }
                $scope.page = {};
                $state.reload();
            };

            $scope.createPage = function () {
                $scope.page = {
                    title: '',
                    body: ''
                };
            };
        })

        .controller('ScoreCardController', function(Result, $scope, $window) {
            var results = Result.query(function() {
                $scope.results = results;
                $scope.searchBy = results[0];
            });
        })


        // ============================================================================================
        // services
        // ============================================================================================

        .factory('broadcastSocket', function(socketFactory) {
            var s = socketFactory();
            s.forward('news');
            s.forward('result');
            s.forward('remove');
            return s;
        })

        .factory('Result', function($resource) {
            return $resource('api/results/:id', { id: '@_id' }, {
                update: {method:'PUT'}
            });
        })

        .factory('Tournament', function($resource) {
            return $resource('api/tournaments/:id', { id: '@_id' }, {
                update: {method:'PUT'}
            });
        })

        .factory('News', function($resource) {
            return $resource('api/news');
        })

        .factory('Feedback', function($resource) {
            return $resource('api/feedbacks/:id', { id: '@_id' }); // default plural :)
        })

        .factory('Page', function($resource) {
            return $resource('api/pages/:id', { id: '@_id' }, {
                update: {method:'PUT'}
            });
        })

        .factory('Table', function($resource) {
            // pseudo resource where only posting a map of positions:teamnames works
            return $resource('api/leaguetables/:name/:section/:group', {
                name: '@_name', section: '@_section', group: '@_group'
            });
        })


        // ============================================================================================
        // directives
        // ============================================================================================

        /*
         * render a list of fixtures/results
         */
        .directive('resultList', function() {
            return {
                restrict: 'E',
                templateUrl: '/views/templates/result-list.html',
                scope: {
                    results: '=',
                    user: '=',
                    highlighted: '='
                }
            };
        })

        /*
         * simulate the tab switching behaviour for bootstrap tabs
         */
        .directive('showTab', function () {
            return {
                link: function (scope, element) {
                    element.click(function(e) {
                        e.preventDefault();
                        $(element).tab('show');
                    });
                }
            };
        })

        /*
         * simulate the accordion for bootstrap elements
         */
        .directive('toggleNews', function () {
            return {
                link: function (scope, element) {
                    var toggleAccordion = function(e) {
                        e.preventDefault();
                    };
                    element.click(toggleAccordion);
                    $('#accordion')
                        .on('hidden.bs.collapse', toggleAccordion)
                        .on('shown.bs.collapse', toggleAccordion);
                }
            };
        })
    ;
})();

