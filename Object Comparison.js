'use strict';

function compareObjects(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

let obj = {y: 'hey', z: {x: 1}};
let obj2 = {y: 'hey', z: {x: 1}};

console.log( compareObjects(obj, obj2) );

////////////////////////////////////////////////////////////

function compareObjects2(a, b) {
    if (isNaN(a) && isNaN(b) && typeof a === 'number' && typeof b === 'number') {
        return true;
    }
    if (a === b) {
        return true;
    }
    if (typeof a === 'function' || typeof b === 'function') {
        return a.toString() === b.toString();
    }
    if (!(a instanceof Object || b instanceof Object)) {
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

let obj3 = {z: ()=>0, y: 'hey', x: NaN, w: null, v: {u: 1}};
let obj4 = {y: 'hey', z: ()=>0, v: {u: 1}, w: null, x: NaN};

console.log( compareObjects2(obj3, obj4) );