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

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export const stopwatchContext = createContext(null);

const currDate = new Date();

export const StopwatchContextProvider = ({ children, show }) => {
  const [totalTimes, setTotalTimes] = useState(new Array(3).fill(0));
  const currentTimes = useRef(new Array(3).fill(currDate));
  const [statuses, setStatuses] = useState(new Array(3).fill("OFF"));
  const [activeStopwatchId, setActiveStopwatchId] = useState(0);
  const [titles, setTitles] = useState(new Array(3).fill(""));

  useEffect(() => {
    // RESET ALL IF NOT SHOW
    if (!show) {
      setTotalTimes(new Array(3).fill(0));
      currentTimes.current = new Array(3).fill(currDate);
      setStatuses(new Array(3).fill("OFF"));
      setActiveStopwatchId(0);
      setTitles(new Array(3).fill(""));
    }
  }, [show]);

  const getTitle = (idx) => titles[idx];
  const setTitle = (idx, newVal) => {
    setTitles((prev) => {
      const updatedTitles = [...prev];
      updatedTitles[idx] = newVal;
      return updatedTitles;
    });
  };

  const onClickNext = () => {
    setActiveStopwatchId((curr) => (curr + 1) % 3);
  };

  const onClickPrev = () => {
    setActiveStopwatchId((curr) => (curr === 0 ? 2 : curr - 1));
  };

  const setActiveStopwatch = (newVal) => {
    setActiveStopwatchId(newVal);
  };

  const getTotalTime = (idx) => totalTimes[idx];

  const setTotalTime = (idx, value) => {
    setTotalTimes((prev) => {
      const updatedTimes = [...prev];
      if (typeof value === "function") {
        updatedTimes[idx] = value(updatedTimes[idx]);
      } else {
        updatedTimes[idx] = value;
      }
      return updatedTimes;
    });
    currentTimes.current[idx] = new Date();
  };

  const getStatus = (idx) => statuses[idx];
  const setStatus = (idx, newVal) => {
    setStatuses((prev) => {
      const actives = [...prev];
      actives[idx] = newVal;
      return actives;
    });
  };

  return (
    <stopwatchContext.Provider
      value={{
        totalTimes,
        currentTimes,
        setTotalTime,
        getStatus,
        setStatus,
        getTotalTime,
        activeStopwatchId,
        onClickNext,
        onClickPrev,
        setActiveStopwatch,
        getTitle,
        setTitle,
      }}
    >
      {children}
    </stopwatchContext.Provider>
  );
};

export const useStopwatchContext = () => {
  const context = useContext(stopwatchContext);
  if (!context)
    throw new Error(
      "useStopwatchContext must be used within a StopwatchContextProvider"
    );
  return context;
};
