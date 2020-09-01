let bigScreen = '', smallScreen = '', history = '', inputArray = '';
let typeOfOperation, result, realResult, eraseScreen;
let resultDeployed = false, aNumber = false, firstPartOver = false, otherNumberEntered = false;
let firstPart = false, secondPart = false, numpi = false, specialButtonsLock = false, dot = false;

// Execute special operations, such as logarithm, factorial and summation.
function specialOperation(type) {
    beforeResult();
    let specialResult;
    switch (type) {
        case 'unoSobre': 
            smallScreen.innerHTML += `1/(${bigScreen.innerHTML})`;
            specialResult = (1/(Number.parseFloat(inputArray)));
            break;
        case 'exponente2':
            smallScreen.innerHTML += `sqr(${bigScreen.innerHTML})`;
            specialResult = Math.pow(Number.parseFloat(inputArray), 2);
            break;
        case 'raiz2':
            smallScreen.innerHTML += `√(${bigScreen.innerHTML})`;
            specialResult = Math.sqrt(Number.parseFloat(inputArray));
            break;
        case 'ln':
            smallScreen.innerHTML += `ln(${bigScreen.innerHTML})`;
            specialResult = Math.log(Number.parseFloat(inputArray));
            break;
        case 'euler':
            smallScreen.innerHTML += `e(${bigScreen.innerHTML})`;
            specialResult = Math.exp(Number.parseFloat(inputArray));
            break;
        case 'exponente3':
            smallScreen.innerHTML += `cube(${bigScreen.innerHTML})`;
            specialResult = Math.pow(Number.parseFloat(inputArray), 3);
            break;
        case 'log':
            smallScreen.innerHTML += `log(${bigScreen.innerHTML})`;
            const logResult = (x, y) => {
                return Math.log(y) / Math.log(x);
            }
            specialResult = logResult(10, Number.parseFloat(inputArray));
            break;
        case 'factorial':
            smallScreen.innerHTML += `fact(${bigScreen.innerHTML})`;
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
            smallScreen.innerHTML += `Σ(${bigScreen.innerHTML})`;
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
    smallScreen.innerHTML = '';
    inputArray += bigScreen.innerHTML;
    result = '';
}

function afterResult(){
    bigScreen.innerHTML = '';
    inputArray = '';
    smallScreen.innerHTML += '=';
    bigScreen.innerHTML += realResult;
    history = document.getElementById("lastOperation");
    history.innerHTML = smallScreen.innerHTML + realResult;
    resultDeployed = true;
    firstPart = false;
    secondPart = false;
    eraseScreen = true;
    specialButtonsLock = true;
}

function deleteAll(){
    history.innerHTML = '';
    deleteIt();
}

function deleteIt(){
    smallScreen.innerHTML = '';
    bigScreen.innerHTML = '';
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
        bigScreen.innerHTML.toString();
        bigScreen.innerHTML = bigScreen.innerHTML.slice(0, ((bigScreen.innerHTML).length-1));

        if (numpi) {
            bigScreen.innerHTML = '';
        }

        if (Math.abs(+bigScreen.innerHTML) === 0) {
            otherNumberEntered = false;
        }

        if (!bigScreen.innerHTML.includes('.')) {
            dot = false;
        }

        if (bigScreen.innerHTML === '' && smallScreen.innerHTML === '') {
            aNumber = false;
            firstPart = false;
            otherNumberEntered = false;
            numpi = false;
        } else if (bigScreen.innerHTML === '' && smallScreen.innerHTML !== '') {
            aNumber = false;
            otherNumberEntered = false;
            numpi = false;
        }

        if (bigScreen.innerHTML === '-') {
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

    if (type === 'operator' && isNaN(parseInt(bigScreen.innerHTML))) {
        return null;
    }

    if (type !== 'number' && idInput !== 'changeSign') {
        specialButtonsLock = false;
    }

    if (type === 'number') {
        bigScreen = document.getElementById('bigScreen');
        if (!dot) {
            if (bigScreen.innerHTML.startsWith('0') || bigScreen.innerHTML.startsWith('-0') && !resultDeployed && idInput !== 'zero') {
                bigScreen.innerHTML = bigScreen.innerHTML.slice(0, ((bigScreen.innerHTML).length-1));
            }
        }

        if (specialButtonsLock || (isNaN(parseInt(bigScreen.innerHTML)) && resultDeployed)) {
            deleteIt();
        }
    }

    // Check special inputs that must be handled
    switch(idInput) {
        case 'changeSign':
            return (isNaN(parseInt(bigScreen.innerHTML)) || bigScreen.innerHTML === undefined || bigScreen.innerHTML === '') ? null : bigScreen.innerHTML*= -1;
        case 'pow':
            input = '^';
            break;
        case 'pi':
            if (!firstPart || firstPartOver) {
                if (!numpi) {
                    bigScreen = document.getElementById('bigScreen');
                    if (bigScreen.innerText !== '' && !resultDeployed) {
                        bigScreen.innerHTML = '';
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
                    if (bigScreen.innerHTML === '' || bigScreen.innerHTML === '-') {
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
                    (bigScreen.innerHTML === '' || bigScreen.innerHTML === '-' || otherNumberEntered) ? input = '0' : input = '';
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
                if (bigScreen.innerHTML.endsWith('.')) {
                    const inputArr = bigScreen.innerHTML.split('');
                    inputArr.pop();
                    smallScreen.innerHTML = inputArr.join('');
                    bigScreen.innerHTML = inputArr.join('');
                } else {
                    smallScreen.innerHTML = bigScreen.innerHTML;
                }
                if (input === 'mod') {
                    input = '%';
                }
                if (aNumber) {
                    smallScreen.innerHTML += input;
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
                if (!numpi || bigScreen.innerHTML === '') {
                    bigScreen.innerHTML += input;
                    aNumber = true;
                    if (idInput !== 'zero') {
                        otherNumberEntered = true;
                    }
                }
            }
            else if (type === 'special') {
                // Remove the unnecesary dots
                if (bigScreen.innerHTML.endsWith('.')) {
                    const inputArr = bigScreen.innerHTML.split('');
                    inputArr.pop();
                    bigScreen.innerHTML = inputArr.join('');
                }
                specialOperation(idInput);
                aNumber = true;
            }
        }
        else {
            if (type === 'operator') {
                if (secondPart) {
                    showResult();
                    smallScreen.innerHTML = '';
                    smallScreen.innerHTML += realResult + input;
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
                    smallScreen.innerHTML = smallScreen.innerHTML.slice(0, ((smallScreen.innerHTML).length-1));
                    smallScreen.innerHTML += input;
                    typeOfOperation = idInput;
                    secondOperator = true;
                }
            }
            else if (type === 'special') {
                // Remove the unnecesary dots
                if (bigScreen.innerHTML.endsWith('.')) {
                    const inputArr = bigScreen.innerHTML.split('');
                    inputArr.pop();
                    bigScreen.innerHTML = inputArr.join('');
                }
                specialOperation(idInput);
                aNumber = true;
            }
            if (!eraseScreen && !secondOperator) {
                bigScreen.innerHTML = '';
                eraseScreen = true;
            }
            if (type === 'number') {
                if (!numpi || bigScreen.innerHTML === '') {
                    if (idInput !== 'zero') {
                        otherNumberEntered = true;
                    }
                    if (idInput === 'zero') {
                        if (firstPartOver) {
                            bigScreen = document.getElementById('bigScreen');
                                if (!dot) {
                                    (bigScreen.innerHTML === '' || bigScreen.innerHTML === '-' || otherNumberEntered) ? input = '0' : input = '';
                                }
                            }
                    }
                    if (idInput === 'dot') {
                        if (firstPartOver) {
                            if (!dot) {
                                bigScreen = document.getElementById('bigScreen');
                                if (bigScreen.innerHTML === '' || bigScreen.innerHTML === '-') {
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
                    bigScreen.innerHTML += input;
                    secondPart = true;
                }
            }
        }
    }
}

// Check if the result should be displayed
function validResult() {
    if (bigScreen.innerHTML !== '' && !resultDeployed && firstPart){
        showResult();
    }
}

// To the needed operation and print it in the screen
function showResult(){
    if (typeOfOperation === 'minus') {
        inputArray += `${smallScreen.innerHTML.substring(smallScreen.innerHTML.length-1,0)}_` + bigScreen.innerHTML;
    } else {
        inputArray += smallScreen.innerHTML + bigScreen.innerHTML;
    }
    result = '';
    if (bigScreen.innerHTML.endsWith('.')) {
        const inputArr = bigScreen.innerHTML.split('');
        inputArr.pop();
        bigScreen.innerHTML = inputArr.join('');
    }
    smallScreen.innerHTML += bigScreen.innerHTML;
    bigScreen.innerHTML = '';
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