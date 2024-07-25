/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Tuesday, April 25th 2024, 15:25:18 pm
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 * Co-Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import React, { useContext } from "react";

import CalculatorButton from "../CalculatorButton";
import CalculatorDisplay from "../CalculatorDisplay";
import CalculatorFieldset from "../CalculatorFieldset";
import CalculatorKeyBindingProvider from "../context/CalculatorKeyBinding";
import DeleteIcon from "../../../common/components/DeleteIcon";
import { useCalculatorBasic } from "./hooks/useCalculatorBasic";
import HistorySection from "../../shared/HistorySection";
import { historyContext } from "../CalculatorModal";

/**
 * CalculatorBasic component represents a basic calculator.
 * It displays a calculator display and buttons for performing calculations.
 */
const CalculatorBasic = () => {
  const {
    historyValue,
    currentValue,
    dispatch,
    isDisabledButton,
    setHead,
    setCalculatorState,
  } = useCalculatorBasic();

  const { openHistorySheet, setOpenHistorySheet } = useContext(historyContext);

  const addDigit = (number) => {
    dispatch({ type: "ADD_DIGIT", payload: { digit: number } });
  };

  const setOperation = (operation) => {
    dispatch({ type: "SET_OPERATION", payload: { operation } });
  };

  return (
    <div data-testid="calculator-basic">
      <HistorySection
        openSheet={openHistorySheet}
        setOpenSheet={setOpenHistorySheet}
        setCalculatorState={setCalculatorState}
      />
      <CalculatorKeyBindingProvider
        type="Basic"
        calculator={{ isDisabledButton, dispatch, addDigit, setOperation }}
      >
        <CalculatorDisplay
          historyValue={historyValue}
          currentValue={currentValue}
        />

        <div className="flex flex-col gap-2 text-white">
          <div className="flex justify-between gap-2">
            <CalculatorButton
              disabled={isDisabledButton}
              onClick={() => {
                dispatch({
                  type: "UNARY",
                  payload: "%",
                });
              }}
            >
              <CalculatorButton.Label className={"text-base"}>
                %
              </CalculatorButton.Label>
            </CalculatorButton>

            <CalculatorButton
              onClick={() => {
                dispatch({
                  type: "CLEAR",
                });
              }}
            >
              <CalculatorButton.Label>AC</CalculatorButton.Label>
            </CalculatorButton>

            <CalculatorButton onClick={() => dispatch({ type: "RESET" })}>
              <CalculatorButton.Label>CE</CalculatorButton.Label>
            </CalculatorButton>

            <CalculatorButton
              data-testid="backspace"
              className="text-red-200"
              onClick={() => {
                dispatch({
                  type: "BACKSPACE",
                });
              }}
            >
              <DeleteIcon />
            </CalculatorButton>
          </div>

          <CalculatorFieldset
            disabled={isDisabledButton}
            className="flex justify-between gap-2 h-7"
          >
            <CalculatorButton
              onClick={() => {
                dispatch({
                  type: "UNARY",
                  payload: "1/x",
                });
              }}
            >
              <CalculatorButton.Label>1/x</CalculatorButton.Label>
            </CalculatorButton>

            <CalculatorButton
              data-testid="x2"
              onClick={() => {
                dispatch({
                  type: "UNARY",
                  payload: "x2",
                });
              }}
            >
              <CalculatorButton.Label>
                x<sup>2</sup>
              </CalculatorButton.Label>
            </CalculatorButton>

            <CalculatorButton
              onClick={() => {
                dispatch({
                  type: "UNARY",
                  payload: "√",
                });
              }}
            >
              <CalculatorButton.Label>√</CalculatorButton.Label>
            </CalculatorButton>

            <CalculatorButton
              onClick={() => {
                setOperation("÷");
              }}
            >
              <CalculatorButton.Label className={"text-base"}>
                ÷
              </CalculatorButton.Label>
            </CalculatorButton>
          </CalculatorFieldset>

          <CalculatorFieldset
            disabled={isDisabledButton}
            className="flex justify-between gap-2 h-7"
          >
            <CalculatorButton
              onClick={() => {
                addDigit("7");
              }}
            >
              <CalculatorButton.Label>7</CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              onClick={() => {
                addDigit("8");
              }}
            >
              <CalculatorButton.Label>8</CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              onClick={() => {
                addDigit("9");
              }}
            >
              <CalculatorButton.Label>9</CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              onClick={() => {
                setOperation("×");
              }}
            >
              <CalculatorButton.Label className="text-base">
                ×
              </CalculatorButton.Label>
            </CalculatorButton>
          </CalculatorFieldset>

          <CalculatorFieldset
            disabled={isDisabledButton}
            className="flex justify-between gap-2 h-7 "
          >
            <CalculatorButton
              data-testid="4"
              onClick={() => {
                addDigit("4");
              }}
            >
              <CalculatorButton.Label>4</CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              onClick={() => {
                addDigit("5");
              }}
            >
              <CalculatorButton.Label>5</CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              onClick={() => {
                addDigit("6");
              }}
            >
              <CalculatorButton.Label>6</CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              onClick={() => {
                setOperation("-");
              }}
            >
              <CalculatorButton.Label className={"text-base"}>
                -
              </CalculatorButton.Label>
            </CalculatorButton>
          </CalculatorFieldset>

          <CalculatorFieldset
            disabled={isDisabledButton}
            className="flex justify-between gap-2 h-7 "
          >
            <CalculatorButton
              onClick={() => {
                addDigit("1");
              }}
            >
              <CalculatorButton.Label>1</CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              data-testid="two"
              onClick={() => {
                addDigit("2");
              }}
            >
              <CalculatorButton.Label>2</CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              onClick={() => {
                addDigit("3");
              }}
            >
              <CalculatorButton.Label>3</CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              onClick={() => {
                setOperation("+");
              }}
            >
              <CalculatorButton.Label className="text-base">
                +
              </CalculatorButton.Label>
            </CalculatorButton>
          </CalculatorFieldset>

          <CalculatorFieldset
            disabled={isDisabledButton}
            className="flex justify-between gap-x-2.5 h-7 "
          >
            <CalculatorButton
              onClick={() => {
                dispatch({
                  type: "INVERT",
                });
              }}
            >
              <CalculatorButton.Label className="text-base">
                ±
              </CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              data-testid="0"
              onClick={() => {
                addDigit("0");
              }}
            >
              <CalculatorButton.Label>0</CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              onClick={() => {
                addDigit(".");
              }}
            >
              <CalculatorButton.Label>.</CalculatorButton.Label>
            </CalculatorButton>
            <CalculatorButton
              onClick={() => {
                dispatch({ type: "EVALUATE" });
              }}
            >
              <CalculatorButton.Label>=</CalculatorButton.Label>
            </CalculatorButton>
          </CalculatorFieldset>
        </div>
      </CalculatorKeyBindingProvider>
    </div>
  );
};

export default CalculatorBasic;
