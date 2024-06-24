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

import { cn } from "../../utils/cn";

/**
 * Renders a component for displaying and editing a text value.
 *
 * @component
 * @example
 * // Usage:
 * <TimerTextToShow />
 */
const TimerTextToShow = () => {
  const text = "AAA";
  const isTimerRunning = false;

  return (
    <div>
      <div className="relative">
        <input
          className={cn(
            "w-timer-text-to-show ring-0 ring-offset-0 border transition-transform duration-300 bg-high-container py-1.5 px-2"
          )}
          title={text}
          disabled={isTimerRunning}
        />
        <div className="absolute inset-y-0 right-0 pl-3 ml-2 flex items-center">
          <p className="h-5 w-5 mr-5 mt-16 text-xs"> [{text.length}/30]</p>
        </div>
        <label
          htmlFor="text"
          className={cn(
            "absolute left-2.5 translate-y-5 transition-all duration-200 px-1 bg-high-container",
            text.length === 0 && "top-1.5",
            text.length > 0 && "-top-2 left-2.5 text-xs"
          )}
        >
          Text to Show
        </label>
      </div>
    </div>
  );
};

export default TimerTextToShow;
