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