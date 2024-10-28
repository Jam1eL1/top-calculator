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
let decimalInFirst = false;
let decimalInSecond = false;

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

        decimalInFirst = false;
        decimalInSecond = false;
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

function resetCalculator() {
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    displayValue = '';
    waitingForSecondOperand = false;
    decimalInFirst = false;
    decimalInSecond = false;
    updateDisplay(displayValue);
}

function deleteLastInput() {
    if (waitingForSecondOperand) {
        if (secondOperand.endsWith('.')) {
            decimalInSecond = false;
        }
        secondOperand = secondOperand.slice(0,-1);
        updateDisplay(secondOperand);
    } else {
        if (firstOperand && !currentOperator) {
            if (firstOperand.endsWith('.')) {
                decimalInFirst = false;
            }
            firstOperand = firstOperand.slice(0,-1);
            updateDisplay(firstOperand);
        } else {
            currentOperator = null;
        }
    }
}

function insertDecimal() {
    if (waitingForSecondOperand && !decimalInSecond) {
        secondOperand += '.';
        decimalInSecond = true;
        updateDisplay(secondOperand);
    } else if ( !waitingForSecondOperand && !decimalInFirst){
        firstOperand += '.';
        decimalInFirst = true;
        updateDisplay(firstOperand);
    }
}

function toggleSign() {
    if (waitingForSecondOperand) {
        if (!secondOperand) {
            displayValue = '-0';
            secondOperand += '-';
        } else {
            secondOperand = getToggledSign(secondOperand);
        }
        updateDisplay(secondOperand);

    } else if (firstOperand) {
        firstOperand = getToggledSign(firstOperand);
        updateDisplay(firstOperand);
    } else {
        displayValue = '-0';
        updateDisplay(displayValue);
        firstOperand += '-';
    }
}

function getToggledSign(operand) {
    if (!operand.startsWith('-')) {
        return '-' + operand;
    } else {
        return operand.slice(1);
    }
}

function handleButtonClick(event) {
    const buttonValue = event.target.innerText;
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
    } else if (buttonValue === '.') {
        insertDecimal();
    } else if (buttonValue === "+/-") {
        toggleSign();
    }
}


buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});