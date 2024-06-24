/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Monday, April 29th 2024, 9:45:20 pm
 * Author: Marissa Ana | bea.marissa07@gmail.com <https://github.com/MarissaAna>
 * Co author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 *
 */

import { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import ScreenshotCapture from "./ScreenshotCapture";
import ScreenshotBrowse from "./ScreenshotBrowse";
import { ScreenshotContext } from "./context/ScreenshotContext";

/**
 * ScreenshotCapture component for capturing screenshots of entire screen, window, or specific area.
 * @returns {JSX.Element} ScreenshotCapture component JSX
 */
const Screenshot = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    screenshotResults,
    takeScreenshot,
    resetScreenshot,
    saveScreenshot,
    savedScreenshots,
    updateScreenshot,
    removeSavedScrenshot,
  } = useContext(ScreenshotContext);

  /**
   * Function to handle tab click event.
   * @param {number} index - Index of the clicked tab
   */
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="p-4 w-[400px]">
      <Tabs>
        <TabList className="flex cursor-pointer font-medium gap-[10px] mb-5">
          <Tab
            data-testid="capture-button"
            onClick={() => handleTabClick(0)}
            className={`flex p-2 items-center rounded-lg hover:text-white ${
              activeTab === 0 ? "text-white  bg-[#262D27]" : "text-white/50"
            }`}
          >
            Capture
          </Tab>
          <Tab
            data-testid="browse-button"
            onClick={() => handleTabClick(1)}
            className={`flex p-2 items-center rounded-lg hover:text-white ${
              activeTab === 1 ? "text-white  bg-[#262D27]" : "text-white/50"
            }`}
          >
            Browse
          </Tab>
        </TabList>

        {/* TabPanel components */}
        <TabPanel>
          <ScreenshotCapture
            screenshotResults={screenshotResults}
            takeScreenshot={takeScreenshot}
            resetScreenshot={resetScreenshot}
            saveScreenshot={saveScreenshot}
            onClose={onClose}
          />
        </TabPanel>

        <TabPanel>
          <ScreenshotBrowse
            onDelete={(url) => removeSavedScrenshot(url)}
            savedScreenshots={savedScreenshots}
            onUpdate={(index, newItem) => updateScreenshot(index, newItem)}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Screenshot;
