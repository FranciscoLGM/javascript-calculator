import { useState } from "react";
import "./App.css";
// import del from "./images/delete-left.svg";

function App() {
  const [display, setDisplay] = useState("0");
  const [result, setResult] = useState("");

  const handleNumber = (event) => {
    const number = event.target.textContent;
    if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
      setResult(eval(display + number));
    }
  };

  const handleOperator = (event) => {
    const operator = event.target.textContent;
    if (operator === "x") {
      setDisplay(`${display}  ${"*"} `);
    } else if (operator === "÷") {
      setDisplay(`${display}  ${"/"} `);
    } else {
      setDisplay(`${display}  ${operator} `);
    }
  };

  const handleEqual = () => {
    setDisplay(eval(display));
    setResult("");
  };

  const handleDecimal = () => {
    const array = display.split(" ");
    const lastElement = array[array.length - 1];

    if (!lastElement.includes(".")) {
      setDisplay(`${display}.`);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setResult("");
  };

  return (
    <div className="App">
      <main>
        <div className="container">
          <div className="calculator d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="calculator-container bg-light p-3 rounded">
              <section className="display mb-3 rounded d-flex flex-column justify-content-end align-items-end p-1 text-dark fs-2">
                <div id="display" className="fs-3">
                  {display}
                </div>
                <div>{result}</div>
              </section>
              <section className="d-flex justify-content-end">
                <article id="clear" onClick={handleClear}>
                  AC
                </article>
                {/* <article id="parentesis">( )</article> */}
                <article id="percentage" onClick={handleOperator}>
                  %
                </article>
                <article id="divide" onClick={handleOperator}>
                  ÷
                </article>
              </section>
              <section className="d-flex">
                <article id="seven" onClick={handleNumber}>
                  7
                </article>
                <article id="eight" onClick={handleNumber}>
                  8
                </article>
                <article id="nine" onClick={handleNumber}>
                  9
                </article>
                <article id="multiply" onClick={handleOperator}>
                  x
                </article>
              </section>
              <section className="d-flex">
                <article id="four" onClick={handleNumber}>
                  4
                </article>
                <article id="five" onClick={handleNumber}>
                  5
                </article>
                <article id="six" onClick={handleNumber}>
                  6
                </article>
                <article id="subtract" onClick={handleOperator}>
                  -
                </article>
              </section>
              <section className="d-flex">
                <article id="one" onClick={handleNumber}>
                  1
                </article>
                <article id="two" onClick={handleNumber}>
                  2
                </article>
                <article id="three" onClick={handleNumber}>
                  3
                </article>
                <article id="add" onClick={handleOperator}>
                  +
                </article>
              </section>
              <section className="d-flex justify-content-end">
                <article id="zero" onClick={handleNumber}>
                  0
                </article>
                <article id="decimal" onClick={handleDecimal}>
                  .
                </article>
                {/* <article id="delete">
                  <img src={del} alt="delete buttom" className="delete" />
                </article> */}
                <article id="equals" onClick={handleEqual}>
                  =
                </article>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
