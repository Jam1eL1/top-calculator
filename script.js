function add(a,b) {
    const first = a;
    const second = b;
    const operator = '+';
    let result = first + second;
    return result;
}

function subtract(a,b) {
    const first = a;
    const second = b;
    const operator = '-';
    let result = first - second;
    return result;
}

function multiply(a,b) {
    const first = a;
    const second = b;
    const operator = '*';
    let result = first * second;
    return result;
}

function divide(a,b) {
    const first = a;
    const second = b;
    const operator = '/';
    let result = first / second;
    return result;
}

function operate(first, second, operator) {
    switch (operator) {
        case '+':
            return add(first, second);
        case '-':
            return subtract(first, second);
        case '*':
            return multiply(first, second);
        case '/':
            return divide(first, second);
        default:
            throw new Error('Invalid operator');
    }
}