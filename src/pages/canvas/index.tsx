import { fabric } from "fabric";
import { useEffect } from "react";

const Canvas = () => {
  useEffect(() => {
    const canvas = new fabric.Canvas("canvas");
    canvas.setWidth(512);
    canvas.setHeight(512);
    canvas.backgroundColor = "#333";
    // 绘制圆
    const circle = new fabric.Circle({
      radius: 50,
      fill: "red",
      left: 256,
      top: 256,
      hasControls: true,
      hasBorders: true,
      lockMovementX: false,
      lockMovementY: false,
      lockScalingX: false,
      lockScalingY: false,
      lockRotation: false,
      originX: "left",
      originY: "top",
      hoverCursor: "pointer",
    });

    canvas.add(circle);

    // 禁止超出画布
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    canvas.on("object:moving", (e: fabric.IEvent) => {
      const obj = e.target as fabric.Object;
      const boundingRect = obj.getBoundingRect();
      const left = boundingRect.left;
      const top = boundingRect.top;
      const right = boundingRect.left + boundingRect.width;
      const bottom = boundingRect.top + boundingRect.height;

      const shouldMoveLeft = left >= 0;
      const shouldMoveTop = top >= 0;
      const shouldMoveRight = right <= canvasWidth;
      const shouldMoveBottom = bottom <= canvasHeight;

      if (
        !shouldMoveLeft ||
        !shouldMoveTop ||
        !shouldMoveRight ||
        !shouldMoveBottom
      ) {
        obj.set({
          left: shouldMoveLeft ? left : obj.left,
          top: shouldMoveTop ? top : obj.top,
        });
      }

      window.addEventListener("mouseup", function () {
        console.log(obj.getScaledWidth());
      });
    });

    // 清理画布
    return () => {
      canvas.dispose();
    };
  }, []);

  return <canvas id="canvas"></canvas>;
};

export default Canvas;
