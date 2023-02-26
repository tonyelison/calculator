/*
Define Operations
*/

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const OPERATIONS = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
};

const operate = (operator, num1, num2) => OPERATIONS[operator](num1, num2);

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

const clearAll = () => {
  currentValues = [0, 0];
  selectedOperator = null;  
  display.textContent = currentValues[0];
}

/*
Initialize Button Event Handlers
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

const signBtn = document.getElementById("sign");
const percentBtn = document.getElementById("percent");
percentBtn.addEventListener("click", () => setDisplayValue(currentValues[0] /= 100));