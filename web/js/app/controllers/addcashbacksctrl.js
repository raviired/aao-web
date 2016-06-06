define(['jquery','timePicker','moment','pikaday'], function ($,timePicker, moment,Pikaday) {
    'use strict';

    var AddCashbacksCtrl = function ($scope, $http, CashbackSvc, $state, $stateParams, $filter) {
        
        var self = this;
        
        var startDate, endDate;
        
        if($stateParams.startDate && $stateParams.endDate){
            startDate = $stateParams.startDate;
            endDate = $stateParams.endDate;
        }else{
            startDate = new Date();
            startDate.setDate(startDate.getDate()+1);
            endDate = new Date();
            endDate.setDate(startDate.getDate()+30);
        }
        
        $scope.limits = {};
        function getLimits(){
            CashbackSvc.getLimits()
                        .then(function (limits) {
                            console.log('limits:',limits);
                            $scope.limits.low = limits['low'];
                            $scope.limits.med = limits['med'];
                            $scope.limits.high = parseInt(limits['med']) + 1;
                        })
                        .catch(function (err) {
                            console.log('error happened while retrieving limits:',err);
                        });
        }
        getLimits();
       
        
        self.startDatePicker = new Pikaday({
            field: document.getElementById('startDate'),
            format: 'D/MM/YYYY',
            defaultDate: startDate,
            minDate: startDate,
            onSelect: function (date) {
                console.log(date);
            }
        });
        
        self.endDatePicker = new Pikaday({
            field: document.getElementById('endDate'),
            format: 'D/MM/YYYY',
            defaultDate: endDate,
            minDate: startDate,
            onSelect: function (date) {
                this.minDate = new Date();
                console.log(date);
                if(date > new Date())
                    return true;
                else
                    return false;
            }
        });
        
        self.startDatePicker.setDate(startDate);
        self.endDatePicker.setDate(endDate);
        
        //utility functions
        self.validateCashbacks = function(hours){
            for(var key in hours){
                if(hours[key].low && hours[key].med && hours[key].high){
                    if(hours[key].low < 5 || hours[key].low > 90 || hours[key].med < 5 || 
                       hours[key].med > 90 || hours[key].high < 5 || hours[key].high > 90){
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            return true;
        }
        
        self.validateDates = function(){
            var valid = false;
            try{
                valid = Math.ceil((self.endDatePicker.getDate().getTime() - self.startDatePicker.getDate().getTime()) /(1000 * 3600 * 24)) >= 6;
            }catch(e){
                console.log("Invalid date");
            }
            return valid;
        }
        
        //init code
        $scope.isNumber = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }
        $scope.showCashbackFormError = false;
        $scope.cashbacks = [];
        $scope.dates = {
            $error: false
        };
        $scope.pickHours = {
                mon: {
                    low: 5,
                    med: 7,
                    high: 10
                },
                tue: {
                    low: 5,
                    med: 7,
                    high: 10
                },
                wed: {
                    low: 5,
                    med: 7,
                    high: 10
                },
                thu: {
                    low: 5,
                    med: 7,
                    high: 10
                },
                fri: {
                    low: 5,
                    med: 7,
                    high: 10
                },
                sat: {
                    low: 5,
                    med: 7,
                    high: 10
                },
                sun: {
                    low: 5,
                    med: 7,
                    high: 10
                }
            }
            
        $scope.slowHours = {
                mon: {
                    low: 5,
                    med: 10,
                    high: 15
                },
                tue: {
                    low: 5,
                    med: 10,
                    high: 15
                },
                wed: {
                    low: 5,
                    med: 10,
                    high: 15
                },
                thu: {
                    low: 5,
                    med: 10,
                    high: 15
                },
                fri: {
                    low: 5,
                    med: 10,
                    high: 15
                },
                sat: {
                    low: 5,
                    med: 10,
                    high: 15
                },
                sun: {
                    low: 5,
                    med: 10,
                    high: 15
                }
            }
            
        $scope.goToCalendarView = function(){
            $state.go('cashbacks',{
                            startDate: startDate
                        });
        }
        
        $scope.setCashbacks = function(){
            console.log($scope.pickHours);
            var requestObj = {};
            var startDate = self.startDatePicker.getDate();
            var endDate = self.endDatePicker.getDate();
            $scope.showCashbackFormError = false;
            $scope.dates.$error = false;
            
            if(self.validateDates() === false){
                $scope.showCashbackFormError = true;
                $scope.dates.$error = true;
                return;
            }
            else{
                requestObj.startTimestamp = (parseInt(startDate.getMonth()) + 1) + "/" + startDate.getDate() + "/" + startDate.getFullYear();
                requestObj.endTimestamp = (parseInt(endDate.getMonth()) + 1) + "/" + endDate.getDate() + "/" + endDate.getFullYear();
            }
            
            if(self.validateCashbacks($scope.pickHours)){
                requestObj.pickHours = $scope.pickHours;
            }else{
                $scope.showCashbackFormError = true;
                return;
            }
            //check for slow hours if set
            if($("#collapseSlowHoursForm").hasClass("in")){
                if(self.validateCashbacks($scope.slowHours)){
                    requestObj.slowHours = $scope.slowHours;
                }else{
                    $scope.showCashbackFormError = true;
                    return;
                }
            }else{
                requestObj.slowHours = $scope.pickHours;
            }
            CashbackSvc.setCashbackPeriod(requestObj)
                        .then(function (response) {
                            //window.location.reload();
                            $.bootstrapGrowl("Cashback created for " + $filter('date')(self.startDatePicker.getDate(), 'd/MM/y') + " to " + $filter('date')(self.endDatePicker.getDate(), 'd/MM/y'), {
                                type: 'success',
                                align: 'center',
                                width: 'auto',
                                allow_dismiss: false
                            });
                            $scope.goToCalendarView();
                        })
                        .catch(function (err) {
                            console.log(err);
                            $.bootstrapGrowl("Something went wrong. Please try again.", {
                                        type: 'danger',
                                        align: 'center',
                                        width: 'auto',
                                        allow_dismiss: true
                                    });
                        });
            ;
            console.log(requestObj);
        }
        
        $scope.showSlowHoursForm = function(){
            if($("#collapseSlowHoursForm").hasClass("in")){
                $("#showSlowHoursBtn").text("Add Slow Hours");
            }else{
                $("#showSlowHoursBtn").text("Cancel Slow Hours");
            }
        }

    }
    return AddCashbacksCtrl;
});