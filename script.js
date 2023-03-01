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

const operate = (operator, values) => OPERATIONS[operator](parseFloat(values[0]), parseFloat(values[1]));

/*
Initialize Display Value
*/

let currentValues = [0, 0];
let selectedOperator;
let decimalSelected;
const getValueIndex = () => selectedOperator ? 1 : 0;

const display = document.querySelector(".display");
const updateDisplay = (newVal) => {
  display.textContent = newVal;
  clearSelectedButton();
}

/*
Set Button Event Handlers
*/

const CLICK_EVENT = "click";
const digitsContainer = document.querySelector(".digits");

function updateValue(update, willUpdateDisplay = true) {
  const valueIndex = getValueIndex();
  currentValues[valueIndex] = update(currentValues[valueIndex]);
  if (willUpdateDisplay) updateDisplay(currentValues[valueIndex]);
}

// digits

for (let i = 0; i <= 9; i++) {
  const button = digitsContainer.querySelector(`button[data-val="${i}"]`);
  button.textContent = i;
  button.addEventListener(CLICK_EVENT, () => appendDigit(i));
}

function appendDigit(newVal) {
    updateValue((currentVal) => decimalSelected ?
      currentVal.toString() + newVal.toString() :
      currentVal * 10 + newVal
    );
}

// decimal

const decimalBtn = digitsContainer.querySelector("#decimal");
decimalBtn.addEventListener(CLICK_EVENT, setDecimal);

function setDecimal() {
  decimalSelected = true;
  updateValue((currentVal) => currentVal.toString() + ".");
}

// clear

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener(CLICK_EVENT, clearAll);

const clearSelectedButton = (clearSelectedOperator = false) => {
  const selected = document.getElementById(selectedOperator);
  selected?.classList.remove("selected");

  if (clearSelectedOperator) selectedOperator = null;
};

function clearAll(updateDisplay = true) {  
  currentValues = [0, 0];
  decimalSelected = false;
  clearSelectedButton(true);
  
  if (updateDisplay) display.textContent = currentValues[0];
}

// sign

const signBtn = document.getElementById("sign");
signBtn.addEventListener(CLICK_EVENT, updateSign);

function updateSign() {
  updateValue((currentVal) => currentVal *= -1);
}

// percent

const percentBtn = document.getElementById("percent");
percentBtn.addEventListener(CLICK_EVENT, setPercent);

function setPercent() {
  updateValue((currentVal) => currentVal /= 100);
};

// operators

const operatorButtons = document.querySelectorAll(".operators button");
operatorButtons.forEach((button) => button.addEventListener(CLICK_EVENT, operatorButtonHandler));

function operatorButtonHandler() {
  if (selectedOperator) {
    currentValues = [operate(selectedOperator, currentValues), 0];
    display.textContent = currentValues[0];
    clearSelectedButton(true);
  }

  if (this.id !== "=") {
    selectedOperator = this.id;
    this.classList.add('selected');
  }
}