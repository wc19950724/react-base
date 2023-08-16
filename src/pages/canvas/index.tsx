import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fbCanvas, setFbCanvas] = useState<fabric.Canvas | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasRef.current.offsetWidth,
      height: canvasRef.current.offsetHeight,
      backgroundColor: "#232829",
    });
    setFbCanvas(canvas);
    return () => {
      canvas.dispose();
      setFbCanvas(null);
    };
  }, []);
  useEffect(() => {
    console.log(fbCanvas, "fbCanvas");
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
