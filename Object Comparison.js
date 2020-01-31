'use strict';

function compareObjects(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

let obj = {y: 'hey', z: {x: 1}};
let obj2 = {y: 'hey', z: {x: 1}};

console.log( compareObjects(obj, obj2) );

////////////////////////////////////////////////////////////

function compareObjects2(a, b) {
    if (a === b) {
        return true;
    }
    if (a === null || typeof(a) !== 'object' ||
        b === null || typeof(b) !== 'object') {
        return false;
    }
    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }
    for (let key in a) {
        if (!compareObjects2(a[key], b[key])) {
            return false;
        }
    }
    return true;
}

let obj3 = {z: {x: 1}, y: 'hey'};
let obj4 = {y: 'hey', z: {x: 1}};

console.log( compareObjects2(obj3, obj4) );