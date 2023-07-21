import { Button, Space } from "antd";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

import { getCsv } from "@/utils/canvas";

const Canvas = () => {
  const canvas = useRef<fabric.Canvas>();
  const [csvText, setCsvText] = useState("");
  useEffect(() => {
    canvas.current = new fabric.Canvas("canvas");
    canvas.current.setWidth(512);
    canvas.current.setHeight(512);
    canvas.current.backgroundColor = "#b1b1b1";
    // 绘制圆
    const circle = new fabric.Circle({
      radius: 20,
      fill: "green",
      left: 256,
      top: 256,
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
      left: 5,
      top: 5,
      width: 30,
      height: 30,
      fill: "blue",
      angle: 60,
    });

    canvas.current.add(circle, rectangle);

    canvas.current.on("object:modified", (e) => {
      console.log(e);
    });
    // 清理画布
    return () => {
      canvas.current?.dispose();
    };
  }, []);

  const toCsv = () => {
    if (!canvas.current) return;
    const csvData = getCsv(canvas.current, canvas.current.getObjects());
    const text = csvData.map((item) => item.join(",")).join("\n");
    console.log(canvas.current);

    setCsvText(text);
  };

  return (
    <Space direction="vertical">
      <Space>
        <Button type="primary" onClick={toCsv}>
          生成csv矩阵
        </Button>
        <canvas id="canvas"></canvas>
      </Space>
      <code>{csvText}</code>
    </Space>
  );
};

export default Canvas;
