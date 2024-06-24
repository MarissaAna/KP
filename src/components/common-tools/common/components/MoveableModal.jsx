/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Friday, April 26th 2024, 12:52:16 pm
 * Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import React, { useRef } from "react";
import { GoX } from "react-icons/go";

import useMoveableWindow from "../../hooks/useMoveableWindow";
import { cn } from "../../utils/cn";

/**
 * A modal component that can be moved around the screen.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the modal.
 * @param {string} props.className - Additional CSS class names for the modal.
 * @param {ReactNode} props.icon - The icon element to display in the modal header.
 * @param {string} props.name - The name/title of the modal.
 * @param {Function} props.onClose - The function to call when the modal is closed.
 * @returns {JSX.Element} The rendered MoveableModal component.
 */

const Content = ({ children, name, title, onClose, elementRef, action }) => {
  const { onMouseDown, onMouseUp } = useMoveableWindow(elementRef);

  return (
    <>
      <header
        className="bg-bg1-100 w-full flex justify-between items-center px-[5px] py-1 text-white"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClose={onClose}
      >
        <h1 className="font-bold text-white text-base select-none">
          {title ? title : name}
        </h1>
        <div>
          {action}
          <button data-testid="close-button" onClick={onClose}>
            <GoX className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>
      {children}
    </>
  );
};

const MoveableModal = ({
  children,
  className,
  icon,
  name,
  title,
  onClose,
  show,
  action,
  ...props
}) => {
  const elementRef = useRef();
  const focusElement = () => {
    elementRef.current.style.zIndex = 99;
  };

  return (
    <div
      style={{
        top: "90%",
        left: "70%",
        transform: "translate(20%, -50%)",
      }}
      ref={elementRef}
      onMouseDown={focusElement}
      className={cn(
        `bg-bg1-100 justify-center items-center flex flex-col absolute p-2 pt-0 rounded-2xl z-[10] overflow-hidden ${
          !show ? "hidden" : "visible"
        }`,
        className
      )}
      {...props}
    >
      {show ? (
        <Content
          name={name}
          title={title}
          onClose={onClose}
          elementRef={elementRef}
          action={action}
        >
          <div className="bg-bg3-100 rounded-xl">{children}</div>
        </Content>
      ) : null}
    </div>
  );
};

export default MoveableModal;
