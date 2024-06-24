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
 * A container component that wraps its children with a dark primary background color, rounded corners, and padding.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children elements to be wrapped by the container.
 * @returns {JSX.Element} The rendered container component.
 */
const Container = ({ children, className }) => {
  return (
    <div className={cn(`flex flex-col gap-1 rounded-md z-10`, className)}>
      {children}
    </div>
  );
};

export default Container;
