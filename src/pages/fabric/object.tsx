import { Canvas as fabricCanvas } from "fabric";
import { isEqual } from "lodash";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";

import { DatGui, DatGuiData } from "@/components/DatGui";

import { CANVAS_ID, CANVAS_WRAPPER_ID, CanvasObjectRenderer } from "./utils";

const Canvas = observer(() => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const drawObjects = useRef<CanvasObjectRenderer>();

  useEffect(() => {
    if (wrapperRef.current) {
      const canvas = new fabricCanvas(CANVAS_ID, {
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight,
        backgroundColor: "#232829",
        selection: false,
        renderOnAddRemove: false,
      });
      drawObjects.current = new CanvasObjectRenderer(canvas);
      drawObjects.current.renderViewport();
      return () => {
        canvas.dispose();
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
      id={CANVAS_WRAPPER_ID}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        position: "relative",
      }}
    >
      <canvas id={CANVAS_ID}></canvas>

      <DatGui {...gui} />
    </div>
  );
});

export default Canvas;
