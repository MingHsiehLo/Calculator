function active(id) {
    document.getElementById(id).classList.add("activate");
}

function deactive(id) {
    document.getElementById(id).classList.remove("activate");
}

function createKeydownEvents() {
    document.addEventListener("keydown", () => {
        const checkCode = event.keyCode;
        if (checkCode === 13) {
            event.preventDefault();
            checkCode = 999;
        }
        const shift = event.shiftKey;
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
            document.getElementById("deleteOne").classList.add("eraseSpecial");
            break;
            case 999: validResult();
            document.getElementById("specialButton").classList.add("equal");
            break;
        }
        if (shift === false) {
            switch(checkCode) {
                case 56: captureInput("eight", "number");
                active("eight");
                break;
                case 187: validResult();
                document.getElementById("specialButton").classList.add("equal");
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
}

function createKeyupEvents() {
    document.addEventListener("keyup", () => {
        const checkCode = event.keyCode;
        if (checkCode === 13) {
            event.preventDefault();
            checkCode = 999;
        }
        const shift = event.shiftKey;
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
            document.getElementById("deleteOne").classList.remove("eraseSpecial");
            break;
            case 999: 
            document.getElementById("specialButton").classList.remove("equal");
            break;
        }
        if (shift === false) {
            switch(checkCode) {
                case 56:
                deactive("eight");
                break;
                case 187: 
                document.getElementById("specialButton").classList.remove("equal");
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
}

export { active, deactive, createKeydownEvents, createKeyupEvents };