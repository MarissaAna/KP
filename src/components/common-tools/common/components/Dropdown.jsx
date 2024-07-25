/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Thursday, April 25th 2024, 3:32:40 pm
 * Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import React from "react";

import { cn } from "../../utils/cn";

/**
 * Dropdown component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the dropdown.
 * @param {string} props.className - The class name for styling the dropdown.
 * @returns {JSX.Element} The rendered dropdown component.
 */
const Dropdown = ({ children, className, onChange, ...props }) => {
  return (
    <select
      className={cn(
        "flex items-center justify-center bg-dark w-fit h-fit px-6 py-2 rounded-md text-xs hover:bg-dark-primary",
        className
      )}
      onChange={onChange}
      {...props}
    >
      {children}
    </select>
  );
};

const DropDownOption = ({ children, className, onChange, ...props }) => {
  return (
    <option className={cn("bg-dark", className)} onChange={onChange} {...props}>
      {children}
    </option>
  );
};

Dropdown.Item = DropDownOption;

export default Dropdown;
