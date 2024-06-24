/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Monday, May 1st 2024, 12:05:12 am
 * Author: Marissa Ana | bea.marissa07@gmail.com <https://github.com/MarissaAna>
 * Co-Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import { domToJpeg } from "modern-screenshot";
import { blobToBase64 } from "../utils/blobToBase64";

const createDiv = () => {
  const divElement = document.createElement("div");
  divElement.style.border = "3px dashed rgb(249 115 22)";
  divElement.style.position = "absolute";
  divElement.hidden = 1;
  divElement.style.backgroundColor = "rgba(255, 255, 255, 0.80)";

  return divElement;
};

const createParentDiv = () => {
  const parentDivElement = document.createElement("div");
  parentDivElement.style.position = "fixed";
  parentDivElement.style.inset = "0";
  parentDivElement.style.zIndex = 19;
  parentDivElement.style.width = "100vw";
  parentDivElement.style.height = "100vh";
  parentDivElement.style.zIndex = 20;

  return parentDivElement;
};

const root = document.querySelector("body");

const useScreenshotArea = () => {
  const takeAreaScreenshot = () => {
    return new Promise((resolve) => {
      const parentDiv = createParentDiv();

      const div = createDiv();
      parentDiv.appendChild(div);

      let x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0,
        x3 = 0,
        y3 = 0,
        x4 = 0,
        y4 = 0;

      function reCalc() {
        x3 = Math.min(x1, x2);
        x4 = Math.max(x1, x2);
        y3 = Math.min(y1, y2);
        y4 = Math.max(y1, y2);

        div.style.left = x3 + "px";
        div.style.top = y3 + "px";
        div.style.width = x4 - x3 + "px";
        div.style.height = y4 - y3 + "px";
      }

      function onMouseDown(e) {
        div.hidden = 0;
        x1 = e.clientX;
        y1 = e.clientY;
        reCalc();
      }

      function onMouseMove(e) {
        x2 = e.clientX;
        y2 = e.clientY;
        reCalc();
      }

      const onMouseUp = async () => {
        let width = div.offsetWidth;
        let height = div.offsetHeight;

        // We are done, restore everything.
        document.body.removeChild(parentDiv);
        document.body.style.opacity = 1;
        document.body.style.userSelect = "none";
        document.body.style.cursor = "auto";
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        //memproses hasil ss
        const jpg = await domToJpeg(root);
        const img = new Image();

        img.src = jpg;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        img.onload = function () {
          ctx.drawImage(img, x1, y1, width, height, 0, 0, width, height);

          canvas.toBlob(async (blobResult) => {
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

            resolve({
              url: screenshotDataURL,
              img: screenshotDataImg,
              filename: `Screenshot-Area-${shortYear}${month}${date}-${time}`,
              size: fileSizeInKb,
              date: `${day}, ${date}/${month}/${fullYear}`,
              time: currentDate.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Asia/Jakarta",
              }),
            });
          });
        };
      };

      document.body.appendChild(parentDiv);
      document.body.style.opacity = 0.5;
      document.body.style.background = "#1E1E2C";
      document.body.style.userSelect = "none";
      document.body.style.cursor = "crosshair";

      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  };

  return { takeAreaScreenshot };
};

export default useScreenshotArea;
