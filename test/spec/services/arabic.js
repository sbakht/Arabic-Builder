'use strict';

describe('Service: Arabic', function () {

  // load the service's module
  beforeEach(module('arabicBuildingApp'));

  // instantiate service
  var Arabic;
  beforeEach(inject(function (_Arabic_) {
    Arabic = _Arabic_;
  }));

  it('should do something', function () {
    expect(!!Arabic).toBe(true);
  });

});
