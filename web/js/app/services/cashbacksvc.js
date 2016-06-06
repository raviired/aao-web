define([], function () {
    'use strict';

    var CashbackSvc = function ($http, $q, $httpParamSerializer, AuthenticationSvc, bsGrowl) {

        var self = this;

        self.userInfo = null;

        this.getAllCashbacks = function () {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'GET',
                url: 'index.php/eateries/cashbacks/' + eateryId,
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
        
        this.getCashbacks = function (requestParams) {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'GET',
                params: requestParams,
                url: 'index.php/eateries/cashbacks/' + eateryId,
                headers: {
                    //'Content-Type': 'application/x-www-form-urlencoded'
                    'Content-Type': 'application/json',
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
        
        this.getLimits = function (requestParams) {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'GET',
                params: requestParams,
                url: 'index.php/eateries/cashlimits/' + eateryId,
                headers: {
                    'Content-Type': 'application/json',
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
        
        this.setCashbackPeriod = function(requestObj){
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'POST',
                url: 'index.php/eateries/cashbacks/' + eateryId,
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
        
        this.saveSpecialPromotion = function(requestObj){
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'POST',
                url: 'index.php/eateries/sppromotions/' + eateryId,
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
        
        this.removeSpecialPromotion = function(startDate){
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'DELETE',
                url: 'index.php/eateries/sppromotions/' + eateryId +  '/' + startDate,
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
        
        this.publishPromotions = function(requestObj){
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'POST',
                url: 'index.php/eateries/publishpromotions/' + eateryId,
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
        
        this.unpublishPromotion = function(publishingDate){
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'DELETE',
                url: 'index.php/eateries/publishpromotions/' + eateryId + '/' + publishingDate,
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

        this.updateDefaultCashbacks = function (data) {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'PUT',
                url: 'index.php/eateries/defaultCashbacks/' + eateryId,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': AuthenticationSvc.getToken()
                },
                data: $httpParamSerializer(data)
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
    return CashbackSvc;
});
