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
 * Co-author: Marissa Ana | bea.marissa07@gmail.com <https://gitea.len-iot.id/marissa.ana.e>
 *
 */

import React, { createContext, useState } from "react";

export const toastContext = createContext();

/**
 * Provides a context for displaying toast messages.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {JSX.Element} The rendered component.
 */
export const ToastContextProvider = ({ children }) => {
  const [toastContent, setToastContent] = useState({
    visible: false,
    message: "",
    actionType: "",
  });

  const showToast = (message, actionType) => {
    setToastContent({ visible: true, message, actionType });
    setTimeout(
      () => setToastContent({ visible: false, message: "", actionType: "" }),
      3000
    );
  };

  const closeToast = () => {
    setToastContent({ visible: false, message: "", actionType: "" });
  };

  return (
    <toastContext.Provider value={{ toastContent, showToast, closeToast }}>
      {children}
    </toastContext.Provider>
  );
};
