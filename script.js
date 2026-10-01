const input = document.querySelector("#input");
const operands = ["+", "-", "*", "/"];
let secondOperand = null;
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

//Reemplaza el input con la operacion de operand
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

/*
handleButtonClick()

This function manages calculator input and determines
whether to perform an operation based on the button pressed.

1. If the button is neither an operator nor '=', then:
- If the current input is '0', replace that '0' with the button's content.
- Otherwise, concatenate the button's content to the current input.

2. If it is an operator and we are not currently waiting for an operation (`waitingForSecondOperand` is false):
- Store the current input in a variable (`firstOperand`).
- Store the operation type based on the button's content.
- Reset the input to '0' (clear it).
- Update the `waitingForSecondOperand` flag to indicate that we are now waiting
for a second operand.

The second operand is captured via the current input; we obtain it when '=' is pressed.
3. If it is '=' and we are waiting for an operation:
- Store the current input value.
- Call `initOperation` to execute the operation, passing in the two numbers and the operation type.
- Indicate that we need to start over and wait for a new operand (`firstOperand`).
*/
const handleButtonClick = function (button) {
  if (!operands.includes(button.textContent) && button.textContent != "=") {
    if (input.textContent == "0" && button.textContent != ".") {
      input.textContent = button.textContent;
    } else {
      input.textContent += button.textContent;
    }
  }
  if (operands.includes(button.textContent) && !waitingForSecondOperand) {
    firstOperand = parseFloat(input.textContent);
    operator = button.textContent;
    input.textContent = "0";
    waitingForSecondOperand = true;
  }
  if (button.textContent == "=" && waitingForSecondOperand) {
    secondOperand = parseFloat(input.textContent);
    initOperation(firstOperand, secondOperand, operator);
    secondOperand = null;
    waitingForSecondOperand = false;
  }
};

const buttons = document.querySelectorAll("button");
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    handleButtonClick(button);
  }),
);
