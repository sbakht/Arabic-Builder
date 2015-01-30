'use strict';

/**
 * @ngdoc function
 * @name arabicBuildingApp.controller:ExerciseCtrl
 * @description
 * # ExerciseCtrl
 * Controller of the arabicBuildingApp
 */
angular.module('arabicBuildingApp')
  .controller('ExerciseCtrl', function ($scope, ArabicFactory) {

	  $scope.arabic = ArabicFactory.getArabicArray()[2];
    // $scope.inputs = {mubtada : {text : ''}, kabr : {text : ''}};
    $scope.inputs = {};
    $scope.answer;

    $scope.random = function() {
      $scope.arabic = ArabicFactory.getRandomArabic();
      $scope.inputs = {};
    };
	  
    $scope.addInput = function(grammar, depth) {
      var inputs = $scope.inputs;
      if(grammar instanceof Array) {
        for(var i = 0; i < grammar.length; i++) {
          if(inputs[grammar[i]]) {
            inputs = inputs[grammar[i]];
          }else{
            inputs[grammar[i]] = {text : ''};
          }
        }
      }else{
        $scope.inputs[grammar] = {text : ''};
      }
    };

    $scope.checkAnswer = function() {
      $scope.answer = ArabicFactory.checkAnswer($scope.arabic, $scope.inputs);
    };


    $scope.list1 = [{'title': 'Lolcat Shirt'},{'title': 'Cheezeburger Shirt'},{'title': 'Buckit Shirt'}];
	  $scope.list2 = [{'title': 'Zebra Striped'},{'title': 'Black Leather'},{'title': 'Alligator Leather'}];
	  $scope.list3 = [{'title': 'iPhone'},{'title': 'iPod'},{'title': 'iPad'}];

	  $scope.list4 = [];

	  $scope.hideMe = function() {
	    return $scope.list4.length > 0;
	  };

	  $scope.remove = function(key) {
      delete $scope.inputs[key];
      // $scope.inputs.splice(indexToRemove,1);
	  	// $scope.inputs = $scope.inputs.filter(function (el) {
    //     return el != itemToRemove;
	  	// });
	  }

    $scope.onDrop = function() {
      console.log('hi from onDrop');
	  }
	// $scope.list1 = [];
	//   $scope.list2 = [];
	//   $scope.list3 = [];
	//   $scope.list4 = [];
	  
	//   $scope.list5 = [
	//     { 'title': 'Item 1', 'drag': true },
	//     { 'title': 'Item 2', 'drag': true },
	//     { 'title': 'Item 3', 'drag': true },
	//     { 'title': 'Item 4', 'drag': true },
	//     { 'title': 'Item 5', 'drag': true },
	//     { 'title': 'Item 6', 'drag': true },
	//     { 'title': 'Item 7', 'drag': true },
	//     { 'title': 'Item 8', 'drag': true }
	//   ];

	//   // Limit items to be dropped in list1
	//   $scope.optionsList1 = {
	//     accept: function(dragEl) {
	//       if ($scope.list1.length >= 2) {
	//         return false;
	//       } else {
	//         return true;
	//       }
	//     }
	//   };
  });
