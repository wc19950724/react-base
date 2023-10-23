import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

export class ThreeScene {
  container: HTMLDivElement;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;

  stats: Stats;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.camera = new THREE.PerspectiveCamera(
      45,
      container.offsetWidth / container.offsetHeight,
      0.25,
      20,
    );
    this.camera.position.set(0, -8, 0);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdddddd);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;
    this.controls.target.set(0, 0, -0.2);

    this.container.appendChild(this.renderer.domElement);

    this.stats = new Stats();
    this.stats.dom.style.position = "absolute";
    this.container.appendChild(this.stats.dom);
  }

  dispose() {
    this.container.removeChild(this.stats.dom);
    this.container.removeChild(this.renderer.domElement);
  }
}
