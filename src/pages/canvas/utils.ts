import {
  Canvas,
  Circle,
  Object as fbObject,
  Point,
  TCornerPoint,
  TPointerEvent,
  TPointerEventInfo,
} from "fabric";
import { difference, isEqual } from "lodash";
import { makeAutoObservable } from "mobx";

import { LockMapKey, useAnimationFrame } from "@/hooks/useAnimationFrame";

export interface DatGuiData {
  FPS: number;
  zoom: number;
  vptCoordsTL: string;
  vptCoordsBR: string;
}

const metrics = makeAutoObservable({
  gui: {
    FPS: 0,
    zoom: 1,
    vptCoordsTL: "0, 0",
    vptCoordsBR: "0, 0",
  } as DatGuiData,
  setGui(data: Partial<DatGuiData>) {
    this.gui = { ...this.gui, ...data };
  },
});

const stats = (function () {
  let beginTime = (performance || Date).now(),
    prevTime = beginTime,
    frames = 0;

  return {
    begin: function () {
      beginTime = (performance || Date).now();
    },

    end: function () {
      frames++;
      const time = (performance || Date).now();
      if (time >= prevTime + 1000) {
        metrics.setGui({
          FPS: Math.round((frames * 1000) / (time - prevTime)),
        });
        prevTime = time;
        frames = 0;
      }
      return time;
    },

    update: function () {
      beginTime = this.end();
    },
  };
})();

export { metrics, stats };

export const CANVAS_ID = "my-canvas";
export const CANVAS_WRAPPER_ID = "canvas-wrapper";

const { handler } = useAnimationFrame();

/**
 * 基础绘制
 * 主要绘制画布操作按钮
 */
export class BasicDraw {
  canvas: Canvas | null;
  drawObjects: fbObject[] = [];
  rafId = 0;
  renderedMapFeatures: fbObject[] = [];
  lastVptCoords: TCornerPoint | null = null;
  resizeObserver: ResizeObserver | null;

  rightMouseDown = false;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.render();

    this.canvas.on("mouse:wheel", (e) =>
      handler(() => this.canvasWheelHandler(e)),
    );
    this.canvas.on("mouse:move", (e) =>
      handler(() => this.canvasMoveHandler(e)),
    );
    const canvasWrapper = document.getElementById(CANVAS_WRAPPER_ID)!;
    canvasWrapper.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    canvasWrapper.addEventListener("mousedown", (e) => {
      if (e.button === 2) {
        this.rightMouseDown = true;
        this.canvas?.setCursor("move");
      }
    });
    canvasWrapper.addEventListener("mouseup", (e) => {
      if (e.button === 2) {
        this.rightMouseDown = false;
        this.canvas?.setCursor("default");
      }
    });

    this.resizeObserver = new ResizeObserver((entries) => {
      handler(() => {
        for (const entry of entries) {
          const newWidth = entry.contentRect.width;
          const newHeight = entry.contentRect.height;

          // FIXME: canvas.dispose() 是异步, 卸载不及时会报错
          if (!newWidth || !newHeight) return;
          this.canvas?.setDimensions({
            width: newWidth,
            height: newHeight,
          });

          this.canvas?.renderAll();
        }
      }, LockMapKey.RESIZE);
    });
  }

  // 判断对象是否在可视区域内
  isObjectInViewport() {
    const vptCoords = this.canvas?.vptCoords;
    if (!vptCoords || isEqual(this.lastVptCoords, vptCoords)) return;
    console.time("renderViewport");

    this.lastVptCoords = vptCoords;
    const { tl, br } = vptCoords;

    const featuresInViewport: fbObject[] = [];
    this.drawObjects.forEach((obj) => {
      const objLeft = obj.left;
      const objTop = obj.top;
      const objWidth = obj.width * obj.scaleX;
      const objHeight = obj.height * obj.scaleY;
      if (
        objLeft + objWidth >= tl.x &&
        objLeft <= br.x &&
        objTop + objHeight >= tl.y &&
        objTop <= br.y
      ) {
        featuresInViewport.push(obj);
      }
    });

    // 需要新增到画布的地图元素
    const addFeatures = difference(
      featuresInViewport,
      this.renderedMapFeatures,
    );
    addFeatures.forEach((feature) => {
      this.canvas?.add(feature);
    });
    // 需要从画布移除的地图元素
    const removeFeatures = difference(
      this.renderedMapFeatures,
      featuresInViewport,
    );
    removeFeatures.forEach((feature) => {
      this.canvas?.remove(feature);
    });
    this.canvas?.requestRenderAll();
    this.renderedMapFeatures = featuresInViewport;
    console.log(`objects count: ${this.canvas?.getObjects().length}`);
    console.timeEnd("renderViewport");
  }

  /**
   * 获取指定范围内的随机整数
   * @param {number} min - 最小值（包括）
   * @param {number} max - 最大值（不包括）
   * @returns {number} - 随机整数
   */
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render() {
    const rainbow = ["#ffcc66", "#ccff66", "#66ccff", "#ff6fcf", "#ff6666"];
    const rainbowEnd = rainbow.length - 1;
    const canvasWidth = this.canvas!.getWidth();
    const canvasHeight = this.canvas!.getHeight();
    for (let i = 10000; i >= 0; i--) {
      const dot = new Circle({
        left: this.getRandomInt(0, canvasWidth),
        top: this.getRandomInt(0, canvasHeight),
        radius: 3,
        fill: rainbow[this.getRandomInt(0, rainbowEnd)],
        objectCaching: false,
      });
      this.drawObjects.push(dot);
    }
  }

  renderViewport() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.rafId = requestAnimationFrame(() => {
      this.renderViewport();
    });
    stats.begin();
    this.isObjectInViewport();
    stats.end();
  }

  canvasWheelHandler({ e }: TPointerEventInfo<WheelEvent>) {
    e.preventDefault();
    let zoom = this.canvas?.getZoom() ?? 1;
    zoom *= 0.999 ** (e.deltaY * 2);
    // 控制缩放范围在 0.0625~16 的区间内
    if (zoom > 16) zoom = 16;
    if (zoom < 0.0625) zoom = 0.0625;
    this.canvas?.zoomToPoint(
      new Point({
        x: e.offsetX,
        y: e.offsetY,
      }),
      zoom,
    );
    metrics.setGui({ zoom });
    this.canvas?.requestRenderAll();
  }
  canvasMoveHandler({ e }: TPointerEventInfo<TPointerEvent>) {
    e.preventDefault();
    if (!this.rightMouseDown || e instanceof TouchEvent) return;
    this.canvas?.setCursor("move");

    const delta = new Point(e.movementX, e.movementY);
    this.canvas?.relativePan(delta);
    this.canvas?.requestRenderAll();
  }

  observe(dom: HTMLElement) {
    this.resizeObserver?.observe(dom);
  }

  disconnect() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
  }

  reset() {
    this.canvas = null;
    this.drawObjects = [];
    this.rafId = 0;
    this.renderedMapFeatures = [];
    this.lastVptCoords = null;
    this.disconnect();
  }
}
