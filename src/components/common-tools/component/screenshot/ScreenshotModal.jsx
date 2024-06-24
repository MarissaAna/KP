/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Thrusday, May 2nd 2024, 9:33:31 am
 * Author: Febrina Qoonitah | febrina231@gmail.com <https://gitea.len-iot.id/febrina.qoonitah.e>
 * Co author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 *
 *
 */
import { useState } from "react";

import { FlashContextProvider } from "../../context/FlashContext";
import FlashComponent from "../../common/components/Flash";
import { ToastContextProvider } from "../timer/context/ToastContext";
import Toast from "../timer/Toast";
import ScreenshotMinimize from "./ScreenshotMinimize";
import ScreenshotMaximize from "./ScreenshotMaximize";
import ScreenshotProvider from "./context/ScreenshotContext";

/**
 * ScreenshotModal component for displaying a modal with screenshot capture functionality.
 * @param {object} props - Props for the ScreenshotModal component.
 * @param {Function} props.onClose - Function to be called when the modal is closed.
 * @returns {JSX.Element} ScreenshotModal component JSX
 */
const ScreenshotModal = ({ onClose, show }) => {
  const [isMinimizing, setIsMinimizing] = useState(true);

  const maximizeScreenshot = () => {
    setIsMinimizing(false);
  };

  const minimizeScreenshot = () => {
    setIsMinimizing(true);
  };

  return (
    <FlashContextProvider>
      <ToastContextProvider>
        <ScreenshotProvider>
          {" "}
          {isMinimizing ? (
            <ScreenshotMinimize
              minimizeScreenshot={minimizeScreenshot}
              onClose={onClose}
              show={show}
              maximizeScreenshot={maximizeScreenshot}
            />
          ) : (
            <ScreenshotMaximize
              onClose={onClose}
              show={show}
              minimizeScreenshot={minimizeScreenshot}
            />
          )}
          <FlashComponent />
          <Toast variant={"SUCCESS"} />
        </ScreenshotProvider>
      </ToastContextProvider>
    </FlashContextProvider>
  );
};
export default ScreenshotModal;
