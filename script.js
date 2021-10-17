let displayValue = '';
let numArray = [];
let operator = '';
let opPressed = false;
let decimalPressed = false;
let initialState = true;
let lastBtnPress = '';
const operators = {
    add: function (num1, num2) {
        return num1 + num2;
    },
    subtract: function (num1, num2) {
        return num1 - num2;
    },
    multiply: function (num1, num2) {
        return num1 * num2;
    },
    divide: function (num1, num2) {
        return num1 / num2;
    },
};
const operate = (num1, num2, operator) => operators[operator](num1, num2);
const storeNum = (number) => numArray.push(parseFloat(number));
const formatNum = (number) => {
    const maxNumSize = 999999999999999;
    const maxNumLength = 15;
    if (number > maxNumSize) {
        number = Number.parseFloat(number).toExponential(3);
    } else if (number < maxNumSize && number > 1) {
        number = Number(number);
    } else if (number < 1 && number.toString().length > maxNumLength) {
        number = Number.parseFloat(number).toExponential(3);
    } else if (number < 1 && number.toString().length < maxNumLength) {
        number = Number(number);
    }
    return number;
};
const convToPercent = () => {
    storeNum(displayValue);
    let result = numArray[0] / 100;
    clearArray(numArray);
    storeNum(result);
    clearDisplay();
    result = formatNum(result);
    updateDisplay(result);
};
const reverseNumSign = () => {
    storeNum(displayValue);
    let result = numArray[0] * -1;
    clearArray(numArray);
    storeNum(result);
    clearDisplay();
    result = formatNum(result);
    updateDisplay(result);
};
const replaceOp = (btn) => {
    switch (btn) {
        case '+':
            operator = 'add';
            break;
        case '-':
            operator = 'subtract';
            break;
        case '*':
            operator = 'multiply';
            break;
        case '/':
            operator = 'divide';
            break;
        default:
            break;
    }
};
const updateDisplay = (numStr) => {
    const display = document.querySelector('.display');
    displayValue += numStr;
    display.textContent = displayValue;
};
const clearDisplay = () => {
    const display = document.querySelector('.display');
    displayValue = '';
    display.textContent = displayValue;
};
const clearArray = (array) => {
    let length = array.length;
    while (length > 0) {
        array.shift();
        length--;
    }
};
const reset = () => {
    clearDisplay();
    clearArray(numArray);
    updateDisplay('0');
    operator = '';
    opPressed = false;
    decimalPressed = false;
    document.querySelector('.decimal-btn').disabled = false;
    initialState = true;
    lastBtnPress = '';
};
const handleOp = (opStr = '') => {
    if (lastBtnPress === 'equals') {
        operator = opStr;
        return;
    }
    if (numArray.length > 0) {
        storeNum(displayValue);
        let result = operate(numArray[0], numArray[1], operator);
        clearArray(numArray);
        operator = opStr;
        storeNum(result);
        clearDisplay();
        result = formatNum(result);
        updateDisplay(result);
    } else {
        storeNum(displayValue);
        operator = opStr;
        clearDisplay();
    }
    initialState = false;
};
const opPress = (btn) => {
    switch (btn) {
        case '+':
            handleOp('add');
            lastBtnPress = 'add';
            break;
        case '-':
            handleOp('subtract');
            lastBtnPress = 'subtract';
            break;
        case '*':
            handleOp('multiply');
            lastBtnPress = 'multiply';
            break;
        case '/':
            handleOp('divide');
            lastBtnPress = 'divide';
            break;
        case '=':
            handleOp();
            lastBtnPress = 'equals';
            break;
        default:
            break;
    }
    opPressed = true;
    decimalPressed = false;
    document.querySelector('.decimal-btn').disabled = false;
};
const numPress = (btn) => {
    if (opPressed || initialState) {
        clearDisplay();
    }
    if (btn === '.' && decimalPressed) {
        document.querySelector('.decimal-btn').disabled = true;
        return;
    } else if (btn === '.' && !decimalPressed) {
        decimalPressed = true;
    }
    updateDisplay(btn);
    opPressed = false;
    initialState = false;
    lastBtnPress = 'number';
};
const handleBtnClick = (e) => {
    console.log(numArray);
    console.log(operator);
    const btn = e.target.textContent;
    if (parseInt(btn) || btn === '0' || btn === '.') {
        numPress(btn);
    } else if (btn === 'AC') {
        reset();
    } else if (btn === '+/-') {
        reverseNumSign();
    } else if (btn === '%') {
        convToPercent();
    } else {
        if (lastBtnPress === 'number' || lastBtnPress === 'equals' || lastBtnPress === '') {
            opPress(btn);
        } else {
            replaceOp(btn);
            return;
        }
    }
};
const addBtnClickEvents = () => {
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
        btn.addEventListener('click', handleBtnClick);
    });
};
function main() {
    updateDisplay('0');
    addBtnClickEvents();
}

main();
