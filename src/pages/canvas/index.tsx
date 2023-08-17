import { Canvas as fabricCanvas } from "fabric";
import { useEffect, useRef, useState } from "react";

import { BasicDraw } from "./utils";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fbCanvas, setFbCanvas] = useState<fabricCanvas | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new fabricCanvas(canvasRef.current, {
      width: canvasRef.current.offsetWidth,
      height: canvasRef.current.offsetHeight,
      backgroundColor: "#232829",
      selection: false,
    });
    canvas.requestRenderAll();
    setFbCanvas(canvas);
    return () => {
      canvas.dispose();
      setFbCanvas(null);
    };
  }, []);
  useEffect(() => {
    if (fbCanvas) {
      const draw = new BasicDraw(fbCanvas);
      draw.renderBtn();
    }
  }, [fbCanvas]);
  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    ></canvas>
  );
};

export default Canvas;
