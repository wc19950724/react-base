import { merge } from "lodash";

import { getElement } from "./utils";

type SingleDirection = "top" | "right" | "bottom" | "left";
type MultipleDirection = "leftTop" | "rightTop" | "rightBottom" | "leftBottom";

interface ElementSize {
  width?: number;
  height?: number;
}

/** 单一方向 */
interface SingleDirectionOptions {
  direction: SingleDirection;
  min?: number;
  max?: number;
}

/** 多个方向 */
interface MultipleDirectionOptions {
  direction: MultipleDirection | Array<SingleDirection> | "all";
  min?: ElementSize;
  max?: ElementSize;
}

type AddOptions = SingleDirectionOptions | MultipleDirectionOptions;

interface ResizePoint {
  x: number;
  y: number;
}

export class CreateControls {
  cursor: string;
  controlElements: Partial<
    Record<SingleDirection | MultipleDirection, HTMLElement>
  >;
  constructor() {
    this.cursor = document.body.style.cursor;

    this.controlElements = {};
  }

  render(direction: AddOptions["direction"]) {
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

  getController(direction: SingleDirection | MultipleDirection) {
    const controller_size = 20;
    const div_size = 4;
    const controller = document.createElement("div");
    controller.classList.add("controller");
    controller.style.position = "absolute";
    controller.style.display = "flex";
    controller.style.alignItems = "center";
    controller.style.justifyContent = "center";
    const controller_child = document.createElement("div");

    if (direction === "left" || direction === "right") {
      controller.style.top = "0";
      controller.style.height = "100%";
      controller.style.width = `${controller_size}px`;
      controller_child.style.height = "100%";
      controller_child.style.width = `${div_size}px`;
    } else if (direction === "top" || direction === "bottom") {
      controller.style.left = "0";
      controller.style.width = "100%";
      controller.style.height = `${controller_size}px`;
      controller_child.style.width = "100%";
      controller_child.style.height = `${div_size}px`;
    } else if (direction === "leftTop" || direction === "rightTop") {
      controller.style.top = `-${controller_size / 2}px`;
      controller.style.width = `${controller_size}px`;
      controller.style.height = `${controller_size}px`;
      controller_child.style.width = `${div_size}px`;
      controller_child.style.height = `${div_size}px`;
    } else if (direction === "leftBottom" || direction === "rightBottom") {
      controller.style.bottom = `-${controller_size / 2}px`;
      controller.style.width = `${controller_size}px`;
      controller.style.height = `${controller_size}px`;
      controller_child.style.width = `${div_size}px`;
      controller_child.style.height = `${div_size}px`;
    }

    if (
      direction === "left" ||
      direction === "leftTop" ||
      direction === "leftBottom"
    ) {
      controller.style.left = `-${controller_size / 2}px`;
    } else if (
      direction === "right" ||
      direction === "rightTop" ||
      direction === "rightBottom"
    ) {
      controller.style.right = `-${controller_size / 2}px`;
    } else if (direction === "top") {
      controller.style.top = `-${controller_size / 2}px`;
    } else if (direction === "bottom") {
      controller.style.bottom = `-${controller_size / 2}px`;
    }

    controller.onmouseenter = () => {
      document.body.style.cursor = this.getCursorForDirection(direction);
      if (
        direction === "left" ||
        direction === "top" ||
        direction === "right" ||
        direction === "bottom"
      ) {
        controller_child.style.backgroundColor = "blue";
      }
    };

    controller.onmouseleave = () => {
      document.body.style.cursor = this.cursor;
      if (
        direction === "left" ||
        direction === "top" ||
        direction === "right" ||
        direction === "bottom"
      ) {
        controller_child.style.backgroundColor = "unset";
      }
    };

    controller.appendChild(controller_child);

    this.controlElements[direction] = controller;
  }

  getCursorForDirection(
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
  }
}

export class CreateResizes {
  startPoint: ResizePoint;

  private moving: (ev: MouseEvent | TouchEvent) => void;
  constructor() {
    this.startPoint = { x: 0, y: 0 };
    this.moving = (ev: MouseEvent | TouchEvent) => {
      if (ev instanceof MouseEvent) {
        this.resizing({ x: ev.pageX, y: ev.pageY });
      } else {
        this.resizing({ x: ev.touches[0].pageX, y: ev.touches[0].pageX });
      }
    };
  }

  start(point: ResizePoint) {
    this.startPoint = { ...point };

    document.addEventListener("mousemove", this.moving);
    document.addEventListener("mouseup", this.end);

    document.addEventListener("touchmove", this.moving);
    document.addEventListener("touchend", this.end);
  }

  resizing(point: ResizePoint) {
    console.log(point);
  }

  end() {
    document.removeEventListener("mousemove", this.moving);
    document.removeEventListener("mouseup", this.end);

    document.removeEventListener("touchmove", this.moving);
    document.removeEventListener("touchend", this.end);
  }
}

export class ResizeControl {
  private options: Map<HTMLElement, AddOptions> = new Map();

  private controls?: CreateControls;

  add(dom: string | HTMLElement, options?: AddOptions) {
    const el = getElement(dom);
    if (!el) throw `${dom}: the element is not found`;
    const defaultOptions = {
      direction: "all",
      min: { width: 0, height: 0 },
      max: { width: Infinity, height: Infinity },
    };
    options = merge(defaultOptions, options);
    this.options.set(el, options);
    const controls = new CreateControls();
    controls.render(options.direction);
    let dir: keyof typeof controls.controlElements;
    for (dir in controls.controlElements) {
      const controller = controls.controlElements[dir];
      if (controller) {
        el.appendChild(controller);
      }
    }
  }

  dispose() {
    this.options.clear();
    if (this.controls) {
      this.controls.dispose();
    }
  }
}
