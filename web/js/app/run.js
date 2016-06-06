define([],
        function () {

            'use strict';
           
            var run = function ($rootScope,$state, $templateCache) {
                $rootScope.$on('$viewContentLoaded', function () {
                    $templateCache.removeAll();
                });

                $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                    console.log(AuthenticationSvc);
                    if (toState.authenticate && AuthenticationSvc.getUserInfo() === undefined) {
                        console.log('user is not authenticated so redirecting to login page');
                        // User isn’t authenticated
                        $state.transitionTo("login");
                        event.preventDefault();
                    }
                });
            }
            
            return run;
        });
