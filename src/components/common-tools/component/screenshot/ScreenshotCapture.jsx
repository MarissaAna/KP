/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Thrusday, May 2nd 2024, 9:36:07 am
 * Author: Febrina Qoonitah | febrina231@gmail.com <https://gitea.len-iot.id/febrina.qoonitah.e>
 * Co-author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 * Co-author: Marissa Ana | bea.marissa07@gmail.com <https://gitea.len-iot.id/marissa.ana.e>
 *
 */

import { useContext, useState } from "react";

import useFlash from "../../hooks/useFlash";
import ScreenshotPreview from "./ScreenshotPreview";
import { getScreenshotTabStyle } from "./utils/helper";
import {
  MdOutlineScreenshotMonitor,
  MdOutlineTabUnselected,
} from "react-icons/md";
import { ScreenshotContext } from "./context/ScreenshotContext";
import { TbSquarePlus2 } from "react-icons/tb";
import ScreenshotPortal from "./ScreenshotPortal";

/**
 * ScreenshotCapture component for capturing screenshots of entire screen, window, or specific area.
 * @returns {JSX.Element} ScreenshotCapture component JSX
 */

const ScreenshotCapture = ({
  screenshotResults,
  takeScreenshot,
  resetScreenshot,
  saveScreenshot,
  onClose,
}) => {
  const { activeMode, handleActiveMode } = useContext(ScreenshotContext);

  const [showTestWindow, setShowTestWindow] = useState(false);
  const { showFlash } = useFlash();

  /**
   * Function to handle tab click event.
   * @param {number} index - Index of the clicked tab
   */
  const handleTabClick = async (index) => {
    handleActiveMode(index);
    if (index === 1) {
      setShowTestWindow(true);
      await takeScreenshot(
        index,
        {
          leftWindowId: "leftWindow",
          rightWindowId: "rightWindow",
        },
        () => {
          showFlash();
          setShowTestWindow(false);
        }
      );
    } else {
      onClose();
      takeScreenshot(index, {}, () => {
        showFlash();
        onClose();
      });
    }
  };

  /**
   * Function to handle take screenshot button click.
   */

  return (
    <>
      <div className="flex cursor-pointer font-medium justify-between">
        <button
          onClick={() => handleTabClick(0)}
          style={getScreenshotTabStyle(activeMode === 0)}
          className="focus:outline-none px-2"
        >
          <div className="flex items-center gap-2 hover:text-white">
            <MdOutlineScreenshotMonitor />
            <span>Full Screen</span>
          </div>
        </button>
        <button
          onClick={() => handleTabClick(1)}
          style={getScreenshotTabStyle(activeMode === 1)}
          className="focus:outline-none"
        >
          <div className="flex items-center gap-2 hover:text-white">
            <TbSquarePlus2 />
            <span>Window</span>
          </div>
        </button>
        <button
          onClick={() => handleTabClick(2)}
          style={getScreenshotTabStyle(activeMode === 2)}
          className="focus:outline-none"
        >
          <div className="flex items-center gap-2 hover:text-white">
            <MdOutlineTabUnselected />
            <span className="text-lg font-medium">Area</span>
          </div>
        </button>
      </div>

      {screenshotResults[0] && activeMode === 0 ? (
        <ScreenshotPreview
          result={screenshotResults[0]}
          onReset={() => resetScreenshot(0)}
          onSave={(item) => saveScreenshot(item, 0)}
        />
      ) : null}

      {screenshotResults[1] && activeMode === 1 ? (
        <ScreenshotPreview
          result={screenshotResults[1]}
          onReset={() => resetScreenshot(1)}
          onSave={(item) => saveScreenshot(item, 1)}
        />
      ) : null}

      {screenshotResults[2] && activeMode === 2 ? (
        <ScreenshotPreview
          result={screenshotResults[2]}
          onReset={() => resetScreenshot(2)}
          onSave={(item) => saveScreenshot(item, 2)}
        />
      ) : null}

      {/* FOR TESTING PURPOSE*/}
      {ScreenshotPortal(showTestWindow)}
    </>
  );
};

export default ScreenshotCapture;
