const seperateButtons = () => {
    const calcBtns = document.querySelectorAll('.calc-btn');
    const calcBtnsArray = [...calcBtns];
    /// Filters non-number/decimal elements into array for ease of use later in prgram
    const numberBtns = calcBtnsArray.filter((btn) => {
        const btnValue = parseInt(btn.innerText);
        if (!isNaN(btnValue)) {
            return btn;
        } else if (btn.innerText === '.') {
            return btn;
        }
    });
    /// Filters non-number/decimal elements into array for ease of use later in prgram
    const operatorBtns = calcBtnsArray.filter((btn) => {
        const btnValue = parseInt(btn.innerText);
        if (btn.innerText === '.') {
            return;
        } else if (isNaN(btnValue)) {
            return btn;
        }
    });
    const btns = {
        numberBtns,
        operatorBtns,
    };
    return btns;
};
const getNumberFromDisplay = () => {
    let calcDisplayVal = document.querySelector('.display').innerText;
    return calcDisplayVal;
};
const updateDisplay = (calcDisplayVal) => {
    const display = document.querySelector('.display');
    display.innerText = calcDisplayVal;
};
const updateDisplayPlaceholder = (str) => {
    const display = document.querySelector('.display');
    display.dataset.text = str;
};
const clearDisplay = (arithmeticArray) => {
    const display = document.querySelector('.display');
    display.dataset.text = '0';
    display.innerText = '';
};
const clearData = (arithmeticArray) => {
    removeArrayElements(arithmeticArray.length, arithmeticArray);
    clearDisplay();
    console.log(arithmeticArray);
};
const convertToPercent = () => {
    const displayValue = getNumberFromDisplay();
    const percent = displayValue / 100;
    updateDisplay(percent);
};
const receiveNumberBtnPress = (numberBtns) => {
    numberBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let calcDisplayVal = document.querySelector('.display').innerText;
            const btnPressed = e.target.innerText;
            calcDisplayVal += btnPressed;
            updateDisplay(calcDisplayVal);
        });
    });
};
const addNumToArithmeticArray = (arithmeticArray) => {
    let calcDisplayValue = getNumberFromDisplay();
    arithmeticArray.push(parseInt(calcDisplayValue));
};
const addOperatorToArithmeticArray = (arithmeticArray, operator) => {
    arithmeticArray.push(operator);
};
const removeArrayElements = (number, array) => {
    while (number > 0) {
        array.shift();
        number--;
    }
    return array;
};
const operate = (array) => {
    let operators = {
        '/': function (a, b) {
            return a / b;
        },
        '*': function (a, b) {
            return a * b;
        },
        '-': function (a, b) {
            return a - b;
        },
        '+': function (a, b) {
            return a + b;
        },
    };
    const calculation = operators[array[1]](array[0], array[2]);
    return calculation;
};
const performArithmetic = (arithmeticArray) => {
    let calculation = 0;
    calculation = operate(arithmeticArray);
    updateDisplay(calculation);
    arithmeticArray = removeArrayElements(3, arithmeticArray);
};

const multiOperatorArithmetic = (arithmeticArray) => {
    let calculation = 0;
    calculation = operate(arithmeticArray);
    updateDisplay(calculation);
    console.log(arithmeticArray);
    arithmeticArray = removeArrayElements(3, arithmeticArray);
    console.log(arithmeticArray);
    arithmeticArray.unshift(calculation);
    updateDisplayPlaceholder(calculation);
};

const receiveOperatorBtnPress = (operatorBtns) => {
    let arithmeticArray = [];
    operatorBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const operator = e.target.innerText;
            switch (operator) {
                case '=':
                    addNumToArithmeticArray(arithmeticArray);
                    performArithmetic(arithmeticArray);
                    break;
                case 'AC':
                    clearData(arithmeticArray);
                    break;
                case '%':
                    convertToPercent();
                    break;
                default:
                    const length = arithmeticArray.length;
                    if (arithmeticArray.length > 1) {
                        addNumToArithmeticArray(arithmeticArray);
                        addOperatorToArithmeticArray(arithmeticArray, operator);
                        multiOperatorArithmetic(arithmeticArray);
                        break;
                    }
                    addNumToArithmeticArray(arithmeticArray);
                    clearDisplay();
                    addOperatorToArithmeticArray(arithmeticArray, operator);
                    console.log(arithmeticArray);
                    updateDisplayPlaceholder(arithmeticArray[0]);
                    break;
            }
        });
    });
};

const main = () => {
    const btns = seperateButtons();
    receiveNumberBtnPress(btns.numberBtns);
    receiveOperatorBtnPress(btns.operatorBtns);
};

main();

///Sudo Code

/// Store and display numbers as they are pressed
/// Once an operator is pressed store the currently displayed number in an array
/// Store the pressed operator in a seperate array or the same array as the number
/// Leave currently displayed number displayed until the next number is pressed then clear it
/// If a second operator is pressed before a number is pressed replace last operator with new operator
/// continue storing numbers and operators until the equals, clear, percent, and memory button is pressed
/// Use array or array to compute final vale and display for user
/// Extend usage to include decimals

/// Optional
/// Add a focus to the most recent button pressed
/// Add keyboard functionality
