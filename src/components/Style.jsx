import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";

const style = new Style({
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

export { style };
