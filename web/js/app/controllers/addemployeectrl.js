 define([],
        function () {
            'use strict';
    var AddEmployeeCtrl = function ($scope, $http, EmployeesSvc, $state, $stateParams, UtilitiesSvc) {
        
        var self = this;
        console.log($stateParams);
        var employeeId;
        if($stateParams.employeeId){
            employeeId = $stateParams.employeeId;
        }

        $scope.first_name = "";
        $scope.last_name = "";
        $scope.email = "";
        $scope.password = "";
        $scope.confirm_password = "";
        $scope.type = "biller";
        
        self.resetErrors = function(){
            $scope.first_name_error = false;
            $scope.last_name_error = false;
            $scope.email_error = false;
            $scope.password_error = false;
            $scope.confirm_password_error = false;
        }
        self.resetErrors();
                    
        self.validate = function(){
            var valid = true;
            self.resetErrors();
            
            if($scope.first_name == "" || $scope.first_name ==  undefined){
                $scope.first_name_error = true;
                valid = false;
            }
            if($scope.last_name == "" || $scope.last_name ==  undefined){
                $scope.last_name_error = true;
                valid = false;
            }
            if($scope.email == "" || $scope.email ==  undefined){
                $scope.email_error = true;
                valid = false;
            }else {
                if(UtilitiesSvc.validateEmail($scope.email)){
                    
                }else{
                    valid = false;
                    $.bootstrapGrowl("Invalid email address!", {
                                    type: 'danger',
                                    align: 'center',
                                    width: 'auto',
                                    allow_dismiss: false
                                });
                }
            }
            if($scope.password == "" || $scope.confirm_password ==  "" ||  $scope.password !== $scope.confirm_password){
                $scope.password_error = true;
                $scope.confirm_password_error = true;
            }else if($scope.password.length < 6){
                $scope.password_error = true;
                $scope.confirm_password_error = true;
                $.bootstrapGrowl("Password must be at least of 6 characters long!", {
                                    type: 'danger',
                                    align: 'center',
                                    width: 'auto',
                                    allow_dismiss: false
                                });
            }
            return valid;
        }
                    
        $scope.addEmployee = function(){
            if(self.validate()){
                var employee = {};
                employee.first_name = $scope.first_name;
                employee.last_name = $scope.last_name;
                employee.password = $scope.password;
                employee.email = $scope.email;
                employee.type = $scope.type;
                console.log('posting:',employee);
                EmployeesSvc.addEmployee(employee)
                            .then(function (data) {
                                $.bootstrapGrowl("Employee added!", {
                                    type: 'success',
                                    align: 'center',
                                    width: 'auto',
                                    allow_dismiss: false
                                });
                                $state.go('employees');
                            })
                            .catch(function (err) {
                                var msg = "Oops, something went wrong. Please try again!";
                                if(err.data.msg){
                                    msg = err.data.msg;
                                }
                                $.bootstrapGrowl(msg, {
                                    type: 'danger',
                                    align: 'center',
                                    width: 'auto',
                                    allow_dismiss: false
                                });
                                console.log(err);
                            });
            }
            
        }
        
        $scope.cancel = function(){
            $state.go('employees');
        }

    }
    return AddEmployeeCtrl;
});