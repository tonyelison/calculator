/*
Define Operations
*/

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const equals = (a) => a;

const OPERATIONS = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "=": equals,
};

const operate = (operator, values) => OPERATIONS[operator](values[0], values[1]);

/*
Initialize Display Value
*/

let currentValues = [0, 0];
let selectedOperator;

const display = document.querySelector(".display");
const setDisplayValue = (newVal) => {
  currentValues[0] = newVal;
  display.textContent = newVal;
};

/*
Set Button Event Handlers
*/

const digitsContainer = document.querySelector(".digits");

for (let i = 0; i <= 9; i++) {
  const button = digitsContainer.querySelector(`button[data-val="${i}"]`);
  button.textContent = i;
  button.addEventListener("click", () => {
    const valueIndex = selectedOperator ? 1 : 0;
    currentValues[valueIndex] = currentValues[valueIndex] * 10 + i;
    display.textContent = currentValues[valueIndex];
  });
}

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", clearAll);

function clearAll(updateDisplay = true) {
  currentValues = [0, 0];
  selectedOperator = null;  
  
  if (updateDisplay) display.textContent = currentValues[0];
}

const signBtn = document.getElementById("sign");
const percentBtn = document.getElementById("percent");
percentBtn.addEventListener("click", () => setDisplayValue(currentValues[0] /= 100));

const operatorButtons = document.querySelectorAll(".operators button");
operatorButtons.forEach((button) => button.addEventListener("click", operatorButtonHandler));

function operatorButtonHandler() {
  if (selectedOperator) {
    currentValues = [operate(selectedOperator, currentValues), 0];
    display.textContent = currentValues[0];
  }
 
  const selectedButton = document.querySelector(".operators button.selected");
  selectedButton?.classList.remove("selected");

  if (this.id === "=") {
    clearAll(false);
  } else {
    selectedOperator = this.id;
    this.classList.add('selected');
  }
}