import { Button, Space } from "antd";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvas = useRef<fabric.Canvas>();
  const [pos, setPos] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    const parentDom =
      document.querySelector("#canvas-wrapper") || document.body;
    canvas.current = new fabric.Canvas("canvas");
    canvas.current.setWidth(parentDom.clientWidth);
    canvas.current.setHeight(parentDom.clientHeight);
    canvas.current.backgroundColor = "#232829";
    setApaCanvas();
    createCar();
    canvas.current.on("mouse:move", ({ e }) => {
      const [x, y] = [e.offsetX, e.offsetY];
      const [centerX, centerY] = Center2Origin(x, y);
      setPos([centerX, centerY]);
    });

    // 清理画布
    return () => {
      canvas.current?.dispose();
    };
  }, []);

  const Center2Origin = (centerX: number, centerY: number) => {
    if (!canvas.current) return [centerX, centerY];
    const [width, height] = [
      canvas.current.getWidth(),
      canvas.current.getHeight(),
    ];
    return [centerX - width / 2, height / 2 - centerY];
  };

  const getCenter = () => {
    if (!canvas.current) return [0, 0];
    const canvasWidth = canvas.current.getWidth();
    const canvasHeight = canvas.current.getHeight();
    return [canvasWidth / 2, canvasHeight / 2];
  };

  const createCar = () => {
    if (!canvas.current) return;
    const [width, height] = [18, 50];
    const [centerX, centerY] = getCenter();
    const strokeWidth = 1;
    const stroke = "#1cb86a";
    const fill = "rgba(28, 184, 106, 0.2)";
    // 方向线和矩形组合
    const car = new fabric.Rect({
      left: centerX - width / 2,
      top: centerY - height / 2,
      width,
      height,
      stroke,
      strokeWidth,
      fill,
      lockScalingX: true,
      lockScalingY: true,
      hasBorders: true,
      hasRotatingPoint: true,
    });

    // 设置操作按钮的显隐
    car.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      bl: false,
      br: false,
      tl: false,
      tr: false,
      mtr: true,
    });

    const point = new fabric.Circle({
      left: centerX,
      top: centerY,
      stroke,
      radius: 6,
      fill: stroke,
      originX: "center",
      originY: "center",
      hasControls: false,
      objectCaching: false,
      selectable: false, // 不可选中
      evented: false, // 不可交互
    });
    const line = new fabric.Line(
      [centerX, centerY, centerX, centerY - (5 * height) / 4],
      {
        objectCaching: false,
        noScaleCache: false,
        matrixCache: false,
        fill,
        stroke,
        strokeWidth,
        perPixelTargetFind: true,
        selectable: false, // 不可选中
        evented: false, // 不可交互
      },
    );

    const arrow = new fabric.Triangle({
      left: centerX,
      top: centerY - (5 * height) / 4,
      originX: "center",
      originY: "center",
      width: 12,
      height: 12,
      strokeWidth,
      stroke,
      fill: stroke,
      hasControls: false,
      objectCaching: false,
      selectable: false, // 不可选中
      evented: false, // 不可交互
    });
    // 创建辅助组合（包含line、point和arrow）
    const auxiliaryGroup = new fabric.Group([line, point, arrow], {
      selectable: false, // 不可选中
      evented: false, // 不可交互
      originX: "center",
      originY: "center",
    });

    // 3. 计算auxiliaryGroup相对于car的位移量
    const relativeLeft = auxiliaryGroup.left! - car.left!;
    const relativeTop = auxiliaryGroup.top! - car.top!;
    car.on("moving", () => {
      // 更新auxiliaryGroup的位置
      auxiliaryGroup.set({
        left: car.left! + relativeLeft,
        top: car.top! + relativeTop,
      });
    });
    car.on("rotating", () => {
      // 获取car的角度
      const carAngle = car.angle;

      // 将auxiliaryGroup旋转角度与car相同
      auxiliaryGroup.set({
        angle: carAngle,
      });
    });
    canvas.current.add(car, auxiliaryGroup);
    canvas.current.setActiveObject(car);
  };

  /**
   * 绘制apa画布
   */
  const setApaCanvas = () => {
    if (!canvas.current) return;
    const [width, height] = [512, 512];
    const [x, y] = getCenter();
    const rect = new fabric.Rect({
      left: x,
      top: y,
      width,
      height,
      originX: "center",
      originY: "center",
      stroke: "#fff", // 设置边框颜色为蓝色
      strokeWidth: 2, // 设置边框宽度为2像素
      fill: "transparent",
      selectable: false, // 设置为false，使矩形不可选中
      evented: false, // 设置为false，使矩形不可交互
    });
    // 获取矩形的中心点
    const centerPoint = rect.getCenterPoint();
    // 创建左边长文字对象
    const leftText = new fabric.Text(`边长: ${height}`, {
      left: centerPoint.x - rect.width! / 2 - 10, // 在矩形左边偏移10像素
      top: centerPoint.y, // 在矩形的中心垂直居中
      fontSize: 16,
      selectable: false, // 设置为false，使文字不可选中
      evented: false, // 设置为false，使文字不可交互
      originX: "center", // 设置水平对齐方式为矩形的右侧
      originY: "center", // 设置垂直对齐方式为矩形的中心
      angle: -90, // 设置旋转角度为-90度，使文字垂直排列
      fill: "#fff",
    });

    // 创建上边长文字对象
    const topText = new fabric.Text(`边长: ${width}`, {
      left: centerPoint.x, // 在矩形的中心水平居中
      top: centerPoint.y - rect.height! / 2, // 在矩形上方偏移40像素
      fontSize: 16,
      selectable: false, // 设置为false，使文字不可选中
      evented: false, // 设置为false，使文字不可交互
      originX: "center", // 设置水平对齐方式为矩形的中心
      originY: "bottom", // 设置垂直对齐方式为矩形的顶部
      fill: "#fff",
    });

    // 绘制x的中心线
    const xCenterLine = new fabric.Line(
      [
        centerPoint.x,
        centerPoint.y - rect.height! / 2,
        centerPoint.x,
        centerPoint.y + rect.height! / 2,
      ],
      {
        stroke: "rgba(0, 255, 0, 0.5)", // 设置线的颜色为半透明的红色
        strokeWidth: 1, // 设置线的宽度为1像素
        strokeDashArray: [5, 5], // 设置虚线效果，[5, 5] 表示实线长度和间隔长度
        selectable: false, // 设置为false，使线不可选中
        evented: false, // 设置为false，使线不可交互
      },
    );

    // 绘制y的中心线
    const yCenterLine = new fabric.Line(
      [
        centerPoint.x - rect.width! / 2,
        centerPoint.y,
        centerPoint.x + rect.width! / 2,
        centerPoint.y,
      ],
      {
        stroke: "rgba(0, 255, 0, 0.5)", // 设置线的颜色为半透明的绿色
        strokeWidth: 1, // 设置线的宽度为1像素
        strokeDashArray: [5, 5], // 设置虚线效果，[5, 5] 表示实线长度和间隔长度
        selectable: false, // 设置为false，使线不可选中
        evented: false, // 设置为false，使线不可交互
      },
    );
    canvas.current.add(rect, leftText, topText, xCenterLine, yCenterLine);
  };

  const reset = () => {
    createCar();
  };

  return (
    <div
      id="canvas-wrapper"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <span
        style={{
          position: "absolute",
          left: 10,
          top: 5,
          color: "#fff",
          zIndex: 999,
          fontSize: 22,
        }}
      >
        ({pos[0]},{pos[1]})
      </span>
      <Space
        style={{
          position: "absolute",
          right: 10,
          top: 5,
          zIndex: 999,
        }}
      >
        <Button type="primary" onClick={reset}>
          重置位置
        </Button>
      </Space>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Canvas;
