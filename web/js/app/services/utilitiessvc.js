define([], function () {
    'use strict';

    var UtilitiesSvc = function () {

        this.getTimestampV1 = function (date) {
            return (parseInt(date.getMonth()) + 1) + "/" + date.getDate() + "/" + date.getFullYear();
        }
        
        this.addDays = function(date,days){
            return date.setDate(date.getDate() + days);
        }
        
        //make sure to add catch exception while using this
        this.getDateDifference = function(start,end){
            return Math.ceil((start.getTime() - end.getTime()) /(1000 * 3600 * 24));
        }
        
        this.validateEmail = function (email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

    }
    return UtilitiesSvc;
});
