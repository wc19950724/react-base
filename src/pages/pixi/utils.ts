import { isEqual } from "lodash";
import {
  Application,
  Container,
  DisplayObject,
  Graphics,
  Matrix,
  Point,
} from "pixi.js";

import { Metrics, Stats } from "@/components/DatGui";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { getRandomInt } from "@/utils/utils";

const { handler } = useAnimationFrame();

export class PixiRenderer {
  app: Application | null;
  rightMouseDown = false;
  lastTransform: Matrix | null = null;

  stats: Stats;

  metrics: Metrics;

  constructor(app: Application) {
    this.app = app;
    this.appEvnets();

    this.stats = new Stats();
    this.metrics = new Metrics();
  }

  appEvnets() {
    if (!this.app) return;
    this.app.view.addEventListener?.("wheel", (e) => {
      handler(() => this.appWheelHandler(e as WheelEvent));
    });
    this.app.view.addEventListener?.("mousemove", (e) => {
      handler(() => this.appMoveHandler(e as WheelEvent));
    });
    this.app.view.addEventListener?.("contextmenu", (e) => {
      e.preventDefault();
    });
    this.app.view.addEventListener?.("mousedown", (e) => {
      const ev = e as MouseEvent;
      if (ev.button === 2) {
        this.rightMouseDown = true;
        this.app!.view.style!.cursor = "move";
      }
    });
    this.app.view.addEventListener?.("mouseup", (e) => {
      const ev = e as MouseEvent;
      if (ev.button === 2) {
        this.rightMouseDown = false;
        this.app!.view.style!.cursor = "default";
      }
    });

    this.app.ticker.add(this.rafRender.bind(this));
  }

  appWheelHandler(e: WheelEvent) {
    if (!this.app) return;
    let { x: zoom } = this.app.stage.scale;
    zoom *= 0.999 ** (e.deltaY * 2);
    // 控制缩放范围在 0.0625~16 的区间内
    if (zoom > 16) zoom = 16;
    if (zoom < 0.0625) zoom = 0.0625;

    const offsetX = e.offsetX;
    const offsetY = e.offsetY;

    // 计算鼠标位置相对于舞台的位置
    const mousePosition = this.app.stage.toLocal(new Point(offsetX, offsetY));

    // 计算新的舞台位置，以使缩放中心点在鼠标位置
    const newPositionX = offsetX - mousePosition.x * zoom;
    const newPositionY = offsetY - mousePosition.y * zoom;

    this.app.stage.position.set(newPositionX, newPositionY);

    this.app.stage.scale.set(zoom);
    this.metrics.setGui({ zoom });
    this.app.renderer.render(this.app.stage);
  }

  appMoveHandler(e: MouseEvent) {
    if (!this.rightMouseDown || !this.app) return;
    const { x, y } = this.app.stage.position;

    const newPositionX = x + e.movementX;
    const newPositionY = y + e.movementY;

    this.app.stage.position.set(newPositionX, newPositionY);
    this.app.renderer.render(this.app.stage);
  }

  render() {
    if (!this.app) return;
    const container = new Container();
    this.app.stage.addChild(container as DisplayObject);
    const rainbow = ["#ffcc66", "#ccff66", "#66ccff", "#ff6fcf", "#ff6666"];
    const rainbowEnd = rainbow.length - 1;

    for (let i = 0; i < 10000; i++) {
      const circle = new Graphics();
      circle.beginFill(rainbow[getRandomInt(0, rainbowEnd)]);
      circle.drawCircle(0, 0, 3);
      circle.x = Math.random() * this.app.screen.width;
      circle.y = Math.random() * this.app.screen.height;
      circle.endFill();
      container.addChild(circle as DisplayObject);
    }
    this.app.start();
  }

  recursionNode(node: DisplayObject[], cb: (child: DisplayObject) => void) {
    node?.forEach((child) => {
      if (child.children?.length) {
        this.recursionNode(child.children as DisplayObject[], cb);
      } else {
        cb(child);
      }
    });
  }

  isObjectInViewport() {
    if (!this.app) return;
    const stageTransform = this.app.stage.worldTransform;
    if (isEqual(this.lastTransform, stageTransform)) return;
    console.time("renderViewport");

    this.lastTransform = stageTransform.clone();
    const { left, top, right, bottom, width, height } = this.app.screen;
    const topLeftGlobal = new Point(left, top);
    const bottomRightGlobal = new Point(right, bottom);
    const tl = stageTransform.applyInverse(topLeftGlobal);
    const br = stageTransform.applyInverse(bottomRightGlobal);
    this.metrics.setGui({
      vptCoordsTL: `${tl.y.toFixed(0)}, ${tl.x.toFixed(0)}`,
      vptCoordsBR: `${br.y.toFixed(0)}, ${br.x.toFixed(0)}`,
    });

    let count = 0;
    this.recursionNode(this.app.stage.children, (child) => {
      const childBounds = child.getBounds();
      const limits = {
        tl: {
          x: childBounds.left + childBounds.width,
          y: childBounds.top + childBounds.height,
        },
        br: {
          x: childBounds.right - childBounds.width,
          y: childBounds.bottom - childBounds.height,
        },
      };
      if (
        limits.tl.x >= 0 &&
        limits.tl.y >= 0 &&
        limits.br.x <= width &&
        limits.br.y <= height
      ) {
        count++;
        child.visible = true;
      } else {
        child.visible = false;
      }
    });

    this.app.renderer.render(this.app.stage);
    console.log(`objects count: ${count}`);

    console.timeEnd("renderViewport");
  }

  rafRender() {
    if (!this.app) return;
    this.stats.begin();
    this.isObjectInViewport();
    this.stats.end();

    this.metrics.setGui({
      FPS: this.stats.FPS,
    });
  }

  reset() {
    this.app?.stop();
    this.app?.destroy();
    this.app = null;
  }
}
