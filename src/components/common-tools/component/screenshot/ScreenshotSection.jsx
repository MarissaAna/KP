/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Thrusday, May 2nd 2024, 11:04:52 am
 * Author: Febrina Qoonitah | febrina231@gmail.com <https://gitea.len-iot.id/febrina.qoonitah.e>
 *
 */

import React, { useState } from "react";
import { RiScreenshot2Fill } from "react-icons/ri";

import ScreenshotModal from "./ScreenshotModal";
import { Button } from "../../../map/utils/button/Button";
import ScreenshotProvider from "./context/ScreenshotContext";

/**
 * ScreenshotButton component for displaying a button to open a screenshot modal.
 * @returns {JSX.Element} ScreenshotButton component JSX
 */
const ScreenshotSection = () => {
  const [screenshotModal, setScreenshotModal] = useState(false);
  const toggleScreenshotModal = () => {
    setScreenshotModal((prev) => !prev);
  };

  return (
    <ScreenshotProvider>
      <Button className="font-medium" onClick={toggleScreenshotModal}>
        <RiScreenshot2Fill className="h-6 w-6 text-white" title="Screenshot" />
      </Button>
      <ScreenshotModal show={screenshotModal} onClose={toggleScreenshotModal} />
    </ScreenshotProvider>
  );
};

export default ScreenshotSection;
