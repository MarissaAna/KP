/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Tuesday, June 10th 2024, 10:09:18 am
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 *
 */

import { Big } from "big.js";

import { useContext, useState } from "react";
import useStack from "../../hooks/useStack";
import { historyContext } from "../../CalculatorModal";

/**
 * Initial value for the calculator.
 *
 * @type {Object}
 * @property {Array<string>} stack - The stack of numbers and operators.
 * @property {Array} historyStack - The stack to store the history of calculations.
 * @property {string|null} operation - The current operation being performed.
 */

const isUnaryHistory = (history) => {
  if (!history) return false;
  return ["√(", "sqr(", "1/("].some((item) => history.includes(item));
};

const isOperator = (history) => {
  if (!history) return false;
  return ["+", "-", "×", "÷"].some((item) => history === item);
};

const evaluateUnary = (oldValue, payload) => {
  try {
    switch (payload) {
      case "√":
        return {
          value: new Big(oldValue).sqrt().round(15).toFixed(),
          getSymbol: (value) => `√(${value})`,
        };
      case "x2":
        return {
          value: new Big(oldValue).pow(2).round(15).toFixed(),
          getSymbol: (value) => `sqr(${value})`,
        };
      case "1/x":
        return {
          value: new Big(oldValue).pow(-1).round(15).toFixed(),
          getSymbol: (value) => `1/(${value})`,
        };
      case "%": {
        const value = new Big(oldValue).div(100).round(15).toFixed();
        return {
          value,
          getSymbol: (value) => value,
        };
      }
    }
  } catch (error) {
    return {
      error: "Error",
    };
  }
};
/**
 * Evaluates the mathematical expression based on the given previous value, current value, and operator.
 *
 * @param {number|string} previousValue - The previous value in the expression.
 * @param {number|string} currentValue - The current value in the expression.
 * @param {string} operator - The operator used in the expression.
 * @returns {string} - The result of the evaluation.
 */
export function evaluate(previousValue, currentValue, operator) {
  try {
    const previous = parseFloat(previousValue || "");
    const current = parseFloat(currentValue || "");
    switch (operator) {
      case "+":
        return Big(current).plus(previous).round(20).toFixed();
      case "-":
        return Big(current).minus(previous).round(20).toFixed();
      case "×":
        return Big(current).mul(previous).round(20).toFixed();
      case "÷":
        return Big(current).div(previous).round(20).toFixed();
      default:
        throw new Error();
    }
  } catch (error) {
    return "Error";
  }
}

