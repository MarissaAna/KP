/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Friday, April 26th 2024, 13:59:16 pm
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 *
 */

import { useContext } from "react";
import { flashContext } from "../context/FlashContext";

/**
 * Custom hook for managing flash messages.
 *
 * @returns {Object} An object containing the `isShowFlash` and `showFlash` functions.
 * @throws {Error} If the flash context is not found.
 */
const useFlash = () => {
  const contextValue = useContext(flashContext);
  if (!contextValue)
    throw new Error("Flash context must be inside it's provider !");

  const { isShowFlash, showFlash } = contextValue;

  return { isShowFlash, showFlash };
};

export default useFlash;
