import {
  Canvas,
  Circle,
  Group,
  Object as fbObject,
  Point,
  TCornerPoint,
  TPointerEvent,
  TPointerEventInfo,
} from "fabric";
import { difference, isEqual } from "lodash";

import { Metrics, Stats } from "@/components/DatGui";
import { LockMapKey, useAnimationFrame } from "@/hooks/useAnimationFrame";
import { getRandomInt } from "@/utils/utils";

export const CANVAS_ID = "my-canvas";
export const CANVAS_WRAPPER_ID = "canvas-wrapper";

const { handler } = useAnimationFrame();

export class BasicDraw {
  canvas: Canvas | null;
  rafId = 0;
  lastVptCoords: TCornerPoint | null = null;
  resizeObserver: ResizeObserver | null = null;

  rightMouseDown = false;

  stats: Stats;

  metrics: Metrics;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.canvasEvents();

    this.stats = new Stats();
    this.metrics = new Metrics();
  }

  canvasEvents() {
    this.canvas?.on("mouse:wheel", (e) =>
      handler(() => this.canvasWheelHandler(e)),
    );
    this.canvas?.on("mouse:move", (e) =>
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
    this.metrics.setGui({ zoom });
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
    this.rafId = 0;
    this.lastVptCoords = null;
    this.disconnect();
  }
}

export class CanvasObjectRenderer extends BasicDraw {
  drawGroup: fbObject[] = [];
  renderedMapFeatures: fbObject[] = [];

  constructor(canvas: Canvas) {
    super(canvas);
    this.render();
  }

  // 判断对象是否在可视区域内
  isObjectInViewport() {
    const vptCoords = this.canvas?.vptCoords;
    if (!vptCoords || isEqual(this.lastVptCoords, vptCoords)) return;
    console.time("renderViewport");

    this.lastVptCoords = vptCoords;
    const { tl, br } = vptCoords;
    this.metrics.setGui({
      vptCoordsTL: `${tl.x.toFixed(0)}, ${tl.y.toFixed(0)}`,
      vptCoordsBR: `${br.x.toFixed(0)}, ${br.y.toFixed(0)}`,
    });

    const featuresInViewport: fbObject[] = [];
    this.drawGroup.forEach((obj) => {
      const { x, y } = obj.getCenterPoint();
      const limits = {
        tl: {
          x: x + obj.width / 2,
          y: y + obj.height / 2,
        },
        br: {
          x: x - obj.width / 2,
          y: y - obj.height / 2,
        },
      };
      if (
        limits.tl.x >= tl.x &&
        limits.br.x <= br.x &&
        limits.tl.y >= tl.y &&
        limits.br.y <= br.y
      ) {
        featuresInViewport.push(obj);
      }
    });

    // 需要新增到画布的地图元素
    const addFeatures = difference(
      featuresInViewport,
      this.renderedMapFeatures,
    );
    this.canvas?.add(...addFeatures);
    // 需要从画布移除的地图元素
    const removeFeatures = difference(
      this.renderedMapFeatures,
      featuresInViewport,
    );
    this.canvas?.remove(...removeFeatures);

    this.canvas?.requestRenderAll();
    this.renderedMapFeatures = featuresInViewport;
    console.log(`objects count: ${this.canvas?.getObjects().length}`);
    console.timeEnd("renderViewport");
  }

  render() {
    const rainbow = ["#ffcc66", "#ccff66", "#66ccff", "#ff6fcf", "#ff6666"];
    const rainbowEnd = rainbow.length - 1;
    const canvasWidth = this.canvas!.getWidth();
    const canvasHeight = this.canvas!.getHeight();
    for (let i = 0; i < 10000; i++) {
      const dot = new Circle({
        left: getRandomInt(0, canvasWidth),
        top: getRandomInt(0, canvasHeight),
        radius: 3,
        fill: rainbow[getRandomInt(0, rainbowEnd)],
        objectCaching: false,
        selectable: false,
        evented: false,
      });
      this.drawGroup.push(dot);
    }
  }

