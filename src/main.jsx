import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MapLayer from "./components/map/MapLayer.jsx";
import { MapContextProvider } from "./components/map/hooks/useMap.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MapContextProvider>
      <MapLayer />
    </MapContextProvider>
  </React.StrictMode>
);
