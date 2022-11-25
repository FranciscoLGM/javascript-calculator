import { useState } from "react";
import Mexp from "math-expression-evaluator";
import "./App.css";
import keys from "./data/calculatorKeys.json";

function App() {
  const [result, setResult] = useState(0);
  const [expression, setExpression] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  const operators = [" * ", " + ", " / "];

  const handleDisplay = (value) => {
    if (operators.includes(value) && expression === "") {
      return;
    }
    // handles the decimal point
    else if (value === ".") {
      // 1. split the expression since operators have spaces around them to make it easier
      const arrValue = currentValue.split(" ");
      // 2. check if the last element in the array has a decimal value
      const lastValueHasDecimal =
        arrValue[arrValue.length - 1].indexOf(".") > -1 && value === ".";
      // 3 . if it has a decimal value return the previous expression, else return the epression+value
      setCurrentValue(
        lastValueHasDecimal ? currentValue : currentValue.concat(value)
      );
      setExpression(
        lastValueHasDecimal ? expression : expression.concat(value)
      );
      return;
    }
    // handles the multiple zeros bug
    else if (value === "0") {
      const arrValue = currentValue.split("");
      if (arrValue.length === 1 && arrValue[0] === "0") {
        return;
      }
    }
    if (operators.includes(currentValue) && !operators.includes(value)) {
      setCurrentValue(currentValue.replace(currentValue, value));
      setExpression(expression.concat(value));
      return;
    }
    if (operators.includes(value)) {
      setCurrentValue(value);
    } else {
      setCurrentValue(currentValue.concat(value));
    }

    setExpression(expression.concat(value));

    // makes sure to append a number after the equal to sign so we can continue with the calculation
    if (expression.includes("=")) {
      if (/[0-9]/.test(value)) {
        setExpression(value);
        setResult(0);
        setCurrentValue(value);
      } else {
        setExpression(result + value);
        setResult(0);
        setCurrentValue(value);
      }
    }
  };

  const handleCalculate = () => {
    if (expression === "") {
      return;
    }
    const filteredExpression = expression
      .replace(/\s+/g, "")
      .match(/(\*|\+|\/|-)?(\.|-)?(\w+)?(\d+)/g)
      .join("");
    // used the math-expression-evaluator library instead of eval since eval is unsafe
    let result;
    try {
      result = Mexp.eval(filteredExpression);
      // set the results to 4 decimal places if it contains a decimal point
      if (result.toString().includes(".")) {
        if (result.toString().split(".")[1].length > 4)
          result = parseFloat(result).toFixed(4);
      }
    } catch (error) {
      result = "Error de formato";
      setExpression("");
    }

    // update "result" with the result of evaluation
    setCurrentValue("");
    setResult(result);
    setExpression((prev) => `${prev}  = ${result}`);
  };

  const handleClearAll = () => {
    setResult(0);
    setExpression("");
    setCurrentValue("");
  };

  const handleClear = () => {
    setExpression((prev) => prev.split("").slice(0, -1).join(""));
    setResult(0);
    setCurrentValue((prev) => prev.split("").slice(0, -1).join(""));
    setResult(0);
  };

  return (
    <div className="App">
      <main>
        <div className="container">
          <div className="calculator d-flex flex-column justify-content-center align-items-center mt-2 pt-2">
            <div className="calculator-container bg-light p-3 rounded">
              <section className="display mb-3 rounded d-flex flex-column justify-content-end align-items-end p-1 text-dark fs-2">
                <div className="fs-4 text-info">{expression}</div>
                <div id="display" className="text-secondary">
                  {currentValue === "" ? result : currentValue}
                </div>
              </section>

              <section className="keys">
                <article id="clear" onClick={handleClearAll}>
                  AC
                </article>
                {keys?.map((key) => (
                  <article
                    id={key.id}
                    key={key.id}
                    onClick={() => handleDisplay(key.value)}
                  >
                    {key.value === " / "
                      ? "÷"
                      : key.value === " Mod "
                      ? "%"
                      : key.value === " root "
                      ? "√"
                      : key.value === " * "
                      ? "x"
                      : key.value}
                  </article>
                ))}
                <article id="cleanOneByOne" onClick={handleClear}>
                  <i class="fa-solid fa-delete-left"></i>
                </article>
                <article id="equals" onClick={handleCalculate}>
                  =
                </article>
              </section>
            </div>
          </div>
          <footer className="text-center text-dark fs-6 mt-1 mb-0 pt-1">
            <p className="mb-0">Designed and Coded with 💙 By</p>
            <p>
              <a
                href="https://github.com/FranciscoLGM"
                target="_blank"
                rel="noreferrer noopener"
                className="text-success"
              >
                FranciscoLGM
              </a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
