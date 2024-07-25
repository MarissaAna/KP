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

import React from "react";

import { cn } from "../../utils/cn";
import { formatToTwoDigits } from "./utils/formatter";
import useStopwatch from "./hooks/useStopwatch";
import PlayIcon from "../../common/components/PlayIcon";
import ResetIcon from "../../common/components/ResetIcon";
import BackToTab from "../../common/components/BackToTabIcon";
import PauseIcon from "../../common/components/PauseIcon";

/**
 * StopwatchItem component represents a stopwatch item with start, stop, and reset functionality.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onActiveStopwatch - Callback function to be called when the stopwatch is activated.
 * @param {Function} props.onInactiveStopwatch - Callback function to be called when the stopwatch is deactivated.
 * @returns {JSX.Element} StopwatchItem component.
 */

const StopwatchItem = ({ minimizeStopwatch, title, setTitle, idx }) => {
  const {
    stopStopwatch,
    resetStopwatch,
    isStopwatchOn,
    isStopwatchOff,
    seconds,
    minutes,
    hours,
    playStopwatch,
    totalTime,
    isPlaying,
  } = useStopwatch({
    idx,
  });

  return (
    <div className="flex flex-col gap-3 w-full text-white">
      <div className="flex justify-between items-center gap-[10px]">
        <input
          value={title || `Stopwatch ${idx + 1}`}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={20}
          className="bg-transparent h-6 truncate flex items-center focus:outline-active focus:outline-4 font-semibold flex-1 w-full"
          onFocus={(e) => e.target.select()}
          disabled={isPlaying}
        />
        <button data-testid="minimize-button" onClick={minimizeStopwatch}>
          <BackToTab />
        </button>
      </div>
      <div>
        <div className="flex items-start gap-2 justify-between text-gray">
          <div className="w-[69px] flex flex-col items-center">
            <fieldset
              disabled
              className={
                "flex items-center justify-center rounded-lg border text-md font-medium py-1 px-2 text-xs"
              }
            >
              <input
                readOnly
                className="w-[2ch] bg-transparent focus:outline-none"
                type="text"
                name="hours"
                value={formatToTwoDigits(hours)}
              />
              :
              <input
                readOnly
                className="w-[2ch] bg-transparent focus:outline-none "
                type="text"
                name="minutes"
                value={formatToTwoDigits(minutes)}
              />
              :
              <input
                readOnly
                className="w-[2ch] bg-transparent focus:outline-none"
                type="text"
                name="seconds"
                value={formatToTwoDigits(seconds)}
              />{" "}
            </fieldset>

            <div className="flex text-[10px] gap-1 text-gray">
              <p>hh</p>
              <p>mm</p>
              <p>ss</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                if (isStopwatchOff) {
                  playStopwatch();
                } else if (isStopwatchOn) {
                  stopStopwatch();
                }
              }}
              className={cn(
                "w-6 h-6 rounded-lg flex items-center justify-center bg-btn-primary"
              )}
            >
              {isStopwatchOff ? <PlayIcon /> : <PauseIcon />}
            </button>

            <button
              onClick={resetStopwatch}
              disabled={totalTime === 0}
              className="bg-neutral-3 w-6 h-6 rounded-lg flex items-center justify-center"
            >
              <ResetIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopwatchItem;
