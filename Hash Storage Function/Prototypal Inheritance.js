'use strict';

function HashStorageFunc() {
    this._hash = {};
}

HashStorageFunc.prototype.addValue = function(key, value) {
    this._hash[key] = value;
}

HashStorageFunc.prototype.getValue = function(key) {
    return this._hash[key];
}

HashStorageFunc.prototype.deleteValue = function(key) {
    if (key in this._hash) {
        return delete this._hash[key];
    }
    return false;
}

HashStorageFunc.prototype.getKeys = function() {
    return Object.keys(this._hash);
}


function ClassA() {
    HashStorageFunc.apply(this, arguments);
}

ClassA.prototype = Object.create(HashStorageFunc.prototype);
ClassA.prototype.constructor = ClassA;

ClassA.prototype.addValue = function() {
    HashStorageFunc.prototype.addValue.apply(this, arguments);
    this.latestAddition = new Date();
}

ClassA.prototype.getAllValues = function() {
    return Object.values(this._hash);
}


function ClassB() {
    HashStorageFunc.apply(this, arguments);
}

ClassB.prototype = Object.create(HashStorageFunc.prototype);
ClassB.prototype.constructor = ClassB;

ClassB.prototype.deleteValue = function() {
    if (HashStorageFunc.prototype.deleteValue.apply(this, arguments)) {
        this.latestDeletion = new Date();
        return true;
    }
    return false;
}

ClassB.prototype.clearHash = function() {
    this._hash = {};
    this.latestDeletion = new Date();
}

let drinkStorage = new ClassA();

drinkStorage.addValue('milk', 'non-alc');
drinkStorage.addValue('mineral water', 'non-alc');
drinkStorage.addValue('wine', 'alc');
drinkStorage.addValue('orange juice', 'non-alc');
drinkStorage.addValue('coke', 'non-alc');

console.log( drinkStorage.getValue('coke') );
console.log( drinkStorage.deleteValue('coke') );
console.log( drinkStorage.deleteValue('coke') );
console.log( drinkStorage.getKeys() );

console.log(drinkStorage.latestAddition);
console.log( drinkStorage.getAllValues() );
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

// console.log(drinkStorage.latestDeletion);
// drinkStorage.clearHash();
// console.log(drinkStorage);