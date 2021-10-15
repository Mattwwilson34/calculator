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

const updateDisplay = (calcDisplayVal) => {
    const display = document.querySelector('.display');
    display.innerText = calcDisplayVal;
};

const clearData = () => {
    const clearBtn = document.querySelector('.ac-btn');
    clearBtn.addEventListener('click', (e) => {
        let calcDisplayVal = document.querySelector('.display').innerText;
        calcDisplayVal = '';
        updateDisplay(calcDisplayVal);
    });
};

/// stores number button clicks as string for calculations
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

const receiveOperatorBtnPress = (operatorBtns) => {
    operatorBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const btnPressed = e.target;
            const btnClass = btnPressed.classList[1];
            switch (btnClass) {
                case 'divide-btn':
                    console.log('division');
                    break;
                case 'multiply-btn':
                    console.log('multiply');
                    break;
                case 'subtract-btn':
                    console.log('subtract');
                    break;
                case 'addition-btn':
                    console.log('addition');
                    break;
                case 'equals-btn':
                    console.log('equals');
                    break;
                case 'percent-btn':
                    console.log('percent');
                    break;
                case 'memory-btn':
                    console.log('memory');
                    break;

                default:
                    break;
            }
        });
    });
};

const main = () => {
    /// seperate calculator buttons to reduce need to select button elements within functions
    const btns = seperateButtons();
    receiveNumberBtnPress(btns.numberBtns);
    receiveOperatorBtnPress(btns.operatorBtns);
    clearData();
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
