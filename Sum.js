'use strict';

let numbersArray = [ 5, 7,
  [ 4, [2], 8, [1,3], 2 ],
  [ 9, [] ],
  1, 8
]

let sum = 0;
function getSum(arr) {
  for (let i = 0; i < arr.length; i++) {
    if ( Array.isArray(arr[i]) ) {
      getSum(arr[i]);
    } else {
      sum += arr[i];
    }
  }
  return sum;
}

console.log( getSum(numbersArray) );