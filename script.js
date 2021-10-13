//! Attempting to add clear functionality to calculator disaply, but having trouble
//! because after pressing the clear button and then pressing a number button
//! the number prior to clear being pressed is displayed + new number button

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

const main = () => {
    /// seperate calculator buttons to reduce need to select button elements within functions
    const btns = seperateButtons();
    receiveNumberBtnPress(btns.numberBtns);
    clearData();
};

main();
