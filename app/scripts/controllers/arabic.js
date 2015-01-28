'use strict';

/**
 * @ngdoc function
 * @name arabicBuildingApp.controller:ArabicCtrl
 * @description
 * # ArabicCtrl
 * Controller of the arabicBuildingApp
 */
angular.module('arabicBuildingApp')
  .controller('ArabicCtrl', function ($scope, ArabicFactory) {
	$scope.arabic = ArabicFactory.getArabicArray()[0];
	$scope.getWord = function(arabic, grammar, getAll) {
		return ArabicFactory.getWord(arabic, grammar, getAll);
	};
	$scope.random = function() {
		$scope.arabic = ArabicFactory.getRandomArabic();
	}
  });