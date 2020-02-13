'use strict';

function HashStorageFunc() {
    this._hash = {};
    this.addValue = function(key, value) {
        this._hash[key] = value;
    }

    this.getValue = function(key) {
        return this._hash[key];
    }

    this.deleteValue = function(key) {
        if (key in this._hash) {
            return delete this._hash[key];
        }
        return false;
    }

    this.getKeys = function() {
        return Object.keys(this._hash);
    }
}

function ClassA() {
    HashStorageFunc.call(this);

    let parentAddValue = this.addValue;
    this.addValue = function(key, ...args) { //overridden: the unlimited number of params can be received
        parentAddValue.call(this, key, args);
    }

    this.getAllValues = function() {
        return Object.values(this._hash);
    }

    this.getEntries = function() {
        return Object.entries(this._hash);
    }
}

function ClassB() {
    HashStorageFunc.call(this);

    let parentAddValue = this.addValue;
    this.addValue = function(key, value) { //overridden: the latest addition date is recorded
        parentAddValue.call(this, key, value);
        this.latestAddition = new Date();
    }
    
    this.getKeysNumber = function() {
        return Object.keys(this._hash).length;
    }

    this.clearHash = function() {
        this._hash = {};
    }
}

let drinkStorage = new ClassA();

drinkStorage.addValue('milk', 'non-alc', 'non-sparkling');
drinkStorage.addValue('mineral water', 'non-alc', 'sparkling');
drinkStorage.addValue('wine', 'alc', 'non-sparkling');
drinkStorage.addValue('orange juice', 'non-alc', 'non-sparkling');
drinkStorage.addValue('coke', 'non-alc', 'sparkling');

console.log( drinkStorage.getValue('coke') );
console.log( drinkStorage.deleteValue('coke') );
console.log( drinkStorage.deleteValue('coke') );
console.log( drinkStorage.getKeys() );

console.log( drinkStorage.getAllValues() );
console.log( drinkStorage.getEntries() );
console.log(drinkStorage);


// let drinkStorage = new ClassB();

// drinkStorage.addValue('milk', 'non-alc');
// drinkStorage.addValue('mineral water', 'non-alc');
// drinkStorage.addValue('wine', 'alc');
// drinkStorage.addValue('orange juice', 'non-alc');
// drinkStorage.addValue('coke', 'non-alc');

// console.log( drinkStorage.getValue('coke') );
// console.log( drinkStorage.deleteValue('coke') );
// console.log( drinkStorage.deleteValue('coke') );
// console.log( drinkStorage.getKeys() );

// console.log(drinkStorage.latestAddition);
// console.log( drinkStorage.getKeysNumber() );
// drinkStorage.clearHash();
// console.log(drinkStorage);