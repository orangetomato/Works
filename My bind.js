'use strict';

let showInfo = function(job, salary) {
    console.log(this.name, this.age, job, salary);
}

let person = {
    name: 'Vasya',
    age: 20
};

function myBind(func, cont, ...args) {
    return function(...rest) {
        return func.apply(cont, [...args, ...rest]);
    }
}

let showPersonInfo = showInfo.bind(person, 'Frontend', 1000);
console.log( showPersonInfo() );

let showPersonInfo2 = myBind(showInfo, person, 'Frontend', 1000);
console.log( showPersonInfo2() );