import { isEqual } from "lodash";
import { observer } from "mobx-react-lite";
import { Application } from "pixi.js";
import { useEffect, useRef, useState } from "react";

import { DatGui, DatGuiData } from "@/components/DatGui";

import { PixiRenderer } from "./utils";

const Pixi = observer(() => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const drawObjects = useRef<PixiRenderer>();

  useEffect(() => {
    if (wrapperRef.current) {
      const { offsetWidth: width, offsetHeight: height } = wrapperRef.current;
      const app = new Application<HTMLCanvasElement>({
        width,
        height,
        backgroundColor: "#232829",
        // antialias: true, // 抗锯齿, 有性能损耗
        autoStart: false,
      });
      wrapperRef.current.appendChild(app.view);

      drawObjects.current = new PixiRenderer(app);
      drawObjects.current.render();

      return () => {
        wrapperRef.current?.removeChild(app.view);
        drawObjects.current?.reset();
      };
    }
  }, [wrapperRef.current]);

  const [gui, setGui] = useState<DatGuiData>({});
  useEffect(() => {
    if (isEqual(drawObjects.current?.metrics.gui, gui)) return;
    setGui({
      ...drawObjects.current?.metrics.gui,
    });
  }, [drawObjects.current?.metrics.gui]);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      <DatGui {...gui} />
    </div>
  );
});

export default Pixi;
