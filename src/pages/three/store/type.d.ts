import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export interface GLTFUserData {
  uuid: string;
  file: File;
  progress: number;
}

export interface Model extends Partial<GLTF> {
  userData: GLTFUserData;
}
