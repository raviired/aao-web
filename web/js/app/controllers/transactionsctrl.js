define(['jquery', 'timePicker', 'moment', 'pikaday'],
        function ($, timePicker, moment, Pikaday) {
            'use strict';
            var TransactionsCtrl = function ($scope, $http, $state, $stateParams, UtilitiesSvc, TransactionsSvc, EmployeesSvc, AuthenticationSvc) {
                var self = this;
                console.log('transactions ctrl');

                $scope.percentageValues = [];
                $scope.hideFilters = true;
                var employeeType = AuthenticationSvc.getCurrentEmployeeType();
                if(employeeType != "biller"){
                    $scope.hideFilters = false;
                }
                for(var i=1; i<= 90; i++){
                    $scope.percentageValues.push(i);
                }
                $scope.creditGivenFilterTagValue;
                $scope.billAmountFilterTagValue;
                $scope.transaction = {};
                $scope.filters = {
                    showCreditGivenFilterTagValue: false,
                    showBillAmountFilterTagValue: false,
                    showDatesFilterTagValue: false,
                    showEmployeeNameFilterTagValue: false,
                    dateErrors: false,
                    billErrors: false,
                    creditErrors: false
                };
                $scope.employees = [];
                
                $scope.clearEmployeeNameFilterTagValue = function(){
                    $scope.filters.employeeId = undefined;
                    $scope.showEmployeeNameFilterTagValue = false;
                    $scope.updateTransactionsFilters();
                }
                $scope.clearDatesFilterTagValue = function(){
                    self.startDatePicker.setDate(null);
                    self.endDatePicker.setDate(null);
                    $scope.showDatesFilterTagValue = false;
                    $scope.updateTransactionsFilters();
                }
                $scope.clearBillAmountFilterTagValue = function(){
                    $scope.filters.minOriginalBillAmount = "";
                    $scope.filters.maxOriginalBillAmount = "";
                    $scope.showBillAmountFilterTagValue = false;
                    $scope.updateTransactionsFilters();
                }
                $scope.clearCreditGivenFilterTagValue = function(){
                    $scope.filters.minCreditGivenInPercentage = undefined;
                    $scope.filters.maxCreditGivenInPercentage = undefined;
                    $scope.showCreditGivenFilterTagValue = false;
                    $scope.updateTransactionsFilters();
                }

                $scope.isNumber = function (n) {
                    if(n === "" || n === undefined)
                        return true;
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }

                setTimeout(function () {
                    self.startDatePicker = new Pikaday({
                        field: document.getElementById('startDate'),
                        format: 'D/MM/YYYY',
                        maxDate: new Date()
                    });

                    self.endDatePicker = new Pikaday({
                        field: document.getElementById('endDate'),
                        format: 'D/MM/YYYY',
                        maxDate: new Date()
                    });
                }, 1000);

                $scope.goToAddTransactionPage = function () {
                    $state.go("add-transaction");
                }

                $scope.showFilters = function () {
                    $("#filtersModal").modal();
                }

                self.validateFilters = function (filters) {
                    $scope.filters.dateErrors = false;
                    $scope.filters.billErrors = false;
                    if(filters.startDate !=null && filters.endDate != null && filters.startDate > filters.endDate){
                        $scope.filters.dateErrors = true;
                        return false;
                    }
                    if(filters.minOriginalBillAmount && filters.maxOriginalBillAmount && filters.minOriginalBillAmount > filters.maxOriginalBillAmount){
                        $scope.filters.billErrors = true;
                        return false;
                    }
                    if(filters.minCreditGivenInPercentage && filters.maxCreditGivenInPercentage && filters.minCreditGivenInPercentage > filters.maxCreditGivenInPercentage){
                        $scope.filters.creditErrors = true;
                        return false;
                    }
                    return true;
                }
                
                self.loadEmployees = function(){
                    EmployeesSvc.getEmployees()
                            .then(function (data) {
                                console.log(data);
                                $scope.employees = data;
                            })
                            .catch(function (err) {});
                }
                self.loadEmployees();
                
                self.loadTransactions = function(updatedFilters){
                    TransactionsSvc.getAllTransactions(updatedFilters)
                            .then(function (data) {
                                console.log(data);
                                $scope.transactions = data;
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

                $scope.updateTransactionsFilters = function () {
                    //validate selection

                    var updatedFilters = {};
                    updatedFilters.startDate = self.startDatePicker.getDate();
                    updatedFilters.endDate = self.endDatePicker.getDate();
                    updatedFilters.minOriginalBillAmount = $scope.filters.minOriginalBillAmount;
                    updatedFilters.maxOriginalBillAmount = $scope.filters.maxOriginalBillAmount;
                    updatedFilters.minCreditGivenInPercentage = $scope.filters.minCreditGivenInPercentage;
                    updatedFilters.maxCreditGivenInPercentage = $scope.filters.maxCreditGivenInPercentage;
                    updatedFilters.employeeId = $scope.filters.employeeId;
                    if (self.validateFilters(updatedFilters)) {
                        //from filters set filters tags
                        if (updatedFilters.startDate && updatedFilters.endDate) {
                            $scope.datesFilterTagValue = moment(updatedFilters.startDate).format('dddd, MMMM Do, YYYY') + " to " + moment(updatedFilters.endtDate).format('dddd, MMMM Do, YYYY');
                            $scope.showDatesFilterTagValue = true;
                        } else {
                            $scope.showDatesFilterTagValue = false;
                        }

                        if (updatedFilters.minOriginalBillAmount || updatedFilters.maxOriginalBillAmount) {
                            if (updatedFilters.minOriginalBillAmount && updatedFilters.maxOriginalBillAmount) {
                                $scope.billAmountFilterTagValue = updatedFilters.minOriginalBillAmount + "-" + updatedFilters.maxOriginalBillAmount + " Rs";
                            } else if (updatedFilters.minOriginalBillAmount && (updatedFilters.maxOriginalBillAmount == undefined || updatedFilters.maxOriginalBillAmount == "")) {
                                $scope.billAmountFilterTagValue = "min " + updatedFilters.minOriginalBillAmount + " Rs";
                            } else if ((updatedFilters.minOriginalBillAmount == undefined || updatedFilters.minOriginalBillAmount == "") && updatedFilters.maxOriginalBillAmount) {
                                $scope.billAmountFilterTagValue = "max " + updatedFilters.maxOriginalBillAmount + " Rs";
                            }
                            $scope.showBillAmountFilterTagValue = true;
                        } else {
                            $scope.showBillAmountFilterTagValue = false;
                        }

                        if (updatedFilters.minCreditGivenInPercentage || updatedFilters.maxCreditGivenInPercentage) {
                            if (updatedFilters.minCreditGivenInPercentage && updatedFilters.maxCreditGivenInPercentage) {
                                $scope.creditGivenFilterTagValue = updatedFilters.minCreditGivenInPercentage + "-" + updatedFilters.maxCreditGivenInPercentage + "%";
                            } else if (updatedFilters.minCreditGivenInPercentage && updatedFilters.maxCreditGivenInPercentage == undefined) {
                                $scope.creditGivenFilterTagValue = "min " + updatedFilters.minCreditGivenInPercentage + "%";
                            } else if (updatedFilters.minCreditGivenInPercentage == undefined && updatedFilters.maxCreditGivenInPercentage) {
                                $scope.creditGivenFilterTagValue = "max " + updatedFilters.maxCreditGivenInPercentage + "%";
                            }
                            $scope.showCreditGivenFilterTagValue = true;
                        } else {
                            $scope.showCreditGivenFilterTagValue = false;
                        }
                        
                        if (updatedFilters.employeeId) {
                            var employee = $scope.employees[updatedFilters.employeeId];
                            var name = employee.first_name + " " + employee.last_name;
                            $scope.employeeNameFilterTagValue = name;
                            $scope.showEmployeeNameFilterTagValue = true;
                        } else {
                            $scope.showEmployeeNameFilterTagValue = false;
                        }
                        $("#filtersModal").modal('hide');
                        console.log(updatedFilters);
                        self.loadTransactions(updatedFilters);
                    }
                }
                
                self.loadTransactions();
            }
            return TransactionsCtrl;
        });