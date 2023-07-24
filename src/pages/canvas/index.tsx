import { Button, Space } from "antd";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

import { getCsv } from "@/utils/canvas";

const Canvas = () => {
  const canvas = useRef<fabric.Canvas>();
  const tempCanvas = useRef<fabric.Canvas>();
  const [csvData, setCsvData] = useState<string[][]>([[]]);
  useEffect(() => {
    console.log(tempCanvas);

    canvas.current = new fabric.Canvas("canvas");
    tempCanvas.current = new fabric.Canvas("tempCanvas");
    canvas.current.setWidth(512);
    canvas.current.setHeight(512);
    tempCanvas.current.setWidth(512);
    tempCanvas.current.setHeight(512);
    canvas.current.backgroundColor = "#b1b1b1";
    canvas.current.on("object:modified", (e) => {
      if (!e.target || !canvas.current) return;
      if (tempCanvas.current) {
        const objects = canvas.current.getObjects();

        tempCanvas.current.renderCanvas(
          tempCanvas.current.getContext(),
          objects,
        );
        const text = getCsv(tempCanvas.current);
        setCsvData(text);
      }
    });
    // 清理画布
    return () => {
      canvas.current?.dispose();
    };
  }, []);

  /** 创建一个矩形 */
  const createRect = () => {
    if (!canvas.current) return;
    const rectangle = new fabric.Rect({
      left: 80,
      top: 80,
      width: 30,
      height: 60,
      fill: "blue",
      angle: 34,
    });
    canvas.current.add(rectangle);
    canvas.current.renderAll();
    if (tempCanvas.current) {
      const objects = canvas.current.getObjects();

      tempCanvas.current.renderCanvas(tempCanvas.current.getContext(), objects);
      const text = getCsv(tempCanvas.current);
      setCsvData(text);
    }
  };

  const createCircle = () => {
    if (!canvas.current) return;
    const Circle = new fabric.Circle({
      left: 0,
      top: 0,
      radius: 50,
      fill: "green",
      angle: 60,
      originX: "center",
      originY: "center",
    });
    canvas.current.add(Circle);
    canvas.current.renderAll();
    if (tempCanvas.current) {
      const objects = canvas.current.getObjects();

      tempCanvas.current.renderCanvas(tempCanvas.current.getContext(), objects);
      const text = getCsv(tempCanvas.current);
      setCsvData(text);
    }
  };

  return (
    <Space direction="vertical">
      <Space>
        <Button type="primary" onClick={createRect}>
          创建一个矩形
        </Button>
        <Button type="primary" onClick={createCircle}>
          创建一个圆
        </Button>
      </Space>
      <Space>
        <canvas id="canvas"></canvas>
        <canvas id="tempCanvas"></canvas>
      </Space>
      <code>{csvData.map((item) => item.join(",")).join("\n")}</code>
    </Space>
  );
};

export default Canvas;
