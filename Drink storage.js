'use strict';

function HashStorageFunc() {
    let hash = {};
    this.addValue = function(key, value) {
        this.hash[key] = value;
    }

    this.getValue = function(key) {
        return this.hash[key];
    }

    this.deleteValue = function(key) {
        if (key in this.hash) {
            delete this.hash[key];
            return true;
        }
        return false;
    }

    this.getKeys = function() {
        return Object.keys(this.hash);
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
