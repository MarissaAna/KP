/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Thrusday, May 2nd 2024, 10:17:15 am
 * Author: Febrina Qoonitah | febrina231@gmail.com <https://gitea.len-iot.id/febrina.qoonitah.e>
 * Co-author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 * Co-author: Marissa Ana | bea.marissa07@gmail.com <https://gitea.len-iot.id/marissa.ana.e>
 * Co-author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import { createContext, useEffect, useState } from "react";

import useScreenshotEntire from "../entire-screenshot/useScreenshotEntire";
import useScreenshotArea from "../area-screenshot/useScreenshotArea";
import useScreenshotWindow from "../window-screenshot/useScreenshotWindow";

/**
 * Custom hook for managing screenshot functionality.
 * @returns {object} Object containing screenshot-related state and functions.
 * @property {Array<object|null>} screenshotResults - Array containing screenshot results for each tab.
 * @property {Function} takeScreenshot - Function to take a screenshot based on the active tab.
 * @property {Function} resetScreenshot - Function to reset the screenshot for a specific tab.
 * @property {Function} saveScreenshot - Function to save a screenshot item and reset the corresponding tab's screenshot.
 */
export const ScreenshotContext = createContext();
const ScreenshotProvider = ({ children }) => {
  const [activeMode, setActiveMode] = useState(0);
  const [screenshotResults, setScreenshotResults] = useState([
    null,
    null,
    null,
  ]);
  const [savedScreenshots, setSavedScreenshots] = useState([]);

  const { takeAreaScreenshot } = useScreenshotArea();
  const { takeEntireScreenshot } = useScreenshotEntire();
  const { tempWindowScreenshot } = useScreenshotWindow();

  useEffect(() => {
    const screenshots =
      JSON.parse(localStorage.getItem("screenshot-memory")) || [];
    setSavedScreenshots(screenshots);
  }, []);

  /**
   * Function to handle Active Tab click event.
   * @param {number} index - Index of the clicked tab
   */
  const handleActiveMode = (index) => {
    setActiveMode(index);
  };

  /**
   * Function to take a screenshot based on the active tab.
   * @param {number} activeTab - Index of the active tab.
   */
  const takeScreenshot = async (activeTab, windowId = null, callback = {}) => {
    try {
      let result;
      switch (activeTab) {
        case 0:
          // Entire Screenshot
          result = await takeEntireScreenshot().then((res) => {
            callback();
            return res;
          });
          break;
        case 1:
          // Entire Window
          const { leftWindowId, rightWindowId } = windowId;
          result = await tempWindowScreenshot(leftWindowId, rightWindowId).then(
            (res) => {
              callback();
              return res;
            }
          );
          break;
        case 2:
          // Area Screenshot
          result = await takeAreaScreenshot().then((res) => {
            callback();
            return res;
          });
          break;
        default:
          break;
      }
      setScreenshotResults((prevResults) => {
        const updatedResults = [...prevResults];
        updatedResults[activeTab] = result;
        return updatedResults;
      });
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  /**
   * Function to reset the screenshot for a specific tab.
   * @param {number} activeTab - Index of the tab whose screenshot needs to be reset.
   */
  const resetScreenshot = (activeTab) => {
    setScreenshotResults((prevResults) => {
      const updatedResults = [...prevResults];
      const currentItem = updatedResults[activeTab];
      if (currentItem) {
        updatedResults[activeTab] = null;
      }
      return updatedResults;
    });
  };

  /**
   * Function to remove saved screenshot
   * @param {string} url - Screenshot url to be removed
   */
  const removeSavedScrenshot = (url) => {
    setSavedScreenshots((prev) => {
      const updatedSavedScreenshot = prev.filter((item) => item.url !== url);
      localStorage.setItem(
        "screenshot-memory",
        JSON.stringify(updatedSavedScreenshot)
      );
      return updatedSavedScreenshot;
    });
  };

  /**
   * Function to save a screenshot item and reset the corresponding tab's screenshot.
   * @param {object} item - Screenshot item to be saved.
   * @param {number} activeTab - Index of the tab associated with the screenshot item.
   */
  const saveScreenshot = (item, activeTab) => {
    resetScreenshot(activeTab);
    setSavedScreenshots((prev) => {
      const updatedScreenshots = [...prev, item];
      localStorage.setItem(
        "screenshot-memory",
        JSON.stringify(updatedScreenshots)
      );
      return updatedScreenshots;
    });
  };

  const updateScreenshot = (data) => {
    setSavedScreenshots((prevScreenshots) => {
      const newScreenshots = [...prevScreenshots];
      newScreenshots[data.index] = {
        ...newScreenshots[data.index],
        ...data.newItem,
      };
      localStorage.setItem("screenshot-memory", JSON.stringify(newScreenshots));
      return newScreenshots;
    });
  };

  return (
    <ScreenshotContext.Provider
      value={{
        screenshotResults,
        takeScreenshot,
        resetScreenshot,
        saveScreenshot,
        updateScreenshot,
        savedScreenshots,
        removeSavedScrenshot,
        handleActiveMode,
        activeMode,
      }}
    >
      {children}
    </ScreenshotContext.Provider>
  );
};

export default ScreenshotProvider;
