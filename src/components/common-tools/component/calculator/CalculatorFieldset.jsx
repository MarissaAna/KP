/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Monday, April 29th 2024, 9:28:48 am
 * Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import React from "react";
import { cn } from "../../utils/cn";

/**
 * CalculatorFieldset component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the fieldset.
 * @param {string} props.className - Additional CSS class names for the fieldset.
 * @param {boolean} props.disabled - Whether the fieldset is disabled or not.
 * @returns {JSX.Element} The rendered CalculatorFieldset component.
 */
const CalculatorFieldset = ({ children, className, disabled }) => {
  return (
    <fieldset className={cn("flex gap-x-2.5", className)} disabled={disabled}>
      {children}
    </fieldset>
  );
};

export default CalculatorFieldset;
