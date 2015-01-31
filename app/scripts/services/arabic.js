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
      return [{ arabic: 'دَرَبْتُ زَيْدََ', splitted: ['دَرَبْ', 'تُ', 'زَيْدََ'], irab: {fil: 0, fial: 1, 'mafoo bihi': 2}, connector: [0]},
              { arabic: 'دَرَبَ زَيْدََ امرٌ', splitted: ['دَرَبَ', 'زَيْدََ', 'امرٌ'], irab: {fil: 0, fial: 2, 'mafoo bihi': 1}, connector: []},
              { arabic: 'زَيْدٌ وَلَدٌ حَسَنٌ', splitted: ['زَيْدٌ', 'وَلَدٌ', 'حَسَنٌ'], irab: {mubtada: 0, kabr: {nums: [1,2], mawsoof: 1, sifa: 2}}, connector: []},
              { arabic: 'بَابُ الْبَيْتِهِ', splitted: ['بَابُ', 'الْبَيْتِ', 'هِ'], irab: {mudaf: 0, 'mudaf elayhi': {nums: [1,2], mudaf: 1, 'mudaf elayhi': 2}}, connector: [1]}];
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
          console.log(nums);
          console.log(grammer);
          console.log(grammer[i]);
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

    function checkAnswer(arabic, answer) {
      var ans;
      var ans2;
      var text;
      var result = true;

      for(var grammar in arabic.irab) {
        ans = getWord(arabic, grammar);

        if(answer[grammar] === undefined) {
          result = false;
          continue; //skips all nested checks because top layer does not exist
        }else if(ans !== answer[grammar].text.trim()) {
          result = false;
          answer[grammar]['correct'] = false;
        }else{
          answer[grammar]['correct'] = true;
        }

        for(var grammar2 in arabic.irab[grammar]) {
          if(grammar2 !== 'nums') {
            ans2 = getWord(arabic, [grammar, grammar2]);

            if(answer[grammar][grammar2] === undefined) {
              result = false;
            }else if(ans2 !== answer[grammar][grammar2].text.trim()) {
              result = false;
              answer[grammar][grammar2]['correct'] = false;
            }else{
              answer[grammar][grammar2]['correct'] = true;
            }
          }
        }       
      }
      return result;
    }

    function createExercise(arabic) {
      arabic.splitted = arabic.splitted.split(' ');
      arabic.splitted = arabic.splitted.slice().reverse();
      // return arabic.splitted;
    }

    return {
      getArabicArray : getArabicArray,
      getRandomArabic : randomArabic,
      join : join,
      getWord: getWord,
      checkAnswer: checkAnswer,
      createExercise: createExercise,
    };
  });
