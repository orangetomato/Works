'use strict';

function HashStorageFunc() {
    let hash = {};
    this.addValue = function(key, value) {
        hash[key] = value;
    }

    this.getValue = function(key) {
        return hash[key];
    }

    this.deleteValue = function(key) {
        if (key in hash) {
            delete hash[key];
            return true;
        }
        return false;
    }

    this.getKeys = function() {
        return Object.keys(hash);
    }
}

let drinkStorage = new HashStorageFunc();

console.log(drinkStorage);
drinkStorage.addValue('milk', 'non-alc');
drinkStorage.addValue('orange juice', 'non-alc');
drinkStorage.addValue('wine', 'alc');
drinkStorage.addValue('mineral water', 'non-alc');
drinkStorage.addValue('coke', 'non-alc');
console.log(drinkStorage);
console.log( drinkStorage.getValue('coke') );
console.log( drinkStorage.deleteValue('coke') );
console.log( drinkStorage.deleteValue('coke') );
console.log( drinkStorage.getKeys() );