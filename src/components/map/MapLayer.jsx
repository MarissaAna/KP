/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Thursday, April 28th 2024, 12:38:17 am
 * Author: Marissa Ana | bea.marissa07@gmail.com <https://github.com/MarissaAna>
 *
 */

/**
 * @file This file contains the Tooltip component which is responsible for rendering a tooltip.
 * @copyright Intern MSIB6 @ PT Len Industri (Persero)
 */

import {
  CircleStop,
  CircleDot,
  Spline,
  Hexagon,
  ZoomOut,
  ZoomIn,
} from "lucide-react";

import { MapContext } from "./hooks/useMap";
import { ZoomFeature } from "../zoom/useZoomFeature";
import { Button } from "./utils/button/Button";
import { DrawFeature } from "../draw/useDrawFeature";
import { useContext } from "react";

const MapLayer = () => {
  const { mapRef, mapInstanceRef, editorStatus, setEditorStatus } =
    useContext(MapContext);

  const { handleZoom } = ZoomFeature();

  const { toggleDrawInteraction, measureTooltipElementRef } = DrawFeature();

  return (
    <div className="relative w-screen h-screen">
      <div className="w-full h-screen" ref={mapRef}>
        <div
          ref={measureTooltipElementRef}
          className="text-orange-500 bg-white/80 rounded-md px-1 font-bold ol-tooltip ol-tooltip-measure text-xs"
        />
        <div className="absolute z-10 gap-2 m-4">
          <Button onClick={() => handleZoom(mapInstanceRef, +2)}>
            <ZoomIn />
          </Button>
          <Button onClick={() => handleZoom(mapInstanceRef, -2)}>
            <ZoomOut />
          </Button>
          <Button
            onClick={() => {
              setEditorStatus("Point");
              toggleDrawInteraction("Point");
            }}
          >
            {editorStatus === "Point" ? <CircleStop /> : <CircleDot />}
          </Button>
          <Button
            onClick={() => {
              setEditorStatus("LineString");
              toggleDrawInteraction("LineString");
            }}
          >
            {editorStatus === "LineString" ? <CircleStop /> : <Spline />}
          </Button>
          <Button
            onClick={() => {
              setEditorStatus("Polygon");
              toggleDrawInteraction("Polygon");
            }}
          >
            {editorStatus === "Polygon" ? <CircleStop /> : <Hexagon />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapLayer;
