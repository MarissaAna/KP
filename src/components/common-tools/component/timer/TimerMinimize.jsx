import { FaAngleDown } from "react-icons/fa";
import BackToTab from "../../common/components/BackToTabIcon";
import MoveableModal from "../../common/components/MoveableModal";
import TimerIcon from "../../common/components/TimerIcon";
import { cn } from "../../utils/cn";
import PlayIcon from "../../common/components/PlayIcon";
import ReplayIcon from "../../common/components/ReplayIcon";
import { formatToTwoDigits } from "./utils/formatter";
import useTimer from "./hooks/useTimer";
import { useTimerContext } from "./context/TimerContext";
import PauseIcon from "../../common/components/PauseIcon";

const TimerMinimizeContent = ({
  idx,
  show,
  onClickNext,
  onClickPrev,
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
    <div
      data-testid="timer-minimize"
      className={cn(
        "p-3 pb-2 w-40 flex flex-col gap-3 items-center text-white",
        {
          "hidden invisible opacity-0 pointer-events-none": !show,
        }
      )}
    >
      <input
        maxLength={20}
        value={title || `Timer ${idx + 1}`}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-transparent w-32 truncate focus:outline-active focus:outline-4 font-bold leading-5 text-center"
        onFocus={(e) => e.target.select()}
      />
      <div className="flex items-center gap-[10px]">
        <button onClick={onClickPrev}>
          <FaAngleDown className="rotate-90 w-6 h-6" />
        </button>

        <div className="flex-none w-[88px] h-[88px] rounded-full border flex items-center justify-center">
          <fieldset
            disabled={!isTimerOff}
            className={cn(
              "flex items-center justify-center rounded-lg text-xs font-medium p-1 w-[88px]",
              {
                "text-neutral-2": isTimerOn,
              }
            )}
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
              className="w-[2ch] bg-transparent focus:outline-none "
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
        </div>

        <button onClick={onClickNext}>
          <FaAngleDown className="-rotate-90 w-6 h-6" />
        </button>
      </div>

      <div className="flex gap-2 justify-center">
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

      <input
        value={description || "Input Text to Show"}
        onChange={(e) => setDescription(e.target.value)}
        disabled={!isTimerOff}
        maxLength={50}
        onFocus={(e) => {
          e.currentTarget.select();
        }}
        className="text-[10px] text-center bg-transparent truncate focus:outline-active focus:outline-4"
      />
    </div>
  );
};

const TimerMinimize = ({ onClose, show, maximizeTimer }) => {
  const {
    countDownDates,
    activeTimerId,
    onClickNext,
    onClickPrev,
    getTitle,
    setTitle,
    getDescription,
    setDescription,
  } = useTimerContext();

  return (
    <MoveableModal
      title={
        <div className="scale-x-1">
          <button onClick={maximizeTimer}>
            <BackToTab />
          </button>
        </div>
      }
      name={`Timer`}
      icon={<TimerIcon />}
      onClose={onClose}
      show={show}
      className="w-[184px]"
    >
      {countDownDates.map((_, i) => (
        <TimerMinimizeContent
          key={i}
          idx={i}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          show={i === activeTimerId}
          title={getTitle(i)}
          setTitle={(newVal) => setTitle(i, newVal)}
          description={getDescription(i)}
          setDescription={(newVal) => setDescription(i, newVal)}
        />
      ))}
    </MoveableModal>
  );
};

export default TimerMinimize;
