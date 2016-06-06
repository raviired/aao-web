define(['jquery', 'timePicker', 'moment', 'pikaday'],
        function ($, timePicker, moment, Pikaday) {
            'use strict';
            var SettingsCtrl = function ($scope, $http, $state, SettingsSvc) {
                var self = this;
                $scope.currentBalance = 0;
                $scope.maxBalance = 0;
                $scope.requiresRenewal = false;
                $scope.progressBarWidth = 0;
                $scope.getProgressBarClass = function (currentBalance) {
                    if ($scope.minRequiredBalance >= $scope.currentBalance) {
                        $scope.requiresRenewal = true;
                        return 'progress-bar-danger';
                    } else if ($scope.progressBarWidth <= 50) {
                        return 'progress-bar-warning';
                    } else{
                        return 'progress-bar-success';
                    }
                }
                SettingsSvc.getCurrentBalance()
                        .then(function (data) {
                            console.log(data);
                            $scope.currentBalance = data.currentBalance;
                            $scope.maxBalance = data.maxBalance;
                            $scope.minRequiredBalance = data.minRequiredBalance;
                            $scope.progressBarWidth = parseInt(data.currentBalance * 100 / data.maxBalance);
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
            return SettingsCtrl;
        });