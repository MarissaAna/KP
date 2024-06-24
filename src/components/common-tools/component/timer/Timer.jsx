/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Saturday, April 27th 2024, 12:52:16 pm
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 *
 */

import FlashComponent from "../../common/components/Flash";
import { FlashContextProvider } from "../../context/FlashContext";
import Toast from "./Toast";
import { ToastContextProvider } from "./context/ToastContext";
import TimerMinimize from "./TimerMinimize";
import TimerMaximize from "./TimerMaximize";
import { useState } from "react";
import { TimerContextProvider } from "./context/TimerContext";

/**
 * Timer co mponen t.
 *
 * @param {Ob ject} props  - The component props.
 *  @param {Function} props.onClose - The function to be called when the timer is closed.
 * @returns {JSX.Element} The Timer component.
 */

const Timer = ({ onClose, show }) => {
  const [isMinimizing, setIsMinimizing] = useState(false);

  const maximizeTimer = () => {
    setIsMinimizing(false);
  };

  const minimizeTimer = () => {
    setIsMinimizing(true);
  };

  return (
    <FlashContextProvider>
      <ToastContextProvider>
        <TimerContextProvider show={show}>
          {isMinimizing ? (
            <TimerMinimize
              minimizeTimer={minimizeTimer}
              onClose={onClose}
              show={show}
              maximizeTimer={maximizeTimer}
            />
          ) : (
            <TimerMaximize
              onClose={onClose}
              show={show}
              minimizeTimer={minimizeTimer}
            />
          )}
        </TimerContextProvider>
        <FlashComponent />
        <Toast />
      </ToastContextProvider>
    </FlashContextProvider>
  );
};

export default Timer;
