import { makeAutoObservable, set } from "mobx";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { fileTypeValidate } from "@/utils/utils";

import { Model } from "./type";

class ModelLoaderStore {
  loader: GLTFLoader;
  models: Record<string, Model>;

  constructor() {
    this.loader = new GLTFLoader();
    this.models = {};
    makeAutoObservable(this);
  }

  updateModels(uuid: string, model: Model) {
    set(this.models, { [uuid]: model });
  }

  removeModels(uuid: string) {
    delete this.models[uuid];
  }

  clearModels() {
    this.models = {};
  }

  load(files: FileList | null) {
    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (fileTypeValidate(file, "gltf")) {
          const uuid = crypto.randomUUID();
          const gltfData: Model = {
            userData: {
              uuid,
              file,
              progress: 0,
            },
          };
          this.updateModels(uuid, gltfData);
          this.loader.load(
            URL.createObjectURL(file),
            (gltf) => {
              gltf.userData = gltfData.userData;
              this.updateModels(uuid, gltf);
            },
            (e) => {
              gltfData.userData.progress = e.loaded / e.total;
            },
          );
        }
      }
    }
  }
}

export const modelLoaderStore = new ModelLoaderStore();
