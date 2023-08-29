import { Canvas as fabricCanvas } from "fabric";
import { useEffect, useRef } from "react";

import DatGui from "./dat-gui";
import { BasicDraw, CANVAS_ID, CANVAS_WRAPPER_ID } from "./utils";

const Canvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // [x]: fbCanvas不涉及页面渲染, 仅存储, 所以使用useRef替换useState
  const fbCanvas = useRef<fabricCanvas>();
  const basicObjects = useRef<BasicDraw>();

  useEffect(() => {
    if (wrapperRef.current) {
      const canvas = new fabricCanvas(CANVAS_ID, {
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight,
        backgroundColor: "#232829",
        selection: false,
        renderOnAddRemove: false,
      });
      // canvas.requestRenderAll();
      fbCanvas.current = canvas;
    }
    return () => {
      fbCanvas.current?.dispose();
      fbCanvas.current = undefined;
    };
  }, []);
  useEffect(() => {
    if (fbCanvas.current) {
      basicObjects.current = new BasicDraw(fbCanvas.current);
      basicObjects.current.renderViewport();

      if (wrapperRef.current) {
        basicObjects.current.observe(wrapperRef.current);
      }
    }
    return () => {
      basicObjects.current?.reset();
    };
  }, [fbCanvas.current]);

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

      <DatGui />
    </div>
  );
};

export default Canvas;
