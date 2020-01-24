'use strict';

let result = [];
let string = '';
function solveEquation (a, b, c) {
    if (!a) {
        string += 'Старший коэффициент должен быть отличен от нуля';
        return;
    }
    let d = b ** 2 - 4 * a * c;
    if (d < 0) {
        string += 'Уравнение не имеет корней';
        return;
    }
    let x1 = ( -b + Math.sqrt(d) ) / 2 * a;
    let x2 = ( -b - Math.sqrt(d) ) / 2 * a;
    if (x1 === x2) {
        string += x1.toString();
        result.push(x1);
        return;
    }
    string += x1.toString() + ', ' + x2.toString();
    result.push(x1, x2);
}

solveEquation(1, 2, -3);
//solveEquation(1, 6, 9);
//solveEquation(1, 2, 17);
//solveEquation(0, 3, 15);

console.log(string);
console.log(result);