(function () {
  console.log("hello");
  let previousVal = 0;
  let secondVal = 0;
  let operatorVal = "";
  let operatorChaining = false;
  let equalsClicked = false;
  let lastInputVal = "";

  const screenText = document.querySelector(".operand");
  const numberBtns = document.querySelectorAll(".number");
  const operationBtns = document.querySelectorAll(".operation");
  const deleteBtn = document.querySelector(".delete");
  const clearBtn = document.querySelector(".clear");
  const equalsBtn = document.querySelector(".equals");

  const add = (firstNum, secondNum) => {
    let result = firstNum + secondNum;
    if (result.length > 22) {
      return Math.round(result);
    }
    return result;
  };

  const subtract = (firstNum, secondNum) => {
    let result = firstNum - secondNum;
    if (result.length > 22) {
      return Math.round(result);
    }
    return result;
  };

  const multiply = (firstNum, secondNum) => {
    let result = firstNum * secondNum;
    if (result.length > 22) {
      return Math.round(result);
    }
    return result;
  };

  const divide = (firstNum, secondNum) => {
    if (secondNum == 0) return "Not possible";
    let result = firstNum / secondNum;
    if (result.length > 22) {
      return Math.round(result);
    }
    return result;
  };

  const calculatorReset = () => {
    previousVal = 0;
    secondVal = 0;
    operatorVal = "";
    operatorChaining = false;
    equalsClicked = false;
    screenText.textContent = "";
    lastInputVal = "";
  };

  const operate = (firstNum, secondNum, operator) => {
    switch (operator) {
      case "/":
        return divide(firstNum, secondNum);
        break;
      case "*":
        return multiply(firstNum, secondNum);
        break;
      case "+":
        return add(firstNum, secondNum);
        break;
      case "-":
        return subtract(firstNum, secondNum);
        break;
    }
  };

  const display = value => {
    if (operatorChaining) {
      previousVal = operate(
        parseFloat(previousVal),
        parseFloat(secondVal),
        operatorVal
      );

      secondVal = 0;
      operatorVal = "";
      operatorChaining = false;
      screenText.textContent = previousVal;
      return;
    }

    if (equalsClicked && !value) {
      console.log(
        operate(parseFloat(previousVal), parseFloat(secondVal), operatorVal)
      );
      previousVal = operate(
        parseFloat(previousVal),
        parseFloat(secondVal),
        operatorVal
      );

      secondVal = 0;

      operatorVal = "";

      screenText.textContent = previousVal;
      return;
    }

    if (operatorVal) {
      if (value == "." && secondVal.toString().includes(".")) return;
      if (secondVal) value = secondVal.toString() + value.toString();
      secondVal = value;
      screenText.textContent = value;
      return;
    }

    if (value == "." && previousVal.toString().includes(".")) {
      return;
    }

    if (previousVal) {
      value = previousVal.toString() + value.toString();
    }
    previousVal = value;
    screenText.textContent = value;
  };

  const numberBtnsHandler = displayVal => {
    console.log("number");
    console.log(displayVal);
    if (previousVal == "Not possible") calculatorReset();

    lastInputVal = displayVal;
    display(displayVal);
  };

  const operationBtnsHandler = opVal => {
    console.log("operator");
    console.log(opVal);

    if (!previousVal && !secondVal) return;

    if (["/", "*", "+", "-"].some(el => el == lastInputVal)) {
      lastInputVal = opVal;
      operatorVal = opVal;
      return;
    }

    if (operatorVal) {
      operatorChaining = true;
      display();
    }

    lastInputVal = opVal;
    operatorVal = opVal;
  };

  const deleteBtnHandler = () => {
    if (screenText.textContent == previousVal) {
      previousVal = previousVal.toString().slice(0, -1) || 0;
      screenText.textContent = previousVal;
    } else if (screenText.textContent == secondVal) {
      secondVal = secondVal.toString().slice(0, -1) || 0;
      screenText.textContent = secondVal;
    }
  };

  const equalsBtnHandler = () => {
    if (!operatorVal || !secondVal) return;
    equalsClicked = true;
    display();
  };

  numberBtns.forEach(numberBtn =>
    numberBtn.addEventListener("click", e => {
      numberBtnsHandler(e.target.textContent);
    })
  );

  operationBtns.forEach(operator => {
    operator.addEventListener("click", e => {
      operationBtnsHandler(e.target.textContent);
    });
  });

  deleteBtn.addEventListener("click", () => {
    deleteBtnHandler();
  });

  equalsBtn.addEventListener("click", () => {
    equalsBtnHandler();
  });

  clearBtn.addEventListener("click", calculatorReset);

  document.addEventListener("keydown", e => {
    console.log(e.key);
    if (
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].some(
        el => el == e.key
      )
    ) {
      numberBtnsHandler(e.key);
    } else if (["+", "-", "/", "*"].some(el => el == e.key)) {
      operationBtnsHandler(e.key);
    } else if (e.key == "Backspace") {
      deleteBtnHandler();
    } else if (e.key == "Delete") {
      calculatorReset();
    } else if (e.key == "=") {
      equalsBtnHandler();
    }
  });
})();
