'use strict';

let array = [0, 1, 1.5, 17, 9, 0.5];

function inRange(min, max, arr) {
    return arr.filter(function(number) {
        if (number >= min && number <= max) {
            return number;
        }
    });
}

console.log( inRange(1, 10, array) );

/////////////////////////////////////////////////////

Array.prototype.filterInRange = function(min, max) {
    return this.filter(function(number) {
        if (number >= min && number <= max) {
            return number;
        }
    });
}

console.log( array.filterInRange(1, 10) );