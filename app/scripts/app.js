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
    'ngSanitize',
    // 'ngDragDrop',
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
      .when('/exercise', {
        templateUrl: 'views/exercise.html',
        controller: 'ExerciseCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .filter("reverse", function(){
    return function(items){
        return items.slice().reverse(); // Create a copy of the array and reverse the order of the items
    };
  });
