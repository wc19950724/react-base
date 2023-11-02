import { debounce } from "lodash";
import { action, makeObservable, observable } from "mobx";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import {
  fileTypeValidate,
  getElement,
  getElementMinMaxSize,
  getWithinRangeNumber,
} from "@/utils/utils";

import { ElementSize, Model, ResizeDirection, ResizePoint } from "./type";

export class Renderer {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  container: HTMLElement;
  resizeObserver: ResizeObserver;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.camera = new THREE.PerspectiveCamera();
    this.scene = new THREE.Scene();
    this.container = document.body;

    this.resizeObserver = new ResizeObserver(debounce(this.resize.bind(this)));
  }

  initialized = false;
  initialize(dom: string | HTMLElement) {
    this.initialized = true;
    const container = getElement(dom);
    if (container) this.container = container;
    this.resize();
    this.container.appendChild(this.renderer.domElement);
    this.scene.add(this.camera);
    this.renderer.setAnimationLoop(this.render.bind(this));

    this.resizeObserver.observe(this.container);
  }

  resize() {
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

export class Resizeble {
  el?: HTMLElement;
  #direction: ResizeDirection;
  #userSelect: string;
  #startPoint: ResizePoint;
  #resizingHandler: (ev: MouseEvent | TouchEvent) => void;
  #endResizeHandler: () => void;
  #size: ElementSize;
  #setSize: (point: ResizePoint) => void;

  get sizeLimit() {
    return getElementMinMaxSize(this.el);
  }

  constructor() {
    this.#direction = "both";
    this.#userSelect = "auto";
    this.#startPoint = { x: 0, y: 0 };
    this.#size = { width: 0, height: 0 };
    this.#setSize = () => {};
    this.#resizingHandler = this.#resizing.bind(this);
    this.#endResizeHandler = this.#endResize.bind(this);
  }

  initialize(dom: string | HTMLElement, direction: ResizeDirection) {
    const element = getElement(dom);
    if (!element) throw `${dom}: the element is not found`;
    this.el = element;
    this.#direction = direction;
    this.#setSize = this.#createSetSize();
  }

  startResize({ x, y }: ResizePoint) {
    if (!this.el) return;
    this.#userSelect = document.body.style.userSelect;
    document.body.style.userSelect = "none";
    this.#startPoint = { x, y };
    this.#size = { width: this.el.offsetWidth, height: this.el.offsetHeight };
    document.addEventListener("touchmove", this.#resizingHandler);
    document.addEventListener("touchend", this.#endResizeHandler);
    document.addEventListener("mousemove", this.#resizingHandler);
    document.addEventListener("mouseup", this.#endResizeHandler);
  }

  #resizing(ev: MouseEvent | TouchEvent) {
    requestAnimationFrame(() => {
      if (ev instanceof MouseEvent) {
        this.#setSize({ x: ev.pageX, y: ev.pageY });
      } else {
        this.#setSize({ x: ev.touches[0].pageX, y: ev.touches[0].pageX });
      }
    });
  }

  #endResize() {
    document.removeEventListener("touchmove", this.#resizingHandler);
    document.removeEventListener("touchend", this.#endResizeHandler);
    document.removeEventListener("mousemove", this.#resizingHandler);
    document.removeEventListener("mouseup", this.#endResizeHandler);
    document.body.style.userSelect = this.#userSelect;
  }

  #createSetSize() {
    const { min, max } = this.sizeLimit;
    switch (this.#direction) {
      case "vertical":
        return (point: ResizePoint) => {
          if (!this.el) return;
          const newHeight = this.#size.height + this.#startPoint.y - point.y;
          const height = getWithinRangeNumber(
            newHeight,
            min.height,
            max.height,
          );
          this.el.style.height = `${height}px`;
        };
      case "horizontal":
        return (point: ResizePoint) => {
          if (!this.el) return;
          const newWidth = this.#size.width + this.#startPoint.x - point.x;
          const width = getWithinRangeNumber(newWidth, min.width, max.width);
          this.el.style.width = `${width}px`;
        };
      case "both":
        return (point: ResizePoint) => {
          if (!this.el) return;
          const newHeight = this.#size.height + this.#startPoint.y - point.y;
          const newWidth = this.#size.width + this.#startPoint.x - point.x;
          const height = getWithinRangeNumber(
            newHeight,
            min.height,
            max.height,
          );
          const width = getWithinRangeNumber(newWidth, min.width, max.width);
          this.el.style.height = `${height}px`;
          this.el.style.width = `${width}px`;
        };
    }
  }
}

export const resizeble = new Resizeble();
