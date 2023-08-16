import { Canvas as fabricCanvas } from "fabric";
import { useEffect, useRef, useState } from "react";

import { Draw } from "./draw";

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
    setFbCanvas(canvas);
    return () => {
      canvas.dispose();
      setFbCanvas(null);
    };
  }, []);
  useEffect(() => {
    if (fbCanvas) {
      new Draw(fbCanvas);
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
