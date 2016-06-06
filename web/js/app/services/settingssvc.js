define([], function () {
    'use strict';
    var SettingsSvc = function ($http, $q, $httpParamSerializer, AuthenticationSvc, bsGrowl) {        
        
        this.getCurrentBalance = function (params) {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'GET',
                url: 'index.php/settings/balance/' + eateryId,
                headers: {
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
        
    }
    
    return SettingsSvc;
});
