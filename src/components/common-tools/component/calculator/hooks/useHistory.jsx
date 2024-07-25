/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Tuesday, June 10th 2024, 10:09:18 am
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 *
 */

import React from "react";

const useHistory = () => {
  const [history, setHistory] = React.useState([]);
  const add = (newVal) => {
    setHistory((prev) => [...prev, { ...newVal }]);
  };
  const reset = () => {
    setHistory([]);
  };
  const getArray = () => [...history];
  return {
    add,
    reset,
    getArray,
  };
};

export default useHistory;
