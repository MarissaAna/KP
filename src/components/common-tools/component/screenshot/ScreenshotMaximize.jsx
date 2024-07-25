/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Tuesday, June 11th 2024, 8:00:22 am
 * Author: Febrina Qoonitah | febrina231@gmail.com <https://gitea.len-iot.id/febrina.qoonitah.e>
 * Co-Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import React from "react";
import { FaWindowMinimize } from "react-icons/fa";

import MoveableModal from "../../common/components/MoveableModal";
import Screenshot from "./Screenshot";

const ScreenshotMaximize = ({ onClose, show, minimizeScreenshot }) => {
  return (
    <MoveableModal
      title={
        <div className="flex w-full items-center justify-between">
          <h1>Screenshot Tool</h1>
        </div>
      }
      action={
        <button
          data-testid="minimize-button"
          className="w-6 h-6"
          onClick={minimizeScreenshot}
        >
          <FaWindowMinimize />
        </button>
      }
      onClose={onClose}
      show={show}
    >
      <Screenshot onClose={onClose} />
    </MoveableModal>
  );
};

export default ScreenshotMaximize;
