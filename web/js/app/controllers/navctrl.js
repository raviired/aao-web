define([], function () {

    'use strict';

    var NavCtrl = function ($scope, $http, $state, AuthenticationSvc) {
        $scope.activeLink = "dashboard";
        $scope.employeeType = AuthenticationSvc.getCurrentEmployeeType();
        $scope.goToDetails = function () {
            $state.go('details', {});
            $scope.activeLink = "details";
            return false;
        }
        $scope.goToDefaultCashback = function () {
            $state.go('cashbacks', {});
            $scope.activeLink = "cashbacks";
            return false;
        }
        $scope.goToEmployees = function () {
            $state.go('employees', {});
            $scope.activeLink = "employees";
            return false;
        }
        $scope.goToTransactions = function () {
            $state.go('transactions', {});
            $scope.activeLink = "transactions";
            return false;
        }
        $scope.goToSettings = function () {
            $state.go('settings', {});
            $scope.activeLink = "settings";
            return false;
        }
    }
    return NavCtrl;
});