  renderViewport() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.rafId = requestAnimationFrame(() => {
      this.renderViewport();
    });
    this.stats.begin();
    this.isObjectInViewport();
    this.stats.end();
    this.metrics.setGui({
      FPS: this.stats.FPS,
    });
  }

  reset() {
    super.reset();
    this.drawGroup = [];
    this.renderedMapFeatures = [];
  }
}

export class CanvasGroupRenderer extends BasicDraw {
  drawGroup: fbObject[][] = [[]];
  renderedMapFeatures: fbObject[][] = [[]];

  constructor(canvas: Canvas) {
    super(canvas);
    this.render();
  }

  // 判断对象是否在可视区域内
  isObjectInViewport() {
    const vptCoords = this.canvas?.vptCoords;
    if (!vptCoords || isEqual(this.lastVptCoords, vptCoords)) return;
    console.time("renderViewport");

    this.lastVptCoords = vptCoords;
    const { tl, br } = vptCoords;
    this.metrics.setGui({
      vptCoordsTL: `${tl.x.toFixed(0)}, ${tl.y.toFixed(0)}`,
      vptCoordsBR: `${br.x.toFixed(0)}, ${br.y.toFixed(0)}`,
    });
    const groups = this.canvas?.getObjects();

    this.drawGroup.forEach((objects, index) => {
      const [group] =
        groups?.filter((obj) => obj.get("id") === `group_${index}`) || [];
      if (!(group instanceof Group)) return;
      const featuresInViewport: fbObject[] = [];
      objects.forEach((obj) => {
        const { x, y } = obj.getCenterPoint();
        const limits = {
          tl: {
            x: x + obj.width / 2,
            y: y + obj.height / 2,
          },
          br: {
            x: x - obj.width / 2,
            y: y - obj.height / 2,
          },
        };
        if (
          limits.tl.x >= tl.x &&
          limits.br.x <= br.x &&
          limits.tl.y >= tl.y &&
          limits.br.y <= br.y
        ) {
          featuresInViewport.push(obj);
        }
      });

      // 需要新增到画布的地图元素
      const addFeatures = difference(
        featuresInViewport,
        this.renderedMapFeatures[index],
      );

      group.add(...addFeatures);
      // 需要从画布移除的地图元素
      const removeFeatures = difference(
        this.renderedMapFeatures[index],
        featuresInViewport,
      );
      group.remove(...removeFeatures);
      this.renderedMapFeatures[index] = featuresInViewport;
    });
    this.canvas?.requestRenderAll();

    console.log(`objects count: ${this.renderedMapFeatures.flat().length}`);

    console.timeEnd("renderViewport");
  }

  render() {
    const rainbow = ["#ffcc66", "#ccff66", "#66ccff", "#ff6fcf", "#ff6666"];
    const rainbowEnd = rainbow.length - 1;
    const canvasWidth = this.canvas!.getWidth();
    const canvasHeight = this.canvas!.getHeight();

    for (let i = 0; i < 10000; i++) {
      const dot = new Circle({
        left: getRandomInt(0, canvasWidth),
        top: getRandomInt(0, canvasHeight),
        radius: 3,
        fill: rainbow[getRandomInt(0, rainbowEnd)],
        objectCaching: false,
      });
      const index = Math.floor(i / 1000);
      if (!this.drawGroup[index]) {
        this.drawGroup[index] = [];
      }
      this.drawGroup[index].push(dot);
    }
    for (let i = 0; i < this.drawGroup.length; i++) {
      const group = new Group([], {
        objectCaching: false,
        selectable: false,
        evented: false,
      });
      group.set({
        id: `group_${i}`,
      });
      this.canvas?.add(group);
    }
  }

  renderViewport() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.rafId = requestAnimationFrame(() => {
      this.renderViewport();
    });
    this.stats.begin();
    this.isObjectInViewport();
    this.stats.end();
    this.metrics.setGui({
      FPS: this.stats.FPS,
    });
  }

  reset() {
    super.reset();
    this.drawGroup = [[]];
    this.renderedMapFeatures = [[]];
  }
}
