let bigScreen = "", smallScreen = "", typeOfOperation, realArray = [], specialButtonsLock = false, dot = false;
let resultArray, history = "", result, realResult, eraseScreen, inputArray = "", specialResult;
let resultDeployed = false, aNumber = false, firstPartOver = false, otherNumberEntered = false;
let firstPart = false, secondPart = false, numpi = false;

function specialOperation(type) {
    switch (type) {
        case "changeSign": 
            bigScreen.innerHTML *= -1;
        break;
        case "unoSobre": 
            beforeResult();
            smallScreen.innerHTML += "1/"+"("+bigScreen.innerHTML+")";
            specialResult = Number.parseFloat(inputArray);
            specialResult = (1/specialResult);
            countDecimalsSpecial(specialResult);
            afterResult();
        break;
        case "exponente2":
            beforeResult();
            smallScreen.innerHTML += "sqr("+bigScreen.innerHTML+")";
            specialResult = Number.parseFloat(inputArray);
            specialResult = Math.pow(specialResult, 2);
            countDecimalsSpecial(specialResult);
            afterResult();
        break;
        case "raiz2":
            beforeResult();
            smallScreen.innerHTML += "√("+bigScreen.innerHTML+")";
            specialResult = Number.parseFloat(inputArray);
            specialResult = Math.sqrt(specialResult);
            countDecimalsSpecial(specialResult);
            afterResult();
        break;
        case "ln":
            beforeResult();
            smallScreen.innerHTML += "ln("+bigScreen.innerHTML+")";
            specialResult = Number.parseFloat(inputArray);
            specialResult = Math.log(specialResult);
            countDecimalsSpecial(specialResult);
            afterResult();
        break;
        case "euler":
            beforeResult();
            smallScreen.innerHTML += "e("+bigScreen.innerHTML+")";
            specialResult = Number.parseFloat(inputArray);
            specialResult = Math.exp(specialResult);
            countDecimalsSpecial(specialResult);
            afterResult();
        break;
        case "exponente3":
            beforeResult();
            smallScreen.innerHTML += "cube("+bigScreen.innerHTML+")";
            specialResult = Number.parseFloat(inputArray);
            specialResult = Math.pow(specialResult, 3);
            countDecimalsSpecial(specialResult);
            afterResult();
        break;
        case "log":
            beforeResult();
            smallScreen.innerHTML += "log("+bigScreen.innerHTML+")";
            specialResult = Number.parseFloat(inputArray);
            let logResult = (x, y) => {
                return Math.log(y) / Math.log(x);
            }
            countDecimalsSpecial(logResult(10,specialResult));
            afterResult();
        break;
        case "factorial":
            beforeResult();
            smallScreen.innerHTML += "fact("+bigScreen.innerHTML+")";
            specialResult = Number.parseFloat(inputArray);
            if (isNaN(inputArray)) {
                inputArray = "";
            }
            if (inputArray !== "") {
                if (Number.isInteger(specialResult) && specialResult >= 0) {
                    let factResult = (value) => {
                        let acum = 1;
                        for (let i = 1; i <= value; i++) {
                            acum*=i;
                        }
                        return acum;
                    }
                    countDecimalsSpecial(factResult(specialResult));
                    afterResult();
                }
                else {
                    realResult = "Not a valid number";
                    afterResult();
                }
            }
            else {
                countDecimalsSpecial(NaN);
                afterResult();
            }
        break;
        case "factorialSuma":
            beforeResult();
            smallScreen.innerHTML += "Σ("+bigScreen.innerHTML+")";
            specialResult = Number.parseFloat(inputArray);
            if (isNaN(inputArray)) {
                inputArray = "";
            }
            if (inputArray !== "") {
                if (Number.isInteger(specialResult)) {
                    specialResult = Number.parseFloat(inputArray);
                    let summResult = (value) => {
                        if (value < 0) {
                            let acum = 0;
                            for (let i = -1; i >= value; i--) {
                                acum+=i;
                            }
                            return acum;
                        }
                        else {
                            let acum = 0;
                            for (let i = 1; i <= value; i++) {
                                acum+=i;
                            }
                            return acum;
                        }
                    }
                    countDecimalsSpecial(summResult(specialResult));
                    afterResult();
                }
                else {
                    realResult = "Not a valid number";
                    afterResult();
                }
            }
            else {
                countDecimalsSpecial(NaN);
                afterResult();
            }
        break;
    }
}
//Función para limitar los decimales de las operaciones especiales. 
function countDecimalsSpecial(value){
    realResult = "";
    let stringValue = value.toString();
    let decimals = stringValue.split(".");
    if (decimals[1] !== undefined) {
        let checkDecimals = decimals[1].toString();
        (checkDecimals.length) > 8 ? realResult = value.toFixed(8) : realResult = value;
    }
    else {
        realResult = value;
    }
}
//Funciones de limpieza y de reseteo después de mostrar un resultado.
function beforeResult() {
    smallScreen.innerHTML = "";
    inputArray += bigScreen.innerHTML;
    result = "";
}

