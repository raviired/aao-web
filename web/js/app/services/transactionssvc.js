define([], function () {
    'use strict';
    var TransactionsSvc = function ($http, $q, $httpParamSerializer, AuthenticationSvc, bsGrowl) {        
        
        this.getAllTransactions = function (params) {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'GET',
                url: 'index.php/transactions/index/' + eateryId,
                headers: {
                    'Authorization': AuthenticationSvc.getToken()
                }
            };
            if(params){
                params.hasFilters = true;
                req.params = params;
            }
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
        
        this.validateTransaction = function (requestObj) {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'GET',
                url: 'index.php/transactions/validate/' + eateryId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': AuthenticationSvc.getToken()
                },
                params: requestObj
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
        
        this.confirmTransaction = function (requestObj) {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'POST',
                url: 'index.php/transactions/index/' + eateryId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': AuthenticationSvc.getToken()
                },
                data: $httpParamSerializer(requestObj)
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
        
    }
    
    return TransactionsSvc;
});
