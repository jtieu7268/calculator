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

let num1 = 0;
let num2, operator;

const display = document.querySelector(".calculator > .display > output");
display.value = num1;

const numberButtons = document.querySelectorAll(".calculator > .row > .number");
for (let button of numberButtons) {
    button.addEventListener('click', displayNumberPress);
}

const operatorButtons = document.querySelectorAll(".calculator > .row > .operator");
for (let button of operatorButtons) {
    button.addEventListener('click', displayOperatorPress);
}

const equalsButton = document.querySelector(".calculator > .row > .equals");
equalsButton.addEventListener('click', displayEvaluation);

function displayNumberPress (event) {
    let numberPressed = event.target.textContent;
    if (display.value === "0") {
        // replace display with entered number rather than leave a leading 0
        display.value = numberPressed;
    } else if (!(endsWithOperator(display.value) && numberPressed === "0")) {
        // prevent the display from adding a leading zero after an operator
        display.value += numberPressed;
    }
}

function displayOperatorPress (event) {
    if (endsWithOperator(display.value)) {
        if (operator !== event.target.textContent) {
            operator = event.target.textContent;
            display.value = display.value.slice(0,-1) + operator;
        }
    } else {
        if (containsOperator(display.value)) {
            num1 = evalExpressionStr(display.value);
            display.value = num1;
        } else {
            num1 = display.value;
            operator = event.target.textContent;
            display.value += operator;
        }
    }
}

function displayEvaluation () {
    if (containsOperator(display.value) && !endsWithOperator(display.value)) {
        num1 = evalExpressionStr(display.value);
        display.value = num1;
    }
}

function containsOperator (str) {
    return str.includes(ADD) 
    || (str.substring(1).includes(SUB))
    || str.includes(MUL) 
    || str.includes(DIV);
}

function endsWithOperator (str) {
    return str.endsWith(ADD) 
    || str.endsWith(SUB) 
    || str.endsWith(MUL) 
    || str.endsWith(DIV);
}

function evalExpressionStr (str) {
    console.log(str.split(operator));
    let [num1, num2] = str.split(operator);
    return operate(operator, num1, num2);
}
