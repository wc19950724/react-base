import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import {
  CSS2DObject,
  CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer";

export class ThreeScene {
  container: HTMLDivElement;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;

  stats: Stats;

  clock: THREE.Clock;

  axis: THREE.AxesHelper;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.camera = new THREE.PerspectiveCamera(
      45,
      container.offsetWidth / container.offsetHeight,
      0.25,
      20,
    );
    this.camera.position.set(0, 0, 5);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa0a0a0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.renderer.shadowMap.enabled = true;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI / 2;

    this.container.appendChild(this.renderer.domElement);

    this.stats = new Stats();
    this.stats.dom.style.position = "absolute";
    this.container.appendChild(this.stats.dom);

    this.clock = new THREE.Clock();
    this.axis = new THREE.AxesHelper(1);
    this.CSSRenderer = new CSS2DRenderer();
    this.CSSRenderer.setSize(100, 100);
    this.CSSRenderer.domElement.style.position = "absolute";
    this.CSSRenderer.domElement.style.bottom = "0px";
    this.CSSRenderer.domElement.style.right = "0px";
    this.container.appendChild(this.CSSRenderer.domElement);
  }

  CSSRenderer: CSS2DRenderer;

  axisUpdate() {
    const labelX = this.createLabel("X", 1, 0, 0);
    const labelY = this.createLabel("Y", 0, 1, 0);
    const labelZ = this.createLabel("Z", 0, 0, 1);
    this.axis.add(labelX, labelY, labelZ);
    this.scene.add(this.axis);
  }

  createLabel(text: string, x: number, y: number, z: number) {
    const dom = document.createElement("div");
    dom.textContent = text;
    dom.style.color = "#ffffff";
    const label = new CSS2DObject(dom);
    label.position.set(x, y, z);
    label.layers.enableAll();
    return label;
  }

  dispose() {
    this.container.removeChild(this.stats.dom);
    this.container.removeChild(this.renderer.domElement);
  }
}
