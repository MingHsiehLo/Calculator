let bigScreen = "", smallScreen = "", typeOfOperation, realArray = [], specialButtonsLock = false, dot = false;
let resultArray, history = "", result, realResult, eraseScreen, inputArray = "", specialResult;
let resultDeployed = false, aNumber = false, firstPartOver = false, otherNumberEntered = false;
let firstPart = false, secondPart = false, numpi = false, specialEffect;

function active(id) {
    let buttonInput = document.getElementById(id);
    buttonInput.classList.add("activate");
}

function deactive(id) {
    let buttonInput = document.getElementById(id);
    buttonInput.classList.remove("activate");
}

document.addEventListener("keydown", () => {
    let checkCode = event.keyCode;
    if (checkCode === 13) {
        event.preventDefault();
        checkCode = 999;
    }
    let shift = event.shiftKey;
    switch(checkCode) {
        case 48: captureInput("zero", "number");
        active("zero");
        break;
        case 96: captureInput("zero", "number");
        active("zero");
        break;
        case 49: captureInput("one", "number");
        active("one");
        break;
        case 97: captureInput("one", "number");
        active("one");
        break;
        case 50: captureInput("two", "number");
        active("two");
        break;
        case 98: captureInput("two", "number");
        active("two");
        break;
        case 51: captureInput("three", "number");
        active("three");
        break;
        case 99: captureInput("three", "number");
        active("three");
        break;
        case 52: captureInput("four", "number");
        active("four");
        break;
        case 100: captureInput("four", "number");
        active("four");
        break;
        case 101: captureInput("five", "number");
        active("five");
        break;
        case 102: captureInput("six", "number");
        active("six");
        break;
        case 55: captureInput("seven", "number");
        active("seven");
        break;
        case 103: captureInput("seven", "number");
        active("seven");
        break;
        case 104: captureInput("eight", "number");
        active("eight");
        break;
        case 57: captureInput("nine", "number");
        active("nine");
        break;
        case 105: captureInput("nine", "number");
        active("nine");
        break;
        case 106: captureInput("multi", "operator");
        active("multi");
        break;
        case 107: captureInput("sum", "operator");
        active("sum");
        break;
        case 109: captureInput("minus", "operator");
        active("minus");
        break;
        case 189: captureInput("minus", "operator");
        active("minus");
        break;
        case 190: captureInput("dot", "number");
        active("dot");
        break;
        case 110: captureInput("dot", "number");
        active("dot");
        break;
        case 111: captureInput("division", "operator");
        active("division");
        break;
        case 191: captureInput("division", "operator");
        active("division");
        break;
        case 8: deleteOne();
        specialEffect = document.getElementById("deleteOne");
        specialEffect.classList.add("eraseSpecial");
        break;
        case 999: validResult();
        specialEffect = document.getElementById("specialButton");
        specialEffect.classList.add("equal");
        break;
    }
    if (shift === false) {
        switch(checkCode) {
            case 56: captureInput("eight", "number");
            active("eight");
            break;
            case 187: validResult();
            specialEffect = document.getElementById("specialButton");
            specialEffects.classList.add("equal");
            break;
            case 54: captureInput("six", "number");
            active("six");
            break;
            case 53: captureInput("five", "number");
            active("five");
            break;
        }
    }
    else if (shift === true) {
        switch(checkCode) {
            case 56: captureInput("multi", "operator");
            active("multi");
            break;
            case 187: captureInput("sum", "operator");
            active("sum");
            break;
            case 54: captureInput("pow", "operator");
            active("pow");
            break;
            case 53: captureInput("module", "operator");
            active("module");
            break;
        }
    }
});

document.addEventListener("keyup", () => {
    let checkCode = event.keyCode;
    if (checkCode === 13) {
        event.preventDefault();
        checkCode = 999;
    }
    let shift = event.shiftKey;
    switch(checkCode) {
        case 48: 
        deactive("zero");
        break;
        case 96: 
        deactive("zero");
        break;
        case 49: 
        deactive("one");
        break;
        case 97: 
        deactive("one");
        break;
        case 50:
        deactive("two");
        break;
        case 98:
        deactive("two");
        break;
        case 51: 
        deactive("three");
        break;
        case 99: 
        deactive("three");
        break;
        case 52: 
        deactive("four");
        break;
        case 100: 
        deactive("four");
        break;
        case 101: 
        deactive("five");
        break;
        case 102: 
        deactive("six");
        break;
        case 55: 
        deactive("seven");
        break;
        case 103: 
        deactive("seven");
        break;
        case 104: 
        deactive("eight");
        break;
        case 57: 
        deactive("nine");
        break;
        case 105: 
        deactive("nine");
        break;
        case 106: 
        deactive("multi");
        break;
        case 107: 
        deactive("sum");
        break;
        case 109: 
        deactive("minus");
        break;
        case 189: 
        deactive("minus");
        break;
        case 190: 
        deactive("dot");
        break;
        case 110: 
        deactive("dot");
        break;
        case 111: 
        deactive("division");
        break;
        case 191: 
        deactive("division");
        break;
        case 8: 
        specialEffect = document.getElementById("deleteOne");
        specialEffect.classList.remove("eraseSpecial");
        break;
        case 999: 
        specialEffect = document.getElementById("specialButton");
        specialEffect.classList.remove("equal");
        break;
    }
    if (shift === false) {
        switch(checkCode) {
            case 56:
            deactive("eight");
            break;
            case 187: 
            specialEffect = document.getElementById("specialButton");
            specialEffect.classList.remove("equal");
            break;
            case 54: 
            deactive("six");
            break;
            case 53: 
            deactive("five");
            break;
        }
    }
    else if (shift === true) {
        switch(checkCode) {
            case 56: 
            deactive("multi");
            break;
            case 187: 
            deactive("sum");
            break;
            case 54: 
            deactive("pow");
            break;
            case 53: 
            deactive("module");
            break;
        }
    }
});

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
                if (Number.isInteger(specialResult) && specialResult >= 0 && specialResult <= 100000) {
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
                else if (specialResult > 100001) {
                    realResult = "Infinity";
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
                if (Number.isInteger(specialResult) && inputArray < 100000000) {
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
    if (specialButtonsLock === true) {
        deleteIt();
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