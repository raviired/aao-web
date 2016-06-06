define([], function () {
    'use strict';

    var AuthenticationSvc = function ($http, $q, $window, $httpParamSerializer, $state) {
        
        var self = this;
        
        self.userInfo = null;

        this.getUserInfo = function() {
            var sessionUserInfo = $window.sessionStorage["userInfo"] ? JSON.parse($window.sessionStorage["userInfo"]) : undefined;
            return self.userInfo ? self.userInfo : sessionUserInfo;
        }
        
        this.getToken = function(){
            var sessionUserInfo = $window.sessionStorage["userInfo"] ? JSON.parse($window.sessionStorage["userInfo"]) : undefined;
            return self.userInfo && sessionUserInfo ? self.userInfo.accessToken : sessionUserInfo ? sessionUserInfo.accessToken : null;
        }
        
        this.getCurrentEateryId = function() {
            return self.getUserInfo().eateryId; 
        }
        
        this.getCurrentEmployeeType = function() {
            return self.getUserInfo().type; 
        }
        
        this.logout = function(){
            delete $window.sessionStorage["userInfo"];
            self.userInfo = undefined;
            $state.go('login');
        }

        this.login = function(email, password, eateryId) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: 'index.php/auth/login',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializer({
                    email: email,
                    password: password,
                    eateryId: eateryId
                    })
               };

            $http(req)
                .then(function successCallback(result) {
                    console.log(result.data);
                    self.userInfo = {
                        accessToken: result.data.token,
                        firstName: result.data.first_name,
                        lastName: result.data.last_name,
                        eateryId: result.data.eateryId,
                        userId: result.data.userId,
                        type: result.data.employeeType
                    };
                    $window.sessionStorage["userInfo"] = JSON.stringify(self.userInfo);
                    deferred.resolve(self.userInfo);
                }, function errorCallback(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
        
        this.logout = function(email, password) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: 'index.php/auth/logout',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.getToken()
                },
                data: $httpParamSerializer({
                    email: email,
                    password: password
                    })
               };

            $http(req)
                .then(function successCallback(result) {
                    console.log(result.data);
                    delete $window.sessionStorage["userInfo"];
                    deferred.resolve();
                }, function errorCallback(error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }
        
    }
    return AuthenticationSvc;
});
