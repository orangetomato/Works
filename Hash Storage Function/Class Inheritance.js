'use strict';

class HashStorageFunc {
    constructor() {
        this._hash = {};
    }

    addValue(key, value) {
        this._hash[key] = value;
    }

    getValue(key) {
        return this._hash[key];
    }

    deleteValue(key) {
        if (key in this._hash) {
            delete this._hash[key];
            return true;
        }
        return false;
    }

    getKeys() {
        return Object.keys(this._hash);
    }
}


class ClassA extends HashStorageFunc {
    constructor(options) {
        super();
        this.name = options.name;
    }

    addValue(key, value) {
        super.addValue(key, value);
        this.latestAddition = new Date();
    }

    getAllValues() {
        return Object.values(this._hash);
    }
}

class ClassB extends HashStorageFunc {
    constructor(options) {
        super();
        this.name = options.name;
    }

    deleteValue(key) {
        if (super.deleteValue(key)) {
            this.latestDeletion = new Date();
            return true;
        }
        return false;
    }
        
    clearHash() {
        this._hash = {};
        this.latestDeletion = new Date();
    }
}


let drinkStorage = new ClassA({name: 'Fridge'});

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
console.log(drinkStorage.name);


// let drinkStorage = new ClassB({name: 'Fridge'});

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
// console.log(drinkStorage.name);