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

let currentValue = 0;
const display = document.querySelector(".display");

/*
Initialize Button Event Handlers
*/

const digitsContainer = document.querySelector(".digits");

for (let i = 0; i <= 9; i++) {
  const button = digitsContainer.querySelector(`button[data-val="${i}"]`);
  button.textContent = i;
  button.addEventListener("click", () => {
    currentValue = currentValue * 10 + i;
    display.textContent = currentValue;
  });
}

const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  currentValue = 0;
  display.textContent = currentValue;
});

const signBtn = document.getElementById("sign");
const percentBtn = document.getElementById("percent");