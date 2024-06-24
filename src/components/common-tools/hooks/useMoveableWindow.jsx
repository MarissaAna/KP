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

import { useRef, useState, useEffect } from "react";

/**
 * Custom hook for creating a moveable window.
 *
 * @returns {Object} An object containing the following properties and functions:
 *   - elementRef: A ref to the element that should be moved.
 *   - onMouseUp: A function to handle the mouse up event.
 *   - onMouseDown: A function to handle the mouse down event.
 *   - isMovedRef: A ref to track if the element has been moved.
 */
const useMoveableWindow = (elementRef) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const isMovedRef = useRef(false);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setOffsetX(e.clientX - elementRef.current.getBoundingClientRect().left);
    setOffsetY(e.clientY - elementRef.current.getBoundingClientRect().top);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const focusElement = () => {
    elementRef.current.style.zIndex = 99;
  };

  const blurElement = () => {
    elementRef.current.style.zIndex = 10;
  };

  useEffect(() => {
    const onMouseDown = (e) => {
      if (!elementRef.current.contains(e.target)) {
        blurElement();
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (isDragging) {
        e.preventDefault();
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;
        elementRef.current.style.transform = "none";
        elementRef.current.style.left = x + "px";
        elementRef.current.style.top = y + "px";
        isMovedRef.current = true;
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDragging, offsetX, offsetY]);

  return {
    elementRef,
    onMouseUp,
    onMouseDown,
    isMovedRef,
    focusElement,
  };
};

export default useMoveableWindow;
