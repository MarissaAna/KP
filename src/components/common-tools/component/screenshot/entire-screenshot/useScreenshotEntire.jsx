/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Thrusday, May 2nd 2024, 9:51:52 am
 * Author: Febrina Qoonitah | febrina231@gmail.com <https://gitea.len-iot.id/febrina.qoonitah.e>
 * Co-Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import { domToBlob } from "modern-screenshot";
import { blobToBase64 } from "../utils/blobToBase64";

const useScreenshotEntire = () => {
  const takeEntireScreenshot = async () => {
    /**
     * Blob representing the screenshot result.
     * @type {Blob}
     */
    const blobResult = await domToBlob(document.querySelector("#app"));

    /**
     * Data Base64 representing the cropped screenshot.
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

    /**
     * Asynchronously captures the entire content of the body element as a screenshot.
     * @returns {Promise<string>} A promise that resolves with the data URL of the captured screenshot.
     */
    return {
      url: screenshotDataURL,
      img: screenshotDataImg,
      filename: `Screenshot-Full Screen-${shortYear}${month}${date}-${time}`,
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

  return {
    takeEntireScreenshot,
  };
};

export default useScreenshotEntire;
