'use strict';

let arr = ['1', '15'];

let result = arr.map(function(number) {
    return parseInt(number, 10);
});

console.log(result);