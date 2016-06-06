define([],
        function () {
            'use strict';

            var LoginCtrl = function ($scope, AuthenticationSvc, $location, $state, DetailsSvc) {
                var element = angular.element(document.querySelector('#wrapper'));
                element.addClass('toggled');
                console.log('loading login controller:');
                $scope.amount = 3;
                $scope.showErrorMessage = false;
                $scope.loginForm = {
                    email : "",
                    password: "",
                    eateryId: "",
                    $error: false
                };
                 DetailsSvc.getAllEateries()
                                    .then(function (eateries) {
                                            console.log(eateries);
                                            $scope.eateries = eateries;
                                        })
                                        .catch(function (err) {
                                            console.log(err);
                                        });
                $scope.login = function () {
                    if($scope.email && $scope.password && $scope.eateryId){
                        AuthenticationSvc
                            .login($scope.email, $scope.password, $scope.eateryId)
                            .then(function (userInfo) {
                                console.log(userInfo);
                                $state.go('dashboard');
                            })
                            .catch(function (err) {
                                $scope.showErrorMessage  = true;
                                //$scope.errors.other = err.message;
                                console.log(err);
                            });
                    }
                    else{
                        $scope.showErrorMessage = true;
                    }
                }
                
            }
            return LoginCtrl;
        });
