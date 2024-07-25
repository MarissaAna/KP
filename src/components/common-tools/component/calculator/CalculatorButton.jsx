/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Thursday, April 25th 2024, 3:21:42 pm
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 * Co-Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import { cn } from "../../utils/cn";

/**
 * CalculatorButton component represents a button in a calculator.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.children - The content of the button.
 * @param {string} props.className - Additional CSS classes for the button.
 * @returns {JSX.Element} The rendered CalculatorButton component.
 */
const CalculatorButton = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "flex place-items-center justify-center rounded-lg text-white bg-accent-3 hover:bg-neutral-2 active:text-primary-20 active:bg-accent-4 text-xs font-bold w-full disabled:opacity-40 disabled:bg-neutral-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] h-[30px]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const CalculatorButtonLabel = ({ children, className, props }) => {
  return (
    <span className={cn("text-xs font-bold", className)} {...props}>
      {children}
    </span>
  );
};

CalculatorButton.Label = CalculatorButtonLabel;
export default CalculatorButton;
