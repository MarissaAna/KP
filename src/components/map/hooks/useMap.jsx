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

import { createContext, useEffect, useMemo, useRef, useState } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import OSM from "ol/source/OSM.js";
import VectorSource from "ol/source/Vector";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { fromLonLat } from "ol/proj.js";
import { Circle as CircleStyle, Stroke, Style } from "ol/style.js";
import { unByKey } from "ol/Observable";
import { getVectorContext } from "ol/render";
import { easeOut } from "ol/easing";

import { markerStyle } from "../data/StyleData";

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
  const mapRef = useRef();
  const mapInstanceRef = useRef();
  const vectorSourceRef = useRef();
  const vectorLayerRef = useRef();
  const drawRef = useRef();

  const [drawInteraction, setDrawInteraction] = useState(null);
  const [editorStatus, setEditorStatus] = useState("None");

  const duration = 2000;

  useEffect(() => {
    const tile = new TileLayer({ source: new OSM() });
    const vectorSource = new VectorSource({ wrapX: false });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: markerStyle,
    });
    const map = new Map({
      layers: [tile, vectorLayer],
      view: new View({
        center: fromLonLat([107.60981, -6.914744]),
        zoom: 12,
      }),
      target: mapRef.current,
      controls: [],
    });

    tile.on("prerender", (evt) => {
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

    vectorSource.on("addfeature", (e) => {
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
    vectorSourceRef.current = vectorSource;
    vectorLayerRef.current = vectorLayer;

    return () => {
      map.setTarget(null);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      mapRef,
      mapInstanceRef,
      vectorSourceRef,
      vectorLayerRef,
      drawRef,
      editorStatus,
      setEditorStatus,
      drawInteraction,
      setDrawInteraction,
    }),
    [
      mapRef,
      mapInstanceRef,
      vectorSourceRef,
      vectorLayerRef,
      drawRef,
      editorStatus,
      setEditorStatus,
      drawInteraction,
      setDrawInteraction,
    ]
  );

  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};
