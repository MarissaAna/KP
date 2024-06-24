/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Tuesday, June 11th 2024, 11:45:05 am
 * Author: Jody Yuantoro | jodyyuan@xyzuan.my.id <https://gitea.len-iot.id/jody.yuantoro.e>
 *
 */

import React, { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

const ScreenshotImage = ({ src, alt }) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.4, 3));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.4, 1));
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - startPosition.x,
        y: event.clientY - startPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="flex w-full h-full justify-center place-items-center"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          onDragStart={(e) => e.preventDefault()}
          className="select-none"
          src={src}
          alt={alt}
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? "none" : "transform 0.2s ease-in-out",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
        />
      </div>

      <div className="absolute top-3 right-3">
        <div className="flex flex-col p-0.5 justify-center items-center bg-btn-secondary/50 rounded-xl backdrop-blur-lg">
          <button className="p-1" onClick={zoomIn}>
            <AiOutlinePlusCircle className="w-5 h-5" />
          </button>
          <button className="p-1" onClick={zoomOut}>
            <AiOutlineMinusCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotImage;
