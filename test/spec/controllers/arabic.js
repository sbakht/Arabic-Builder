'use strict';

describe('Controller: ArabicCtrl', function () {

  // load the controller's module
  beforeEach(module('arabicBuildingApp'));

  var ArabicCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArabicCtrl = $controller('ArabicCtrl', {
      $scope: scope
    });
  }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });
});
