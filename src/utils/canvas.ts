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
    const objWidth = obj.width ?? 0;
    const objHeight = obj.height ?? 0;
    const objLeft = obj.left ?? 0;
    const objTop = obj.top ?? 0;
    const area = geteArea(obj);
    let offsetX = objLeft;
    let offsetY = objTop;
    if (obj.originX === "center") {
      offsetX = objLeft - objWidth / 2;
    } else if (obj.originX === "right") {
      offsetX = objLeft - objWidth;
    }

    if (obj.originY === "center") {
      offsetY = objTop - objHeight / 2;
    } else if (obj.originY === "bottom") {
      offsetY = objTop - objHeight;
    }
    for (let y = 0; y <= objHeight; y++) {
      for (let x = 0; x <= objWidth; x++) {
        const rotatedX = Math.ceil(offsetX + x);
        const rotatedY = Math.ceil(offsetY + y);
        if (
          rotatedX < 0 ||
          rotatedY < 0 ||
          rotatedX >= canvasWidth ||
          rotatedY >= canvasHeight
        )
          continue;

        if (obj.type === "circle") {
          const radius = objWidth / 2;
          const distanceToCenter = Math.sqrt(
            Math.pow(rotatedX - (offsetX + radius), 2) +
              Math.pow(rotatedY - (offsetY + radius), 2),
          );
          if (distanceToCenter <= radius) {
            csvData[rotatedY][rotatedX] = area > 0 ? YES_SYMBOL : NO_SYMBOL;
          }
        } else {
          csvData[rotatedY][rotatedX] = area > 0 ? YES_SYMBOL : NO_SYMBOL;
        }
      }
    }
  }
  return csvData;
};

export const updateCsv = (
  csvData: (typeof NO_SYMBOL)[][],
  obj: fabric.Object,
) => {
  const matrix = obj.calcOwnMatrix();
  const objWidth = obj.width ?? 0;
  const objHeight = obj.height ?? 0;
  const objLeft = obj.left ?? 0;
  const objTop = obj.top ?? 0;
  const area = geteArea(obj);
  let offsetX = objLeft;
  let offsetY = objTop;
  if (obj.originX === "center") {
    offsetX = objLeft - objWidth / 2;
  } else if (obj.originX === "right") {
    offsetX = objLeft - objWidth;
  }

  if (obj.originY === "center") {
    offsetY = objTop - objHeight / 2;
  } else if (obj.originY === "bottom") {
    offsetY = objTop - objHeight;
  }
  for (let y = 0; y <= objHeight; y++) {
    for (let x = 0; x <= objWidth; x++) {
      const dx = Math.ceil(offsetX + x);
      const dy = Math.ceil(offsetY + y);
      const [newX, newY] = multiply([dx, dy, 1], matrix);
      const rotatedX = newX >= 0 ? Math.ceil(newX) : Math.floor(newX);
      const rotatedY = newY >= 0 ? Math.ceil(newY) : Math.floor(newY);
      if (
        rotatedX < 0 ||
        rotatedY < 0 ||
        rotatedX >= objWidth ||
        rotatedY >= objHeight
      )
        continue;
      if (obj.type === "circle") {
        const radius = objWidth / 2;
        const distanceToCenter = Math.sqrt(
          Math.pow(rotatedX - (offsetX + radius), 2) +
            Math.pow(rotatedY - (offsetY + radius), 2),
        );
        if (distanceToCenter <= radius) {
          csvData[rotatedY][rotatedX] = area > 0 ? YES_SYMBOL : NO_SYMBOL;
        }
      } else {
        csvData[rotatedY][rotatedX] = area > 0 ? YES_SYMBOL : NO_SYMBOL;
      }
    }
  }

  return csvData;
};

const multiply = (arr: number[], arr2: number[] = [1, 0, 0, 1, 0, 0]) => {
  //arr[x,y,1], arr2[a,b,c,d,e,f]
  //ax+cy+e
  const newX = arr2[0] * arr[0] + arr2[2] * arr[1] + arr2[4];
  //bx+dy+f
  const newY = arr2[1] * arr[0] + arr2[3] * arr[1] + arr2[5];
  return [newX, newY, 1];
};
