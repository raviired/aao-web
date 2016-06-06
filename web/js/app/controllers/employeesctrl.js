 define([],
        function () {
            'use strict';
    var EmployeeCtrl = function ($scope, $http, EmployeesSvc, $state) {
        
        var self = this;
        $scope.employees = {};
        self.fetchEmployees = function(){
            EmployeesSvc.getEmployees()
                    .then(function (data) {
                        $scope.employees = data;
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
        self.fetchEmployees();
                    
        $scope.deleteEmployee = function(employeeId){
            console.log(employeeId);
            var yes = confirm("Are you sure, you want to delete this employee?")
            if(yes){
                EmployeesSvc.deleteEmployee(employeeId)
                    .then(function (data) {
                        self.fetchEmployees();
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
        }
                 
        $scope.goToAddEmployeePage = function(){
            $state.go('add-employee');
        }
        
        
        $scope.addDetails = function () {
            //console.log($scope.formData);
            $scope.formData = JSON.stringify($scope.formData);
            
            EmployeeSvc.addDetails($scope.formData)
                    .then(function (response) {
                        //console.log(response);
                        $.bootstrapGrowl("Added Successfully!", {
                            type: 'success',
                            align: 'center',
                            width: 'auto',
                            allow_dismiss: false
                        });
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



        $scope.open = function (p,size) {
            var modalInstance = $modal.open({
              templateUrl: 'partials/productEdit.html',
              controller: 'productEditCtrl',
              size: size,
              resolve: {
                item: function () {
                  return p;
                }
              }
            });
            modalInstance.result.then(function(selectedObject) {
                if(selectedObject.save == "insert"){
                    $scope.products.push(selectedObject);
                    $scope.products = $filter('orderBy')($scope.products, 'id', 'reverse');
                }else if(selectedObject.save == "update"){
                    p.description = selectedObject.description;
                    p.price = selectedObject.price;
                    p.stock = selectedObject.stock;
                    p.packing = selectedObject.packing;
                }
            });
        };
    }
    return EmployeeCtrl;
});