let bigScreen = '', smallScreen = '', history = '', inputArray = '';
let typeOfOperation, result, realResult, eraseScreen;
let resultDeployed = false, aNumber = false, firstPartOver = false, otherNumberEntered = false, secondOperator = false;
let firstPart = false, secondPart = false, numpi = false, specialButtonsLock = false, dot = false;

// Execute special operations, such as logarithm, factorial and summation.
function specialOperation(type) {
    beforeResult();
    let specialResult;
    switch (type) {
        case 'unoSobre': 
            smallScreen.innerText += `1/(${bigScreen.innerText})`;
            specialResult = (1/(Number.parseFloat(inputArray)));
            break;
        case 'exponente2':
            smallScreen.innerText += `sqr(${bigScreen.innerText})`;
            specialResult = Math.pow(Number.parseFloat(inputArray), 2);
            break;
        case 'raiz2':
            smallScreen.innerText += `√(${bigScreen.innerText})`;
            specialResult = Math.sqrt(Number.parseFloat(inputArray));
            break;
        case 'ln':
            smallScreen.innerText += `ln(${bigScreen.innerText})`;
            specialResult = Math.log(Number.parseFloat(inputArray));
            break;
        case 'euler':
            smallScreen.innerText += `e(${bigScreen.innerText})`;
            specialResult = Math.exp(Number.parseFloat(inputArray));
            break;
        case 'exponente3':
            smallScreen.innerText += `cube(${bigScreen.innerText})`;
            specialResult = Math.pow(Number.parseFloat(inputArray), 3);
            break;
        case 'log':
            smallScreen.innerText += `log(${bigScreen.innerText})`;
            const logResult = (x, y) => {
                return Math.log(y) / Math.log(x);
            }
            specialResult = logResult(10, Number.parseFloat(inputArray));
            break;
        case 'factorial':
            smallScreen.innerText += `fact(${bigScreen.innerText})`;
            specialResult = Number.parseFloat(inputArray);

            if (inputArray !== '' && !isNaN(inputArray)) {
                if (Number.isInteger(specialResult) && specialResult >= 0 && specialResult <= 100000) {
                    const factResult = value => {
                        let acum = 1;
                        for (let i = 1; i <= value; i++) {
                            acum*=i;
                        }
                        return acum;
                    }
                    specialResult = factResult(specialResult);
                }
                else if (specialResult > 100001) {
                    specialResult = 'Infinity';
                }
                else {
                    specialResult = 'Not a valid number';
                }
            }
            break;
        case 'factorialSuma':
            smallScreen.innerText += `Σ(${bigScreen.innerText})`;
            specialResult = Number.parseFloat(inputArray);

            if (inputArray !== '' && !isNaN(inputArray)) {
                if (Number.isInteger(specialResult) && inputArray < 100000000) {
                    const summResult = value => {
                        let acum = 0;
                        for (let i = 1; i <= Math.abs(value); i++) {
                            acum+=i;
                        }
                        return value < 0 ? acum*-1 : acum;
                    }
                    specialResult = summResult(Number.parseFloat(inputArray));
                } else if (specialResult > 100001) {
                    specialResult = 'Infinity';
                }
                else {
                    specialResult = 'Not a valid number';
                }
            }
            break;
    }
    countDecimals(true, specialResult);
    if (inputArray === '' || isNaN(inputArray)) {
        countDecimals(true, NaN);
    }
    afterResult();
}

// Check if the result decimals should be limited with toExponential() or toFixed()
function countDecimals(type, value){
    realResult = '';
    const decimals = value.toString().split('.');
    if (decimals[1] !== undefined) {
        const checkDecimals = decimals[1].toString();
        if (type) {
            if(checkDecimals.length > 10) {
                realResult = value.toExponential(4).toString().includes('+0') ? value.toFixed(4) : value.toExponential(4);
            } else {
                realResult = value;
            } 
        } else {
            if(checkDecimals.length > 6) {
                realResult = value.toExponential(4).toString().includes('+0') ? value.toFixed(4) : value.toExponential(4);
            } else {
                realResult = value;
            }
        }
    } else {
        realResult = value;
    }
}

// Variable and screen cleaning functions
function beforeResult() {
    smallScreen.innerText = '';
    inputArray += bigScreen.innerText;
    result = '';
}

function afterResult(){
    bigScreen.innerText = '';
    inputArray = '';
    smallScreen.innerText += '=';
    bigScreen.innerText += realResult;
    history = document.getElementById("lastOperation");
    history.innerText = smallScreen.innerText + realResult;
    resultDeployed = true;
    firstPart = false;
    secondPart = false;
    eraseScreen = true;
    specialButtonsLock = true;
}

