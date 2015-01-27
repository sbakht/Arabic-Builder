'use strict';

/**
 * @ngdoc overview
 * @name arabicBuildingApp
 * @description
 * # arabicBuildingApp
 *
 * Main module of the application.
 */
angular
  .module('arabicBuildingApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/arabic', {
        templateUrl: 'views/arabic.html',
        controller: 'ArabicCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
