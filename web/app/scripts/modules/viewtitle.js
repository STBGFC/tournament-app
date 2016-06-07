(function() {
    'use strict';

    angular
        .module('viewtitle', [])

        /*
         * taken from https://github.com/apparentlymart/angularjs-viewhead but without the $destroy
         * event that causes the title to be removed from scope before the ui-router updates the
         * browser's history stack.
         */
        .directive('viewTitle', ['$rootScope', function ($rootScope) {
            var title;
            return {
                restrict: 'EA',
                link: function (scope, iElement) {
                    // If we've been inserted as an element then we detach from the DOM because the caller
                    // doesn't want us to have any visual impact in the document.
                    // Otherwise, we're piggy-backing on an existing element so we'll just leave it alone.
                    var tagName = iElement[0].tagName.toLowerCase();
                    if (tagName === 'view-title' || tagName === 'viewtitle') {
                        iElement.remove();
                    }

                    scope.$watch(
                        function () {
                            return iElement.text();
                        },
                        function (newTitle) {
                            $rootScope.viewTitle = title = newTitle;
                        }
                    );
                }
            };
        }])
    ;
})();
