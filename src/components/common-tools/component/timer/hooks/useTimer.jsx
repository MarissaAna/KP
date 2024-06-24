/*useTime
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

import { useState, useEffect } from "react";

import { millisecondsFromNow } from "../utils/formatter";
import useFlash from "../../../hooks/useFlash";
import useToast from "./useToast";
import { useTimerContext } from "../context/TimerContext";
import { flushSync } from "react-dom";

/**
 * A custom hook for managing a timer.
 *
 * @returns {Object} An object containing timer management functions and state variables.
 */

export const formatMilisecond = (countDown, currentTime) => {
  const distance = countDown - currentTime;
  const seconds = Math.floor(distance / 1000) % 60;
  const minutes = Math.floor(distance / (1000 * 60)) % 60;
  const hours = Math.floor(distance / (1000 * 60 * 60));

  return {
    hours,
    minutes,
    seconds,
  };
};

const useTimer = ({ idx }) => {
  const {
    getCountDown,
    setCountDown,
    currentTimes,
    getStatus,
    setStatus,
    getDescription,
    setDescription,
    getPreviousTime,
    setPreviousTime,
  } = useTimerContext();
  const status = getStatus(idx);
  const countDownDate = getCountDown(idx);
  const description = getDescription(idx);
  const previousTime = getPreviousTime(idx);
  const [timeInputValue, setTimeInputValue] = useState(() => {
    return formatMilisecond(countDownDate, currentTimes.current[idx]);
  });
  const { showFlash } = useFlash();
  const { showToast } = useToast();

  const syncTimeInputWithCurrentTime = (countDown) => {
    setTimeInputValue(formatMilisecond(countDown, currentTimes.current[idx]));
  };

  useEffect(() => {
    let interval;

    if (status === "ON") {
      interval = setInterval(() => {
        setCountDown(idx, (prevCountDownDate) => {
          const distance = prevCountDownDate - currentTimes.current[idx];
          if (distance > 0) {
            const newCountDownDate = prevCountDownDate - 1000;
            syncTimeInputWithCurrentTime(newCountDownDate);
            return newCountDownDate;
          } else {
            showFlash();
            showToast(description || "Input Text to Show");
            setPreviousTime(idx, NaN);
            setDescription(idx, "Waktu habis");
            clearInterval(interval);
            setStatus(idx, "OFF");
            return prevCountDownDate;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [status]);

  const playTimer = () => {
    const { estimatedMillis, currentMillis } = millisecondsFromNow(
      timeInputValue.hours,
      timeInputValue.minutes,
      timeInputValue.seconds
    );
    if (!previousTime) {
      setPreviousTime(idx, estimatedMillis);
    }
    currentTimes.current[idx] = currentMillis;
    setCountDown(idx, estimatedMillis);
    setStatus(idx, "ON");
  };

  const resumeTimer = () => {
    setStatus(idx, "ON");
  };

  const playOrResume = () => {
    if (isNaN(previousTime)) playTimer();
    else resumeTimer();
  };

  const stopTimer = () => {
    setStatus(idx, "OFF");
  };

  const resetTimer = () => {
    if (!previousTime) return;
    let prevStatus = status;
    setStatus(idx, "OFF");
    setCountDown(idx, previousTime);
    flushSync(() => {
      syncTimeInputWithCurrentTime(previousTime);
    });
    setStatus(idx, prevStatus);
  };

  const changeInputTime = (event, type) => {
    setPreviousTime(idx, NaN);
    const newValue = Number(event.target.value);
    if (isNaN(newValue) || newValue > 99) return;

    const newTimeInputValue = { ...timeInputValue };
    newTimeInputValue[type] = newValue;
    setTimeInputValue(newTimeInputValue);
  };

  const isTimerOn = status === "ON";
  const isTimerOff = status === "OFF";

  const hours = timeInputValue.hours;
  const minutes = timeInputValue.minutes;
  const seconds = timeInputValue.seconds;

  return {
    stopTimer,
    resetTimer,
    changeInputTime,
    isTimerOn,
    isTimerOff,
    hours,
    minutes,
    seconds,
    playTimer,
    playOrResume,
  };
};

export default useTimer;
