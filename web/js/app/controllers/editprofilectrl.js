define([],
        function () {
            'use strict';
            var EditEmployeeCtrl = function ($scope, $http, EmployeesSvc, $state, $stateParams, UtilitiesSvc) {

                var self = this;
                console.log($stateParams);
                var employeeId;
                if ($stateParams.employeeId) {
                    employeeId = $stateParams.employeeId;
                } else {
                    $state.go("employees");
                }

                $scope.first_name = "";
                $scope.last_name = "";
                $scope.email = "";
                $scope.password = "";
                $scope.confirm_password = "";
                $scope.type = "";
                $scope.options = [{value: 'owner'}, {value: 'biller'}, {value: 'manager'}];

                self.resetErrors = function () {
                    $scope.first_name_error = false;
                    $scope.last_name_error = false;
                    $scope.email_error = false;
                    $scope.password_error = false;
                    $scope.confirm_password_error = false;
                }
                self.resetErrors();

                self.validate = function () {
                    var valid = true;
                    self.resetErrors();

                    if ($scope.first_name == "" || $scope.first_name == undefined) {
                        $scope.first_name_error = true;
                        valid = false;
                    }
                    if ($scope.last_name == "" || $scope.last_name == undefined) {
                        $scope.last_name_error = true;
                        valid = false;
                    }
                    if ($scope.email == "" || $scope.email == undefined) {
                        $scope.email_error = true;
                        valid = false;
                    } else {
                        if (UtilitiesSvc.validateEmail($scope.email)) {

                        } else {
                            valid = false;
                            $.bootstrapGrowl("Invalid email address!", {
                                type: 'danger',
                                align: 'center',
                                width: 'auto',
                                allow_dismiss: false
                            });
                        }
                    }
                    if (!($scope.password == "" && $scope.confirm_password == "")) {
                        if($scope.password.length < 6 ||  $scope.confirm_password.length < 6){
                            $scope.password_error = true;
                            $scope.confirm_password_error = true;
                            valid = false;
                            
                            $.bootstrapGrowl("Password must be at least of 6 characters long. If you want to keep older password then leave the fields empty.", {
                                    type: 'danger',
                                    align: 'center',
                                    width: 'auto',
                                    allow_dismiss: false
                                });
                            
                        }
                    } 
                    return valid;
                }

                $scope.updateEmployee = function () {
                    if (self.validate()) {
                        var employee = {};
                        employee.first_name = $scope.first_name;
                        employee.last_name = $scope.last_name;
                        if($scope.password != ""){
                            employee.password = $scope.password;
                        }
                        employee.email = $scope.email;
                        employee.type = $scope.type;
                        console.log('putting:', employee);
                        EmployeesSvc.updateEmployee(employeeId,employee)
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
                                    if (err.data.msg) {
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

                self.fetchEmployees = function (employeeId) {
                    EmployeesSvc.getEmployees(employeeId)
                            .then(function (data) {
                                var employee = data;
                                $scope.first_name = data.first_name;
                                $scope.last_name = data.last_name;
                                $scope.email = data.email;
                                $scope.password = "";
                                $scope.confirm_password = "";
                                $scope.type = data.type;
                            })
                            .catch(function (err) {
                                $scope.showErrorMessage = true;
                                $.bootstrapGrowl("Oops, something went wrong. Please try again!", {
                                    type: 'danger',
                                    align: 'center',
                                    width: 'auto',
                                    allow_dismiss: false
                                });
                                console.log(err);
                            });
                }
                self.fetchEmployees(employeeId);

                $scope.cancel = function () {
                    $state.go('employees');
                }

            }
            return EditEmployeeCtrl;
        });