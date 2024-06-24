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

import { cn } from "../../utils/cn";
import { formatToTwoDigits } from "./utils/formatter";
import useTimer from "./hooks/useTimer";

import PlayIcon from "../../common/components/PlayIcon";
import ReplayIcon from "../../common/components/ReplayIcon";
import BackToTab from "../../common/components/BackToTabIcon";
import PauseIcon from "../../common/components/PauseIcon";

/**
 * TimerItem component represents a timer item with various functionalities.
 *
 * @returns {JSX.Element} The TimerItem component.
 */
const TimerItem = ({
  idx,
  minimizeTimer,
  title,
  setTitle,
  description,
  setDescription,
}) => {
  const {
    stopTimer,
    resetTimer,
    changeInputTime,
    isTimerOn,
    isTimerOff,
    seconds,
    minutes,
    hours,
    playOrResume,
  } = useTimer({
    idx,
  });

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center gap-[10px]">
        <input
          value={title || `Timer ${idx + 1}`}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={20}
          className="bg-transparent h-6 truncate flex items-center focus:outline-active focus:outline-4 font-semibold flex-1"
          onFocus={(e) => e.target.select()}
        />
        <button data-testid="minimize-button" onClick={minimizeTimer}>
          <BackToTab />
        </button>
      </div>
      <div className="flex items-start gap-2 justify-between">
        <div
          className={cn("flex flex-col gap-1 ", {
            "text-neutral-2": isTimerOn,
          })}
        >
          <fieldset
            disabled={!isTimerOff}
            className={
              "flex items-center justify-center rounded-lg border text-xs font-medium p-1"
            }
          >
            <input
              className="w-[2ch] bg-transparent focus:outline-none"
              type="text"
              name="hours"
              value={formatToTwoDigits(hours)}
              onChange={(e) => changeInputTime(e, "hours")}
              onFocus={(e) => e.target.select()}
            />
            :
            <input
              className="w-[2ch] bg-transparent focus:outline-none"
              type="text"
              name="minutes"
              value={formatToTwoDigits(minutes)}
              onChange={(e) => changeInputTime(e, "minutes")}
              onFocus={(e) => e.target.select()}
            />
            :
            <input
              className="w-[2ch] bg-transparent focus:outline-none"
              type="text"
              name="seconds"
              value={formatToTwoDigits(seconds)}
              onChange={(e) => changeInputTime(e, "seconds")}
              onFocus={(e) => e.target.select()}
            />{" "}
          </fieldset>
          <div className="flex text-xs gap-1 px-1">
            <p>hh</p>
            <p>mm</p>
            <p>ss</p>
          </div>
        </div>
        <div className="w-full flex flex-col flex-1">
          <div className="relative w-full">
            <input
              value={description || "Input Text to Show"}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!isTimerOff}
              maxLength={50}
              onFocus={(e) => {
                e.currentTarget.select();
              }}
              className="rounded-lg px-2 py-[6px] flex items-center bg-bg2-150 w-full text-xs focus:outline-active focus:outline-4 appearance-none pl-3 h-[27px]"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (isTimerOff) {
                playOrResume();
                return;
              }
              if (isTimerOn) {
                stopTimer();
                return;
              }
            }}
            className={cn(
              "w-6 h-6 rounded-lg flex items-center justify-center bg-btn-primary"
            )}
          >
            {isTimerOff ? <PlayIcon /> : <PauseIcon />}
          </button>

          <button
            onClick={resetTimer}
            className="bg-neutral-3 w-6 h-6 rounded-lg flex items-center justify-center"
          >
            <ReplayIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
export default TimerItem;
