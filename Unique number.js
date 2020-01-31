'use strict';

function findUniqueNumber(arr) {
    let result = [];
    for (let number of arr) {
        if ( !result.includes(number) ) {
            result.push(number);
        }
    }
    return result;
}

console.log(findUniqueNumber([1, 1, 2, 0, 2]));

/////////////////////////////////////////////////

function findUniqueNumber2(arr) {
    let result = [];
    let filter = {};
    for (let i = 0; i < arr.length; i++) {
        filter[arr[i]] = '';
    }
    for (let key in filter) {
        result[result.length] = Number(key);
    }
    return result;
}

console.log(findUniqueNumber2([1, 1, 2, 0, 2]));

/////////////////////////////////////////////////

function findUniqueNumber3(arr) {
    return Array.from(new Set(arr));
}

console.log(findUniqueNumber3([1, 1, 2, 0, 2]));