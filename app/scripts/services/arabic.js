'use strict';

/**
 * @ngdoc service
 * @name arabicBuildingApp.Arabic
 * @description
 * # Arabic
 * Factory in the arabicBuildingApp.
 */
angular.module('arabicBuildingApp')
  .factory('Arabic', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
