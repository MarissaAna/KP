import React from "react";
import {
  formatNumber,
  formatBinary,
  formatHex,
  formatOctal,
} from "./utils/formatter";

const CalculatorDisplay = ({
  historyValue,
  currentValue,
  typeGroup,
  displayedValues,
}) => {
  const formatters = {
    bin: formatBinary,
    hex: formatHex,
    oct: formatOctal,
    dec: formatNumber,
  };

  const formatter = formatters[typeGroup] || formatNumber;

  return (
    <div
      data-testid="calculator-display"
      className="flex flex-col items-end gap-2 border border-white rounded-lg py-2 px-[10px] my-5"
    >
      <p
        dangerouslySetInnerHTML={{ __html: historyValue || "-" }}
        className={`text-right text-white text-xs ${
          !historyValue ? "invisible" : "visible"
        }`}
      ></p>
      <p className="text-right text-[18px] text-white font-bold leading-[1]">
        {["bin", "hex", "oct", "dec"].includes(typeGroup)
          ? formatter(displayedValues)
          : formatNumber(currentValue)}
      </p>
    </div>
  );
};

export default CalculatorDisplay;
