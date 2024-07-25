/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Thrusday, May 2nd 2024, 9:36:07 am
 * Author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 * Co-author: Febrina Qoonitah | febrina231@gmail.com <https://gitea.len-iot.id/febrina.qoonitah.e>
 * Co-author: Marissa Ana | bea.marissa07@gmail.com <https://gitea.len-iot.id/marissa.ana.e>
 *
 */

import { useContext, useRef, useState } from "react";
import { flushSync } from "react-dom";

import Button from "../../common/components/Button";
import useToast from "../timer/hooks/useToast";
import Toast from "../timer/Toast";
import { ToastContextProvider } from "../timer/context/ToastContext";
import ScreenshotImage from "./ScreenshotImage";
import { ScreenshotContext } from "./context/ScreenshotContext";

/**
 * ScreenshotPreview component for displaying a preview of a screenshot with editing and saving options.
 * @param {object} props - Props for the ScreenshotPreview component.
 * @param {object|null} props.result - Screenshot result object containing URL and filename.
 * @param {Function} props.onReset - Function to be called when resetting the screenshot.
 * @param {Function} props.onSave - Function to be called when saving the screenshot.
 * @returns {JSX.Element|null} ScreenshotPreview component JSX or null if result is null
 */
const ScreenshotPreview = ({ result, onReset, onSave }) => {
  /**
   * State to manage whether the filename is being edited.
   * @type {[boolean, Function]} isEditing - Tuple containing boolean value and setter function.
   */

  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveModal, setSaveModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { activeMode, handleActiveMode } = useContext(ScreenshotContext);

  /**
   * Reference to the input element for filename editing.
   */
  const inputNameRef = useRef();
  if (!result) return null;

  return (
    <>
      <div
        data-testid="screenshot-preview"
        className="w-full h-[280px] bg-accent-3 rounded-xl overflow-hidden my-4"
      >
        <ScreenshotImage src={result.img} alt={result.url} />
      </div>

      <div className="grid grid-cols-2">
        <div className="text-white/50">{result.time} WIB</div>
        <div className="text-white text-right">{result.date}</div>
      </div>

      <div
        className={`flex items-center bg-[#494D49] gap-1 px-3 py-2 rounded-md my-2 text-white ${
          isFocused ? "ring-2 ring-blue-500" : ""
        }`}
      >
        <input
          ref={inputNameRef}
          type="text"
          defaultValue={result.filename}
          maxLength={50}
          className="flex-1 h-min bg-transparent focus:outline-none text-sm"
          onBlur={() => {
            setIsEditing(false);
            setIsFocused(false);
          }}
          onFocus={() => setIsFocused(true)}
          onClick={() => {
            flushSync(() => {
              setIsEditing(true);
            });
            inputNameRef.current.select();
          }}
        />
      </div>

      <div className="flex justify-between items-center gap-2 my-4">
        <Button
          className="bg-[#6E6F6E] hover:bg-light-secondary transition-all duration-200 hover:delay-75 text-base font-semibold w-[190px]"
          onClick={onReset}
        >
          New
        </Button>

        <Button
          data-testid="screenshot-save-button"
          className="bg-[#4F9669] hover:bg-[#81AC91] transition-all duration-200 hover:delay-75 text-base font-semibold w-[190px]"
          onClick={() => {
            setSaveModal(true);
          }}
        >
          Save
        </Button>

        <ToastContextProvider>
          {showSaveModal &&
            (onSave({
              ...result,
              filename: inputNameRef.current.value || result.filename,
            }),
            showToast("The screenshot has been successfully saved.", "Save"))}
          <Toast variant="SUCCESS" />
        </ToastContextProvider>
      </div>
    </>
  );
};

export default ScreenshotPreview;
