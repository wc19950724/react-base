import { debounce } from "lodash";
import { action, makeObservable, observable } from "mobx";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { fileTypeValidate, getElement } from "@/utils/utils";

import { Model } from "./type";

export class Renderer {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  container?: HTMLElement;
  resizeObserver: ResizeObserver;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.camera = new THREE.PerspectiveCamera();
    this.scene = new THREE.Scene();

    this.resizeObserver = new ResizeObserver(debounce(this.resize.bind(this)));
  }

  initialized = false;
  initialize(dom: string | HTMLElement) {
    this.initialized = true;
    const container = getElement(dom);
    if (!container) return;
    this.container = container;
    this.resize();
    this.container.appendChild(this.renderer.domElement);
    this.scene.add(this.camera);
    this.renderer.setAnimationLoop(this.render.bind(this));

    this.resizeObserver.observe(this.container);
  }

  resize() {
    if (!this.container) return;
    const { offsetWidth, offsetHeight } = this.container;
    this.renderer.setSize(offsetWidth, offsetHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.aspect = offsetWidth / offsetHeight;
    this.camera.updateProjectionMatrix();
  }

  render() {
    if (!this.initialized) return;
    if (this.controls) {
      this.controls.update();
    }
    this.renderer.render(this.scene, this.camera);
  }

  controls?: OrbitControls;
  addControl() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    return this;
  }

  dispose() {
    this.initialized = false;
    if (this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
    this.resizeObserver.disconnect();
  }
}

export const renderer = new Renderer();

export class ModelLoader {
  loader: GLTFLoader;
  models: Record<string, Model>;

  constructor() {
    this.loader = new GLTFLoader();
    this.models = {};
    makeObservable(this, {
      models: observable,
      updateModels: action,
    });
  }

  updateModels(uuid: string, model: Model) {
    this.models = Object.assign({}, this.models, { [uuid]: model });
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

export const modelLoader = new ModelLoader();
