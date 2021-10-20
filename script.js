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
const resetFontSize = () => (document.querySelector('.display').style.fontSize = '64px');
const checkDivisionByZero = () => {
    if (operator === 'divide' && displayValue === '0') {
        alert('Cannot divide by 0 calculator has been reset');
        reset();
        return true;
    } else {
        return false;
    }
};
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
const formatDisplay = () => {
    const display = document.querySelector('.display');
    console.log(displayValue.length);
    if (displayValue.length > 18) {
        display.style.fontSize = '50px';
    }
    if (displayValue.length > 23) {
        display.style.fontSize = '40px';
    }
    if (displayValue.length > 29) {
        display.style.fontSize = '30px';
    }
    if (displayValue.length > 39) {
        display.style.fontSize = '20px';
    }
    if (displayValue.length > 59) {
        alert('You have exceeded calculators max capacity and it has been reset');
        reset();
    }
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
    formatDisplay(numStr);
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
    document.querySelector('.ac-btn').blur();
    operator = '';
    opPressed = false;
    decimalPressed = false;
    document.querySelector('.decimal-btn').disabled = false;
    resetFontSize();
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
        // clearDisplay();
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
            if (numArray.length < 1) {
                break;
            } else if (checkDivisionByZero()) {
                break;
            } else {
                handleOp();
                resetFontSize();
                lastBtnPress = 'equals';
                break;
            }

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
        resetFontSize();
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
const clickAndFocus = (element) => {
    element.click();
};
const handleKeypress = (e) => {
    const keyPressed = e.key;
    switch (keyPressed) {
        case 'c':
            const acBtn = document.querySelector('.ac-btn');
            clickAndFocus(acBtn);
            break;
        case '%':
            const percentBtn = document.querySelector('.percent-btn');
            clickAndFocus(percentBtn);
            break;
        case '/':
            const divideBtn = document.querySelector('.divide-btn');
            clickAndFocus(divideBtn);
            break;
        case '*':
            const multiplyBtn = document.querySelector('.multiply-btn');
            clickAndFocus(multiplyBtn);
            break;
        case '-':
            const subtractBtn = document.querySelector('.subtract-btn');
            clickAndFocus(subtractBtn);
            break;
        case '+':
            const addBtn = document.querySelector('.addition-btn');
            clickAndFocus(addBtn);
            break;
        case 'Enter':
            const equalsBtn = document.querySelector('.equals-btn');
            clickAndFocus(equalsBtn);
            break;
        case '9':
            const nineBtn = document.querySelector('.nine-btn');
            clickAndFocus(nineBtn);
            break;
        case '8':
            const eightBtn = document.querySelector('.eight-btn');
            clickAndFocus(eightBtn);
            break;
        case '7':
            const sevenBtn = document.querySelector('.seven-btn');
            clickAndFocus(sevenBtn);
            break;
        case '6':
            const sixBtn = document.querySelector('.six-btn');
            clickAndFocus(sixBtn);
            break;
        case '5':
            const fiveBtn = document.querySelector('.five-btn');
            clickAndFocus(fiveBtn);
            break;
        case '4':
            const fourBtn = document.querySelector('.four-btn');
            clickAndFocus(fourBtn);
            break;
        case '3':
            const threeBtn = document.querySelector('.three-btn');
            clickAndFocus(threeBtn);
            break;
        case '2':
            const twoBtn = document.querySelector('.two-btn');
            clickAndFocus(twoBtn);
            break;
        case '1':
            const oneBtn = document.querySelector('.one-btn');
            clickAndFocus(oneBtn);
            break;
        case '0':
            const zeroBtn = document.querySelector('.zero-btn');
            clickAndFocus(zeroBtn);
            break;
        case '.':
            const decimalBtn = document.querySelector('.decimal-btn');
            clickAndFocus(decimalBtn);
            break;
        default:
            break;
    }
};
const addKeypressEvents = () => {
    const body = document.querySelector('body');
    body.addEventListener('keyup', handleKeypress);
};
function main() {
    updateDisplay('0');
    addBtnClickEvents();
    addKeypressEvents();
}

main();
