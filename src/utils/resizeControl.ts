import { merge } from "lodash";

import { getElement } from "./utils";

type SingleDirection = "top" | "right" | "bottom" | "left";
type MultipleDirection = "leftTop" | "rightTop" | "rightBottom" | "leftBottom";

type Direction =
  | SingleDirection
  | MultipleDirection
  | Array<SingleDirection>
  | "all";

interface ResizeRect {
  x: number;
  y: number;
  width: number;
  height: number;
  left: number;
  top: number;
}

export class CreateControls {
  private cursor: string;
  controlElements: Partial<
    Record<SingleDirection | MultipleDirection, HTMLElement>
  >;
  constructor() {
    this.cursor = document.body.style.cursor;

    this.controlElements = {};
  }

  render(direction: Direction) {
    if (direction === "all") {
      const directions: Array<SingleDirection | MultipleDirection> = [
        "top",
        "right",
        "bottom",
        "left",
        "leftTop",
        "rightTop",
        "rightBottom",
        "leftBottom",
      ];
      for (const dir of directions) {
        this.getController(dir);
      }
    } else if (Array.isArray(direction)) {
      direction.forEach((dir) => {
        this.getController(dir);
      });
    } else {
      this.getController(direction);
    }
  }

  private getController(direction: SingleDirection | MultipleDirection) {
    const controller_size = 20;
    const controller = document.createElement("div");
    controller.classList.add("controller");
    controller.style.position = "absolute";
    switch (direction) {
      case "left":
      case "right":
        controller.style[direction] = `-${controller_size / 2}px`;
        controller.style.top = "0";
        controller.style.height = "100%";
        controller.style.width = `${controller_size}px`;
        break;
      case "top":
      case "bottom":
        controller.style[direction] = `-${controller_size / 2}px`;
        controller.style.left = "0";
        controller.style.width = "100%";
        controller.style.height = `${controller_size}px`;
        break;
      case "leftTop":
      case "rightTop":
        if (direction === "leftTop") {
          controller.style.left = `-${controller_size / 2}px`;
        } else {
          controller.style.right = `-${controller_size / 2}px`;
        }
        controller.style.top = `-${controller_size / 2}px`;
        controller.style.width = `${controller_size}px`;
        controller.style.height = `${controller_size}px`;
        break;
      case "leftBottom":
      case "rightBottom":
        if (direction === "leftBottom") {
          controller.style.left = `-${controller_size / 2}px`;
        } else {
          controller.style.right = `-${controller_size / 2}px`;
        }
        controller.style.bottom = `-${controller_size / 2}px`;
        controller.style.width = `${controller_size}px`;
        controller.style.height = `${controller_size}px`;
        break;
    }

    controller.onmouseenter = () => {
      document.body.style.cursor = this.getCursorForDirection(direction);
    };

    controller.onmouseleave = () => {
      document.body.style.cursor = this.cursor;
    };

    this.controlElements[direction] = controller;
  }

  private getCursorForDirection(
    direction: SingleDirection | MultipleDirection,
  ): string {
    switch (direction) {
      case "top":
        return "n-resize"; // 向上（北）的箭头
      case "bottom":
        return "s-resize"; // 向下（南）的箭头
      case "left":
        return "w-resize"; // 向左（西）的箭头
      case "right":
        return "e-resize"; // 向右（东）的箭头
      case "leftTop":
        return "nw-resize"; // 向左上（西北）的箭头
      case "rightTop":
        return "ne-resize"; // 向右上（东北）的箭头
      case "rightBottom":
        return "se-resize"; // 向右下（东南）的箭头
      case "leftBottom":
        return "sw-resize"; // 向左下（西南）的箭头
      default:
        return this.cursor; // 默认鼠标样式
    }
  }

  dispose() {
    document.body.style.cursor = this.cursor;
    let dir: keyof typeof this.controlElements;
    for (dir in this.controlElements) {
      this.controlElements[dir]?.remove();
    }
    this.controlElements = {};
  }
}

export class CreateResizes {
  el: HTMLElement | null;
  private startRect: ResizeRect | null;
  private direction?: SingleDirection | MultipleDirection;
  private controlMap: Map<HTMLElement, SingleDirection | MultipleDirection> =
    new Map();

  private userSelect = document.body.style.userSelect;
  private currentDom?: HTMLElement;

  constructor() {
    this.el = null;
    this.startRect = null;
    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.end = this.end.bind(this);
  }

  add(
    el: HTMLElement,
    controlDom: HTMLElement,
    direction: SingleDirection | MultipleDirection,
  ) {
    this.el = el;

    this.controlMap.set(controlDom, direction);
    const ready = (event: MouseEvent | TouchEvent) => {
      this.currentDom = controlDom;
      this.start(event);
    };
    controlDom.onmousedown = ready;
    controlDom.ontouchstart = ready;
  }

