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

const getObjBoundingRect = (obj: fabric.Object) => {
  const { left, top, width, height } = obj.getBoundingRect();
  const objWidth = width >= 0 ? Math.ceil(width) : Math.floor(width);
  const objHeight = height >= 0 ? Math.ceil(height) : Math.floor(height);
  const objLeft = left >= 0 ? Math.ceil(left) : Math.floor(left);
  const objTop = top >= 0 ? Math.ceil(top) : Math.floor(top);
  return {
    width: objWidth,
    height: objHeight,
    left: objLeft,
    top: objTop,
  };
};

// 获取旋转后平行四边形的四个顶点坐标
export const getRotatedParallelogramVertices = (obj: fabric.Object) => {
  const { left, top, width, height } = getObjBoundingRect(obj);
  let centerX = left;
  let centerY = top;
  if (obj.originX === "center") {
    centerX = left - width / 2;
  } else if (obj.originX === "right") {
    centerX = left - width;
  }

  if (obj.originY === "center") {
    centerY = top - height / 2;
  } else if (obj.originY === "bottom") {
    centerY = top - height;
  }
  const objAngle = (obj.angle ?? 0) * (Math.PI / 180); // 转换为弧度

  // 根据元素的中心点和旋转角度计算四个顶点坐标
  const vertices: { x: number; y: number }[] = [
    // 左上角
    {
      x:
        centerX +
        (left - centerX) * Math.cos(-objAngle) -
        (top - centerY) * Math.sin(-objAngle),
      y:
        centerY +
        (left - centerX) * Math.sin(-objAngle) +
        (top - centerY) * Math.cos(-objAngle),
    },
    // 右上角
    {
      x:
        centerX +
        (left + width - centerX) * Math.cos(-objAngle) -
        (top - centerY) * Math.sin(-objAngle),
      y:
        centerY +
        (left + width - centerX) * Math.sin(-objAngle) +
        (top - centerY) * Math.cos(-objAngle),
    },
    // 右下角
    {
      x:
        centerX +
        (left + width - centerX) * Math.cos(-objAngle) -
        (top + height - centerY) * Math.sin(-objAngle),
      y:
        centerY +
        (left + width - centerX) * Math.sin(-objAngle) +
        (top + height - centerY) * Math.cos(-objAngle),
    },
    // 左下角
    {
      x:
        centerX +
        (left - centerX) * Math.cos(-objAngle) -
        (top + height - centerY) * Math.sin(-objAngle),
      y:
        centerY +
        (left - centerX) * Math.sin(-objAngle) +
        (top + height - centerY) * Math.cos(-objAngle),
    },
  ];

  return vertices;
};

// 判断点是否在平行四边形内部
const isPointInParallelogram = (
  pointX: number,
  pointY: number,
  obj: fabric.Object,
  canvasWidth: number,
): boolean => {
  const rotatedVertices = getRotatedParallelogramVertices(obj);
  const [p1, p2, p3, p4] = rotatedVertices;
  let intersections = 0;
  const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
  const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
  const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
  const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

  if (pointX < minX || pointX > maxX || pointY < minY || pointY > maxY) {
    return false;
  }

  // 以画布上的点为起点，发射射线
  const rayStartX = pointX;
  const rayStartY = pointY;

  // 检查射线与每条边的交点
  if (
    checkLineIntersection(
      rayStartX,
      rayStartY,
      canvasWidth,
      rayStartY,
      p1.x,
      p1.y,
      p2.x,
      p2.y,
    )
  ) {
    intersections++;
  }
  if (
    checkLineIntersection(
      rayStartX,
      rayStartY,
      canvasWidth,
      rayStartY,
      p2.x,
      p2.y,
      p3.x,
      p3.y,
    )
  ) {
    intersections++;
  }
  if (
    checkLineIntersection(
      rayStartX,
      rayStartY,
      canvasWidth,
      rayStartY,
      p3.x,
      p3.y,
      p4.x,
      p4.y,
    )
  ) {
    intersections++;
  }
  if (
    checkLineIntersection(
      rayStartX,
      rayStartY,
      canvasWidth,
      rayStartY,
      p4.x,
      p4.y,
      p1.x,
      p1.y,
    )
  ) {
    intersections++;
  }

  return intersections % 2 === 1;
};

// 检查两条线段是否相交
const checkLineIntersection = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  x4: number,
  y4: number,
): boolean => {
  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  if (denominator === 0) {
    return false;
  }

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
};

export const getCsv = (
  canvas: fabric.Canvas,
  objects: fabric.Object[],
): number[][] => {
  const canvasWidth = canvas.getWidth();
  const canvasHeight = canvas.getHeight();
  const YES_SYMBOL = "●";
  const NO_SYMBOL = "○";
  const csvData = new Array(canvasHeight)
    .fill(NO_SYMBOL)
    .map(() => new Array(canvasWidth).fill(NO_SYMBOL));

  for (let i = 0; i < objects.length; i++) {
    const obj = objects[i];
    const area = geteArea(obj);
    const { left, top, width, height } = getObjBoundingRect(obj);
    const centerX = left;
    const centerY = top;

    for (let y = 0; y <= height; y++) {
      for (let x = 0; x <= width; x++) {
        // 使用射线法判断画布中的每个点是否在旋转后的平行四边形内部
        // 这里需要根据画布上的点的坐标来判断，将 x 和 y 替换为画布上对应点的坐标
        // 使用 isPointInParallelogram 函数来判断

        const rotatedX = Math.ceil(centerX + x);
        const rotatedY = Math.ceil(centerY + y);
        if (
          rotatedX < 0 ||
          rotatedY < 0 ||
          rotatedX >= canvasWidth ||
          rotatedY >= canvasHeight
        )
          continue;

        if (obj.type === "circle") {
          const radius = width / 2;
          const distanceToCenter = Math.sqrt(
            Math.pow(x - radius, 2) + Math.pow(y - radius, 2),
          );
          if (distanceToCenter <= radius) {
            csvData[rotatedY][rotatedX] = area > 0 ? YES_SYMBOL : NO_SYMBOL;
          }
        } else {
          const isInside = isPointInParallelogram(
            centerX + x, // 替换为画布上对应点的 x 坐标
            centerY + y, // 替换为画布上对应点的 y 坐标
            obj,
            canvasWidth,
          );
          if (isInside) {
            csvData[rotatedY][rotatedX] = area > 0 ? YES_SYMBOL : NO_SYMBOL;
          }
        }
      }
    }
  }
  return csvData;
};
