'use strict';

let calculator = (function() {
    let result = 0;
    return {
        add(x) {
            result += x;
        },

        substract(x) {
            result -= x;
        },
    
        multiply(x) {
            result *= x;
        },

        divide(x) {
            result /= x;
        },

        pow(x) {
            result **= x;
        },

        sqrt() {
            result = Math.sqrt(result);
        },

        cbrt() {
            result = Math.cbrt(result);
        },

        findRoot(x) {
            result = Math.pow(result, 1 / x);
        },

        findPercent(x) {
            result *= x * 0.01;
        },

        findReminder(x) {
            result %= x;
        },

        clear() {
            result = 0;
        },

        getResult() {
            return result;
        }
    };
})();


calculator.add(16);
calculator.findRoot(4);
console.log( calculator.getResult() );

calculator.clear();
calculator.add(27);
calculator.cbrt();
console.log( calculator.getResult() );

calculator.clear();
calculator.add(50);
calculator.findPercent(5);
console.log( calculator.getResult() );

calculator.clear();
calculator.add(50);
calculator.findReminder(4);
console.log( calculator.getResult() );