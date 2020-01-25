'use strict';

function findMaxNumber(arr) {
    let maxNumber = arr[0];
    for (let i = 1; i < arr.length; i++) {
        let currentNumber = arr[i];
        if (currentNumber > maxNumber) {
            maxNumber = currentNumber;
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
        let currentNumber2 = args[i];
        if (currentNumber2 > maxNumber2) {
            maxNumber2 = currentNumber2;
        }
    }
    return maxNumber2;
}

console.log( findMaxNumber2(1, 2, 3) );
console.log( findMaxNumber2(-1, -2, -3) );