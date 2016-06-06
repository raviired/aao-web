define([], function () {
    'use strict';

    var DetailsSvc = function ($http, $q, $httpParamSerializer, AuthenticationSvc, bsGrowl) {

        var self = this;

        self.userInfo = null;

        this.getAllEateries = function () {
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: 'index.php/eateries',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': AuthenticationSvc.getToken()
                }
            };
            console.log('req:', req);
            $http(req)
                    .then(function successCallback(result) {
                        console.log(result.data);
                        deferred.resolve(result.data);
                    }, function errorCallback(error) {
                        deferred.reject(error);
                    });

            return deferred.promise;
        }

        this.getDetails = function () {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'GET',
                url: 'index.php/eateries/details/' + eateryId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': AuthenticationSvc.getToken()
                }
            };
            console.log('req:', req);
            $http(req)
                    .then(function successCallback(result) {
                        console.log(result.data);
                        deferred.resolve(result.data);
                    }, function errorCallback(error) {
                        deferred.reject(error);
                    });

            return deferred.promise;
        }

        this.updateDetails = function (data) {
            console.log('sending data: ',data);
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            
            var headers = {
                'Authorization': AuthenticationSvc.getToken()
            }
            
            $http.put('index.php/eateries/details/' + eateryId, data, {headers: headers})
                    .success(function(data, status) {
                        console.log(data);
                        deferred.resolve(data);
                    })
                    .error(function(error){
                        deferred.reject(error);        
                    });
            

            return deferred.promise;
        }

    }
    return DetailsSvc;
});
