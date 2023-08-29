import "./dat-gui.css";

import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import DatGui, { DatFolder, DatString } from "react-dat-gui";

import { DatGuiData, metrics } from "./utils";

const App = observer(() => {
  const [data, setData] = useState<DatGuiData>({
    FPS: 60,
    zoom: 1,
    vptCoordsTL: "0, 0",
    vptCoordsBR: "0, 0",
  });
  useEffect(() => {
    setData({ ...data, ...metrics.gui });
  }, [metrics.gui]);
  return (
    <DatGui
      data={data}
      onUpdate={() => {}}
      liveUpdate={false}
      style={{
        position: "absolute",
        height: "fit-content",
        left: 0,
        bottom: 0,
        top: "unset",
        right: "unset",
      }}
    >
      <DatFolder title="Fabric.js" closed>
        <DatString path="FPS" label="FPS" />
        <DatString path="zoom" label="zoom" />
        <DatString path="vptCoordsTL" label="vptCoordsTL" />
        <DatString path="vptCoordsBR" label="vptCoordsBR" />
      </DatFolder>
    </DatGui>
  );
});

export default App;
