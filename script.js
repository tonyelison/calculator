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
const getValueIndex = () => selectedOperator ? 1 : 0;

const display = document.querySelector(".display");
const updateDisplay = (newVal) => display.textContent = newVal;

/*
Set Button Event Handlers
*/

const CLICK_EVENT = "click";
const digitsContainer = document.querySelector(".digits");

// digits

for (let i = 0; i <= 9; i++) {
  const button = digitsContainer.querySelector(`button[data-val="${i}"]`);
  button.textContent = i;
  button.addEventListener(CLICK_EVENT, () => appendDigit(i));
}

function appendDigit(value) {
  const valueIndex = getValueIndex();
  currentValues[valueIndex] = currentValues[valueIndex] * 10 + value;
  updateDisplay(currentValues[valueIndex]);
}

// clear

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener(CLICK_EVENT, clearAll);

function clearAll(updateDisplay = true) {
  currentValues = [0, 0];
  selectedOperator = null;  
  
  if (updateDisplay) display.textContent = currentValues[0];
}

// sign

const signBtn = document.getElementById("sign");
signBtn.addEventListener(CLICK_EVENT, )

// percent

const percentBtn = document.getElementById("percent");
percentBtn.addEventListener(CLICK_EVENT, setPercent);

function setPercent() {
  const valueIndex = getValueIndex();
  currentValues[valueIndex] /= 100;
  updateDisplay(currentValues[valueIndex]);
};

// operators

const operatorButtons = document.querySelectorAll(".operators button");
operatorButtons.forEach((button) => button.addEventListener(CLICK_EVENT, operatorButtonHandler));

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