define([],
        function () {

            'use strict';
           
            var config = function ($routeProvider, $stateProvider, $urlRouterProvider, $httpProvider, DetailsSvc) {
                
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
                // For any unmatched url, redirect to /state1
                $urlRouterProvider.otherwise("/dashboard");
                /*
                 * 'nav@': {
                                    templateUrl: 'web/templates/nav.html',
                                    controller: 'NavCtrl'
                                },
                 * 
                 */
                // Now set up the states
                $stateProvider
                        .state('dashboard', {
                            url: "/dashboard",
                            authenticate: true,
                            views: {
                                'content': {
                                            templateUrl: 'web/templates/dashboard/details.html',
                                            controller: 'DashboardCtrl'
                                        },
                                'header': {
                                    templateUrl: 'web/templates/header.html',
                                    controller: 'HeaderCtrl'
                                }
                            }
                        })
                        .state('details', {
                            url: "/details",
                            authenticate: true,
                            views: {
                                'content': {
                                            templateUrl: 'web/templates/details/details.html',
                                            controller: 'DetailsCtrl'
                                        },
                                
                                'header': {
                                    templateUrl: 'web/templates/header.html',
                                    controller: 'HeaderCtrl'
                                }
                            }
                        })
                        .state('employees', {
                            url: "/employees",
                            authenticate: true,
                            views: {
                                'content': {
                                            templateUrl: 'web/templates/employees/list.html',
                                            controller: 'EmployeesCtrl'
                                        },
                                'header': {
                                    templateUrl: 'web/templates/header.html',
                                    controller: 'HeaderCtrl'
                                }
                            }
                        })
                        .state('add-employee', {
                            url: "/add-employee",
                            authenticate: true,
                            views: {
                                'content': {
                                            templateUrl: 'web/templates/employees/add-employee.html',
                                            controller: 'AddEmployeeCtrl'
                                        },
                                'header': {
                                    templateUrl: 'web/templates/header.html',
                                    controller: 'HeaderCtrl'
                                }
                            }
                        })
                        .state('edit-employee', {
                            url: "/edit-employee/:employeeId",
                            authenticate: true,
                            views: {
                                'content': {
                                            templateUrl: 'web/templates/employees/edit-employee.html',
                                            controller: 'EditEmployeeCtrl'
                                        },
                                'header': {
                                    templateUrl: 'web/templates/header.html',
                                    controller: 'HeaderCtrl'
                                }
                            }
                        })
                        .state('transactions', {
                            url: "/transactions",
                            authenticate: true,
                            views: {
                                'content': {
                                            templateUrl: 'web/templates/transactions/list.html',
                                            controller: 'TransactionsCtrl'
                                        },
                                'header': {
                                    templateUrl: 'web/templates/header.html',
                                    controller: 'HeaderCtrl'
                                }
                            }
                        })
                        .state('add-transaction', {
                            url: "/add-transaction",
                            authenticate: true,
                            views: {
                                'content': {
                                            templateUrl: 'web/templates/transactions/add-transaction.html',
                                            controller: 'AddTransactionCtrl'
                                        },
                                'header': {
                                    templateUrl: 'web/templates/header.html',
                                    controller: 'HeaderCtrl'
                                }
                            }
                        })
                        .state('cashbacks', {
                            url: "/cashbacks",
                            authenticate: true,
                            params: {
                                startDate: null,
                                endDate: null
                            },
                            views: {
                                'content': {
                                            templateUrl: 'web/templates/cashbacks/cashbacks.html',
                                            controller: 'CashbacksCtrl'
                                        },
                                'header': {
                                    templateUrl: 'web/templates/header.html',
                                    controller: 'HeaderCtrl'
                                }
                            },
                            resolve:{
                                eateryDetails: function(DetailsSvc) {
                                                console.log('Started to resolve the balance');
                                                return DetailsSvc.getDetails();
                                            }
                            }
                        })
                        .state('add-cashbacks', {
                            url: "/add-cashbacks",
                            authenticate: true,
                            params: {
                                startDate: null,
                                endDate: null
                            },
                            views: {
                                'content': {
                                            templateUrl: 'web/templates/cashbacks/add-cashbacks.html',
                                            controller: 'AddCashbacksCtrl'
                                        },
                                'header': {
                                    templateUrl: 'web/templates/header.html',
                                    controller: 'HeaderCtrl'
                                }
                            }
                        })
                        .state('settings', {
                            url: "/settings",
                            authenticate: true,
                            views: {
                                'content': {
                                            templateUrl: 'web/templates/settings/settings.html',
                                            controller: 'SettingsCtrl'
                                        },
                                'header': {
                                    templateUrl: 'web/templates/header.html',
                                    controller: 'HeaderCtrl'
                                }
                            }
                        })
                        .state('profiles', {
                            url: "/profiles",
                            authenticate: true,
                            views: {
                                'content': {
                                            templateUrl: 'web/templates/profiles/list.html',
                                            controller: 'ProfilesCtrl'
                                        },
                                'header': {
                                    templateUrl: 'web/templates/header.html',
                                    controller: 'HeaderCtrl'
                                }
                            }
                        })
                        .state('login', {
                            url: "/login",
                            authenticate: false,
                            views: {
                                'content': {
                                    templateUrl: 'web/templates/login.html',
                                    controller: 'LoginCtrl'
                                },
                                'header': {
                                    templateUrl: 'web/templates/not-loggedin-header.html',
                                    controller: 'HeaderCtrl'
                                }
                            }
                        });
            }
            return config;
        });