function afterResult(){
    bigScreen.innerHTML = "";
    inputArray = "";
    smallScreen.innerHTML += "=";
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
    history.innerHTML = "";
    smallScreen.innerHTML = "";
    bigScreen.innerHTML = "";
    result = "";
    realArray = [];
    resultDeployed = false;
    firstPart = false;
    aNumber = false;
    specialButtonsLock = false;
    dot = false;
    numpi = false;
    otherNumberEntered = false;
}

function deleteIt(){
    smallScreen.innerHTML = "";
    bigScreen.innerHTML = "";
    result = "";
    realArray = [];
    resultDeployed = false;
    firstPart = false;
    aNumber = false;
    specialButtonsLock = false;
    dot = false;
    numpi = false;
    otherNumberEntered = false;
}

function deleteOne(){
    if (resultDeployed !== true) {
        bigScreen.innerHTML.toString();
        let erased = (bigScreen.innerHTML).slice(0, ((bigScreen.innerHTML).length-1));
        bigScreen.innerHTML = erased;
        resultDeployed = false;
        realArray = [];
    }
}
//Funcion principal dividida en dos partes.
function captureInput(idInput, type){
    let input = document.getElementById(idInput).innerHTML;
    //Condiciones para el input de casos especiales
    if (idInput === "pow") {
        input = "^";
    }
    if (idInput === "pi") {
        if (firstPart === false) {
            (numpi === false) ? (
                input = Math.PI.toFixed(5),
                numpi = true
            ) : (
                input = ""
            );
        }
        else if (firstPartOver === true) {
            (numpi === false) ? (
                input = Math.PI.toFixed(5),
                numpi = true
            ) : (
                input = ""
            );
        }
    }
    if (type !== "number") {
        specialButtonsLock = false;
    }
    if (idInput === "dot") {
        if (firstPart === false) {
            if (dot === false) {
                bigScreen = document.getElementById("bigScreen");
                let checkDot = bigScreen.innerHTML;
                (checkDot === "") ? input = "0." : input = ".";
                dot = true;
            }
            else {
                input = "";
            }
        }
    }
    if (idInput === "zero") {
        if (firstPart === false) {
        bigScreen = document.getElementById("bigScreen");
        let checkZero = bigScreen.innerHTML;
            if (dot === false) {
                (checkZero === "" || otherNumberEntered === true) ? input = "0" : input = "";
            }
        }
    }
    if (idInput !== "zero" && idInput !== "dot" && type !== "special") {
        bigScreen = document.getElementById("bigScreen");
        let checkZero = bigScreen.innerHTML;
        if (dot === false) {
            if (checkZero.startsWith("0") && resultDeployed === false) {
                let erased = (bigScreen.innerHTML).slice(0, ((bigScreen.innerHTML).length-1));
                bigScreen.innerHTML = erased;
            }
        }
    }
    //La primera condición es para evitar inputs una vez que el resultado se haya mostrado, aquí inicia el núcleo del código.
    if (specialButtonsLock === false) {
        bigScreen = document.getElementById("bigScreen");
        smallScreen = document.getElementById("smallScreen");
        secondOperator = false;
        if (firstPart === false) {
            if (type === "operator") {
                typeOfOperation = idInput;
                smallScreen.innerHTML = bigScreen.innerHTML;
                if (aNumber === true) {
                    smallScreen.innerHTML += input;
                    firstPart = true;
                    firstPartOver = true;
                    dot = false;
                    numpi = false;
                    otherNumberEntered = false;
                }
                eraseScreen = false;
                realArray = [];
                resultDeployed = false;
            }
            else if (type === "number") {
                bigScreen.innerHTML += input;
                aNumber = true;
                if (idInput !== "zero") {
                    otherNumberEntered = true;
                }
            }
            else if (type === "special") {
                specialOperation(idInput);
            }
        }
        else {
            if (type === "operator") {
                if (secondPart === true) {
                    showResult();
                    smallScreen.innerHTML = "";
                    smallScreen.innerHTML += realResult + input;
                    firstPart = true;
                    secondOperator = true;
                    eraseScreen = false;
                    typeOfOperation = idInput;
                    resultDeployed = false;
                    secondPart = false;
                    specialButtonsLock = false;
                }
                else if (aNumber === true) {
                    let erased = (smallScreen.innerHTML).slice(0, ((smallScreen.innerHTML).length-1));
                    smallScreen.innerHTML = erased;
                    smallScreen.innerHTML += input;
                    typeOfOperation = idInput;
                    secondOperator = true;
                }
            }
            else if (type === "special") {
                specialOperation(idInput);
            }
            if (eraseScreen === false & secondOperator === false) {
                bigScreen.innerHTML = "";
                eraseScreen = true;
            }
            if (type === "number") {
                if (idInput !== "zero") {
                    otherNumberEntered = true;
                }
                if (idInput === "zero") {
                    if (firstPartOver === true) {
                        bigScreen = document.getElementById("bigScreen");
                        let checkZero = bigScreen.innerHTML;
                            if (dot === false) {
                                (checkZero === "" || otherNumberEntered === true) ? input = "0" : input = "";
                            }
                        }
                }
                if (idInput === "dot") {
                    if (firstPartOver === true) {
                        if (dot === false) {
                            bigScreen = document.getElementById("bigScreen");
                            let checkDot = bigScreen.innerHTML;
                            (checkDot === "") ? input = "0." : input = ".";
                            dot = true;
                        }
                        else {
                            input = "";
                        }
                    }
                }
                bigScreen.innerHTML += input;
                secondPart = true;
            }
        }
    }
}

