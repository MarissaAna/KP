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

import { useRef } from "react";
import { Snap } from "ol/interaction.js";
import { MapContext } from "../map/hooks/useMap";
import { useContext } from "react";
import { Draw } from "ol/interaction.js";
import { LineString, Polygon } from "ol/geom";
import { Overlay } from "ol";

import { lineStyle } from "../map/data/StyleData";
import { formatLength } from "../map/utils/tool-tip/formatLength";

export const DrawFeature = () => {
  const {
    mapInstanceRef,
    drawRef,
    drawInteraction,
    setDrawInteraction,
    setEditorStatus,
    vectorSourceRef,
  } = useContext(MapContext);

  const measureTooltipElementRef = useRef();
  const measureTooltipRef = useRef();

  const addInteraction = (type) => {
    setDrawInteraction(true);
    mapInstanceRef.current.removeInteraction(drawRef.current);
    drawRef.current = new Draw({
      source: vectorSourceRef.current,
      type,
      style: lineStyle,
    });

    measureTooltipRef.current = new Overlay({
      element: measureTooltipElementRef.current,
      offset: [15, -15],
      positioning: "bottom-center",
      stopEvent: false,
      insertFirst: false,
    });

    mapInstanceRef.current.addOverlay(measureTooltipRef.current);

    drawRef.current.on("drawstart", (evt) => {
      let sketch = evt.feature;
      let tooltipCoord = evt.coordinate;

      sketch.getGeometry().on("change", (evt) => {
        const geom = evt.target;
        if ((geom instanceof LineString, Polygon)) {
          let output;
          output = formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
          measureTooltipElementRef.current.style.display = "block";
          measureTooltipElementRef.current.innerHTML = output;
          measureTooltipRef.current.setPosition(tooltipCoord);
        }
      });
    });

    drawRef.current.on("drawend", () => {
      measureTooltipElementRef.current.style.display = "none";
    });

    mapInstanceRef.current.addInteraction(drawRef.current);
  };

  const toggleDrawInteraction = (type) => {
    const map = mapInstanceRef.current;
    if (drawInteraction) {
      map.removeInteraction(drawRef.current);
      setDrawInteraction(null);
      setEditorStatus("");
    } else {
      addInteraction(type);
      const snap = new Snap({ source: vectorSourceRef.current });
      map.addInteraction(snap);
    }
  };

  return {
    addInteraction,
    toggleDrawInteraction,
    measureTooltipElementRef,
    measureTooltipRef,
  };
};
