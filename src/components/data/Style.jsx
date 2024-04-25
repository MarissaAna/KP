/*
 * Copyright Intern MSIB6 @ PT Len Industri (Persero)
 *
 * THIS SOFTWARE SOURCE CODE AND ANY EXECUTABLE DERIVED THEREOF ARE PROPRIETARY
 * TO PT LEN INDUSTRI (PERSERO), AS APPLICABLE, AND SHALL NOT BE USED IN ANY WAY
 * OTHER THAN BEFOREHAND AGREED ON BY PT LEN INDUSTRI (PERSERO), NOR BE REPRODUCED
 * OR DISCLOSED TO THIRD PARTIES WITHOUT PRIOR WRITTEN AUTHORIZATION BY
 * PT LEN INDUSTRI (PERSERO), AS APPLICABLE.
 *
 * Created Date: Wednesday, April 24th 2024, 3:41:37 pm
 * Author: Marissa Ana | bea.marissa07@gmail.com <https://github.com/MarissaAna>
 *
 */

/**
 * @file This file contains the Tooltip component which is responsible for rendering a tooltip.
 * @copyright Intern MSIB6 @ PT Len Industri (Persero)
 */

import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";

const lineStyle = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.2)",
  }),
  stroke: new Stroke({
    color: "rgba(255, 255, 255, 1)",
    lineDash: [10, 10],
    width: 4,
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: "rgba(255, 143, 0, 1)",
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(217, 76, 0, 0.4)",
    }),
  }),
});

const markerStyle = {
  "fill-color": "rgb(9, 96, 0, 0.5)",
  "stroke-color": "#18f400",
  "stroke-width": 3,
  "circle-radius": 7,
  "circle-fill-color": "#18f400",
  "icon-src": "src/assets/Api.png",
  "icon-width": 40,
  "icon-height": 40,
};

export { lineStyle, markerStyle };
