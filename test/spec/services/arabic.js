'use strict';

describe('Service: Arabic', function () {

  // load the service's module
  beforeEach(module('arabicBuildingApp'));

  // instantiate service
  var ArabicFactory;
  beforeEach(inject(function ($injector) {
    ArabicFactory = $injector.get('ArabicFactory');
  }));

  it('should not have empty array', function () {
    var array = ArabicFactory.getArabicArray();
    expect(array.length).toBeGreaterThan(0);
  });

  it('should get a random element from an array', function () {
    var arabic = ArabicFactory.getRandomArabic();

    expect(arabic).toBeTruthy();
  });

  it('should have arabic, splitted, irab, and connector key', function () {
    var arabic = ArabicFactory.getRandomArabic();

    expect(arabic.arabic).toBeTruthy();
    expect(arabic.splitted).toBeTruthy();
    expect(arabic.irab).toBeTruthy();
    expect(arabic.connector).toBeTruthy();
  });

  it('should properly combine the arabic words with pronouns', function () {
    var arabic = ArabicFactory.getRandomArabic();
    var joined = ArabicFactory.join(arabic);

    expect(joined).toBe(arabic.arabic);
  });

  it('should get the word given a grammer type on top layer', function () {
    var arabic = { arabic: 'دَرَبْتُ زَيْدََ', splitted: ['دَرَبْ', 'تُ', 'زَيْدََ'], irab: { fil: 0, fial: 1, mafoo_bihi: 2}, connector: [0]};
    var fil = ArabicFactory.getWord(arabic, 'fil');
    var fial = ArabicFactory.getWord(arabic, 'fial');
    var mafoo_bihi = ArabicFactory.getWord(arabic, 'mafoo_bihi');

    expect(fil).toBe(arabic.splitted[0]);
    expect(fial).toBe(arabic.splitted[1]);
    expect(mafoo_bihi).toBe(arabic.splitted[2]);
  });

  it('should get the words given a grammer type', function () {
    var arabic = { arabic: 'زَيْدٌ وَلَدٌ حَسَنٌ', splitted: ['زَيْدٌ', 'وَلَدٌ', 'حَسَنٌ'], irab: {mubtada: 0, kabr: {nums: [1,2], mawsoof: 1, sifa: 2}}, connector: []};
    // var arabic = { arabic: 'زَيْدٌ وَلَدٌ حَسَنٌ', splitted: ['first', 'second', 'third'], irab: {mubtada: 0, kabr: {nums: [1,2], mawsoof: 1, sifa: 2}}, connector: []};
    var mubtada = ArabicFactory.getWord(arabic, 'mubtada');
    var kabr = ArabicFactory.getWord(arabic, 'kabr');
    var mawsoof = ArabicFactory.getWord(arabic, ['kabr', 'mawsoof']);
    var sifa = ArabicFactory.getWord(arabic, ['kabr', 'sifa']);

    expect(mubtada).toBe(arabic.splitted[0]);
    expect(kabr).toBe(arabic.splitted[1] + ' ' + arabic.splitted[2]);
    expect(mawsoof).toBe(arabic.splitted[1]);
    expect(sifa).toBe(arabic.splitted[2]);
  });

  it('should properly combine words when given a grammer type', function () {
    var arabic = { arabic: 'بَابُ الْبَيْتِهِ', splitted: ['بَابُ', 'الْبَيْتِ', 'هِ'], irab: {mudaf: 0, mudaf_elayhi: {nums: [1,2], mudaf: 1, mudaf_elayhi: 2}}, connector: [1]};
    // var arabic = { arabic: 'زَيْدٌ وَلَدٌ حَسَنٌ', splitted: ['first', 'second', 'third'], irab: {mudaf: 0, mudaf_elayhi: {nums: [1,2], mudaf: 1, mudaf_elayhi: 2}}, connector: [1]};
    var mudaf_elayhi = ArabicFactory.getWord(arabic, 'mudaf_elayhi');

    expect(mudaf_elayhi).toBe(arabic.splitted[1] + arabic.splitted[2]);
  });

});
