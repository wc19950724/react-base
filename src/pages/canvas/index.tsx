import { Canvas as fabricCanvas } from "fabric";
import { useEffect, useRef } from "react";

import { useAnimationFrame } from "@/hooks/useAnimationFrame";

import { BasicDraw } from "./utils";
const CANVAS_ID = "my-canvas";
const Canvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // [x]: fbCanvas不涉及页面渲染, 仅存储, 所以使用useRef替换useState
  const fbCanvas = useRef<fabricCanvas>();
  const { handler } = useAnimationFrame();
  // 使用ResizeObserver监听父元素尺寸变化
  const resizeObserver = new ResizeObserver(function (entries) {
    handler(() => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;

        // FIXME: canvas.dispose() 是异步, 卸载不及时会报错
        if (!newWidth || !newHeight) return;
        fbCanvas.current?.setDimensions({
          width: newWidth,
          height: newHeight,
        });

        fbCanvas.current?.renderAll();
      }
    });
  });
  useEffect(() => {
    if (!wrapperRef.current) return;

    const canvas = new fabricCanvas(CANVAS_ID, {
      width: wrapperRef.current.offsetWidth,
      height: wrapperRef.current.offsetHeight,
      backgroundColor: "#232829",
      selection: false,
    });
    canvas.requestRenderAll();
    fbCanvas.current = canvas;
    return () => {
      canvas.dispose();
      fbCanvas.current = undefined;
    };
  }, []);
  useEffect(() => {
    if (fbCanvas.current) {
      new BasicDraw(fbCanvas.current);
      if (wrapperRef.current) {
        resizeObserver.observe(wrapperRef.current);
      }
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [fbCanvas.current]);
  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <canvas id={CANVAS_ID}></canvas>
    </div>
  );
};

export default Canvas;
