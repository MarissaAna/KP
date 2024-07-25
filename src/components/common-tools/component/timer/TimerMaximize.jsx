import React from "react";
import MoveableModal from "../../common/components/MoveableModal";
import TimerItem from "./TimerItem";
import TimerIcon from "../../common/components/TimerIcon";
import { useTimerContext } from "./context/TimerContext";

const TimerMaximize = ({ onClose, show, minimizeTimer }) => {
  const {
    countDownDates,
    setActiveTimer,
    getTitle,
    setTitle,
    getDescription,
    setDescription,
  } = useTimerContext();
  return (
    <MoveableModal
      id="timer-modal"
      title={<p className="py-[1px] px-[3px]">Timer</p>}
      icon={<TimerIcon />}
      onClose={onClose}
      show={show}
    >
      <div
        data-testid="timer-maximize"
        className="flex flex-col items-center w-[551px] p-2 gap-4 text-white"
      >
        {countDownDates.map((_, i) => (
          <TimerItem
            key={i}
            idx={i}
            title={getTitle(i)}
            setTitle={(newVal) => setTitle(i, newVal)}
            description={getDescription(i)}
            setDescription={(newVal) => setDescription(i, newVal)}
            minimizeTimer={() => {
              setActiveTimer(i);
              minimizeTimer();
            }}
          />
        ))}
      </div>
    </MoveableModal>
  );
};

export default TimerMaximize;
