/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Monday, April 29th 2024, 9:45:20 pm
 * Author: Marissa Ana | bea.marissa07@gmail.com <https://github.com/MarissaAna>
 * Co author: Agustinus Wesly Sitanggang | agustchannel@gmail.com <https://gitea.len-iot.id/agustinus.sitanggang.e>
 * Co-Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import { AiOutlineSearch } from "react-icons/ai";
import { useState, useRef } from "react";
import { flushSync } from "react-dom";

import Button from "../../common/components/Button";
import useToast from "../timer/hooks/useToast";
import Toast from "../timer/Toast";
import TickIcon from "../../../../assets/images/hide_image.png";
import { ToastContextProvider } from "../timer/context/ToastContext";
import ScreenshotImage from "./ScreenshotImage";
import DeleteModal from "./ScreenshotDeleteModal";

const ScreenshotBrowse = ({ savedScreenshots, onDelete, onUpdate }) => {
  const [searchText, setSearchText] = useState("");
  const [activeItem, setActiveItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { showToast } = useToast();

  const filteredScreenshots = savedScreenshots.filter((item) =>
    item.filename.includes(searchText)
  );

  /**
   * Reference to the input element for filename editing.
   */
  const inputNameRef = useRef();

  const [placeholder, setPlaceholder] = useState("Search");
  const [isFocusesBorder, setIsFocusedBorder] = useState(false);

  const handleFocus = () => {
    setPlaceholder("Search and select");
    setIsFocusedBorder(true);
  };

  const handleBlur = () => {
    setPlaceholder("Search");
    setIsFocusedBorder(false);
  };

  return (
    <div className="space-y-5">
      <div className="bg-[#1D2420] rounded-lg text-white">
        <div
          className={`flex items-center p-1 border-b m-1 ${
            isFocusesBorder
              ? "border-b-2 border-blue-500"
              : "border-b-2 border-white"
          }`}
        >
          {isFocusesBorder ? null : (
            <AiOutlineSearch className="w-5 h-5 mx-3" />
          )}
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-transparent h-full w-full p-1 focus:outline-none"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            maxLength={50}
          />
        </div>

        <div
          className="bg-[#1D2420] max-h-[167px] text-sm rounded-lg
           overflow-y-auto"
          //  scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-white scrollbar-track-[#6E6F6E]"
          // scrollbar-thin scrollbar-webkit"
        >
          <ul className="bg-[#1D2420] m-1">
            {filteredScreenshots.map((item, index) => (
              <li
                key={item.url}
                className={`p-1 hover:bg-[#6E6F6E] rounded-md ${
                  item.url === activeItem?.item?.url
                    ? "bg-accent-3 rounded-md"
                    : ""
                }`}
              >
                <button
                  className="w-full text-start"
                  onClick={() => setActiveItem({ item, index })}
                >
                  <div className="grid grid-cols-5">
                    <div className="col-span-4 text-white">{item.filename}</div>
                    <div className="col-span-1 text-right text-white/50">
                      {item.size}Kb
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-accent-3 h-[234px] rounded-xl overflow-hidden">
        {activeItem ? (
          <ScreenshotImage
            src={activeItem?.item?.img}
            alt={activeItem?.item?.url}
          />
        ) : (
          <div className="flex h-[234px] justify-center place-items-center">
            <img src={TickIcon} alt="" />
          </div>
        )}
      </div>

      <ul className="">
        {filteredScreenshots.map((item, index) => (
          <div key={`${item.url}-${index}`}>
            {activeItem ? (
              <div>
                {activeItem && activeItem?.item?.url === item.url && (
                  <div className="text-white">
                    <div className="grid grid-cols-2 ">
                      <div className="text-white/50">{item.time} WIB</div>
                      <div className=" text-right">{item.date}</div>
                    </div>

                    <div
                      className={`flex items-center bg-[#494D49] gap-1 px-3 py-2 rounded-md my-2 ${
                        isFocused ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      <input
                        ref={inputNameRef}
                        type="text"
                        defaultValue={item.filename}
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
                        onChange={() => {
                          onUpdate({
                            index: activeItem.index,
                            newItem: {
                              filename:
                                inputNameRef.current.value ||
                                activeItem?.item?.filename,
                            },
                            url: activeItem?.item?.url,
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ))}
      </ul>

      <fieldset disabled={!activeItem} className="flex gap-4 justify-between">
        <Button
          data-testid="print-button"
          className="bg-[#4F9669] disabled:bg-[#4F9669]/25 w-[180px] p-2 rounded-lg hover:bg-[#81AC91] transition-all duration-200 hover:delay-75 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        >
          <span className="text-base font-semibold">Print</span>
        </Button>

        <Button
          onClick={() => {
            setShowModal(true);
          }}
          className="bg-[#5D1F1F] disabled:bg-[#5D1F1F]/25 hover:bg-[#872A2A] transition-all duration-200 hover:delay-75 w-[180px] p-2 rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        >
          <span className="text-base font-semibold">Delete</span>
        </Button>
      </fieldset>

      <ToastContextProvider>
        <DeleteModal
          show={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            if (activeItem) {
              onDelete(activeItem?.item?.url);
              setActiveItem(null);
              setShowModal(false);
              showToast("Image has been successfully deleted.", "Delete");
            }
          }}
        />
        <Toast variant="SUCCESS" />
      </ToastContextProvider>
    </div>
  );
};

export default ScreenshotBrowse;
