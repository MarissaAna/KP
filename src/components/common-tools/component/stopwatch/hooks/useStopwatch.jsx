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

import { useEffect, useState } from "react";
import { useStopwatchContext } from "../context/StopwatchContext";

export const formatTotalTime = (totalTime) => {
  const seconds = Math.floor(totalTime) % 60;
  const minutes = Math.floor(totalTime / 60) % 60;
  const hours = Math.floor(totalTime / (60 * 60));

  return {
    seconds,
    minutes,
    hours,
  };
};

const useStopwatch = ({ idx }) => {
  const { getStatus, setStatus, getTotalTime, setTotalTime } =
    useStopwatchContext();
  const status = getStatus(idx);
  const totalTime = getTotalTime(idx);

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;

    if (status === "ON") {
      setIsPlaying(true);
      interval = setInterval(() => {
        setTotalTime(idx, (prevTotalTime) => prevTotalTime + 1);
      }, 1000);
    } else {
      setIsPlaying(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [status]);

  const playStopwatch = () => {
    setStatus(idx, "ON");
  };

  const stopStopwatch = () => {
    setStatus(idx, "OFF");
  };

  const resetStopwatch = () => {
    setTotalTime(idx, 0);
    setStatus(idx, "OFF");
  };

  const isStopwatchOn = status === "ON";
  const isStopwatchOff = status === "OFF";

  return {
    stopStopwatch,
    resetStopwatch,
    isStopwatchOn,
    isStopwatchOff,
    playStopwatch,
    totalTime,
    isPlaying,
    ...formatTotalTime(totalTime),
  };
};

export default useStopwatch;
