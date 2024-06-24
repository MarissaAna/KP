/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Wednesday, June 12th 2024, 9:39:22 am
 * Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import { createPortal } from "react-dom";

import DummyScreenshotOne from "../../../../assets/images/dummy_1.png";
import DummyScreenshotTwo from "../../../../assets/images/dummy_2.png";

const ScreenshotPortal = (showTestWindow) => {
  return createPortal(
    <div
      className={`flex flex-col justify-center items-center fixed top-0 left-0 w-full h-full z-30 ${
        showTestWindow ? "flex" : "hidden"
      }`}
    >
      <div className="bg-bg3-100 flex flex-col gap-1 rounded-2xl p-4 z-10  max-w-screen-2xl">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="bg-black flex items-center justify-center text-white rounded-xl m-2 blur-sm hover:outline-dashed outline-area-dash hover:blur-none">
            <img id="leftWindow" alt="img1" src={DummyScreenshotOne} />
          </div>
          <div className="bg-black flex items-center justify-center text-white rounded-xl m-2 blur-sm hover:outline-dashed outline-area-dash hover:blur-none">
            <img id="rightWindow" alt="img2" src={DummyScreenshotTwo} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ScreenshotPortal;
