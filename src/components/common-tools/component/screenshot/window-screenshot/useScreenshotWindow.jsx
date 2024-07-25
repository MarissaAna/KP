/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Friday, May 03th 2024, 10:00:00 am
 * Author: Annisa Nailiya Zahroh | annisanailiyazahroh02@gmail.com <https://github.com/annisanailiya>
 * Co-Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import { domToBlob } from "modern-screenshot";
import { blobToBase64 } from "../utils/blobToBase64";
import { setupModalHover, setPosition } from "../utils/modalStyle";

const createParentDiv = () => {
  const parentDivElement = document.createElement("div");
  parentDivElement.style.position = "fixed";
  parentDivElement.style.inset = "0";
  parentDivElement.style.width = "100vw";
  parentDivElement.style.height = "100%";
  parentDivElement.style.zIndex = 0;
  parentDivElement.style.background = "black";
  parentDivElement.style.opacity = 0.5;

  return parentDivElement;
};

const takeWindowScreenshot = async (target) => {
  /**
   * Blob representing the screenshot result.
   * @type {Blob}
   */
  const blobResult = await domToBlob(target);
  console.log(blobResult, target);

  /**
   * Data Blob representing the cropped screenshot.
   * @type {string}
   */
  const screenshotDataImg = await blobToBase64(blobResult);
  const screenshotDataURL = URL.createObjectURL(blobResult);

  const fileSizeInKb = (blobResult.size / 1024).toFixed(2);

  const currentDate = new Date();

  const fullYear = currentDate.getFullYear().toString();
  const shortYear = currentDate.getFullYear().toString().slice(-2);
  const month = `0${currentDate.getMonth() + 1}`.slice(-2);
  const date = `0${currentDate.getDate()}`.slice(-2);

  const time = currentDate
    .toLocaleTimeString("en-US", {
      hour12: false,
      timeZone: "Asia/Jakarta",
    })
    .replace(/:/g, "");

  const day = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
  });

  return {
    url: screenshotDataURL,
    img: screenshotDataImg,
    filename: `Screenshot-Window-${shortYear}${month}${date}-${time}`,
    size: fileSizeInKb,
    date: `${day}, ${date}/${month}/${fullYear}`,
    time: currentDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }),
  };
};

const useScreenshotWindow = () => {
  const tempWindowScreenshot = (timerId, calculatorId, stopwatchId) => {
    return new Promise((res) => {
      // Style element
      const body = document.body;
      body.classList.add("blur-sm");
      const parent = createParentDiv();
      body.appendChild(parent);

      const timerWindow = document.getElementById(timerId);
      const calculatorWindow = document.getElementById(calculatorId);
      const stopwatchWindow = document.getElementById(stopwatchId);

      let restoreTimerPosition,
        restoreCalculatorPosition,
        restoreStopwatchPosition;

      const doneScreenshot = (result, restoreFunc) => {
        cleanupModalHover();

        res(result);

        document.body.removeEventListener("click", onClickTimer);
        document.body.removeEventListener("click", onClickCalculator);
        document.body.removeEventListener("click", onClickStopwatch);

        restoreFunc();
        body.removeChild(parent);
      };

      const onClickTimer = async function (event) {
        if (timerWindow.contains(event.target)) {
          const { restorePosition } = setPosition(timerWindow);
          restoreTimerPosition = restorePosition;
          const result = await takeWindowScreenshot(timerWindow);
          doneScreenshot(result, restoreTimerPosition);
        }
      };

      const onClickCalculator = async function (event) {
        if (calculatorWindow.contains(event.target)) {
          const { restorePosition } = setPosition(calculatorWindow);
          restoreCalculatorPosition = restorePosition;
          const result = await takeWindowScreenshot(calculatorWindow);
          doneScreenshot(result, restoreCalculatorPosition);
        }
      };

      const onClickStopwatch = async function (event) {
        if (stopwatchWindow.contains(event.target)) {
          const { restorePosition } = setPosition(stopwatchWindow);
          restoreStopwatchPosition = restorePosition;
          const result = await takeWindowScreenshot(stopwatchWindow);
          doneScreenshot(result, restoreStopwatchPosition);
        }
      };

      document.body.addEventListener("click", onClickTimer);
      document.body.addEventListener("click", onClickCalculator);
      document.body.addEventListener("click", onClickStopwatch);

      const cleanupModalHover = setupModalHover(
        timerWindow,
        calculatorWindow,
        stopwatchWindow,
        body
      );
    });
  };

  return {
    tempWindowScreenshot,
  };
};

export default useScreenshotWindow;
