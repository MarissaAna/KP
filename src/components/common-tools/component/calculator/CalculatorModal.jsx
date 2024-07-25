/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Friday, April 26th 2024, 3:47:48 pm
 * Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 * Co author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 *
 */

import React, { createContext } from "react";
import { FaCalculator } from "react-icons/fa";

import MoveableModal from "../../common/components/MoveableModal";
import CalculatorBasic from "./basic-calculator/CalculatorBasic";
// import CalculatorScientific from "./scientific-calculator/CalculatorScientific";
import CalculatorMode from "./CalculatorMode";
// import CalculatorProgramming from "./programming-calculator/CalculatorProgramming";
import useHistory from "./hooks/useHistory";

/**
 * CalculatorModal component represents a modal that displays a calculator.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - The function to be called when the modal is closed.
 * @returns {JSX.Element} The rendered CalculatorModal component.
 */

export const historyContext = createContext(null);
const CalculatorModal = ({ onClose, show }) => {
  const [calculatorMode, setCalculatorMode] = React.useState("Basic");
  const [openHistorySheet, setOpenHistorySheet] = React.useState(false);
  const history = useHistory();

  return (
    <MoveableModal
      id="calculator-modal"
      data-testid="calculator-modal"
      name={`Calculator`}
      icon={<FaCalculator />}
      onClose={onClose}
      show={show}
    >
      <historyContext.Provider
        value={{ history, openHistorySheet, setOpenHistorySheet }}
      >
        <div className="h-full w-[484px] p-3 rounded shadow flex flex-col relative">
          <CalculatorMode
            calculatorMode={calculatorMode}
            onChange={(newValue) => setCalculatorMode(newValue)}
            openHistory={() => setOpenHistorySheet(true)}
          />

          {calculatorMode === "Basic" && calculatorMode !== "none" && (
            <CalculatorBasic />
          )}
          {calculatorMode === "Scientific" && calculatorMode !== "none" && (
            <CalculatorScientific />
          )}
          {calculatorMode === "Programming" && calculatorMode !== "none" && (
            <CalculatorProgramming calculatorMode={calculatorMode} />
          )}
        </div>
      </historyContext.Provider>
    </MoveableModal>
  );
};

export default CalculatorModal;