function floatConvert(){
    realArray = [];
    resultArray.forEach(element => {
        realArray.push(Number.parseFloat(element));
    });
}

function validResult() {
    if (bigScreen.innerHTML !== "" && resultDeployed === false && firstPart === true){
        showResult();
    }
}

function countDecimals(value){
    realResult = "";
    let stringValue = value.toString();
    let decimals = stringValue.split(".");
    if (decimals[1] !== undefined) {
        let checkDecimals = decimals[1].toString();
        (checkDecimals.length > 4) ? (realResult = result.toFixed(4)) : realResult = value;
    }
    else {
        realResult = value;
    }
}

function showResult(){
    if (typeOfOperation === "minus") {
        let changeMinus = smallScreen.innerHTML;
        let changedArray = changeMinus.substring(changeMinus.length-1,0);
        changedArray += "_";
        inputArray += changedArray + bigScreen.innerHTML;
    }
    else {
        inputArray += smallScreen.innerHTML + bigScreen.innerHTML;
    }
    result = "";
    smallScreen.innerHTML += bigScreen.innerHTML;
    bigScreen.innerHTML = "";
    switch (typeOfOperation) {
        case "sum":
            resultArray = inputArray.split("+");
            floatConvert();
            result = realArray[0] + realArray[1];
            break;
        case "minus":
            resultArray = inputArray.split("_");
            floatConvert();
            result = realArray[0] - realArray[1];
            break;
        case "multi":
            resultArray = inputArray.split("×");
            floatConvert();
            result = realArray[0] * realArray[1];
            break;
        case "division":
            resultArray = inputArray.split("÷");
            floatConvert();
            result = realArray[0] / realArray[1];
            break;
        case "module":
            resultArray = inputArray.split("%");
            floatConvert();
            result = realArray[0] % realArray[1];
            break;
        case "pow":
            resultArray = inputArray.split("^");
            floatConvert();
            result = Math.pow(realArray[0],realArray[1]);
            break;
    }
    if (result !== "") {
        countDecimals(result);
        inputArray = "";
        afterResult();
    }
}