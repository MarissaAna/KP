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

const createParentDiv = () => {
  const parentDivElement = document.createElement("div");
  parentDivElement.style.position = "fixed";
  parentDivElement.style.inset = "0";
  parentDivElement.style.width = "100vw";
  parentDivElement.style.height = "100%";
  parentDivElement.style.zIndex = 21;
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
  const tempWindowScreenshot = (leftId, rightId) => {
    return new Promise((res) => {
      // Style element
      const body = document.body;
      const parent = createParentDiv();
      body.appendChild(parent);

      const leftWindow = document.getElementById(leftId);
      const doneScreenshot = (result) => {
        res(result);

        document.body.removeEventListener("click", onClickLeft);
        document.body.removeEventListener("click", onClickRight);
        body.removeChild(parent);
      };

      const onClickLeft = async function (event) {
        if (leftWindow.contains(event.target)) {
          // Process image
          const result = await takeWindowScreenshot(leftWindow);
          doneScreenshot(result);
        }
      };

      const rightWindow = document.getElementById(rightId);
      const onClickRight = async function (event) {
        if (rightWindow.contains(event.target)) {
          const result = await takeWindowScreenshot(rightWindow);
          doneScreenshot(result);
        }
      };

      document.body.addEventListener("click", onClickLeft);
      document.body.addEventListener("click", onClickRight);
    });
  };

  return {
    tempWindowScreenshot,
  };
};

export default useScreenshotWindow;