  private start(event: MouseEvent | TouchEvent) {
    if (!this.currentDom || !this.el) return;
    event.preventDefault();
    this.userSelect = document.body.style.userSelect;
    document.body.style.userSelect = "none";
    this.direction = this.controlMap.get(this.currentDom);
    const { width, height, left, top } = this.el.getBoundingClientRect();
    this.startRect = merge({}, this.startRect, { width, height, left, top });
    if (event instanceof MouseEvent) {
      merge(this.startRect, {
        x: event.pageX,
        y: event.pageY,
      });
      document.addEventListener("mousemove", this.move);
      document.addEventListener("mouseup", this.end);
    } else {
      merge(this.startRect, {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
      });
      document.addEventListener("touchmove", this.move, {
        passive: false,
      });
      document.addEventListener("touchend", this.end);
      document.addEventListener("touchcancel", this.end);
    }
  }

  private move(event: MouseEvent | TouchEvent) {
    if (!this.startRect) return;
    event.preventDefault();
    switch (this.direction) {
      case "left":
        this.moveLeft(event);
        break;
      case "right":
        this.moveRight(event);
        break;
      case "top":
        this.moveTop(event);
        break;
      case "bottom":
        this.moveBottom(event);
        break;
      case "leftTop":
        this.moveLeft(event);
        this.moveTop(event);
        break;
      case "rightTop":
        this.moveRight(event);
        this.moveTop(event);
        break;
      case "leftBottom":
        this.moveLeft(event);
        this.moveBottom(event);
        break;
      case "rightBottom":
        this.moveRight(event);
        this.moveBottom(event);
        break;
    }
  }

  private moveLeft(event: MouseEvent | TouchEvent) {
    if (!this.el || !this.startRect) return;

    const currentX =
      event instanceof MouseEvent ? event.pageX : event.touches[0].pageX;
    const diffX = this.startRect.x - currentX;

    this.el.style.width = this.startRect.width + diffX + "px";
  }

  private moveRight(event: MouseEvent | TouchEvent) {
    if (!this.el || !this.startRect) return;

    const currentX =
      event instanceof MouseEvent ? event.pageX : event.touches[0].pageX;
    const diffX = currentX - this.startRect.x;

    this.el.style.width = this.startRect.width + diffX + "px";
  }

  private moveTop(event: MouseEvent | TouchEvent) {
    if (!this.el || !this.startRect) return;

    const currentY =
      event instanceof MouseEvent ? event.pageY : event.touches[0].pageY;
    const diffY = this.startRect.y - currentY;

    this.el.style.height = this.startRect.height + diffY + "px";
  }

  private moveBottom(event: MouseEvent | TouchEvent) {
    if (!this.el || !this.startRect) return;

    const currentY =
      event instanceof MouseEvent ? event.pageY : event.touches[0].pageY;
    const diffY = currentY - this.startRect.y;

    this.el.style.height = this.startRect.height + diffY + "px";
  }

  private end() {
    document.body.style.userSelect = this.userSelect;
    this.startRect = null;
    document.removeEventListener("mousemove", this.move);
    document.removeEventListener("mouseup", this.end);
    document.removeEventListener("touchmove", this.move);
    document.removeEventListener("touchend", this.end);
    document.removeEventListener("touchcancel", this.end);
  }

  dispose() {
    this.controlMap.clear();
    this.end();
  }
}

export class ResizeControl {
  private controlMap: Map<HTMLElement, Direction> = new Map();

  private controls: CreateControls;

  private resizeEvents: CreateResizes;

  constructor() {
    this.controls = new CreateControls();
    this.resizeEvents = new CreateResizes();
  }

  add(dom: string | HTMLElement, direction: Direction = "all") {
    const el = getElement(dom);
    if (!el) throw `${dom}: the element is not found`;
    el.style.position = "relative";
    this.controlMap.set(el, direction);
    this.register();
  }

  // 注册器
  private register() {
    const entries = [...this.controlMap.entries()];
    entries.forEach(([el, direction]) => {
      this.controls.render(direction);
      const { controlElements } = this.controls;
      let dir: keyof typeof controlElements;
      for (dir in controlElements) {
        const direction = dir;
        const controller = controlElements[direction];
        if (controller) {
          // 注册事件
          this.resizeEvents.add(el, controller, direction);
          el.appendChild(controller);
        }
      }
    });
  }

  dispose() {
    this.controlMap.clear();
    this.controls.dispose();
    this.resizeEvents.dispose();
  }
}
