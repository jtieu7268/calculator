const ADD = '+';
const SUB = '-';
const MUL = '*';
const DIV = '/';

function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

let num1, num2, operator;

function operate (operator_str, num1, num2) {
    let operator_fun;
    switch (operator_str) {
        case ADD: 
            operator_fun = add;
            break;
        case SUB:
            operator_fun = subtract;
            break;
        case MUL:
            operator_fun = multiply;
            break;
        case DIV:
            operator_fun = divide;
            break;
    }
    return operator_fun(Number(num1), Number(num2));
}

console.log(operate('+', 0, 0));
console.log(operate('+', 1, 16));
console.log(operate('+', -3, 4));

console.log(operate('-', 0, 0));
console.log(operate('-', 1, 16));
console.log(operate('-', -3, 4));

console.log(operate('*', 0, 4));
console.log(operate('*', 39, 45));
console.log(operate('*', -5, 4));
console.log(operate('*', -5, -4));

console.log(operate('/', 1, 4));
console.log(operate('/', 43, 7));
console.log(operate('/', 500, -100));
