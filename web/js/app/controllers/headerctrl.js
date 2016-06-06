define([], function () {
    'use strict';

    var HeaderCtrl = function ($scope, $http, $state, AuthenticationSvc) {
        $scope.currentState = $state.current.name;
        $scope.navToggleClicked = function () {
            $("#wrapper").toggleClass("toggled");
            return false;
        }
        $scope.logout = function () {
            AuthenticationSvc.logout()
                    .then(function (data) {
                        $state.go('login');
                    })
                    .catch(function (err) {
                        $scope.showErrorMessage = true;
                        $.bootstrapGrowl("Oops, something went wrong. Please try again!", {
                            type: 'danger',
                            align: 'center',
                            width: 'auto',
                            allow_dismiss: false
                        });
                        console.log(err);
                    });
            return false;
        }
    }
    return HeaderCtrl;
});
