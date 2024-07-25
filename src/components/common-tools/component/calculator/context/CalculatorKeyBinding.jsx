/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Tuesday, April 30th 2024, 4:27:15 pm
 * Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import React from "react";

import { isNumeric } from "../utils/formatter";

const CalculatorKeyBindingContext = React.createContext();

const CalculatorKeyBindingProvider = ({ children, calculator, type }) => {
  const handleUserKeyPress = React.useCallback(
    (event) => {
      event.preventDefault();
      const { key, keyCode } = event;

      if (key === "Escape" && keyCode === 27)
        calculator.dispatch({ type: "CLEAR" });

      if (key === "Backspace" && keyCode === 8)
        calculator.dispatch({ type: "BACKSPACE" });

      if (calculator.isDisabledButton) return;

      if (isNumeric(key)) {
        calculator.addDigit(key);
      }

      // Basic operation key binding
      if (key === "Enter" && keyCode === 13)
        calculator.dispatch({ type: "EVALUATE" });
      if (key === ",") calculator.addDigit(".");
      if (key === "+") calculator.setOperation("+");
      if (key === "*") calculator.setOperation("×");
      if (key === "/") calculator.setOperation("÷");
      if (key === "-") calculator.setOperation("-");

      // Special key for scientific calculation
      if (type === "Scientific") {
        // TO-DO: Add key binding for scientific calculator
      }

      // Special key for programming calculation
      if (type === "Programming") {
        // TO-DO: Add key binding for programming calculator
      }
    },
    [calculator.isDisabledButton]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <CalculatorKeyBindingContext.Provider value={null}>
      {children}
    </CalculatorKeyBindingContext.Provider>
  );
};

export default CalculatorKeyBindingProvider;
