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

import React, { useContext } from "react";
import TrashIcon from "../../common/components/TrashIcon";
import { historyContext } from "../calculator/CalculatorModal";

const HistoryItem = ({ item, onClick }) => {
  let operasi = "";
  let result = "";
  if (item.historyValue) {
    // Scientific calc data
    item.historyValue.forEach((h) => {
      operasi += h.value;
    });
    result = item.operand;
  } else {
    // Basic calc data
    operasi = `${item.leftOperand} ${item.operator} ${item.rightOperand}`;
    result = item.result;
  }

  return (
    <button
      onClick={onClick}
      className="w-full group flex flex-col gap-1 items-end p-1 rounded"
    >
      <p
        dangerouslySetInnerHTML={{ __html: operasi }}
        className="text-xs opacity-50"
      ></p>
      <p className="font-bold text-xs">{result}</p>
    </button>
  );
};

const HistoryContent = ({ closeSheet, setCalculatorState }) => {
  const { history } = useContext(historyContext);
  const historyArray = history.getArray();
  const sheetRef = React.useRef(null);

  React.useEffect(() => {
    const clickHandler = (e) => {
      if (!sheetRef.current.contains(e.target)) {
        closeSheet();
      }
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-[#141a17]/50 flex items-end z-[6]">
      <div
        ref={sheetRef}
        className="bg-header-info py-3 px-[17px] flex flex-col gap-5 rounded-xl w-full items-end h-[222px]"
      >
        <div className="flex flex-col overflow-y-scroll w-full pr-[17px] flex-1">
          {historyArray.reverse().map((item, i) => (
            <HistoryItem
              key={i}
              item={item}
              onClick={() => setCalculatorState(structuredClone(item))}
            />
          ))}
        </div>

        <button onClick={() => history.reset()}>
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

const HistorySection = ({ openSheet, setOpenSheet, setCalculatorState }) => {
  if (!openSheet) return null;
  return (
    <HistoryContent
      closeSheet={() => setOpenSheet(false)}
      setCalculatorState={setCalculatorState}
    />
  );
};

export default HistorySection;
