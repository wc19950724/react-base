import { debounce } from "lodash";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { getElement } from "@/utils/utils";

class RendererStore {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  controls: OrbitControls;

  container?: HTMLElement;
  resizeObserver: ResizeObserver;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.camera = new THREE.PerspectiveCamera();
    this.scene = new THREE.Scene();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.resizeObserver = new ResizeObserver(debounce(this.resize.bind(this)));
  }

  initialize(dom: string | HTMLElement) {
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
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.renderer.setAnimationLoop(null);
    if (this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
    this.resizeObserver.disconnect();
  }
}

export const rendererStore = new RendererStore();
