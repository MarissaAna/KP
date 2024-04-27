/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Thursday, April 25th 2024, 9:39:48 am
 * Author: Marissa Ana | bea.marissa07@gmail.com <https://github.com/MarissaAna>
 *
 */

/**
 * @file This file contains the Tooltip component which is responsible for rendering a tooltip.
 * @copyright Intern MSIB6 @ PT Len Industri (Persero)
 */

export const Button = ({ children, onClick }) => {
  return (
    <div onClick={onClick}>
      <button className="p-2 bg-button rounded-md mb-2 text-white border-2">
        {children}
      </button>
    </div>
  );
};
