import { FaTimes } from "react-icons/fa";
import TimerIcon from "../../common/components/TimerIcon";
import useToast from "./hooks/useToast";

import TickIcon from "../../../../assets/images/check_circle.png";

/**
 * Toast component displays a toast message with a timer icon.
 * It receives the toast content and closeToast function from the useToast hook.
 */
const Toast = ({ variant = "WARNING" }) => {
  const { toastContent, closeToast } = useToast();

  if (!toastContent.visible) return null;

  const getHeaderToast = (actionType) => {
    switch (actionType) {
      case "Save":
        return "Save Success!";
      case "Delete":
        return "Delete Success!";
    }
  };

  const headerToast = getHeaderToast(toastContent.actionType);

  if (variant === "SUCCESS")
    return (
      <div className="fixed z-[25] bottom-[15px] left-[15px] bg-[#156D55] pb-2 flex flex-col rounded-lg text-white">
        <header className="flex justify-between items-center border-b border-[#4F9669] mx-3 gap-7">
          <div className="flex gap-3 items-center">
            <img src={TickIcon} className="object-contain my-2" />
            <p className="font-bold text-base">{headerToast}</p>
          </div>

          <button onClick={closeToast}>
            <FaTimes className="w-4 h-4 text-[#1F221F]" />
          </button>
        </header>

        <div className="py-1 px-4 font-bold text-xs">
          <p>{toastContent.message}</p>
        </div>
      </div>
    );

  return (
    <div className="fixed z-[25] bottom-[15px] left-[15px] bg-[rgba(255,204,0)] opacity-75 flex flex-col text-dark rounded-lg w-[475px] h-[120px]">
      <header className="flex justify-between items-center border-b border-[#FFE500] py-4 pl-[15px] pr-[18px]">
        <div className="flex gap-2 items-center">
          <TimerIcon width={"24"} height={"24"} fill={"#1E1E2C"} />
          <p className="font-medium text-xl">Timer</p>
        </div>

        <button onClick={closeToast}>
          <FaTimes className="w-7 h-7" />
        </button>
      </header>

      <div className="py-4 pl-[15px] pr-[18px] font-bold text-xl">
        <p>{toastContent.message}</p>
      </div>
    </div>
  );
};

export default Toast;
