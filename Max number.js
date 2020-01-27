'use strict';

function findMaxNumber(arr) {
    let maxNumber = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxNumber) {
            maxNumber = arr[i];
        }
    }
    return maxNumber;
}

console.log( findMaxNumber([1, 2, 3]) );
console.log( findMaxNumber([-1, -2, -3]) );

////////////////////////////////////////////

function findMaxNumber2(...args) {
    let maxNumber2 = args[0];
    for (let i = 1; i < args.length; i++) {
        if (args[i] > maxNumber2) {
            maxNumber2 = args[i];
        }
    }
    return maxNumber2;
}

console.log( findMaxNumber2(1, 2, 3) );
console.log( findMaxNumber2(-1, -2, -3) );