function deleteAll(){
    history.innerText = '';
    deleteIt();
}

function deleteIt(){
    smallScreen.innerText = '';
    bigScreen.innerText = '';
    result = '';
    resultDeployed = false;
    firstPart = false;
    aNumber = false;
    specialButtonsLock = false;
    dot = false;
    numpi = false;
    otherNumberEntered = false;
}

function deleteOne(){
    if (!resultDeployed) {
        bigScreen.innerText.toString();
        bigScreen.innerText = bigScreen.innerText.slice(0, ((bigScreen.innerText).length-1));

        if (numpi) {
            bigScreen.innerText = '';
        }

        if (Math.abs(+bigScreen.innerText) === 0) {
            otherNumberEntered = false;
        }

        if (!bigScreen.innerText.includes('.')) {
            dot = false;
        }

        if (bigScreen.innerText === '' && smallScreen.innerText === '') {
            aNumber = false;
            firstPart = false;
            otherNumberEntered = false;
            numpi = false;
        } else if (bigScreen.innerText === '' && smallScreen.innerText !== '') {
            aNumber = false;
            otherNumberEntered = false;
            numpi = false;
        }

        if (bigScreen.innerText === '-') {
            otherNumberEntered = false;
        }
    }
    
    if (specialButtonsLock) {
        deleteIt();
    }
}

// Check the input and build the screen input
function captureInput(idInput, type){
    let input = document.getElementById(idInput).innerText;

    if (type === 'operator' && isNaN(parseInt(bigScreen.innerText))) {
        return null;
    }

    if (type !== 'number' && idInput !== 'changeSign') {
        specialButtonsLock = false;
    }

    if (type === 'number') {
        bigScreen = document.getElementById('bigScreen');
        if (!dot) {
            if (bigScreen.innerText.startsWith('0') || bigScreen.innerText.startsWith('-0') && !resultDeployed && idInput !== 'zero') {
                bigScreen.innerText = bigScreen.innerText.slice(0, ((bigScreen.innerText).length-1));
            }
        }

        if (specialButtonsLock || (isNaN(parseInt(bigScreen.innerText)) && resultDeployed)) {
            deleteIt();
        }
    }

    // Check special inputs that must be handled
    switch(idInput) {
        case 'changeSign':
            return (isNaN(parseInt(bigScreen.innerText)) || bigScreen.innerText === undefined || bigScreen.innerText === '') ? null : bigScreen.innerText*= -1;
        case 'pow':
            input = '^';
            break;
        case 'pi':
            if (!firstPart || firstPartOver) {
                if (!numpi) {
                    bigScreen = document.getElementById('bigScreen');
                    if (bigScreen.innerText !== '' && !resultDeployed) {
                        bigScreen.innerText = '';
                    }
                    input = Math.PI.toFixed(5);
                    numpi = true;
                    aNumber = true;
                    dot = true;
                } else {
                    input = '';
                };
            }
            break;
        case 'dot':
            if (!firstPart) {
                if (!dot) {
                    bigScreen = document.getElementById('bigScreen');
                    if (bigScreen.innerText === '' || bigScreen.innerText === '-') {
                        input = '0.';
                    } else if (!bigScreen.innerText.includes('.')) {
                        input = '.';
                    }
                    dot = true;
                } else {
                    input = '';
                }
            }
            break;
        case 'zero':
            if (!firstPart) {
                bigScreen = document.getElementById('bigScreen');
                if (!dot) {
                    (bigScreen.innerText === '' || bigScreen.innerText === '-' || otherNumberEntered) ? input = '0' : input = '';
                }
            }
            break;
    }

    // Screen builder splitted in two parts, 'first part' and 'second part'
    if (!specialButtonsLock) {
        bigScreen = document.getElementById('bigScreen');
        smallScreen = document.getElementById('smallScreen');
        secondOperator = false;
        if (!firstPart) {
            if (type === 'operator') {
                typeOfOperation = idInput;
                if (bigScreen.innerText.endsWith('.')) {
                    const inputArr = bigScreen.innerText.split('');
                    inputArr.pop();
                    smallScreen.innerText = inputArr.join('');
                    bigScreen.innerText = inputArr.join('');
                } else {
                    smallScreen.innerText = bigScreen.innerText;
                }
                if (input === 'mod') {
                    input = '%';
                }
                if (aNumber) {
                    smallScreen.innerText += input;
                    firstPart = true;
                    firstPartOver = true;
                    dot = false;
                    numpi = false;
                    otherNumberEntered = false;
                }
                eraseScreen = false;
                resultDeployed = false;
            }
            else if (type === 'number') {
                if (!numpi || bigScreen.innerText === '') {
                    bigScreen.innerText += input;
                    aNumber = true;
                    if (idInput !== 'zero') {
                        otherNumberEntered = true;
                    }
                }
            }
            else if (type === 'special') {
                // Remove the unnecesary dots
                if (bigScreen.innerText.endsWith('.')) {
                    const inputArr = bigScreen.innerText.split('');
                    inputArr.pop();
                    bigScreen.innerText = inputArr.join('');
                }
                specialOperation(idInput);
                aNumber = true;
            }
        }
        else {
            if (type === 'operator') {
                if (secondPart) {
                    showResult();
                    smallScreen.innerText = '';
                    smallScreen.innerText += realResult + input;
                    firstPart = true;
                    secondOperator = true;
                    eraseScreen = false;
                    typeOfOperation = idInput;
                    resultDeployed = false;
                    secondPart = false;
                    specialButtonsLock = false;
                    dot = false;
                    numpi = false;
                }
                else if (aNumber) {
                    smallScreen.innerText = smallScreen.innerText.slice(0, ((smallScreen.innerText).length-1));
                    smallScreen.innerText += input;
                    typeOfOperation = idInput;
                    secondOperator = true;
                }
            }
            else if (type === 'special') {
                // Remove the unnecesary dots
                if (bigScreen.innerText.endsWith('.')) {
                    const inputArr = bigScreen.innerText.split('');
                    inputArr.pop();
                    bigScreen.innerText = inputArr.join('');
                }
                specialOperation(idInput);
                aNumber = true;
            }
            if (!eraseScreen && !secondOperator) {
                bigScreen.innerText = '';
                eraseScreen = true;
            }
            if (type === 'number') {
                if (!numpi || bigScreen.innerText === '') {
                    if (idInput !== 'zero') {
                        otherNumberEntered = true;
                    }
                    if (idInput === 'zero') {
                        if (firstPartOver) {
                            bigScreen = document.getElementById('bigScreen');
                                if (!dot) {
                                    (bigScreen.innerText === '' || bigScreen.innerText === '-' || otherNumberEntered) ? input = '0' : input = '';
                                }
                            }
                    }
                    if (idInput === 'dot') {
                        if (firstPartOver) {
                            if (!dot) {
                                bigScreen = document.getElementById('bigScreen');
                                if (bigScreen.innerText === '' || bigScreen.innerText === '-') {
                                    input = '0.';
                                } else if (!bigScreen.innerText.includes('.')) {
                                    input = '.';
                                }
                                dot = true;
                            }
                            else {
                                input = '';
                            }
                        }
                    }
                    bigScreen.innerText += input;
                    secondPart = true;
                }
            }
        }
    }
}

