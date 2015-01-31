'use strict';

/**
 * @ngdoc directive
 * @name arabicBuildingApp.directive:irab
 * @description
 * # irab
 */
angular.module('arabicBuildingApp')
  .directive('irab', function () {
    return {
      templateUrl: 'views/directives/irab.html',
      restrict: 'E',
      scope: {
      	arabic: "=",
      	parents: "=",
      	grammar: "=",
      	showSentence: "=showSentence",
      },
      // controller: 'ArabicCtrl',
      controller : function($scope, ArabicFactory) {
      	if($scope.grammar !== "nums") {
	      	console.log($scope.parents)
	      	console.log($scope.grammar)
	      	$scope.grammarTree = angular.copy($scope.parents);
	      	$scope.grammarTree.push($scope.grammar);
	      	console.log($scope.grammarTree);
      	}


      		$scope.getWord = function(grammar, getAll) {
				return ArabicFactory.getWord($scope.arabic, grammar, getAll);
			};

      }
      	// $scope.grammar="fial";
      // 	// console.log($scope.grammar);
      // // 	if($scope.parents.length == 0) {
      // // 		$scope.parents = $scope.grammar;
      // // 	}else{
      // // 		$scope.parents.push($scope.grammar);
      // // 	}
      // // }
      // // link: function postLink(scope, element, attrs) {
      // //   element.text('this is the irab directive');
      // }
    };
  });
