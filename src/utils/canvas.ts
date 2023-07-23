import { fabric } from "fabric";

export const geteArea = (obj: fabric.Object): number => {
  const { height, width } = obj.getBoundingRect();
  const objWidth = width >= 0 ? Math.ceil(width) : Math.floor(width);
  const objHeight = height >= 0 ? Math.ceil(height) : Math.floor(height);
  switch (obj.type) {
    case "circle":
      return Math.PI * Math.pow(objWidth / 2, 2);
    default:
      return objWidth * objHeight;
  }
};
const YES_SYMBOL: string = "●";
const NO_SYMBOL: string = "○";
export const getCsv = (canvas: fabric.Canvas, objects: fabric.Object[]) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  const csvData = new Array(canvasHeight)
    .fill(NO_SYMBOL)
    .map(() => new Array<typeof NO_SYMBOL>(canvasWidth).fill(NO_SYMBOL));

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    const { width, height, left, top } = obj.getBoundingRect();
    // 遍历画布上的每个像素点
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const DX = Math.ceil(x + left);
        const DY = Math.ceil(y + top);
        if (DX < 0 || DY < 0 || DX > canvasWidth || DY > canvasHeight) continue;
        // 判断当前像素点是否在任意元素内部
        // 将当前像素点设置为1，表示有元素
        const ponit = new fabric.Point(DX, DY);
        csvData[DY][DX] = obj.containsPoint(ponit) ? YES_SYMBOL : NO_SYMBOL;
      }
    }
  }
  return csvData;
};
