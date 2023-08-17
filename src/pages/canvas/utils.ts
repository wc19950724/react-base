import {
  Canvas,
  Group,
  Object as fbObject,
  Rect,
  Text,
  TPointerEventInfo,
} from "fabric";

interface DrawOptions {
  group: ConstructorParameters<typeof Group>[1];
  button: ConstructorParameters<typeof Rect>[0];
  text: ConstructorParameters<typeof Text>;
  events?: {
    click?: (e: TPointerEventInfo) => void;
  };
  id: string;
}

const opacityStep = 0.6;

/**
 * 创建按钮图形
 * render函数绘制图形到画布
 */
export class CreateButton {
  config: DrawOptions;
  canvas?: Canvas;
  isHover?: boolean;
  isClick?: boolean;
  button?: fbObject;
  constructor(options: DrawOptions, canvas?: Canvas) {
    this.config = options;
    this.canvas = canvas;
    this.render();
  }

  render(canvas?: Canvas) {
    if (canvas) {
      this.canvas = canvas;
    }
    const { text, button, group, id } = this.config;
    const btnText = new Text(text[0], text[1]);
    const btnRect = new Rect({
      ...button,
      width: btnText.width + 30,
      height: btnText.height + 8,
    });

    const obj = new Group([btnRect, btnText], group);
    obj.set({
      id: id,
    });
    this.button = obj;
    this.addEvents();
    this.canvas?.add(obj);
    return this;
  }

  #setHoverOpacity(obj: fbObject) {
    const { group } = this.config;
    let opacity = obj.opacity;
    if (this.isHover) {
      opacity *= opacityStep;
    } else if (opacity !== (group?.opacity ?? 1)) {
      opacity /= opacityStep;
    }
    obj.set({
      opacity,
    });
    this.canvas?.requestRenderAll();
  }

  #setClickOpacity(obj: fbObject) {
    const { group } = this.config;
    let opacity = obj.opacity;
    if (this.isClick) {
      opacity *= opacityStep;
    } else if (opacity !== (group?.opacity ?? 1)) {
      opacity /= opacityStep;
    }
    obj.set({
      opacity,
    });
    this.canvas?.requestRenderAll();
  }

  addEvents() {
    this.button?.on("mouseover", this.mouseover.bind(this));
    this.button?.on("mouseout", this.mouseout.bind(this));
    this.button?.on("mousedown", (e) => {
      this.mousedown(e);
      this.canvas?.once("mouse:up", this.mouseup.bind(this));
    });
  }

  mouseover(e: TPointerEventInfo) {
    if (!e.target) return;
    const obj = e.target;
    this.isHover = true;
    this.#setHoverOpacity(obj);
  }

  mouseout(e: TPointerEventInfo) {
    if (!e.target) return;
    const obj = e.target;
    this.isHover = false;
    this.#setHoverOpacity(obj);
  }

  mousedown(e: TPointerEventInfo) {
    if (!e.target) return;
    const obj = e.target;
    this.isClick = true;
    this.#setClickOpacity(obj);
  }

  mouseup(e: TPointerEventInfo) {
    if (!this.isClick || !this.button) return;
    if (e.target?.get("id") === this.button.get("id")) {
      const { events } = this.config;
      events?.click?.(e);
    }
    this.isClick = false;
    this.#setClickOpacity(this.button);
  }
}

/**
 * 基础绘制
 * 主要绘制画布操作按钮
 */
export class BasicDraw {
  canvas: Canvas;
  buttons: CreateButton[] = [];
  #baseGroup: DrawOptions["group"] = {
    selectable: false,
    hoverCursor: "pointer",
    originX: "center",
    originY: "center",
    objectCaching: false,
    excludeFromExport: true,
    subTargetCheck: false,
  };
  #baseButton: DrawOptions["button"] = {
    fill: "#1677ff", // 按钮颜色
    rx: 4, // x 方向的圆角半径
    ry: 4, // y 方向的圆角半径
    originX: "center",
    originY: "center",
  };
  #baseText: DrawOptions["text"][1] = {
    fontSize: 14,
    fill: "#fff",
    originX: "center",
    originY: 0.4,
  };
  groups: DrawOptions[] = [
    {
      group: { ...this.#baseGroup, left: 50, top: 50 },
      button: { ...this.#baseButton },
      text: ["新增", { ...this.#baseText }],
      events: {
        click: this.handleAdd,
      },
      id: "add",
    },
    {
      group: { ...this.#baseGroup, left: 120, top: 50 },
      button: { ...this.#baseButton },
      text: ["清空", { ...this.#baseText }],
      id: "clear",
    },
  ];
  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  renderBtn() {
    this.groups.forEach((item) => {
      const button = new CreateButton(item, this.canvas);
      this.buttons.push(button);
    });
  }

  handleAdd(e: TPointerEventInfo) {
    console.log("点击事件", e);
  }
}