export function useCalculatorBasic() {
  const operandStack = useStack([{ value: "0" }]);
  const operatorStack = useStack([]);
  const historyStack = useStack([]);
  const [previous, setPrevious] = useState(null);
  const { history } = useContext(historyContext);

  const current = operandStack.getHead();
  const currentValue = current?.value;

  const addCurrentStateToHistory = (state, result) => {
    history.add({
      historyValue: state.map((item) => ({ value: item })),
      operand: result,
      operator: [state[1]],
    });
  };

  const setCalculatorState = ({ historyValue, operand }) => {
    historyStack.setStack(historyValue.map((item) => item.value));
    operandStack.setStack([{ value: operand }]);
    operatorStack.reset();
    setPrevious({
      operand: { value: historyValue[2].value },
      operator: historyValue[1].value,
    });
  };

  const dispatch = ({ type, payload }) => {
    switch (type) {
      case "ADD_DIGIT": {
        if (currentValue === "0" && payload.digit !== ".") {
          operandStack.setHead({ value: payload.digit });
          return;
        }
        // E.g :
        // Curr = 2, PrevCurr = 2, Payload = 2 ==> Curr = 22
        // Curr = 2, PrevCurr = 2, Payload = 5 ==> Curr = 5
        const previousCurrentValue =
          operandStack.stack[operandStack.stack.length - 2]?.value;
        if (
          currentValue === previousCurrentValue &&
          payload.digit !== previousCurrentValue
        ) {
          operandStack.setHead({ value: payload.digit });
          return;
        }
        if (payload?.digit === "." && currentValue.includes(".")) {
          return;
        }
        operandStack.setHead({ value: `${currentValue}${payload.digit}` });
        return;
      }

      case "CLEAR": {
        operandStack.reset();
        operatorStack.reset();
        break;
      }

      case "RESET": {
        operandStack.reset();
        operatorStack.reset();
        historyStack.reset();
        setPrevious(null);
        break;
      }

      case "BACKSPACE":
        if (currentValue === "Error") {
          operandStack.reset();
          break;
        }
        if (currentValue === "0") break;
        // E.g : -2 to 0
        if (currentValue.includes("-") && currentValue.length === 2) {
          operandStack.setHead({ value: "0" });
          break;
        }
        if (currentValue.length < 2) {
          operandStack.setHead({ value: "0" });
        } else {
          operandStack.setHead({ value: currentValue.slice(0, -1) });
        }
        break;

      case "UNARY": {
        if (
          operatorStack.isEmpty() &&
          !isUnaryHistory(historyStack.getHead())
        ) {
          historyStack.reset();
        }
        const { value, getSymbol, error } = evaluateUnary(
          currentValue,
          payload
        );
        if (error) {
          operandStack.setHead({ value: "Error" });
          break;
        }
        // add to history
        if (isUnaryHistory(historyStack.getHead())) {
          historyStack.setHead(getSymbol(historyStack.getHead()));
          operandStack.setHead({
            value,
            symbol: getSymbol(historyStack.getHead()),
          });
        } else if (payload === "%") {
          if (isOperator(historyStack.getHead())) {
            historyStack.push(getSymbol(value));
          } else {
            historyStack.setHead(getSymbol(value));
          }
          operandStack.setHead({
            value,
            symbol: "%",
          });
        } else {
          historyStack.push(getSymbol(currentValue));
          operandStack.setHead({
            value,
            symbol: getSymbol(currentValue),
          });
        }
        break;
      }

      case "SET_OPERATION": {
        let previousHistoryStack = [];
        if (isUnaryHistory(historyStack.getHead())) {
          previousHistoryStack = [...historyStack.stack];
          previousHistoryStack.pop();
        } else if (current.symbol === "%") {
          previousHistoryStack.push(currentValue);
        }

        if (operatorStack.stack.length) {
          // Evaluate last
          const leftOperand =
            operandStack.stack[operandStack.stack.length - 2].value;
          operandStack.pop();
          operandStack.pop();
          const operator = operatorStack.pop();
          const result = evaluate(currentValue, leftOperand, operator);
          operandStack.push({ value: result });
          operandStack.push({ value: result });
          if (current.symbol && current.symbol !== "%") {
            previousHistoryStack.push(current.symbol);
          } else {
            if (current.symbol === "%") previousHistoryStack = [];
            previousHistoryStack.push(result);
          }
          previousHistoryStack.push(payload.operation);
        } else {
          // currentValue : 2 or sqrt(2)
          if (current.symbol && current.symbol !== "%") {
            previousHistoryStack.push(current.symbol);
          } else {
            if (current.symbol === "%") previousHistoryStack = [];
            previousHistoryStack.push(currentValue);
          }
          previousHistoryStack.push(payload.operation);
          operandStack.push({ value: currentValue });
          operandStack.push({ value: currentValue });
        }
        operatorStack.push(payload.operation);
        historyStack.setStack(previousHistoryStack);
        break;
      }

      case "EVALUATE": {
        // TODOOOO
        if (operatorStack.isEmpty()) {
          if (!previous) return;
          const leftOperand = operandStack.getHead();
          operandStack.pop();
          const result = evaluate(
            previous.operand.value,
            leftOperand.value,
            previous.operator
          );
          operandStack.push({ value: result });
          const previousHistoryStack = [...historyStack.stack];
          if (
            !isUnaryHistory(historyStack.getHead()) &&
            current.symbol !== "%"
          ) {
            previousHistoryStack.push(currentValue);
          }
          previousHistoryStack.length = 0;
          previousHistoryStack.push(currentValue);
          previousHistoryStack.push(previous.operator);
          previousHistoryStack.push(previous.operand.value);
          previousHistoryStack.push("=");
          addCurrentStateToHistory(previousHistoryStack, result);
          historyStack.setStack(previousHistoryStack);
          break;
        }
        // Evaluate last
        const leftOperand =
          operandStack.stack[operandStack.stack.length - 2].value;
        operandStack.pop();
        operandStack.pop();
        const operator = operatorStack.pop();
        const result = evaluate(currentValue, leftOperand, operator);
        operandStack.push({ value: result });
        setPrevious({ operand: current, operator });
        const previousHistoryStack = [...historyStack.stack];
        if (!isUnaryHistory(historyStack.getHead()) && current.symbol !== "%") {
          previousHistoryStack.push(currentValue);
        }
        previousHistoryStack.push("=");
        addCurrentStateToHistory(previousHistoryStack, result);
        historyStack.setStack(previousHistoryStack);
        break;
      }

      case "INVERT": {
        operandStack.setHead({ value: String(parseFloat(currentValue) * -1) });
        break;
      }
    }
  };

  let isDisabledButton;
  const historyValue = historyStack.stack.join("");

  try {
    isDisabledButton = currentValue.length > 18 || currentValue === "Error";
  } catch (error) {
    isDisabledButton = true;
  }

  return {
    dispatch,
    currentValue,
    historyValue,
    isDisabledButton,
    setCalculatorState,
    setHead: operandStack.setHead,
  };
}
