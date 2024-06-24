/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Thrusday, May 2nd 2024, 10:35:15 am
 * Author: Febrina Qoonitah | febrina231@gmail.com <https://gitea.len-iot.id/febrina.qoonitah.e>
 * Co-author: Marissa Ana | bea.marissa07@gmail.com <https://gitea.len-iot.id/marissa.ana.e>
 *
 */

/**
 * Generates CSS styles for a tab based on its active state.
 * @param {boolean} active - Indicates whether the tab is active or not.
 * @returns {Object} - An object containing CSS styles for the tab.
 */
export const getScreenshotTabStyle = (active) => ({
  color: active ? "rgba(255, 255, 255, 1)" : "rgba(240, 240, 240, 0.6)",
  backgroundColor: active ? "rgba(38, 45, 39, 1)" : "",
  borderRadius: "10px",
  height: "40px",
  width: "130px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
