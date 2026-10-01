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
      let result = numberA / numberB;
      if (isNaN(result)) {
        input.textContent = "Nice try🗣️";
        firstOperand = null;
        secondOperand = null;
        operator = null;
        break;
      }
      input.textContent = result;
      break;
    default:
      break;
  }
};

/*
handleButtonClick()
*/
const handleButtonClick = function (button) {
  const value = button.textContent;

  if (!operands.includes(value) && value != "=") {
    if (waitingForSecondOperand) {
      input.textContent = value;
      waitingForSecondOperand = false;
    } else if (
      input.textContent == "0" ||
      (isNaN(input.textContent) && value != ".")
    ) {
      input.textContent = value;
    } else {
      input.textContent += value;
    }
    return;
  }
  if (operands.includes(value)) {
    //Caso A: Presiono dos operadores seguidos, solo actualizamos el operador
    if (waitingForSecondOperand) {
      operator = value;
      return;
    }
    //Caso B: Presiono Numero + Numero + (Calcula)
    if (operator !== null) {
      secondOperand = parseFloat(input.textContent);
      initOperation(firstOperand, secondOperand, operator);
      firstOperand = parseFloat(input.textContent);
    } else {
      //Caso C: Es el primero operador que presionamos
      firstOperand = parseFloat(input.textContent);
    }
    operator = value;
    waitingForSecondOperand = true;
    return;
  }

  //3.Si presionamos igual
  if (value === "=") {
    if (operator === null) return; //Ignora click si no hay operador
    secondOperand = parseFloat(input.textContent);
    initOperation(firstOperand, secondOperand, operator);

    firstOperand = parseFloat(input.textContent);
    operator = null;
    secondOperand = null;
    waitingForSecondOperand = true;
  }
};

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  if (button.id !== "reset") {
    button.addEventListener("click", handleButtonClick(button));
  }
});

const resetCalculator = function () {
  firstOperand = null;
  secondOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  input.textContent = "0";
};

const resetButton = document.querySelector("#reset");
if (resetButton) {
  resetButton.addEventListener("click", resetCalculator);
}
