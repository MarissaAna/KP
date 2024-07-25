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

import { FaAngleDown } from "react-icons/fa";
import BackToTab from "../../common/components/BackToTabIcon";
import MoveableModal from "../../common/components/MoveableModal";
import TimerIcon from "../../common/components/TimerIcon";
import { cn } from "../../utils/cn";
import PlayIcon from "../../common/components/PlayIcon";
import ResetIcon from "../../common/components/ResetIcon";
import { formatToTwoDigits } from "./utils/formatter";
import useStopwatch from "./hooks/useStopwatch";
import { useStopwatchContext } from "./context/StopwatchContext";
import PauseIcon from "../../common/components/PauseIcon";

const StopwatchMinimizeContent = ({
  idx,
  show,
  onClickNext,
  onClickPrev,
  title,
  setTitle,
  totalTime,
  onActiveStopwatch,
  onInactiveStopwatch,
}) => {
  const {
    stopStopwatch,
    resetStopwatch,
    isStopwatchOn,
    isStopwatchOff,
    seconds,
    minutes,
    hours,
    playStopwatch,
    isPlaying,
  } = useStopwatch({
    idx,
    onActiveStopwatch,
    onInactiveStopwatch,
    totalTime,
    setTotalTime: (newTime) => (totalTime[idx] = newTime),
  });

  return (
    <div
      data-testid="stopwatch-minimize"
      className={cn(
        "p-3 flex flex-col justify-center gap-3 items-center text-white",
        {
          "hidden invisible opacity-0 pointer-events-none": !show,
        }
      )}
    >
      <input
        maxLength={20}
        value={title || `Stopwatch ${idx + 1}`}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-transparent w-32 truncate font-bold leading-5 text-center focus:outline-active focus:outline-4"
        onFocus={(e) => e.target.select()}
        disabled={isPlaying}
      />
      <div className="flex items-center gap-[10px]">
        <button onClick={onClickPrev}>
          <FaAngleDown className="rotate-90 w-70 h-6" />
        </button>

        <div className="flex-none w-[88px] h-[88px] rounded-full border flex items-center justify-center">
          <fieldset
            disabled
            className={cn(
              "flex items-center justify-center rounded-lg text-xs font-medium py-1 w-[88px] text-gray",
              {
                "text-neutral-2": isStopwatchOn,
              }
            )}
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
            />
          </fieldset>
        </div>

        <button onClick={onClickNext}>
          <FaAngleDown className="-rotate-90 w-6 h-6" />
        </button>
      </div>

      <div className="flex gap-2 justify-center">
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
          disabled={totalTime === 0}
          onClick={resetStopwatch}
          className="bg-neutral-3 w-6 h-6 rounded-lg flex items-center justify-center"
        >
          <ResetIcon />
        </button>
      </div>
    </div>
  );
};

const StopwatchMinimize = ({ onClose, show, maximizeStopwatch }) => {
  const {
    totalTimes,
    activeStopwatchId,
    onClickNext,
    onClickPrev,
    getTitle,
    setTitle,
  } = useStopwatchContext();

  return (
    <MoveableModal
      id="stopwatch-modal"
      title={
        <div className="scale-x-[-1] h-[24px]">
          <button onClick={maximizeStopwatch}>
            <BackToTab />
          </button>
        </div>
      }
      name={`Stopwatch`}
      icon={<TimerIcon />}
      onClose={onClose}
      show={show}
      className="w-[200px]"
    >
      {totalTimes.map((totalTime, i) => (
        <StopwatchMinimizeContent
          key={i}
          idx={i}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          show={i === activeStopwatchId}
          title={getTitle(i)}
          setTitle={(newVal) => setTitle(i, newVal)}
          totalTime={totalTime}
        />
      ))}
    </MoveableModal>
  );
};

export default StopwatchMinimize;
