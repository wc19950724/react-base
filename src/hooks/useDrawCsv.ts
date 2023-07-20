import { fabric } from "fabric";
const useDrawCsv = () => {
  let csvData: number[][] = [[]];

  const drawCsv = (canvas: fabric.Canvas, objects: fabric.Object[]) => {
    csvData = new Array(canvas.getWidth())
      .fill(0)
      .map(() => new Array(canvas!.getHeight()).fill(0));
    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];

      // 获取元素在Canvas上的位置和尺寸
      const objLeft = obj.left!;
      const objTop = obj.top!;
      const objWidth = obj.width! * obj.scaleX!;
      const objHeight = obj.height! * obj.scaleY!;
      const objRadius = objWidth / 2;
      const objAngle = obj.angle!;
      // 根据元素类型计算面积
      let area = 0;
      if (obj.type === "circle") {
        area = Math.PI * objRadius * objRadius;
      } else {
        area = objWidth * objHeight;
      }

      // 遍历元素的每个像素点，并将对应位置在二维数组中标记为1
      for (let y = 0; y <= objHeight; y++) {
        for (let x = 0; x <= objWidth; x++) {
          // 考虑对象的原点位置
          let offsetX = 0;
          let offsetY = 0;
          if (obj.originX === "center") {
            offsetX = x - objWidth / 2;
          } else if (obj.originX === "right") {
            offsetX = x - objWidth;
          }

          if (obj.originY === "center") {
            offsetY = y - objHeight / 2;
          } else if (obj.originY === "bottom") {
            offsetY = y - objHeight;
          }
          const rotatedX =
            offsetX * Math.cos(-objAngle) -
            offsetY * Math.sin(-objAngle) +
            objLeft;
          const rotatedY =
            offsetX * Math.sin(-objAngle) +
            offsetY * Math.cos(-objAngle) +
            objTop;

          // 对于圆形，使用圆心和半径来计算区域
          if (obj.type === "circle" && objRadius !== null) {
            const distanceToCenter = Math.sqrt(
              Math.pow(rotatedX - objLeft, 2) + Math.pow(rotatedY - objTop, 2),
            );
            if (distanceToCenter <= objRadius) {
              csvData[Math.round(rotatedY)][Math.round(rotatedX)] =
                area > 0
                  ? 1
                  : csvData[Math.round(rotatedY)][Math.round(rotatedX)];
            }
          } else {
            // 将在Canvas上的位置映射到二维数组上
            const arrayX = Math.round(rotatedX);
            const arrayY = Math.round(rotatedY);

            if (
              arrayX >= 0 &&
              arrayX < canvas.getWidth() &&
              arrayY >= 0 &&
              arrayY < canvas.getHeight()
            ) {
              csvData[arrayY][arrayX] = area > 0 ? 1 : csvData[arrayY][arrayX];
            }
          }
        }
      }
    }
    return csvData;
  };

  return {
    csvData,
    drawCsv,
  };
};

export default useDrawCsv;
