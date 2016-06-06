define([], function () {
    'use strict';

    var DashboardSvc = function ($http, $q, $httpParamSerializer, AuthenticationSvc, bsGrowl) {

        var self = this;
        
        this.getDashboardDetails = function () {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'GET',
                url: 'index.php/dashboard/index/' + eateryId,
                headers: {
                    'Authorization': AuthenticationSvc.getToken()
                }
            };
            $http(req)
                    .then(function successCallback(result) {
                        console.log(result.data);
                        deferred.resolve(result.data);
                    }, function errorCallback(error) {
                        deferred.reject(error);
                    });

            return deferred.promise;
        }
        
        this.getDashboardStats = function (params) {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'GET',
                url: 'index.php/dashboard/stats/' + eateryId,
                headers: {
                    'Authorization': AuthenticationSvc.getToken()
                }
            };
            if(params){
                req.params = params;
            }
            $http(req)
                    .then(function successCallback(result) {
                        console.log(result.data);
                        deferred.resolve(result.data);
                    }, function errorCallback(error) {
                        deferred.reject(error);
                    });

            return deferred.promise;
        }

    }
    return DashboardSvc;
});
