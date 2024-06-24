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
 * Button component.
 *
 * @component
 * @param {string} className - The class name for the button.
 * @param {ReactNode} children - The content of the button.
 * @param {Object} props - Additional props for the button.
 * @returns {JSX.Element} The rendered button element.
 */
const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center bg-btn-secondary w-fit h-fit px-6 py-2 rounded-md text-xs hover:bg-primary-20 text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
