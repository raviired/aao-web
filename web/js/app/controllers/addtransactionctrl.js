 define([],
        function () {
            'use strict';
    var AddTransactionCtrl = function ($scope, $http, $state, $stateParams, UtilitiesSvc, TransactionsSvc) {
        
        console.log('transactions ctrl');

        $scope.transaction = {};
        $scope.transaction.validated = false;
        
        $scope.validateTransaction = function(){
            $scope.transaction.validated = false;
            $scope.transaction.processing = true;
            var data = {
                original_bill: $scope.originalBill,
                phone: $scope.phone
            }
            TransactionsSvc.validateTransaction(data)
                    .then(function (data) {
                        console.log(data);
                        $scope.transaction.processing = false;
                        $scope.transaction = data;
                        $scope.transaction.validated = true;
                        $scope.transaction.customer_name = data.customer_first_name + " " + data.customer_last_name;
                        $scope.transaction.customer_paid = parseInt(data.original_bill);// - parseInt(data.credit_offered);
                    })
                    .catch(function (err) {
                        var msg = "Invalid phone number or bill amount. Please try again!";
                        if(err.data.msg){
                            msg = err.data.msg;
                        }
                        console.log(err);
                        $.bootstrapGrowl(msg, {
                            type: 'danger',
                            align: 'center',
                            width: 'auto',
                            allow_dismiss: false,
                            delay: 5000
                        });
                        setTimeout(function(){
                            $scope.$apply(function () {
                                $scope.transaction.processing = false;
                            });
                        },5000)
                    });
        }
        
        $scope.cancelTransaction = function(){
            $state.go('transactions');
        }
        
        $scope.confirmTransaction = function(){
            $scope.transaction.validated = true;
            $scope.transaction.processing = true;
            var data = {
                original_bill: $scope.originalBill,
                phone: $scope.phone
            }
            TransactionsSvc.confirmTransaction(data)
                    .then(function (data) {
                        console.log(data);
                        $.bootstrapGrowl("Transaction added!", {
                            type: 'success',
                            align: 'center',
                            width: 'auto',
                            allow_dismiss: false
                        });
                        $state.go('transactions');
                    })
                    .catch(function (err) {
                        var msg = "Invalid phone number or bill amount. Please try again!";
                        if(err.data.msg){
                            msg = err.data.msg;
                        }
                        console.log(err);
                        $scope.transaction.processing = false;
                        $scope.showErrorMessage = true;
                        $.bootstrapGrowl(msg, {
                            type: 'danger',
                            align: 'center',
                            width: 'auto',
                            allow_dismiss: false
                        });
                    });
        }
        
        $("[data-toggle='tooltip']").tooltip();

    }
    return AddTransactionCtrl;
});