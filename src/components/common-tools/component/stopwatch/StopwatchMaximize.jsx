/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Saturday, June 12th 2024, 09:00:00 am
 * Author: Annisa Nailiya Zahroh | annisanailiyazahroh02@gmail.com <https://github.com/annisanailiya>
 *
 */

import React from "react";
import MoveableModal from "../../common/components/MoveableModal";
import StopwatchItem from "./StopwatchItem";
import TimerIcon from "../../common/components/TimerIcon";
import { useStopwatchContext } from "./context/StopwatchContext";

const StopwatchMaximize = ({ onClose, show, minimizeStopwatch }) => {
  const { totalTimes, setActiveStopwatch, getTitle, setTitle } =
    useStopwatchContext();

  return (
    <MoveableModal
      id="stopwatch-modal"
      title={<p>Stopwatch</p>}
      icon={<TimerIcon />}
      onClose={onClose}
      show={show}
    >
      <div
        data-testid="stopwatch-maximize"
        className="flex flex-col items-center w-56 py-5 px-2 gap-4"
      >
        {totalTimes.map((_, i) => (
          <StopwatchItem
            key={i}
            idx={i}
            title={getTitle(i)}
            setTitle={(newVal) => setTitle(i, newVal)}
            minimizeStopwatch={() => {
              setActiveStopwatch(i);
              minimizeStopwatch();
            }}
          />
        ))}
      </div>
    </MoveableModal>
  );
};

export default StopwatchMaximize;
