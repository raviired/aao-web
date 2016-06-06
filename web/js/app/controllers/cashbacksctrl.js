define(['jquery', 'timePicker', 'fullcalendar', 'moment', 'pikaday'],
        function ($, timePicker, fullcalendar, moment, Pikaday) {
            'use strict';

            var DefaultCashbackCtrl = function ($scope, $http, CashbackSvc, $state, $stateParams, UtilitiesSvc, eateryDetails) {
                var self = this;
                console.log(localStorage.getItem("eateryConfig"));
                
                var today = new Date();
                var validDate = new Date();
                validDate.setDate(validDate.getDate() + 7); 
                
                $scope.date = validDate;

                self.startDatePicker = new Pikaday({
                    field: document.getElementById('startDate'),
                    format: 'D/MM/YYYY',
                    minDate: validDate,
                    onSelect: function (date) {
                        console.log(date);
                        $scope.selectedStartDate = date;
                    }
                });

                self.endDatePicker = new Pikaday({
                    field: document.getElementById('endDate'),
                    format: 'D/MM/YYYY',
                    minDate: validDate,
                    onSelect: function (date) {
                        $scope.selectedEndDate = date;
                    }
                });

                self.events = [];
                self.cashbacks = [];
                self.colors = ['#EAEAEA', '#E0F4D4', '#9DE1FE', '#fef8d6', '#d0ffbc', '#ffc8e8', '#FFCFA7', '#FF6B6B'];
                self.colorsIndex = 0;

                $scope.selectedStartDate = null;
                $scope.selectedEndDate = null;
                $scope.invalidDatesSelection = false;
                $scope.limits = {};
                $scope.selectedDateForSpPromotionText = "";
                $scope.selectedDateForSpPromotion = "";
                $scope.spPickHours = {};
                $scope.spSlowHours = {};
                $scope.specialDiscounts = {
                    invalidDiscountsError: false
                };
                $scope.minDiscountRequiredForPromotion = eateryDetails.min_publish_promotion_discount;
                $scope.isNumber = function (n) {
                    return !isNaN(parseFloat(n)) && isFinite(n);
                }


                function getTodaysDate() {
                    var date = new Date();
                    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                }

                function getLimits() {
                    CashbackSvc.getLimits()
                            .then(function (limits) {
                                console.log('limits:', limits);
                                $scope.limits.low_min = 1;
                                $scope.limits.low_max = limits['low'];
                                $scope.limits.med_min = parseInt(limits['low']) + (1);
                                $scope.limits.med_max = limits['med'];
                                $scope.limits.high_min = parseInt(limits['med']) + 1;
                            })
                            .catch(function (err) {
                                console.log('error happened while retrieving limits:', err);
                            });
                }

                getLimits();

                self.publishPromotionDatePicker = null;
                $scope.cancelPublishPromotion = function () {
                    console.log("cancel");
                    $scope.selectedStartDate = null;
                    $scope.selectedEndDate = null;
                }
                $scope.openPublishPromotionsModal = function () {
                    $scope.validPublishing = false;
                    resetPublishPromotionErrors();
                    if ($scope.selectedStartDate) {
                        console.log('openPublishPromotionsModal');
                        $scope.selectedStartDateText = moment($scope.selectedStartDate).format('dddd, MMMM Do, YYYY') + " " + "00:00:00";
                        if ($scope.selectedEndDate === null) {
                            $scope.selectedEndDateText = $scope.selectedStartDateText;
                        } else {
                            $scope.selectedEndDateText = moment($scope.selectedEndDate).format('dddd, MMMM Do, YYYY ') + " " + "23:59:59";
                        }
                        $("#publishPromotionModal").modal();
                        // code for publishing promotions
                        if (self.publishPromotionDatePicker !== null) {
                            self.publishPromotionDatePicker.destroy();
                        }
                        var minDate = new Date();
                        minDate = minDate.setDate(minDate.getDate() + 6);
                        self.publishPromotionDatePicker = new Pikaday({
                            field: document.getElementById('publishPromtionDate'),
                            format: 'D/MM/YYYY',
                            //minDate:  minDate,
                            maxDate: $scope.selectedStartDate,
                            onSelect: function (date) {
                                console.log(date);
                                this.minDate = new Date();
                                console.log(date);
                                if (date < minDate)
                                    return true;
                                else
                                    return false;
                            }
                        });
                        self.publishPromotionDatePicker.setDate(minDate);
                        self.publishPromotionDatePicker.setMinDate(new Date((new Date()).getTime() + (7 * 86400000)));
                        console.log('ew');

                    } else if ($scope.selectedStartDate === null) {
                        $scope.invalidDatesSelection  = true;
                    }
                }

                $scope.publishingError = {};

                function resetPublishPromotionErrors() {
                    //set default values for errors
                    $scope.publishingError.publishDateAfterStartDate = false;
                    $scope.publishingError.invalidDiscounts = false;
                }

                function checkForValidDiscounts(startDate, endDate) {
                    var validDiscounts = true;
                    var dates = [];
                    var allNullEvents = true;

                    startDate = moment(startDate);
                    endDate = moment(endDate);

                    while (startDate.format('M/D/YYYY') <= endDate.format('M/D/YYYY')) {
                        dates.push(startDate.format('YYYY-MM-DD'));
                        startDate.add('days', 1);
                    }
                    console.log(dates);
                    var events = self.events;
                    for (var i = 0; i < events.length; i++) {
                        if (events[i] !== null) {
                            if (allNullEvents) {
                                allNullEvents = false;
                            }
                            for (var j = 0; j < dates.length; j++) {
                                if (moment(events[i]["start"]).format('YYYY-MM-DD') == dates[j]) {
                                    console.log("-----found a match:", dates[j]);
                                    var event = events[i];
                                    if (event["pick"]["low"] < $scope.minDiscountRequiredForPromotion || event["pick"]["med"] < $scope.minDiscountRequiredForPromotion || event["pick"]["high"] < $scope.minDiscountRequiredForPromotion) {
                                        return false;
                                    }
                                    if (event.slow) {
                                        if (event["slow"]["low"] < $scope.minDiscountRequiredForPromotion || event["slow"]["med"] < $scope.minDiscountRequiredForPromotion || event["slow"]["high"] < $scope.minDiscountRequiredForPromotion) {
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    return allNullEvents ? false : validDiscounts;
                }
                ;

                function validatePublishing() {
                    resetPublishPromotionErrors();
                    var valid = true;
                    try {
                        if (!checkForValidDiscounts($scope.selectedStartDate, $scope.selectedEndDate)) {
                            $scope.publishingError.invalidDiscounts = true;
                            valid = false;
                        }
                    } catch (err) {
                        valid = false;
                    }
                    return valid;
                }

                $scope.publishPromotions = function () {
                    if (validatePublishing()) {
                        var data = {
                            start: moment($scope.selectedStartDate).format('MM/DD/YYYY'),
                            end: moment($scope.selectedEndDate).format('MM/DD/YYYY'),
                            publish_on: moment(self.publishPromotionDatePicker.getDate()).format('MM/DD/YYYY')
                        }
                        CashbackSvc.publishPromotions(data)
                                .then(function (response) {
                                    console.log(response);
                                    $.bootstrapGrowl("Promotions will be pushlished on: " + data.publish_on, {
                                        type: 'success',
                                        align: 'center',
                                        width: 'auto',
                                        allow_dismiss: true
                                    });
                                    $("#publishPromotionModal").modal('hide');
                                    fetchAndRenderEvents();
                                })
                                .catch(function (err) {
                                    console.log("publish promotion err:", err);
                                    var notifConfig = {
                                        type: 'danger',
                                        align: 'center',
                                        width: 'auto',
                                        allow_dismiss: true,
                                        delay: 5000
                                    };
                                    var msg = "Something went wrong! Please try publishing again.";
                                    if (err.data.msg) {
                                        msg = err.data.msg;
                                        notifConfig.delay = 20000;
                                    }
                                    $.bootstrapGrowl(msg, notifConfig);
                                });
                    }
                }

                /********code for publishing promotions ENDS *********************/
                $scope.saveSpecialPromotion = function () {
                    $scope.specialDiscounts.invalidDiscountsError = false;
                    try {
                        var data = {
                            start: $scope.selectedDateForSpPromotion,
                            pick_low: parseInt($scope.spPickHours.low),
                            pick_med: parseInt($scope.spPickHours.med),
                            pick_high: parseInt($scope.spPickHours.high),
                            slow_low: parseInt($scope.spSlowHours.low),
                            slow_med: parseInt($scope.spSlowHours.med),
                            slow_high: parseInt($scope.spSlowHours.high),
                            special: $scope.special
                        }
                        if (data.pick_low < 5 || data.pick_med < 5 || data.pick_high < 5 || data.slow_low < 5 || data.slow_high < 5 || data.slow_med < 5 ||
                                isNaN(data.pick_low) || isNaN(data.pick_med) | isNaN(data.pick_high) || isNaN(data.slow_low) || isNaN(data.slow_high) || isNaN(data.slow_med)) {
                            $scope.specialDiscounts.invalidDiscountsError = true;
                            throw("Invalid discounts");
                        }
                        CashbackSvc.saveSpecialPromotion(data)
                                .then(function (response) {
                                    console.log(response);
                                    $.bootstrapGrowl("Sp. promotion saved for " + $scope.selectedDateForSpPromotionText, {
                                        type: 'success',
                                        align: 'center',
                                        width: 'auto',
                                        allow_dismiss: true
                                    });
                                    $("#spPromotionModal").modal('hide');
                                    fetchAndRenderEvents();
                                })
                                .catch(function (err) {
                                    console.log("save promotion err:", err);
                                    $.bootstrapGrowl("Something went wrong! Please try saving again.", {
                                        type: 'danger',
                                        align: 'center',
                                        width: 'auto',
                                        allow_dismiss: false
                                    });
                                });
                    } catch (err) {
                        console.error(err);
                    }
                }

                function retrieveSpPromotionDetails(calendarEventObj) {
                    $scope.$apply(function () {
                        var date = calendarEventObj.start._i;
                        var pick = calendarEventObj.pick;
                        var slow = calendarEventObj.slow;
                        $scope.spPickHours.low = pick.low;
                        $scope.spPickHours.med = pick.med;
                        $scope.spPickHours.high = pick.high;
                        $scope.spSlowHours.low = slow.low;
                        $scope.spSlowHours.med = slow.med;
                        $scope.spSlowHours.high = slow.high;
                        $scope.selectedDateForSpPromotionText = moment(date).format('dddd, MMMM Do, YYYY');
                        $scope.selectedDateForSpPromotion = moment(date).format('MM/DD/YYYY');
                        $scope.special = calendarEventObj.special;
                    });
                }

                function fetchAndRenderEvents() {
                    var requestParams = {};
                    requestParams.startTimestamp = (parseInt($scope.firstDay.getMonth()) + 1) + "/" + $scope.firstDay.getDate() + "/" + $scope.firstDay.getFullYear();
                    requestParams.endTimestamp = (parseInt($scope.lastDay.getMonth()) + 1) + "/" + $scope.lastDay.getDate() + "/" + $scope.lastDay.getFullYear();
                    console.log(requestParams);

                    CashbackSvc.getCashbacks(requestParams)
                            .then(function (cashbacks) {
                                self.colorIndex = 0;
                                self.events = [];
                                for (var i = 0; i < cashbacks.length; i++) {
                                    if (cashbacks[i] !== null) {
                                        var slow = {};
                                        var pick = {};
                                        var title = "";
                                        pick.low = cashbacks[i]['pick']['low'];
                                        pick.med = cashbacks[i]['pick']['med'];
                                        pick.high = cashbacks[i]['pick']['high'];
                                        if (cashbacks[i]['slow']) {
                                            slow.low = cashbacks[i]['slow']['low'];
                                            slow.med = cashbacks[i]['slow']['med'];
                                            slow.high = cashbacks[i]['slow']['high'];
                                        } else {
                                            slow = pick;
                                        }
                                        if (i > 0 && cashbacks[i - 1] !== null && cashbacks[i]['period_start_ts'] !== cashbacks[i - 1]['period_start_ts']) {
                                            self.colorIndex++;
                                        }
                                        var event = {
                                            start: cashbacks[i]['date'],
                                            title: title,
                                            backgroundColor: self.colors[self.colorIndex],
                                            textColor: '#222',
                                            slow: slow,
                                            pick: pick,
                                            currentTimezone: 'Asia/Calcutta'
                                        };
                                        if (cashbacks[i].publishingOn) {
                                            event.backgroundColor = "#FFCFA7";
                                            event.publishingOn = cashbacks[i]['publishingOn'];
                                        } else if (cashbacks[i].special) {
                                            event.special = cashbacks[i].special;
                                            event.backgroundColor = "#F2DEDE";
                                        }
                                        self.events.push(event);
                                    }
                                }
                                console.log(self.events);
                                $('#calendar').fullCalendar('removeEvents');
                                $('#calendar').fullCalendar('addEventSource', self.events);
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                }


                $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        //right: 'month,agendaWeek,agendaDay',
                        right: 'month'
                    },
                    //defaultDate: getTodaysDate(),
                    defaultDate: moment(new Date()).format('YYYY-MM-DD'),
                    editable: false,
                    eventLimit: false, // allow "more" link when too many events
                    events: [],
                    selectable: false,
                    ignoreTimezone: false,
                    select: function (start, end, jsEvent, view, resource) {
                        console.log('start:', start);
                        console.log('end:', end);
                        var today = new Date();
                        var acceptableEndDate = new Date();
                        acceptableEndDate.setDate(today.getDate() + 6);
                        if (start._d.getTime() >= acceptableEndDate.getTime()) {
                            console.log('valid selection');
                            $scope.selectedStartDate = new Date(start._d.setDate(start._d.getDate() + 1));
                            //$scope.selectedStartDate = start._d;
                            $scope.selectedEndDate = end._d;
                            console.log('start:', $scope.selectedStartDate);
                            console.log('end:', $scope.selectedEndDate);
                        } else {
                            console.log('invalid selection');
                            $scope.selectedStartDate = null;
                            $scope.selectedEndDate = null;
                        }
                    },
                    eventAfterAllRender: function (view) {
                        $(".unpublish-promotion").on('click', function (evt) {
                            var startDate = $(this).attr('data-start-date');
                            var publishOnDate = $(this).attr('data-publish-date');
                            console.log("removing with ts:", publishOnDate);
                            var publishOnText = moment(publishOnDate).format('dddd, MMMM Do');
                            var bool = confirm("Are you sure you want to unpublish promotion on " + moment(startDate).format('dddd, MMMM Do') + "?");
                            if (bool) {
                                CashbackSvc.unpublishPromotion(publishOnDate)
                                        .then(function (response) {
                                            console.log(response);
                                            $.bootstrapGrowl("Promotion on " + publishOnText + " is unpublished", {
                                                type: 'success',
                                                align: 'center',
                                                width: 'auto',
                                                allow_dismiss: true,
                                                delay: 5000
                                            });
                                            fetchAndRenderEvents();
                                        })
                                        .catch(function (err) {
                                            console.log("unpublish promotion err:", err);
                                            var notifConfig = {
                                                type: 'danger',
                                                align: 'center',
                                                width: 'auto',
                                                allow_dismiss: true,
                                                delay: 5000
                                            };
                                            var msg = "Something went wrong! Please try unpublishing again.";
                                            if (err.data.msg) {
                                                msg = err.data.msg;
                                                notifConfig.delay = 20000;
                                            }
                                            $.bootstrapGrowl(msg, notifConfig);
                                        });
                            }

                        });

                        $(".remove-sp-promotion").on('click', function (evt) {
                            var startDate = $(this).attr('data');
                            console.log("removing:", startDate);
                            var startDateText = moment(startDate).format('dddd, MMMM Do');
                            console.log("removing:", startDate);
                            var bool = confirm("Are you sure you want to remove Special Promotion on " + startDateText + "?");
                            if (bool) {
                                CashbackSvc.removeSpecialPromotion(startDate)
                                        .then(function (response) {
                                            console.log(response);
                                            $.bootstrapGrowl("Special Promotion on " + startDateText + " deleted.", {
                                                type: 'success',
                                                align: 'center',
                                                width: 'auto',
                                                allow_dismiss: true,
                                                delay: 5000
                                            });
                                            fetchAndRenderEvents();
                                        })
                                        .catch(function (err) {
                                            console.log("sp promotion err:", err);
                                            var notifConfig = {
                                                type: 'danger',
                                                align: 'center',
                                                width: 'auto',
                                                allow_dismiss: true,
                                                delay: 5000
                                            };
                                            var msg = "Something went wrong! Please try removing sp promotion again.";
                                            if (err.data.msg) {
                                                msg = err.data.msg;
                                                notifConfig.delay = 20000;
                                            }
                                            $.bootstrapGrowl(msg, notifConfig);
                                        });
                            }
                        });
                    },
                    eventRender: function (event, element, view) {
                        var html = "";
                        if (event.publishingOn) {
                            html += "<div class='text-right'>" +
                                    "<button type='button' data-publish-date='" + event.publishingOn + "' data-start-date='" + moment(event.start).format('YYYY-MM-DD') + "' class='unpublish-promotion btn btn-danger btn-sm'>" +
                                    "<span class='glyphicon glyphicon-volume-off' aria-hidden='true'></span> Unpublish" +
                                    "</button>" +
                                    "</div>" +
                                    "<div><strong>Publishing on:</strong><br/> " + moment(event.publishingOn).format('dddd, MMMM Do') + "</div>";
                        } else {
                            if (event.special) {
                                //remove-sp-promotion
                                html = "<div class='text-right'><button type='button' data='" + moment(event.start).format('YYYY-MM-DD') + "' class='remove-sp-promotion btn btn-danger btn-scheme btn-sm'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span>&nbsp;Remove</button></div>";
                            }
                        }
                        html += "<table>" +
                                "<thead>" +
                                "<tr>" +
                                "<th>" + "" + "</th>" +
                                "<th>" + "pick" + "</th>" +
                                "<th>" + "slow" + "</th>" +
                                "</tr>" +
                                "</thead>" +
                                "<tbody>" +
                                "<tr>" +
                                "<td class='text-center'>" + "low" + "</td>" +
                                "<td class='text-center'>" + event.pick.low + "%</td>" +
                                "<td class='text-center'>" + event.slow.low + "%</td>" +
                                "</tr>" +
                                "<tr>" +
                                "<td class='text-center'>" + "med" + "</td>" +
                                "<td class='text-center'>" + event.pick.med + "%</td>" +
                                "<td class='text-center'>" + event.slow.med + "%</td>" +
                                "</tr>" +
                                "<tr>" +
                                "<td class='text-center'>" + "high" + "</td>" +
                                "<td class='text-center'>" + event.pick.high + "%</td>" +
                                "<td class='text-center'>" + event.slow.high + "%</td>" +
                                "</tr>" +
                                "</thead>" +
                                "</table>";
                        element.find('.fc-content').html(html);
                        //$compile(html)($scope);
                        element.bind('dblclick', function (event) {
                            retrieveSpPromotionDetails($(event.currentTarget).data().fcSeg.event);
                            $("#spPromotionModal").modal();
                        });
                    },
                    viewRender: function (view, element) {
                        $scope.firstDay = view.start._d;
                        $scope.lastDay = view.end._d;
                        fetchAndRenderEvents();
                    }
                });

                if ($stateParams.startDate) {
                    $("#calendar").fullCalendar('gotoDate', $stateParams.startDate);
                }


                $scope.goToAddCashbacks = function () {
                    console.log($scope.selectedStartDate);
                    $scope.invalidDatesSelection = false;
                    if ($scope.selectedStartDate === null) {
                        $scope.invalidDatesSelection = true;
                    } else {
                        if ($scope.selectedEndDate === null || Math.ceil(($scope.selectedEndDate.getTime() - $scope.selectedStartDate.getTime()) / (1000 * 3600 * 24)) < 6) {
                            $scope.selectedEndDate = $scope.selectedStartDate.setDate($scope.selectedStartDate.getDate() + 6);
                        }
                        $state.go('add-cashbacks', {
                            startDate: $scope.selectedStartDate,
                            endDate: $scope.selectedEndDate
                        });
                    }
                }


            }
            return DefaultCashbackCtrl;
        });