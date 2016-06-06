define(['chart'], function (Chart) {
    'use strict';
    var DashboardCtrl = function ($scope, $http, DashboardSvc) {

        $scope.duration = 'today';
        $scope.updateGraph = function () {
            console.log('update graphs with: ' + $scope.duration);
            var params = {
                durationType: $scope.duration
            }
            DashboardSvc.getDashboardStats(params)
                    .then(function (statsCollection) {
                        console.log('success');
                        $scope.totalGross = 0;
                        $scope.totalSales = 0;
                        $scope.totalServiceCharges = 0;
                        var labels = [];
                        var grossSale = [];
                        var moneyPaidByCustomer = [];
                        var serviceCharge = [];
                        //set period labels
                        for (var i = 0; i < statsCollection.length; i++) {
                            labels.push(statsCollection[i].period);
                            grossSale.push(statsCollection[i].total_gross);
                            if(statsCollection[i].total_gross){
                                $scope.totalGross += parseInt(statsCollection[i].total_gross);
                            }
                            if(statsCollection[i].total_sales){
                                $scope.totalSales += parseInt(statsCollection[i].total_gross);
                            }
                            if(statsCollection[i].total_service_charges){
                                $scope.totalServiceCharges += parseInt(statsCollection[i].total_service_charges);
                            }
                            moneyPaidByCustomer.push(statsCollection[i].total_sales);
                            serviceCharge.push(statsCollection[i].total_service_charges);
                        }
                        $scope.labels = labels;
                        $scope.series = ['Total Gross', 'Money Paid By Customer', 'Service Charge'];
                        $scope.data = [grossSale, moneyPaidByCustomer, serviceCharge];
                        $scope.colours = ["#777777","#5bc0de","#f0ad4e"];
                        $scope.options = {
                            scales: {
                                ticks: {
                                    beginAtZero: false
                                }
                            }
                        };
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
        }

        setTimeout(function () {
            // get line chart canvas
            // draw line chart
            $scope.updateGraph();
        }, 100);
        DashboardSvc.getDashboardDetails()
                .then(function (response) {
                    console.log('success');
                    $scope.basicDetails = response;
                })
                .catch(function (err) {
                    console.log(err);
                });
    }
    return DashboardCtrl;
});
