/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Friday, April 26th 2024, 3:43:38 pm
 * Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import React from "react";
import { IoCalculator } from "react-icons/io5";

import { Button } from "../../../map/utils/button/Button";
import CalculatorModal from "./CalculatorModal";

/**
 * CalculatorSection component.
 *
 * @returns {JSX.Element} The CalculatorSection component.
 */
const CalculatorSection = () => {
  const [calculatorOpen, setCalculatorOpen] = React.useState(false);

  const closeCalculator = () => {
    setCalculatorOpen(false);
  };

  return (
    <>
      <Button
        className="font-medium"
        onClick={() => setCalculatorOpen((prev) => !prev)}
      >
        <IoCalculator className="h-6 w-6" />
      </Button>
      <CalculatorModal show={calculatorOpen} onClose={closeCalculator} />
    </>
  );
};

export default CalculatorSection;
