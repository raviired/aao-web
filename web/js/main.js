require.config({
    baseUrl: './web/js',
    paths: {
        'angular': 'libs/angular-1.4.5',
        'ngRoute': 'libs/ngRoute-1.4.5',
        'ngMessages': 'libs/ng-messages-1.4.5',
        'ngResource': 'libs/ngResource',
        'uiBootstrap': 'libs/ui-bootstrap-tpls-1.1.2.min',
        'angular-ui-router': 'libs/angular-ui-router.min',
        'pikaday': 'libs/pikaday',
        'moment': 'libs/moment',
        'bootstrap': 'libs/bootstrap.min',
        'jquery': 'libs/jquery-2.2.0.min',
        'bsGrowl': 'libs/jquery.bootstrap-growl.min',
        'timePicker': 'libs/jquery.timepicker.min',
        fullcalendar: 'libs/fullcalendar.min',
        'chart': 'libs/chart',
        'angular-chart': 'libs/angular-chart',
        'app': 'app/app'
    },
    
    shim: {
        angular: {
            exports: 'angular'
        },
        jquery: {
            exports: 'jquery'
        },
        bootstrap: {
            exports: 'bootstrap',
            deps: ['jquery']
        },
        ngRoute: {
            exports: 'ngRoute',
            deps:['angular']
        },
        ngMessages:{
            exports: 'ngMessages',
            deps:['angular']
        },
        'ngResource': {
            exports: 'ngResource',
            deps:['angular']
        },
        'uiBootstrap': {
            exports: 'uiBootstrap',
            deps:['angular']
        },
        'angular-ui-router':{
            exports: 'angular-ui-router',
            deps:['angular']
        },
        app: {
            exports: 'app'
        },
        bsGrowl:{
            deps:['jquery','bootstrap']
        },
        timePicker:{
            deps:['jquery','bootstrap']
        },
        moment:{
            exports: 'moment',
            deps:['jquery']
        },
        pikaday:{
            deps:['jquery','moment']
        },
        fullcalendar:{
            exports: 'fullcalendar',
            deps: ['jquery','moment']
        },
        chart:{
            exports: 'Chart',
            deps: ['jquery','angular','moment']
        },
        'angular-chart':{
            exports: 'angular-chart',
            deps: ['angular','chart']
        },
    }
});

require(['angular','app'], function(angular,app) {

    
    var $html = angular.element(document.getElementsByTagName('html')[0]);


    angular.element().ready(function() {
        angular.bootstrap($html,['myApp']);
    });
    
});