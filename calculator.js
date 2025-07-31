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

let operator, num1, num2;
/* isNumResult:
    used to determine whether to append pressed number to num1 or replace num1 with pressed number. 
    this allows user to press a new digit to clear a result and start a new calculation.
    if user wants to use result further, they can proceed by selecting an operator after the result.
*/
let isNum1Result = true;
const display = document.querySelector(".calculator > .display > output");
reset();

const numberButtons = document.querySelectorAll(".calculator > .row > .number");
for (let button of numberButtons) {
    button.addEventListener('click', (event) => {
        let numberPressed = event.target.textContent;
        if (operator === null) {
            // replace display with entered number rather than leave a leading 0
            num1 = isNum1Result ? numberPressed : num1 + numberPressed;
            display.value = num1;
            isNum1Result = false;
        } else {
            // prevent the display from adding a leading zero after an operator
            num2 = num2 === null ? numberPressed : num2 + numberPressed;
            display.value = num2;
        }
    });
}

const operatorButtons = document.querySelectorAll(".calculator > .row > .operator");
for (let button of operatorButtons) {
    button.addEventListener('click', (event) => {
        let operatorPressed = event.target.textContent;
        if (operator !== null && num2 !== null) {
            num1 = operate(operator, num1, num2);
            num2 = null;
            display.value = num1;
        } 
        operator = operatorPressed;
    }
    );
}

const equalsButton = document.querySelector(".calculator > .row > .equals");
equalsButton.addEventListener('click', () => {
    if (operator !== null && num2 !== null) {
        num1 = operate(operator, num1, num2);
        num2 = null;
        operator = null;
        display.value = num1;
        isNum1Result = true;
    }
});

const clearButton = document.querySelector(".calculator > .row > .clear");
clearButton.addEventListener('click', reset);

function reset () {
    num1 = "0";
    operator = null;
    num2 = null;
    display.value = num1;
}
