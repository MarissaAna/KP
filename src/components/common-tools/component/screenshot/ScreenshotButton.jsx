import React, { useState } from "react";

import ScreenshotModal from "./ScreenshotModal";
import Button from "../../common/components/Button";
import { ScreenshotWindowContextProvider } from "./window-screenshot/useScreenshotWindow";

const ScreenshotButton = () => {
  const [screenshotModal, setScreenshotModal] = useState(false);

  const openScreenshotModal = () => {
    setScreenshotModal(true);
  };

  const closeScreenshotModal = () => {
    setScreenshotModal(false);
  };

  return (
    <ScreenshotWindowContextProvider>
      <Button onClick={openScreenshotModal}>Screenshot</Button>
      {screenshotModal && <ScreenshotModal onClose={closeScreenshotModal} />}
    </ScreenshotWindowContextProvider>
  );
};

export default ScreenshotButton;
