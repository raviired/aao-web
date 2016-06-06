define([], function () {
    'use strict';
    var EmployeesSvc = function ($http, $q, $httpParamSerializer, AuthenticationSvc, bsGrowl) {
        
        this.getEmployees = function (employeeId) {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'GET',
                url: 'index.php/employees/index/' + eateryId,
                headers: {
                    'Authorization': AuthenticationSvc.getToken()
                }
            };
            if(employeeId){
                req.url += '/' + employeeId;
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
        
        this.addEmployee = function (data) {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'POST',
                url: 'index.php/employees/index/' + eateryId,
                headers: {
                    'Authorization': AuthenticationSvc.getToken()
                },
                data: $httpParamSerializer(data)
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
        
        this.updateEmployee = function(employeeId,employee){
            
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            
            var headers = {
                    'Authorization': AuthenticationSvc.getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
            $http.put('index.php/employees/index/' + eateryId + '/' + employeeId, employee, {headers: headers})
                    .success(function(data, status) {
                        console.log(data);
                        deferred.resolve(data);
                    })
                    .error(function(error){
                        deferred.reject(error);        
                    });
            
            return deferred.promise;
        }
        
        this.deleteEmployee = function (employeeId) {
            var deferred = $q.defer();
            var eateryId = AuthenticationSvc.getCurrentEateryId();
            var req = {
                method: 'DELETE',
                url: 'index.php/employees/index/' + eateryId + '/' + employeeId,
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
        
        this.getDetails = function(){
            var deferred = $q.defer();            
            
            $http.get('index.php/employee/')
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
    return EmployeesSvc;
});
