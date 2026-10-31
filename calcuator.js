let inputBox = document.querySelector("#input-box");
let buttons = document.querySelectorAll("button");

let string = "";
buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        let value = event.currentTarget.innerText.trim();

        if (value === "=") {
            calculateResult();
        } 
        else if (value === "AC") {
            clearDisplay();
        } 
        else if (value === "DEL") {
            deleteLastCharacter();
        } 
        else {
            addValue(value);
        }
    });
});
function addValue(value) {
    if (/^[0-9+\-*/%.]$/.test(value)) {
        string += value;
        inputBox.value = string;
    }
}
document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (/^[0-9+\-*/%.]$/.test(key)) {
        addValue(key);
    }
    else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculateResult();
    }
    else if (key === "Backspace") {
        event.preventDefault();
        deleteLastCharacter();
    }
    else if (key === "Escape" || key === "Delete") {
        event.preventDefault();
        clearDisplay();
    }
});
function calculateResult() {
    if (string.trim() === "") {
        return;
    }

    try {
        
        if (!/^[0-9+\-*/%.()\s]+$/.test(string)) {
            throw new Error("Invalid input");
        }

        let result = eval(string);

        if (!Number.isFinite(result)) {
            throw new Error("Invalid calculation");
        }
        if (Number.isInteger(result)) {
            string = String(result);
        } else {
            string = String(parseFloat(result.toFixed(10)));
        }
        inputBox.value = string;

    } catch (error) {
        inputBox.value = "Error";
        string = "";
    }
}

function clearDisplay() {
    string = "";
    inputBox.value = "";
}
function deleteLastCharacter() {
    string = string.slice(0, -1);
    inputBox.value = string;
}