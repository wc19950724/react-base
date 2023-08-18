import { Canvas, Rect } from "fabric";

/**
 * 基础绘制
 * 主要绘制画布操作按钮
 */
export class BasicDraw {
  canvas: Canvas;
  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.render();
  }

  render() {
    const { width, height } = this.canvas;
    const rect = new Rect({
      left: width / 2,
      top: height / 2,
      width: 100,
      height: 50,
      fill: "skyblue",
      stroke: "red",
      strokeWidth: 1,
      strokeUniform: false, // 控制边框是否跟随缩放
    });
    this.canvas.add(rect);
  }
}
