'use strict';

function inRange(min, max) {
    return function(number) {
        return number >= min && number <= max;
    }
}

let array = [0, 1, 1.5, 17, 9, 0.5];
let result = array.filter( inRange(1, 10) );