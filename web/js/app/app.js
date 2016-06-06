define([
    'angular', 'ngRoute', 'ngResource', 'ngMessages', 'angular-ui-router', 'jquery', 'bootstrap', 'bsGrowl', 'pikaday', 'moment', 'angular-chart',
    '../js/app/config',
    '../js/app/controllers/detailsctrl', '../js/app/controllers/dashboardctrl', '../js/app/controllers/employeesctrl', '../js/app/controllers/addemployeectrl', 
    '../js/app/controllers/editemployeectrl',  '../js/app/controllers/cashbacksctrl',  '../js/app/controllers/settingsctrl', 
    '../js/app/controllers/addcashbacksctrl', '../js/app/controllers/transactionsctrl', '../js/app/controllers/addtransactionctrl',
    '../js/app/controllers/headerctrl', '../js/app/controllers/loginctrl', '../js/app/controllers/navctrl',
    '../js/app/services/authenticationsvc', '../js/app/services/detailssvc', '../js/app/services/dashboardsvc', '../js/app/services/employeessvc', 
    '../js/app/services/cashbacksvc', '../js/app/services/transactionssvc', '../js/app/services/utilitiessvc', 
    '../js/app/services/settingssvc'
], function (angular, ngRoute, ngResource, ngMessages, uiRouter, jquery, bootstrap, bsGrowl, Pikaday, moment, AngularChart,
        config,
        DetailsCtrl, DashboardCtrl, EmployeesCtrl, AddEmployeeCtrl, EditEmployeeCtrl, CashbacksCtrl, SettingsCtrl, AddCashbacksCtrl, 
        TransactionsCtrl, AddTransactionCtrl, HeaderCtrl, LoginCtrl, NavCtrl,
        AuthenticationSvc, DetailsSvc, DashboardSvc, EmployeesSvc, CashbackSvc, TransactionsSvc, UtilitiesSvc, SettingsSvc) {

    'use strict';

    // definition of routes
    var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.router', 'ngMessages','chart.js'])
                .config(['$routeProvider', '$stateProvider', '$urlRouterProvider','$httpProvider', config])
                .run(function ($rootScope, $state, $templateCache, AuthenticationSvc, DetailsSvc) {
                    $rootScope.$on('$viewContentLoaded', function () {
                        $templateCache.removeAll();
                    });
                    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                        if (toState.authenticate && AuthenticationSvc.getUserInfo() === undefined) {
                            console.log('user is not authenticated so redirecting to login page');
                            // User isn’t authenticated
                            $state.transitionTo("login");
                            event.preventDefault();
                        }
                    });
                })
                .service('AuthenticationSvc', ['$http', '$q','$window','$httpParamSerializer','$state', AuthenticationSvc])
                .service('DetailsSvc', ['$http', '$q','$httpParamSerializer','AuthenticationSvc', DetailsSvc])
                .service('EmployeesSvc', ['$http', '$q','$httpParamSerializer','AuthenticationSvc', EmployeesSvc])
                .service('CashbackSvc', ['$http', '$q','$httpParamSerializer','AuthenticationSvc', CashbackSvc])
                .service('TransactionsSvc', ['$http', '$q','$httpParamSerializer','AuthenticationSvc', TransactionsSvc])
                .service('DashboardSvc', ['$http', '$q','$httpParamSerializer','AuthenticationSvc', DashboardSvc])
                .service('UtilitiesSvc', [UtilitiesSvc])
                .service('SettingsSvc', ['$http', '$q','$httpParamSerializer','AuthenticationSvc',SettingsSvc])
                .controller('DashboardCtrl', ['$scope', '$http', 'DashboardSvc', DashboardCtrl])
                .controller('DetailsCtrl', ['$scope', '$http', 'DetailsSvc', DetailsCtrl])
                .controller('EmployeesCtrl', ['$scope', '$http', 'EmployeesSvc','$state', EmployeesCtrl])
                .controller('AddEmployeeCtrl', ['$scope', '$http', 'EmployeesSvc', '$state', '$stateParams','UtilitiesSvc', AddEmployeeCtrl])
                .controller('EditEmployeeCtrl', ['$scope', '$http', 'EmployeesSvc', '$state', '$stateParams','UtilitiesSvc', EditEmployeeCtrl])
                .controller('CashbacksCtrl', ['$scope', '$http', 'CashbackSvc','$state','$stateParams','UtilitiesSvc','eateryDetails', CashbacksCtrl])
                .controller('SettingsCtrl', ['$scope', '$http', '$state','SettingsSvc', SettingsCtrl])
                .controller('TransactionsCtrl', ['$scope', '$http','$state','$stateParams','UtilitiesSvc','TransactionsSvc','EmployeesSvc','AuthenticationSvc', TransactionsCtrl])
                .controller('AddTransactionCtrl', ['$scope', '$http','$state','$stateParams','UtilitiesSvc','TransactionsSvc', AddTransactionCtrl])
                .controller('AddCashbacksCtrl', ['$scope', '$http', 'CashbackSvc','$state','$stateParams','$filter', AddCashbacksCtrl])
                .controller('HeaderCtrl', ['$scope', '$http', '$state', 'AuthenticationSvc', HeaderCtrl])
                .controller('LoginCtrl', ['$scope', 'AuthenticationSvc','$location','$state', 'DetailsSvc', LoginCtrl])
                .controller('NavCtrl', ['$scope','$location','$state', 'AuthenticationSvc', NavCtrl]);

    return app;
});
