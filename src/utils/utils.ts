import { DirectoryPickerSelectType, FilePickerSelectType } from "@/typings";

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getElement = (el: string | HTMLElement) => {
  if (typeof el === "string") {
    return document.querySelector<HTMLElement>(el);
  }
  return el;
};

export function createFilePicker(
  selectType: FilePickerSelectType,
  accept?: string,
): Promise<FileList | null>;
export function createFilePicker(
  selectType: DirectoryPickerSelectType,
): Promise<FileList | null>;
export function createFilePicker(
  selectType: FilePickerSelectType | DirectoryPickerSelectType,
  accept = "",
) {
  return new Promise<FileList | null>((resolve) => {
    // NOTE: TypeScript还不支持 window.showOpenFilePicker 且是实验性功能, 后续支持可代替创建元素的方式
    const input = document.createElement("input");
    input.type = "file";
    if (selectType === "directory") {
      input.webkitdirectory = true;
    } else {
      input.accept = accept;
      input.multiple = selectType === "multiple";
    }
    input.onchange = () => {
      resolve(input.files);
      input.onchange = null;
    };
    try {
      input.showPicker();
    } catch (error) {
      input.click();
    }
  });
}

export const fileTypeValidate = (file: File, type: string, flags?: string) => {
  return new RegExp(`\\.${type}$`, flags).test(file.name);
};

export const getWithinRangeNumber = (
  num: number,
  min = -Infinity,
  max = Infinity,
) => {
  return Math.min(Math.max(num, min), max);
};

export const getElementMinMaxSize = (el: string | HTMLElement) => {
  const dom = getElement(el);
  if (!dom)
    return {
      min: { width: -Infinity, height: -Infinity },
      max: { width: Infinity, height: Infinity },
    };
  const computedStyles = window.getComputedStyle(dom);
  const originMinWidth = computedStyles.getPropertyValue("min-width");
  const originMaxWidth = computedStyles.getPropertyValue("max-width");
  const originMinHeight = computedStyles.getPropertyValue("min-height");
  const originMaxHeight = computedStyles.getPropertyValue("max-height");

  const getValueInPixels = (value: string, dimension: "width" | "height") => {
    if (value.includes("%")) {
      if (!dom.parentElement)
        throw `${dom}: the parent element of the element is not found`;
      const parentSize =
        dimension === "width"
          ? dom.parentElement.offsetWidth
          : dom.parentElement.offsetHeight;
      return (parseFloat(value) / 100) * parentSize;
    } else if (value.includes("px")) {
      return parseFloat(value);
    } else if (value.includes("vw")) {
      return (parseFloat(value) / 100) * window.innerWidth;
    } else if (value.includes("vh")) {
      return (parseFloat(value) / 100) * window.innerHeight;
    } else if (value.includes("rem")) {
      return parseFloat(value) * parseFloat(computedStyles.fontSize);
    } else {
      return parseFloat(value); // Fallback to just parsing the value as float
    }
  };

  const minWidthInPixels = getValueInPixels(originMinWidth, "width");
  const maxWidthInPixels = getValueInPixels(originMaxWidth, "width");
  const minHeightInPixels = getValueInPixels(originMinHeight, "height");
  const maxHeightInPixels = getValueInPixels(originMaxHeight, "height");

  const validate = (value: number) => {
    return value === 0 || Number.isNaN(value);
  };
  // Calculate the minimum and maximum sizes based on the current size and limits
  const minWidth = !validate(minWidthInPixels) ? minWidthInPixels : -Infinity;
  const maxWidth = !validate(maxWidthInPixels) ? maxWidthInPixels : Infinity;
  const minHeight = !validate(minHeightInPixels)
    ? minHeightInPixels
    : -Infinity;
  const maxHeight = !validate(maxHeightInPixels) ? maxHeightInPixels : Infinity;

  return {
    min: { width: minWidth, height: minHeight },
    max: { width: maxWidth, height: maxHeight },
  };
};
