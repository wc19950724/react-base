import { Button, Space } from "antd";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

import { getCsv, updateCsv } from "@/utils/canvas";

let data: string[][] = [[]];

const Canvas = () => {
  const canvas = useRef<fabric.Canvas>();
  const [csvData, setCsvData] = useState<string[][]>([[]]);
  useEffect(() => {
    canvas.current = new fabric.Canvas("canvas");
    canvas.current.setWidth(512);
    canvas.current.setHeight(512);
    canvas.current.backgroundColor = "#b1b1b1";
    canvas.current.on("object:modified", (e) => {
      if (!e.target) return;
      const text = updateCsv(data, e.target);
      data = text;
      setCsvData(text);
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
      left: 5,
      top: 5,
      width: 30,
      height: 60,
      fill: "blue",
    });
    canvas.current.add(rectangle);
    const text = getCsv(canvas.current, canvas.current.getObjects());
    data = text;
    setCsvData(text);
  };

  const createCircle = () => {
    if (!canvas.current) return;
    const Circle = new fabric.Circle({
      left: 5,
      top: 5,
      radius: 20,
      fill: "green",
    });
    canvas.current.add(Circle);
    const text = getCsv(canvas.current, canvas.current.getObjects());
    setCsvData(text);
    data = text;
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
      </Space>
      <code>{csvData.map((item) => item.join(",")).join("\n")}</code>
    </Space>
  );
};

export default Canvas;
