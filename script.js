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

const receiveNumberBtnPress = (numberBtns, calcDisplayValue) => {
    numberBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const btnPressed = e.target.innerText;
            calcDisplayValue += btnPressed;
            console.log(calcDisplayValue);
        });
    });
};

const main = () => {
    /// seperate calculator buttons to reduce need to select button elements within functions
    const btns = seperateButtons();
    const calcDisplayValue = '';
    receiveNumberBtnPress(btns.numberBtns, calcDisplayValue);
};

main();
