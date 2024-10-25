// A. Core calculation logic
const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
        if (b === 0) throw new Error('Cant divide by zero');
        return a / b;
        }
};

function operate(first, second, operator) {
    const operation = operations[operator];
    if (!operation) throw new Error('Invalid operator');
    return operation(first, second);
}

// B. User input logic
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let displayValue = '';
let waitingForSecondOperand = false;

const display = document.querySelector('.calc__display-input');
const buttons = document.querySelectorAll('.calc__buttons');


function updateDisplay() {

}
function handleButtonClick(event) {
    const buttonValue = event.target.innerText;
}


buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
})