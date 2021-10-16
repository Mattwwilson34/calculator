let displayValue = '';
let numArray = [];
let operator = '';
let opPressed = false;
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
    operator = '';
    opPressed = false;
};
const numPress = (btn) => {
    if (opPressed) {
        clearDisplay();
    }
    updateDisplay(btn);
    opPressed = false;
};

const opPress = (btn) => {
    switch (btn) {
        case '+':
            if (numArray > 0) {
                numArray.push(parseInt(displayValue));
                let result = operate(numArray[0], numArray[1], operator);
                clearArray(numArray);
                operator = 'add';
                numArray.push(result);
                clearDisplay();
                updateDisplay(result);
                opPressed = true;
                break;
            } else {
                numArray.push(parseInt(displayValue));
                operator = 'add';
                clearDisplay();
                break;
            }
        case 'AC':
            reset();
        default:
            break;
    }
};
const handleBtnClick = (e) => {
    const btn = e.target.textContent;
    if (parseInt(btn) || btn === '0' || btn === '.') {
        numPress(btn);
    } else {
        opPress(btn);
    }
};
const addBtnClickEvents = () => {
    const btns = document.querySelectorAll('button');
    btns.forEach((btn) => {
        btn.addEventListener('click', handleBtnClick);
    });
};

function main() {
    addBtnClickEvents();
}

main();
