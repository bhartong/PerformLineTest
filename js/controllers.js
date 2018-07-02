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

    //Create function to get all campaigns for a brand
    $scope.getBrandCampaigns = function (brandId) {
        var apiRoute = baseUrl + 'common/campaigns/' + token + '&brand=' + brandId;
        var _brandCampaigns = $http.get(apiRoute);
        _brandCampaigns.then(function (response) {
                $scope.brandCampaigns = response.data.Results;
                $scope.brandCampaigns.unshift({BrandId: $scope.brandCampaigns[0].BrandId, CompanyId: 0, Id: 0, Name:"Show All"});
                $scope.campaignSelection = $scope.brandCampaigns[0];
            },
            function (error) {
                console.log("Error: " + error);
            });

    };

    //Function that runs when brand select value changes
    $scope.changeSelectedBrand = function (item) {
        $scope.getBrandCampaigns(item.Id);
    };

    //Function that runs when campaign select value changes
    $scope.changeSelectedCampaign = function (item) {

    };

    //Init page by getting all brands available
    $scope.getBrands();
});