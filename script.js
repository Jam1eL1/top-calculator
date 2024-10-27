// A. Core calculation logic
const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
        if (b === 0) {
            updateDisplay('infinity');
            throw new Error('Cant divide by zero');
        };
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
const buttons = document.querySelectorAll('.calc__button');

function updateDisplay(value) {
    display.value = value;
}

function handleNumberInput(number) {
    if (waitingForSecondOperand) {
        secondOperand += number;
    } else {
        firstOperand += number;
    }
    const displayContent = waitingForSecondOperand ? secondOperand : firstOperand;
    updateDisplay(displayContent);
}

function handleEquals() {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);

    if (!isNaN(num1) && !isNaN(num2)) {
        const result = operate(num1, num2, currentOperator);
        displayValue = result.toString();
        updateDisplay(displayValue);

        firstOperand = result.toString();
        secondOperand = '';
        currentOperator = null;
        waitingForSecondOperand = false;
    } else {
        console.log('Both operands are required for calculation.');
    }
}

function handleOperatorInput(operator) {
    if (firstOperand && secondOperand && currentOperator) {
        handleEquals(); 
    }
    currentOperator = operator;
    waitingForSecondOperand = true;
}

function handleButtonClick(event) {
    const buttonValue = event.target.innerText;
    // displayValue += buttonValue;
    // updateDisplay(displayValue);
    
    if (!isNaN(buttonValue)) {
        handleNumberInput(buttonValue);
    } else if (buttonValue in operations) {
        handleOperatorInput(buttonValue);
    } else if (buttonValue === "=") {
        handleEquals();
    } else if (buttonValue === "AC") {
        resetCalculator();
    } else if (buttonValue === "DEL") {
        deleteLastInput();
    }
};


buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});