'use strict';
var appControllers = angular.module('appControllers',[]);

appControllers.controller('HomeController', ['$scope', function($scope) {
	//Set a global variable to the base url for api
    var baseUrl = 'api.performline.com/';

    //Set a global variable to the api token
    var token = '?token=8a26bba7614feb3987ddfec7c6d31755ae5d7c47';

    //Create function to get all brands
    $scope.getBrands = function () {
        var apiRoute = baseUrl + '/common/brands/' + token;
        var _contact = ContactsService.getAll(apiRoute);
        _contact.then(function (response) {
                $scope.contacts = response.data;
            },
            function (error) {
                console.log("Error: " + error);
            });

    };
    $scope.getBrands();
}]);