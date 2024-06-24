/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Tuesday, April 25th 2024, 15:25:18 pm
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 *
 */

import React, { useState } from "react";
import { MdOutlineTimer } from "react-icons/md";

import { Button } from "../../../map/utils/button/Button";
import Timer from "./Timer";

/**
 * Renders a TimerSection component.
 *
 * @returns {JSX.Element} The TimerSection component.
 */
const TimerSection = () => {
  const [showTimer, setShowTimer] = useState(false);

  return (
    <>
      <Button onClick={() => setShowTimer((prev) => !prev)}>
        <MdOutlineTimer className="h-6 w-6" title="Timer" />
      </Button>
      <Timer show={showTimer} onClose={() => setShowTimer(false)} />
    </>
  );
};

export default TimerSection;
