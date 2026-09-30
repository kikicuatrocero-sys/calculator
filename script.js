const input = document.querySelector("#input");
const operands = ["+", "-", "*", "/", "="];
let numberA = 0;
let numberB = 0;
let operand = null;
let resultComplete = false;

const initOperation = function (numberA, numberB, operand) {
  console.log(numberA, operand, numberB);
  switch (operand) {
    case "+":
      input.textContent = numberA + numberB;
      break;
    case "-":
      input.textContent = numberA - numberB;
      break;
    case "*":
      input.textContent = numberA * numberB;
      break;
    case "/":
      input.textContent = numberA / numberB;
      break;
    default:
      break;
  }
};
const buttons = document.querySelectorAll("button");
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    if (input.textContent == 0) {
      input.textContent = button.textContent;
    } else if (!operands.includes(button.textContent)) {
      input.textContent += button.textContent;
    } else {
      if (operand == null && operands.includes(button.textContent)) {
        numberA = input.textContent;
        input.textContent = 0;
        operand = button.textContent;
        console.log(operand);
      } else if (button.textContent == "=") {
        numberB = input.textContent;
        initOperation(Number(numberA), Number(numberB), operand);
      }
    }
  }),
);
