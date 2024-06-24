/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Friday, April 26th 2024, 13:59:16 pm
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 *
 */

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getCurrDate } from "../utils/date";

export const timerContext = createContext(null);

/**
 * Provides a context for displaying toast messages.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */

export const TimerContextProvider = ({ children, show }) => {
  const [countDownDates, setCountDownDates] = useState(() => {
    return new Array(3).fill(getCurrDate());
  });
  const currentTimes = useRef(new Array(3).fill(getCurrDate()));
  const [statuses, setStatuses] = useState(new Array(3).fill("OFF"));
  const [activeTimerId, setActiveTimerId] = useState(0);
  const [titles, setTitles] = useState(new Array(3).fill(""));
  const [descriptions, setDescriptions] = useState(new Array(3).fill(""));
  const [previousTimes, setPreviousTimes] = useState(new Array(3).fill(NaN));

  useEffect(() => {
    // RESET STATE
    if (!show) {
      setCountDownDates(new Array(3).fill(getCurrDate()));
      currentTimes.current = new Array(3).fill(getCurrDate());
      setStatuses(new Array(3).fill("OFF"));
      setActiveTimerId(0);
      setTitles(new Array(3).fill(""));
      setDescriptions(new Array(3).fill(""));
      setPreviousTimes(new Array(3).fill(NaN));
    }
  }, [show]);

  const getPreviousTime = (idx) => previousTimes[idx];
  const setPreviousTime = (idx, newVal) => {
    setPreviousTimes((prev) => {
      const previousTimes = [...prev];
      previousTimes[idx] = newVal;
      return previousTimes;
    });
  };
  const getTitle = (idx) => titles[idx];
  const getDescription = (idx) => descriptions[idx];
  const setTitle = (idx, newVal) => {
    setTitles((prev) => {
      const titles = [...prev];
      titles[idx] = newVal;
      return titles;
    });
  };
  const setDescription = (idx, newVal) => {
    setDescriptions((prev) => {
      const descriptions = [...prev];
      descriptions[idx] = newVal;
      return descriptions;
    });
  };
  const onClickNext = () => {
    setActiveTimerId((curr) => (curr + 1) % 3);
  };
  const onClickPrev = () => {
    setActiveTimerId((curr) => (curr === 0 ? 2 : curr - 1));
  };
  const setActiveTimer = (newVal) => {
    setActiveTimerId(newVal);
  };
  const getCountDown = (idx) => countDownDates[idx];
  const setCountDown = (idx, args) => {
    setCountDownDates((prev) => {
      const countDownDates = [...prev];
      let currentCountDown = countDownDates[idx];
      if (typeof args === "function") {
        currentCountDown = args(currentCountDown);
      } else {
        currentCountDown = args;
      }
      countDownDates[idx] = currentCountDown;
      return countDownDates;
    });
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
    <timerContext.Provider
      value={{
        countDownDates,
        currentTimes,
        setCountDown,
        getStatus,
        setStatus,
        getCountDown,
        activeTimerId,
        onClickNext,
        onClickPrev,
        setActiveTimer,
        getTitle,
        getDescription,
        setTitle,
        setDescription,
        getPreviousTime,
        setPreviousTime,
      }}
    >
      {children}
    </timerContext.Provider>
  );
};

export const useTimerContext = () => {
  const value = useContext(timerContext);
  if (!value) throw new Error("Must be wrapped inside context");

  return value;
};
