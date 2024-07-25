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
 * Co-Author: Annisa Nailiya Zahroh | annisanailiyazahroh02@gmail.com <https://github.com/annisanailiya>
 *
 */

import React, { useState } from "react";
import { GiStopwatch } from "react-icons/gi";

import { Button } from "../../../map/utils/button/Button";
import Stopwatch from "./Stopwatch";

/**
 * Renders a section containing a button to toggle the display of a stopwatch component.
 *
 * @component
 * @example
 * return (
 *   <StopwatchSection />
 * )
 */
const StopwatchSection = () => {
  const [showStopwatch, setShowStopwatch] = useState(false);

  return (
    <>
      <Button onClick={() => setShowStopwatch((prev) => !prev)}>
        <GiStopwatch className="h-6 w-6" />
      </Button>
      <Stopwatch show={showStopwatch} onClose={() => setShowStopwatch(false)} />
    </>
  );
};

export default StopwatchSection;
