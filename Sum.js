'use strict';

let numbersArray = [ 5, 7, [ 4, [2], 8, [1, 3], 2 ], [ 9, [] ], 1, 8 ];

function getSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if ( Array.isArray(arr[i]) ) {
      sum += getSum(arr[i]);
    } else {
      sum += arr[i];
    }
  }
  return sum;
}

console.log( getSum(numbersArray) );