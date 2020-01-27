'use strict';

function solveEquation (a, b, c) {
    if (!a) {
        return [-c / b];
    } //Старший коэффициент должен быть отличен от нуля

    const D = b ** 2 - 4 * a * c;
    
    if (D < 0) {
        return [];
    } //Уравнение не имеет корней

    if (!D) {
        return [-b / 2 * a];
    }

    let x1 = ( -b + Math.sqrt(D) ) / 2 * a;
    let x2 = ( -b - Math.sqrt(D) ) / 2 * a;
    return [x1, x2];
}

console.log( solveEquation(1, 2, -3) );
console.log( solveEquation(1, 6, 9) );
console.log( solveEquation(1, 2, 17) );
console.log( solveEquation(0, 3, 15) );