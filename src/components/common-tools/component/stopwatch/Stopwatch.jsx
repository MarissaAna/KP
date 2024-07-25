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
 * Co-Author: Annisa Nailiya Zahroh | annisanailiyazahroh02@gmail.com <https://github.com/annisanailiya>
 *
 */

import { useState } from "react";

import StopwatchMinimize from "./StopwatchMinimize";
import StopwatchMaximize from "./StopwatchMaximize";
import { StopwatchContextProvider } from "./context/StopwatchContext";

/**
 * Timer co mponen t.
 *
 * @param {Ob ject} props  - The component props.
 *  @param {Function} props.onClose - The function to be called when the timer is closed.
 * @returns {JSX.Element} The Timer component.
 */

const Stopwatch = ({ onClose, show }) => {
  const [isMinimizing, setIsMinimizing] = useState(false);

  const maximizeStopwatch = () => {
    setIsMinimizing(false);
  };

  const minimizeStopwatch = () => {
    setIsMinimizing(true);
  };

  return (
    <StopwatchContextProvider show={show} id="leftWindow">
      {isMinimizing ? (
        <StopwatchMinimize
          minimizeStopwatch={minimizeStopwatch}
          onClose={onClose}
          show={show}
          maximizeStopwatch={maximizeStopwatch}
        />
      ) : (
        <StopwatchMaximize
          onClose={onClose}
          show={show}
          minimizeStopwatch={minimizeStopwatch}
        />
      )}
    </StopwatchContextProvider>
  );
};

export default Stopwatch;
