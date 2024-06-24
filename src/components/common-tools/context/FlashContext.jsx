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

import { createContext, useState } from "react";

export const flashContext = createContext(null);

/**
 * Provides the FlashContext to its children components.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} The rendered component.
 */
export const FlashContextProvider = ({ children }) => {
  const [isShowFlash, setIsShowFlash] = useState(false);

  const showFlash = () => {
    if (!isShowFlash) {
      setIsShowFlash(true);
      setTimeout(() => {
        setIsShowFlash(false);
      }, 100);
    }
  };

  return (
    <flashContext.Provider value={{ isShowFlash, showFlash }}>
      {children}
    </flashContext.Provider>
  );
};
