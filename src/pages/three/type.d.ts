import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export interface GLTFUserData {
  uuid: string;
  file: File;
  progress: number;
}

export interface Model extends Partial<GLTF> {
  userData: GLTFUserData;
}

export type ResizeDirection = "vertical" | "horizontal" | "both";

export interface ResizePoint {
  x: number;
  y: number;
}

export interface ElementSize {
  width: number;
  height: number;
}
