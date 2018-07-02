'use strict';
var app = angular.module('myApp', []);

app.controller('mainController', function($scope, $http) {
	//Set a global variable to the base url for api
    var baseUrl = 'https://api.performline.com/';

    //Set a global variable to the api token
    var token = '?token=8a26bba7614feb3987ddfec7c6d31755ae5d7c47';

    //Create function to get all brands
    $scope.getBrands = function () {
        var apiRoute = baseUrl + 'common/brands/' + token;
        var _brand = $http.get(apiRoute);
        _brand.then(function (response) {
                $scope.brands = response.data.Results;
            },
            function (error) {
                console.log("Error: " + error);
            });

    };

    //Init page by getting all brands available
    $scope.getBrands();
});