// Check if the result should be displayed
function validResult() {
    if (bigScreen.innerText !== '' && !resultDeployed && firstPart){
        showResult();
    }
}

// To the needed operation and print it in the screen
function showResult(){
    if (typeOfOperation === 'minus') {
        inputArray += `${smallScreen.innerText.substring(smallScreen.innerText.length-1,0)}_` + bigScreen.innerText;
    } else {
        inputArray += smallScreen.innerText + bigScreen.innerText;
    }
    result = '';
    if (bigScreen.innerText.endsWith('.')) {
        const inputArr = bigScreen.innerText.split('');
        inputArr.pop();
        bigScreen.innerText = inputArr.join('');
    }
    smallScreen.innerText += bigScreen.innerText;
    bigScreen.innerText = '';
    let resultArray;
    switch (typeOfOperation) {
        case 'sum':
            resultArray = inputArray.split('+');
            result = Number.parseFloat(resultArray[0]) + Number.parseFloat(resultArray[1]);
            break;
        case 'minus':
            resultArray = inputArray.split('_');
            result = Number.parseFloat(resultArray[0]) - Number.parseFloat(resultArray[1]);
            break;
        case 'multi':
            resultArray = inputArray.split('×');
            result = Number.parseFloat(resultArray[0]) * Number.parseFloat(resultArray[1]);
            break;
        case 'division':
            resultArray = inputArray.split('÷');
            result = Number.parseFloat(resultArray[0]) / Number.parseFloat(resultArray[1]);
            result = (isNaN(result) || result == 'Infinity') ? 'Can\'t divide by zero' : result;
            break;
        case 'module':
            resultArray = inputArray.split('%');
            result = Number.parseFloat(resultArray[0]) % Number.parseFloat(resultArray[1]);
            result = isNaN(result) ? 'Can\'t divide by zero' : result;
            break;
        case 'pow':
            resultArray = inputArray.split('^');
            result = Math.pow(Number.parseFloat(resultArray[0]), Number.parseFloat(resultArray[1]));
            break;
    }
    if (result !== '') {
        countDecimals(false, result);
        afterResult();
    }
}