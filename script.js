/*
Define Operations
*/

const OPERATIONS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "=": (a) => a,
};

const operate = (operator, values) => OPERATIONS[operator](values[0], values[1]);

/*
Initialize Display Value
*/

let currentValues = [0, 0];
let selectedOperator;
let decimalSelected;
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
  if (decimalSelected) {
    currentValues[valueIndex] = currentValues[valueIndex].toString() + value.toString();
  } else {
    currentValues[valueIndex] = currentValues[valueIndex] * 10 + value;
  }
  updateDisplay(currentValues[valueIndex]);
}

// decimal

const decimalBtn = digitsContainer.querySelector("#decimal");
decimalBtn.addEventListener(CLICK_EVENT, setDecimal);

function setDecimal() {
  decimalSelected = true;
  const valueIndex = getValueIndex();
  currentValues[valueIndex] = currentValues[valueIndex].toString() + ".";
  updateDisplay(currentValues[valueIndex]);
}

// clear

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener(CLICK_EVENT, clearAll);

const clearSelectedOperator = () => {
  const selectedButton = document.querySelector(".operators button.selected");
  selectedButton?.classList.remove("selected");
};

function clearAll(updateDisplay = true) {
  currentValues = [0, 0];
  selectedOperator = null;  
  decimalSelected = false;

  clearSelectedOperator();
  
  if (updateDisplay) display.textContent = currentValues[0];
}

// sign

const signBtn = document.getElementById("sign");
signBtn.addEventListener(CLICK_EVENT, updateSign);

function updateSign() {
  const valueIndex = getValueIndex();
  currentValues[valueIndex] *= -1;
  updateDisplay(currentValues[valueIndex]);
}

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
 
  clearSelectedOperator();

  if (this.id === "=") {
    clearAll(false);
  } else {
    selectedOperator = this.id;
    this.classList.add('selected');
  }
}