/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Friday, April 26th 2024, 3:59:00 pm
 * Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import React from "react";

// import Dropdown from "../../common/components/Dropdown";
// import HistoryIcon from "../../common/components/HistoryIcon";
import { cn } from "../../utils/cn";

/**
 * CalculatorMode component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the select element.
 * @param {ReactNode} props.children - The child elements to be rendered inside the select element.
 * @returns {JSX.Element} The rendered CalculatorMode component.
 */
const CalculatorMode = ({
  children,
  className,
  calculatorMode,
  onChange,
  openHistory,
  ...props
}) => {
  return (
    <div
      className={cn("bg-transparent flex items-center gap-[10px]", className)}
      {...props}
    >
      <div className="flex justify-between items-center w-full">
        <div className="bg-transparent flex items-center gap-[10px]">
          <button
            className={cn(
              "flex p-2 items-center rounded-lg text-white text-xs font-semibold",
              {
                "bg-btn-secondary ": calculatorMode === "Basic",
              }
            )}
            value="Basic"
            onClick={() => onChange("Basic")}
          >
            Basic
          </button>
          {/* <button
            className={cn(
              "flex p-2 items-center rounded-lg bg-btn-secondary text-text text-xs font-semibold",
              {
                "text-primary-20": calculatorMode === "Scientific",
              }
            )}
            value="Scientific"
            onClick={() => onChange("Scientific")}
          >
            Scientific
          </button>
          <button
            className={cn(
              "flex p-2 items-center rounded-lg bg-btn-secondary text-text text-xs font-semibold",
              {
                "text-primary-20": calculatorMode === "Programming",
              }
            )}
            value="Programming"
            onClick={() => onChange("Programming")}
          >
            Programming
          </button> */}
        </div>

        {/* {calculatorMode !== "Programming" && (
          <button onClick={openHistory} className="w-6 h-6">
            <HistoryIcon />
          </button>
        )} */}
      </div>
    </div>
  );
};

// const CalculatorModeItem = ({ children, ...props }) => {
//   return <Dropdown.Item {...props}>{children}</Dropdown.Item>;
// };

// CalculatorMode.Item = CalculatorModeItem;

export default CalculatorMode;
