'use strict';

/**
 * @ngdoc service
 * @name arabicBuildingApp.Arabic
 * @description
 * # Arabic
 * Factory in the arabicBuildingApp.
 */
angular.module('arabicBuildingApp')
  .factory('ArabicFactory', function () {

    function getArabicArray() {
      return [{ arabic: 'دَرَبْتُ زَيْدََ', splitted: ['دَرَبْ', 'تُ', 'زَيْدََ'], irab: {fil: 0, fial: 1, mafoo_bihi: 2}, connector: [0]},
              { arabic: 'دَرَبَ زَيْدََ امرٌ', splitted: ['دَرَبَ', 'زَيْدََ', 'امرٌ'], irab: {fil: 0, fial: 2, mafoo_bihi: 1}, connector: []},
              { arabic: 'زَيْدٌ وَلَدٌ حَسَنٌ', splitted: ['زَيْدٌ', 'وَلَدٌ', 'حَسَنٌ'], irab: {mubtada: 0, kabr: {nums: [1,2], mawsoof: 1, sifa: 2}}, connector: []},
              { arabic: 'بَابُ الْبَيْتِهِ', splitted: ['بَابُ', 'الْبَيْتِ', 'هِ'], irab: {mudaf: 0, mudaf_elayhi: {nums: [1,2], mudaf: 1, mudaf_elayhi: 2}}, connector: [1]}];
    }
    
    function randomArabic() {
      return getArabicArray()[getRandomNum(0, getArabicArray().length)];
    }

    function getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function join(arabic, nums) {
      var str = '';

      if(nums) {
        for(var i = 0; i < nums.length; i++) {
          if(arabic.connector.indexOf(nums[i]) >= 0) {
            str += arabic.splitted[nums[i]];
          }else{
            str += arabic.splitted[nums[i]] + ' ';
          }
        }
        return str.trim();
      }

      for(var i = 0; i < arabic.splitted.length; i++) {
        if(arabic.connector.indexOf(i) >= 0) {
          str += arabic.splitted[i];
        }else{
          str += arabic.splitted[i] + ' ';
        }
      }
      return str.trim();
    }

    function getWord(arabic, grammer, getAll) {
      var nums = arabic.irab;

      if(grammer instanceof Array) {
        for(var i = 0; i < grammer.length; i++) {
          nums = nums[grammer[i]];
        }
      }else{
        nums = arabic.irab[grammer];
      }

      if(typeof nums === 'object') { //the grammer takes up more then 1 word
        
        if(getAll) {
          return boldJoin(arabic, nums.nums);
        }

        return join(arabic, nums.nums);
      }

      if(getAll) {
        return boldJoin(arabic, nums);
      }

      return arabic.splitted[nums];
    }

    function boldJoin(arabic, nums) {
      var result = [];
      var resultIndexes = [];
      var str = '';
      var isAnswer = null;

      if(typeof nums === 'number') {
        var temp = nums;
        nums = [];
        nums.push(temp);
      }

      for(var i = 0; i < arabic.splitted.length; i++) {

        if(nums.indexOf(i) >= 0 && !isAnswer) {
          if(str.length > 0) {
            result.push(str);
          }
          str = '';
          isAnswer = true;
        }else if(nums.indexOf(i) == -1 && isAnswer) {
          if(str.length > 0) {
            result.push(str);
            resultIndexes.push(result.length - 1);
          }
          str = '';
          isAnswer = false;
        }

        if(arabic.connector.indexOf(i) >= 0) {
          str += arabic.splitted[i];
        }else{
          str += arabic.splitted[i] + ' ';
        }
      }
      if(str.length > 0) {
        result.push(str);
        if(isAnswer) {
          resultIndexes.push(result.length - 1);
        }
      }
      return {result : result, indexes : resultIndexes};
    }    

    return {
      getArabicArray : getArabicArray,
      getRandomArabic : randomArabic,
      join : join,
      getWord: getWord,
    };
  });
