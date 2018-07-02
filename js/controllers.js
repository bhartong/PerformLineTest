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
            console.log(response);
                $scope.brands = response.data.Results;
                $scope.brands.unshift({Id: 0, Name:"Show All"});
                $scope.brandSelection = $scope.brands[0];
                $scope.getBrandCampaigns(0);
            },
            function (error) {
                console.log("Error: " + error);
            });

    };

    //Create function to get all items for specific brand
    $scope.getBrandDetails = function (brandId, campaignId) {
        var apiRoute = baseUrl + 'common/items/' + token;
        apiRoute += (brandId !== 0) ? '&brand=' + brandId : '';
        apiRoute += (campaignId !== 0) ? '&campaign=' + campaignId : '';
        var _brandItems = $http.get(apiRoute);
        _brandItems.then(function (response) {
                $scope.brandItems = response.data.Results;
                $scope.sortKey = 'Id';
                $scope.reverse = false;
            },
            function (error) {
                console.log("Error: " + error);
            });

    };

    //Create function to get all campaigns for a brand
    $scope.getBrandCampaigns = function (brandId) {
        var apiRoute = baseUrl + 'common/campaigns/' + token;
        apiRoute += (brandId !== 0) ? '&brand=' + brandId : '';
        var _brandCampaigns = $http.get(apiRoute);
        _brandCampaigns.then(function (response) {
                $scope.brandCampaigns = response.data.Results;
                $scope.brandCampaigns.unshift({BrandId: $scope.brandCampaigns[0].BrandId, CompanyId: 0, Id: 0, Name:"Show All"});
                $scope.campaignSelection = $scope.brandCampaigns[0];
                $scope.getBrandDetails(brandId, 0);
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
        $scope.getBrandDetails(item.BrandId, item.Id);
    };

    //Allow sorting of list
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    //Init page by getting all brands available
    $scope.getBrands();
});