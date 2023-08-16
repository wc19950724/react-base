import { Canvas, Group, Rect, Text, TPointerEventInfo } from "fabric";

interface DrawOptions {
  group: ConstructorParameters<typeof Group>[1];
  button: ConstructorParameters<typeof Rect>[0];
  text: ConstructorParameters<typeof Text>;
  events?: {
    mouseDown?: (e: TPointerEventInfo) => void;
    mouseUp?: (e: TPointerEventInfo) => void;
  };
  id: string;
}
let clickId = "";
const addMouseDown = (e: TPointerEventInfo) => {
  clickId = e.target?.get("id");
};
const addMouseUp = (e: TPointerEventInfo) => {
  if (clickId && e.target?.get("id") === clickId) {
    console.log("点击事件", e);
  }
};
const baseGroup: DrawOptions["group"] = {
  selectable: false,
  hoverCursor: "pointer",
  originX: "center",
  originY: "center",
  objectCaching: false,
  excludeFromExport: true,
  subTargetCheck: false,
};
const baseButton: DrawOptions["button"] = {
  fill: "#1677ff", // 按钮颜色
  rx: 4, // x 方向的圆角半径
  ry: 4, // y 方向的圆角半径
  originX: "center",
  originY: "center",
};
const baseText: DrawOptions["text"][1] = {
  fontSize: 14,
  fill: "#fff",
  originX: "center",
  originY: 0.4,
};
const groups: DrawOptions[] = [
  {
    group: { ...baseGroup, left: 50, top: 50 },
    button: { ...baseButton },
    text: ["新增", { ...baseText }],
    events: {
      mouseDown: addMouseDown,
      mouseUp: addMouseUp,
    },
    id: "add",
  },
  {
    group: { ...baseGroup, left: 120, top: 50 },
    button: { ...baseButton },
    text: ["清空", { ...baseText }],
    id: "clear",
  },
];
const opacityStep = 0.6;

export class Draw {
  canvas: Canvas;
  buttons: Group[] = [];
  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.canvas.on("mouse:down", (e) => {
      clickId = e.target?.get("id");
    });
    this.canvas.on("mouse:up", (e) => {
      const id = e.target?.get("id");
      this.buttons.forEach((button) => {
        button.set({
          opacity:
            button.opacity === 1 * opacityStep && id === button.get("id")
              ? 1 * opacityStep
              : button.opacity / opacityStep,
        });
      });
      this.canvas.requestRenderAll();
    });
    this.initalizeOperations();
  }

  initalizeOperations() {
    groups.forEach((item) => {
      const btnText = new Text(item.text[0], item.text[1]);
      const btnRect = new Rect({
        ...item.button,
        width: btnText.width + 30,
        height: btnText.height + 8,
      });

      const obj = new Group([btnRect, btnText], item.group);
      obj.set({
        id: item.id,
      });
      obj.on("mouseover", () => {
        obj.set({
          opacity: obj.opacity * opacityStep,
        });
        this.canvas.requestRenderAll();
      });
      obj.on("mouseout", () => {
        obj.set({
          opacity: obj.opacity / opacityStep,
        });
        this.canvas.requestRenderAll();
      });
      obj.on("mousedown", (e) => {
        obj.set({
          opacity: obj.opacity * opacityStep,
        });
        item.events?.mouseDown?.(e);
        this.canvas.requestRenderAll();
      });
      obj.on("mouseup", (e) => {
        obj.set({
          opacity:
            obj.opacity === 1 * opacityStep
              ? 1 * opacityStep
              : obj.opacity / opacityStep,
        });
        item.events?.mouseUp?.(e);
        this.canvas.requestRenderAll();
      });
      this.buttons.push(obj);
      this.canvas.add(obj);
    });
  }
}
