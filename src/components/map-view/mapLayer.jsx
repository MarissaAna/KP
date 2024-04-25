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

import React, { useEffect, useRef, useState } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import OSM from "ol/source/OSM.js";
import { Draw, Snap } from "ol/interaction.js";
import { Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { fromLonLat } from "ol/proj.js";
import { Circle as CircleStyle, Stroke, Style } from "ol/style.js";
import { LineString, Polygon } from "ol/geom";
import { Overlay } from "ol";
import { unByKey } from "ol/Observable";
import { getVectorContext } from "ol/render";
import { easeOut } from "ol/easing";
import {
  CircleStop,
  CircleDot,
  Spline,
  Hexagon,
  ZoomOut,
  ZoomIn,
} from "lucide-react";

import { lineStyle, markerStyle } from "../data/Style";
import { formatLength } from "../../utils/formatLength";
import { Button } from "../button/Button";

// const useMap = () => {}; logic yang dipisah bukan comp
function MapLayer() {
  const mapRef = useRef();
  const mapInstanceRef = useRef();
  const sourceRef = useRef(new VectorSource());
  const snapRef = useRef();
  const [drawInteraction, setDrawInteraction] = useState(null);
  const [editorStatus, setEditorStatus] = useState("None");

  const measureTooltipElementRef = useRef();
  const measureTooltipRef = useRef();

  const duration = 2000;
  const source = new VectorSource();

  useEffect(function initMap() {
    if (!mapRef.current) return;

    const tile = new TileLayer({ source: new OSM() });

    tile.on("prerender", (evt) => {
      // return
      if (evt.context) {
        const context = evt.context;
        context.filter = "grayscale(80%) invert(100%) ";
        context.globalCompositeOperation = "source-over";
      }
    });

    tile.on("postrender", (evt) => {
      if (evt.context) {
        const context = evt.context;
        context.filter = "none";
      }
    });

    const vector = new VectorLayer({
      source: sourceRef.current,
      style: markerStyle,
    });

    const map = new Map({
      layers: [tile, vector],
      view: new View({
        center: fromLonLat([107.60981, -6.914744]),
        zoom: 12,
      }),
      target: mapRef.current,
      controls: [],
    });

    //Animation
    sourceRef.current.on("addfeature", (e) => {
      const feature = e.feature;
      const start = Date.now();
      const flashGeom = feature.getGeometry().clone();
      const listenerKey = tile.on("postrender", (event) => {
        const frameState = event.frameState;
        const elapsed = frameState.time - start;
        if (elapsed >= duration) {
          unByKey(listenerKey);
          return;
        }
        const vectorContext = getVectorContext(event);
        const elapsedRatio = elapsed / duration;
        const radius = easeOut(elapsedRatio) * 50 + 5;
        const opacity = easeOut(1 - elapsedRatio);

        const style = new Style({
          image: new CircleStyle({
            radius: radius,
            stroke: new Stroke({
              color: "rgba(217, 76, 0, " + opacity + ")",
              width: 0.75 + opacity,
            }),
          }),
        });

        vectorContext.setStyle(style);
        vectorContext.drawGeometry(flashGeom);
        mapInstanceRef.current.render();
      });
    });

    mapInstanceRef.current = map;

    return () => {
      map.setTarget(null);
    };
  }, []);

  const addInteraction = (type) => {
    const draw = new Draw({
      source: sourceRef.current,
      type,
      style: lineStyle,
    });

    setDrawInteraction(draw);
    mapInstanceRef.current.addInteraction(draw);

    measureTooltipRef.current = new Overlay({
      element: measureTooltipElementRef.current,
      offset: [15, -15],
      positioning: "bottom-center",
      stopEvent: false,
      insertFirst: false,
    });

    mapInstanceRef.current.addOverlay(measureTooltipRef.current);

    draw.on("drawstart", (evt) => {
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

    draw.on("drawend", () => {
      measureTooltipElementRef.current.style.display = "none";
    });

    const snap = new Snap({ source: source });
    snapRef.current = snap;
    mapInstanceRef.current.addInteraction(snap);
  };

  const toogleDrawInteraction = (type) => {
    const map = mapInstanceRef.current;
    if (drawInteraction) {
      map.removeInteraction(drawInteraction);
      setDrawInteraction(null);
      setEditorStatus("");
    } else {
      addInteraction(type);
      const snap = new Snap({ source: sourceRef.current });
      map.addInteraction(snap);
    }
  };
  /**
   * Handles zooming in or out of the map.
   * @param {React.MutableRefObject<Map>} mapRef - Reference to the map instance.
   * @param {number} value - Zoom level adjustment.
   */

  const handleZoom = (mapRef, value) => {
    const map = mapRef.current;
    const view = map.getView();
    const zoom = view.getZoom();
    view.animate({ zoom: zoom + value, duration: 200 });
  };

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
              toogleDrawInteraction("Point");
            }}
          >
            {editorStatus === "Point" ? <CircleStop /> : <CircleDot />}
          </Button>
          <Button
            onClick={() => {
              setEditorStatus("LineString");
              toogleDrawInteraction("LineString");
            }}
          >
            {editorStatus === "LineString" ? <CircleStop /> : <Spline />}
          </Button>
          <Button
            onClick={() => {
              setEditorStatus("Polygon");
              toogleDrawInteraction("Polygon");
            }}
          >
            {editorStatus === "Polygon" ? <CircleStop /> : <Hexagon />}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MapLayer;
