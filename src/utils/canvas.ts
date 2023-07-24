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
export const getCsv = (canvas: fabric.Canvas) => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();

  const csvData = new Array(canvasHeight)
    .fill(NO_SYMBOL)
    .map(() => new Array<typeof NO_SYMBOL>(canvasWidth).fill(NO_SYMBOL));
  const ctx = canvas.getContext();
  const objImageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
  for (let i = 0; i < objImageData.length; i += 4) {
    const x = Math.floor((i % (canvasWidth * 4)) / 4);
    const y = Math.floor(i / (canvasHeight * 4));
    if (
      objImageData[i] ||
      objImageData[i + 1] ||
      objImageData[i + 2] ||
      objImageData[i + 3]
    ) {
      csvData[y][x] = YES_SYMBOL;
    } else {
      csvData[y][x] = NO_SYMBOL;
    }
  }
  return csvData;
};
