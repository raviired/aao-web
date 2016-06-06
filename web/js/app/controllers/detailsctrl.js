define([], function () {
    'use strict';

    var DetailsCtrl = function ($scope, $http, DetailsSvc) {

        $scope.formData = {};
        $scope.selectedCategories = [];

        $scope.toggleSidebar = function () {
            $("#wrapper").toggleClass("toggled");
        }

        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        
        //var ctx = document.getElementById("myChart").getContext("2d");
        //var myLineChart = new Chart(ctx).Line(data, {});

        //load eatery details
        DetailsSvc.getDetails()
                .then(function (eateryDetails) {
                    console.log(eateryDetails);
                    $scope.formData.name = eateryDetails.name;
                    $scope.formData.email = eateryDetails.email;
                    $scope.formData.phone = eateryDetails.phone;
                    $scope.formData.full_address = eateryDetails.full_address;
                    $scope.formData.zipcode = eateryDetails.zipcode;
                    $scope.formData.area = eateryDetails.area;
                    $scope.formData.website = eateryDetails.website;
                    $scope.formData.description = eateryDetails.description;
                    $scope.formData.categories = eateryDetails.categories;
                    $scope.selectedCategories = [];
                    eateryDetails.categories.forEach(function (category) {
                        if (category.isSelected) {
                            $scope.selectedCategories.push(category);
                        }
                    });
                    console.log($scope.selectedCategories);
                })
                .catch(function (err) {
                    console.log(err);
                });


        $scope.updateDetails = function () {
            console.log($scope.formData);
            //$scope.formData.categories = JSON.stringify($scope.formData.categories);
            //$scope.formData.categories 
            DetailsSvc.updateDetails($scope.formData)
                    .then(function (response) {
                        console.log(response);
                        $.bootstrapGrowl("Information updated!", {
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

    }
    return DetailsCtrl;
});
