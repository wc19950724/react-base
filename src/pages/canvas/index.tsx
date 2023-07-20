import { Button, Space } from "antd";
import { fabric } from "fabric";
import { useEffect } from "react";

import useDrawCsv from "@/hooks/useDrawCsv";

const Canvas = () => {
  let canvas: fabric.Canvas | null;
  useEffect(() => {
    canvas = new fabric.Canvas("canvas");
    canvas.setWidth(50);
    canvas.setHeight(50);
    canvas.backgroundColor = "#b1b1b1";
    // 绘制圆
    const circle = new fabric.Circle({
      radius: 5,
      fill: "green",
      left: 25,
      top: 25,
      hasControls: true,
      hasBorders: true,
      lockMovementX: false,
      lockMovementY: false,
      lockScalingX: false,
      lockScalingY: false,
      lockRotation: false,
      originX: "center",
      originY: "center",
      hoverCursor: "pointer",
    });

    // 创建一个正方形
    const rectangle = new fabric.Rect({
      left: 1,
      top: 1,
      width: 10,
      height: 10,
      fill: "blue",
    });

    canvas.add(circle, rectangle);
    // 清理画布
    return () => {
      canvas?.dispose();
    };
  }, []);

  const { drawCsv } = useDrawCsv();

  const toCsv = () => {
    if (!canvas) return;
    const csvData = drawCsv(canvas, canvas.getObjects());
    console.log(csvData);
  };

  return (
    <Space>
      <Button type="primary" onClick={toCsv}>
        生成csv矩阵
      </Button>
      <canvas id="canvas"></canvas>
    </Space>
  );
};

export default Canvas;
