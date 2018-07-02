'use strict';
var app = angular.module('app', ['ngRoute', 'myApp', 'appFilters', 'appServices', 'appDirectives', 'angularUtils.directives.dirPagination']);

/**
 * Define routes
 */
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'mainController'
	}).
	otherwise({
		redirectTo: '/home'
	});
}]);
